"""Genera la imagen con que se comparte cada ficha (WhatsApp, Facebook, X): public/img/og/<slug>.jpg.

Sale de la portada de escritorio de cada modelo, recortada a 1200x627 (la misma proporción que
og-gwm.jpg). Se usa JPG y no la portada .webp porque algunas apps de mensajería no muestran WebP en
la vista previa. Hay que volver a correrlo si cambia una portada o se agrega un modelo:

    python3 scripts/generar-og.py

Requiere Pillow (pip install pillow).
"""
import re
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ANCHO, ALTO = 1200, 627

fichas = (RAIZ / 'src/js/fichas.js').read_text(encoding='utf-8')

# Cada ficha empieza con una línea "  'slug': {" y su portada es el primer "escritorio: '...'" que sigue.
slugs = [(m.group(1), m.end()) for m in re.finditer(r"^  '([a-z0-9-]+)': \{", fichas, re.M)]
salida = RAIZ / 'public/img/og'
salida.mkdir(parents=True, exist_ok=True)

for i, (slug, inicio) in enumerate(slugs):
    fin = slugs[i + 1][1] if i + 1 < len(slugs) else len(fichas)
    portada = re.search(r"escritorio: '([^']+)'", fichas[inicio:fin])
    if not portada:
        print(f'{slug}: sin portada, se omite')
        continue
    origen = RAIZ / 'public' / portada.group(1).lstrip('/')
    with Image.open(origen) as im:
        im = im.convert('RGB')
        escala = max(ANCHO / im.width, ALTO / im.height)  # cubrir el marco y recortar el sobrante
        im = im.resize((round(im.width * escala), round(im.height * escala)), Image.LANCZOS)
        izq, arriba = (im.width - ANCHO) // 2, (im.height - ALTO) // 2
        im.crop((izq, arriba, izq + ANCHO, arriba + ALTO)).save(salida / f'{slug}.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
    print(f'{slug}: {origen.name} -> img/og/{slug}.jpg')

"""Variantes reales para pantallas pequeñas; no amplía imágenes ni reemplaza originales.
Ejecutar con Pillow después de agregar nuevas fotos: python3 scripts/optimizar-imagenes.py
"""
from pathlib import Path
from PIL import Image, ImageOps
import json

base = Path(__file__).resolve().parents[1]
public = base / 'public'
manifest = {}
originales = variantes = 0
for carpeta in ['fichas', 'hero', 'poster']:
    for path in sorted((public / 'img' / carpeta).rglob('*')):
        if path.suffix.lower() not in {'.webp', '.jpg', '.png'}:
            continue
        with Image.open(path) as fuente:
            foto = ImageOps.exif_transpose(fuente).convert('RGB')
            w, h = foto.size
            if w < 700:
                continue
            anchos = []
            for ancho in (480, 960):
                if ancho >= w:
                    continue
                relativa = path.relative_to(public)
                destino = public / 'img' / 'responsive' / relativa.relative_to('img').with_suffix('')
                destino = destino.parent / f'{destino.name}-{ancho}.webp'
                destino.parent.mkdir(parents=True, exist_ok=True)
                if not destino.exists() or destino.stat().st_mtime < path.stat().st_mtime:
                    foto.resize((ancho, round(h * ancho / w)), Image.Resampling.LANCZOS).save(destino, 'WEBP', quality=90, method=6)
                if destino.stat().st_size < path.stat().st_size:
                    anchos.append(ancho)
                    variantes += destino.stat().st_size
                else:
                    destino.unlink()
            manifest['/' + str(path.relative_to(public))] = [w, h, anchos]
            originales += path.stat().st_size
(base / 'src/js/imagenes-manifest.js').write_text('// Generado por scripts/optimizar-imagenes.py. Las fotos originales se conservan.\nexport default ' + json.dumps(manifest, separators=(',', ':')) + ';\n')
print(f'{len(manifest)} fotos con variantes; originales {originales/1e6:.2f} MB; variantes {variantes/1e6:.2f} MB.')

/**
 * Hero de la landing (kvswiper en gwm-mx.com): un slide por modelo con su spot en video (16:9 en
 * escritorio y 9:16 en celular) o, si no hay, su imagen; título, subtítulo y llamado a la acción.
 * Abajo, los puntos con el avance del slide y el botón de pausa.
 *
 * Los slides salen de SLIDES_ACTIVOS (modelos.js). Cada video arranca sin `src` y se asigna recién
 * cuando el slide se activa, y de los dos recortes solo se carga el visible, nunca los dos.
 */
import Splide from '@splidejs/splide';
import { SLIDES_ACTIVOS } from '../modelos.js';
import { esc, reducirMovimiento } from './util.js';

/** Los spots duran ~5 s: con menos intervalo se cortarían por la mitad. */
const INTERVALO = 6000;

import { htmlHeroSlide as htmlSlide } from '../render/catalogo.js';

export function initHero() {
  const raiz = document.querySelector('#home-slider');
  const pista = raiz?.querySelector('[data-slides]');
  const puntos = raiz?.querySelector('[data-puntos]');
  const pausa = raiz?.querySelector('[data-pausa]');
  if (!pista || !puntos || !pausa) return;

  pista.innerHTML = SLIDES_ACTIVOS.map(htmlSlide).join('');
  puntos.innerHTML = SLIDES_ACTIVOS.map(
    (s, i) => `
      <li class="dot-item">
        <button type="button" aria-label="Ver ${esc(s.modelo)} (${i + 1} de ${SLIDES_ACTIVOS.length})"><span class="dot-progreso"></span></button>
      </li>`
  ).join('');
  const botones = [...puntos.querySelectorAll('button')];

  const splide = new Splide(raiz, {
    type: 'fade',
    rewind: true,
    speed: 900,
    autoplay: !reducirMovimiento(),
    interval: INTERVALO,
    pauseOnHover: false,
    pauseOnFocus: true,
    arrows: false,
    pagination: false,
  });

  // Solo el slide activo reproduce, y de sus dos recortes solo el visible en este tamaño de pantalla.
  let pausado = reducirMovimiento();
  let visible = true;
  const sincronizarVideos = () => {
    raiz.querySelectorAll('video').forEach((v) => {
      const activo = v.closest('.splide__slide')?.classList.contains('is-active');
      if (pausado || !visible || document.hidden || !activo || v.offsetParent === null) {
        v.pause();
        return;
      }
      if (v.dataset.src) {
        v.src = v.dataset.src;
        delete v.dataset.src;
        // Recién asignado el src todavía no hay datos: reintentar al estar listo.
        v.addEventListener('canplay', () => { if (!pausado && visible && !document.hidden && v.closest('.splide__slide').classList.contains('is-active')) v.play().catch(() => {}); }, { once: true });
      }
      v.play().catch(() => {
        /* si el navegador bloquea el autoplay queda el poster */
      });
    });
  };

  const marcarPunto = (indice) => {
    botones.forEach((b, i) => {
      const activo = i === indice;
      b.parentElement.classList.toggle('is-active', activo);
      b.setAttribute('aria-current', String(activo));
      b.querySelector('.dot-progreso').style.width = activo ? '' : '0';
    });
  };

  // `moved` es el que importa: las clases is-active recién quedan firmes al terminar la transición.
  splide.on('mounted active move moved resized', sincronizarVideos);
  splide.on('mounted move', () => marcarPunto(splide.index));
  splide.on('autoplay:playing', (avance) => {
    const barra = botones[splide.index]?.querySelector('.dot-progreso');
    if (barra) barra.style.width = `${Math.round(avance * 100)}%`;
  });
  botones.forEach((b, i) => b.addEventListener('click', () => splide.go(i)));

  // Pausa y reanudación (WCAG 2.2.2: todo lo que se mueve por sí solo se puede detener).
  const alternarPausa = (pausar) => {
    pausado = pausar;
    const autoplay = splide.Components.Autoplay;
    if (pausar) autoplay.pause();
    else autoplay.play();
    sincronizarVideos();
    pausa.classList.toggle('is-paused', pausar);
    pausa.setAttribute('aria-label', pausar ? 'Reanudar la rotación' : 'Pausar la rotación');
  };
  pausa.addEventListener('click', () => alternarPausa(!pausa.classList.contains('is-paused')));
  if (reducirMovimiento()) pausa.classList.add('is-paused');

  splide.mount();
  marcarPunto(0);
  if (reducirMovimiento()) alternarPausa(true);
  const observador = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sincronizarVideos(); }, {threshold:0.1});
  observador.observe(raiz);
  document.addEventListener('visibilitychange', sincronizarVideos);
}

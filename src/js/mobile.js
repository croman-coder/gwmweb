/** Ajustes del viewport visible (teclado móvil) y de las acciones comerciales. */
export function initMobile() {
  const actualizarViewport = () => document.documentElement.style.setProperty('--viewport-visible', `${window.visualViewport?.height || window.innerHeight}px`);
  actualizarViewport();
  window.visualViewport?.addEventListener('resize', actualizarViewport, { passive: true });
  window.addEventListener('resize', actualizarViewport, { passive: true });
  const acciones = document.querySelectorAll('.hero-banner .hero-actions, .ficha-portada .hero-actions');
  if (!acciones.length) return;
  const visibles = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.intersectionRatio > .5) visibles.add(entry.target);
      else visibles.delete(entry.target);
    }
    document.body.classList.toggle('acciones-en-pantalla', visibles.size > 0);
  }, { threshold: [.5] });
  acciones.forEach(el => observer.observe(el));
}

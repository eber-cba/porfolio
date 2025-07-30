// utils/smoothScroll.js
export function animatedScrollTo(element) {
  if (!element) return;
  const NAVBAR_HEIGHT = 0; // Offset ajustado para alinear con el inicio del contenedor
  const targetY = element.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const duration = 700;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    // easeInOutCubic
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, startY + distance * ease);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}

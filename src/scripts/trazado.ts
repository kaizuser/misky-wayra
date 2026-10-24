// Lo que ya se dibujó queda dibujado. Las animaciones atadas a la vista (view()) retroceden
// al subir; cuando una llega al final se le pone .quieto (global.css: sin animación), y queda
// su estado natural, que es el dibujo completo. Al llegar al fondo de la página, todo queda trazado.
// Las de scroll(root) (la nav, el camino del hero) no se tocan: esas sí van y vuelven.

let pendientes: CSSAnimation[] = [];

// Las animaciones vivas en este momento. Se vuelven a contar al cruzar el breakpoint:
// en desktop aparecen trazos que en mobile no existen (el lado izquierdo de las volutas).
function contar() {
  pendientes = document
    .getAnimations()
    .filter((a): a is CSSAnimation => a instanceof CSSAnimation && a.timeline instanceof ViewTimeline);
  addEventListener('scroll', alScrollear, { passive: true });
  revisar();
}

function revisar() {
  pendientes = pendientes.filter((a) => {
    if (a.effect?.getComputedTiming().progress !== 1) return true;
    (a.effect as KeyframeEffect).target?.classList.add('quieto');
    return false;
  });
  if (pendientes.length === 0) removeEventListener('scroll', alScrollear);
}

let esperando = false;
function alScrollear() {
  if (esperando) return;
  esperando = true;
  requestAnimationFrame(() => {
    esperando = false;
    revisar();
  });
}

// Navegadores sin animaciones atadas al scroll (Firefox): ya se ve todo completo
if (typeof ViewTimeline !== 'undefined') {
  // Mismo breakpoint que el CSS de desktop (64rem). Se espera un cuadro para que
  // el navegador cree las animaciones nuevas antes de contarlas.
  matchMedia('(width >= 64rem)').addEventListener('change', () => requestAnimationFrame(contar));
  contar();
}

// Entradas que se disparan (no atadas al scroll): cuando un elemento con [data-revelar]
// entra en pantalla, recibe .visible y su animación corre sola, con su propia duración.
// Se resetea solo cuando sale por abajo (subiste por encima de él): así vuelve a entrar cada
// vez que bajás de nuevo. Si se resetara al salir por arriba, el corrimiento hacia abajo del
// estado oculto lo metería otra vez en pantalla y saltaría.
// Los estilos de la entrada (texto, foto, detalle) viven en global.css; el retraso, en --retraso.
//
// El estado oculto lo activa este mismo script (.revelar en <html>): si por algo no carga
// (sin JavaScript, un 404 tras un deploy con el HTML viejo en caché), todo se ve igual.

document.documentElement.classList.add('revelar');

// Un carrusel ([data-revelar-juntas]) entra entero cuando llega con el recorrido de la página:
// sus fotos no vuelven a entrar al deslizarlo de costado. Se observa el carrusel, no cada foto.
const grupos = new Map<Element, Element[]>();
const objetivos: Element[] = [];
document.querySelectorAll('[data-revelar]').forEach((el) => {
  const grupo = el.closest('[data-revelar-juntas]');
  if (!grupo) return void objetivos.push(el);
  if (!grupos.has(grupo)) {
    grupos.set(grupo, []);
    objetivos.push(grupo);
  }
  grupos.get(grupo)!.push(el);
});

const marcar = (objetivo: Element, visible: boolean) => {
  for (const el of grupos.get(objetivo) ?? [objetivo]) el.classList.toggle('visible', visible);
};

// Entrada: cuando asoma un poco por encima del borde de abajo
const entrada = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) if (e.isIntersecting) marcar(e.target, true);
  },
  { rootMargin: '0px 0px -12% 0px', threshold: [0, 0.01] },
);

// Reinicio: cuando sale entero por debajo de la pantalla (subiste por encima de él). Va en un
// observador aparte, sin margen: el de la entrada avisa al cruzar su línea (todavía en pantalla)
// y no vuelve a avisar cuando termina de salir, así que algunos no se reiniciaban.
const salida = new IntersectionObserver((entradas) => {
  for (const e of entradas) {
    if (!e.isIntersecting && e.boundingClientRect.top >= (e.rootBounds?.bottom ?? innerHeight))
      marcar(e.target, false);
  }
});

objetivos.forEach((el) => {
  entrada.observe(el);
  salida.observe(el);
});

// Lo que está a la vista entra enseguida, aunque esté en la franja de abajo, en dos momentos:
// - al cargar (un texto al pie de la primera pantalla esperaría a que bajes); se mira otra vez
//   cuando cargan las letras y las fotos, que corren el contenido;
// - al llegar al final de la página (lo último, como la firma del pie, nunca puede subir más
//   arriba de esa franja: quedaba invisible, como un hueco).
const revelarALaVista = () => {
  objetivos.forEach((el) => {
    const caja = el.getBoundingClientRect();
    if (caja.top < innerHeight && caja.bottom > 0) marcar(el, true);
  });
};
const primeraPantalla = () => scrollY === 0 && revelarALaVista();
primeraPantalla();
document.fonts?.ready.then(primeraPantalla);
addEventListener('load', primeraPantalla, { once: true });
addEventListener(
  'scroll',
  () => {
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) revelarALaVista();
  },
  { passive: true },
);

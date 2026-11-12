// Entradas que se disparan (no atadas al scroll): cuando un elemento con [data-revelar]
// entra en pantalla, recibe .visible y su animación corre sola, con su propia duración.
// Se resetea solo cuando sale por abajo (subiste por encima de él): así vuelve a entrar cada
// vez que bajás de nuevo. Si se resetara al salir por arriba, el corrimiento hacia abajo del
// estado oculto lo metería otra vez en pantalla y saltaría.
// Los estilos de la entrada (texto, foto, detalle) viven en global.css; el retraso, en --retraso.
// En un carrusel, cada foto entra (fundido) recién cuando llega deslizándola.
//
// El estado oculto lo activa este mismo script (.revelar en <html>): si por algo no carga
// (sin JavaScript, un 404 tras un deploy con el HTML viejo en caché), todo se ve igual.

document.documentElement.classList.add('revelar');

const observador = new IntersectionObserver(
  (entradas) => {
    for (const entrada of entradas) {
      if (entrada.isIntersecting) entrada.target.classList.add('visible');
      // Solo si quedó entera por debajo de la pantalla: una foto que sale de costado en un
      // carrusel, o un texto que ya entró al pie de la pantalla, siguen visibles
      else if (entrada.boundingClientRect.top >= innerHeight)
        entrada.target.classList.remove('visible');
    }
  },
  // Se dispara cuando asoma un poco por encima del borde de abajo
  { rootMargin: '0px 0px -12% 0px', threshold: [0, 0.01] },
);

const elementos = document.querySelectorAll('[data-revelar]');
elementos.forEach((el) => observador.observe(el));

// Lo que ya está en la primera pantalla entra enseguida, aunque esté en la franja de abajo
// (si no, un texto al pie de la primera pantalla esperaría a que bajes). Se mira otra vez
// cuando cargan las letras y las fotos, que corren el contenido.
const primeraPantalla = () => {
  if (scrollY > 0) return;
  elementos.forEach((el) => {
    const caja = el.getBoundingClientRect();
    if (caja.top < innerHeight && caja.bottom > 0) el.classList.add('visible');
  });
};
primeraPantalla();
document.fonts?.ready.then(primeraPantalla);
addEventListener('load', primeraPantalla, { once: true });

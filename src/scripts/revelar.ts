// Entradas que se disparan (no atadas al scroll): cuando un elemento con [data-revelar]
// entra en pantalla, recibe .visible y su animación corre sola, con su propia duración.
// Al salir de la pantalla se le saca, así vuelve a entrar cada vez que se pasa por ahí.
// Los estilos de la entrada viven en global.css; el retraso de cada uno, en --retraso.

const observador = new IntersectionObserver(
  (entradas) => {
    for (const entrada of entradas) {
      if (entrada.isIntersecting) entrada.target.classList.add('visible');
      // Solo se resetea cuando salió del todo, para que no titile en el borde
      else if (entrada.intersectionRatio === 0) entrada.target.classList.remove('visible');
    }
  },
  // Se dispara cuando asoma un poco por encima del borde de abajo
  { rootMargin: '0px 0px -12% 0px', threshold: [0, 0.01] },
);

document.querySelectorAll('[data-revelar]').forEach((el) => observador.observe(el));

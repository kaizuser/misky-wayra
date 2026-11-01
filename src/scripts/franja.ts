// La franja de navegación (Franja.astro): mientras su lugar en la página está a la vista, es
// parte de la página. Una vez que lo pasaste, la barra pasa a fija arriba (escondida); se
// muestra solo cuando subís y se esconde cuando bajás. Al volver a su lugar, vuelve a la página.

const envoltura = document.querySelector<HTMLElement>('.franja-nav');
const barra = envoltura?.querySelector<HTMLElement>('.barra');

if (envoltura && barra) {
  let ultimoY = scrollY;
  let esperando = false;
  const umbral = 6; // px de scroll antes de decidir la dirección (evita titileos)

  function actualizar() {
    esperando = false;
    const y = scrollY;
    const pasada = envoltura!.getBoundingClientRect().bottom <= 0;

    if (!pasada) {
      // Su lugar está a la vista: parte de la página
      barra!.classList.remove('flotante', 'visible', 'sin-transicion');
    } else {
      if (!barra!.classList.contains('flotante')) {
        // Pasa a fija sin animación (está fuera de la vista; no tiene que verse el cambio)
        barra!.classList.add('flotante', 'sin-transicion');
        requestAnimationFrame(() => requestAnimationFrame(() => barra!.classList.remove('sin-transicion')));
      }
      if (y < ultimoY - umbral) barra!.classList.add('visible');
      else if (y > ultimoY + umbral) barra!.classList.remove('visible');
    }

    if (Math.abs(y - ultimoY) > umbral) ultimoY = y;
  }

  addEventListener(
    'scroll',
    () => {
      if (esperando) return;
      esperando = true;
      requestAnimationFrame(actualizar);
    },
    { passive: true },
  );
  actualizar();
}

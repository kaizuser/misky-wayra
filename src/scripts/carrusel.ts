// Carruseles de fotos ([data-carrusel]): la pista es un scroll horizontal nativo con snap
// (dedo, trackpad y teclado andan solos). Este script solo suma las flechas y el contador.
// Los usan los ambientes de las cabañas y, en el celular, las composiciones del inicio.
// Sin JavaScript, la pista se sigue deslizando igual.

document.querySelectorAll<HTMLElement>('[data-carrusel]').forEach((carrusel) => {
  const pista = carrusel.querySelector<HTMLElement>('[data-pista]');
  const anterior = carrusel.querySelector<HTMLButtonElement>('[data-anterior]');
  const siguiente = carrusel.querySelector<HTMLButtonElement>('[data-siguiente]');
  const actual = carrusel.querySelector<HTMLElement>('[data-actual]');
  if (!pista || !anterior || !siguiente) return;

  // Las fotos de la pista (en los escalones del inicio van agrupadas de a pares)
  const fotos = () => [...pista.querySelectorAll<HTMLElement>('.foto')];

  // El paso: el ancho de una foto más el espacio entre fotos
  const paso = () => {
    const [a, b] = fotos();
    return b ? b.getBoundingClientRect().left - a.getBoundingClientRect().left || pista.clientWidth : pista.clientWidth;
  };

  function actualizar() {
    const max = pista!.scrollWidth - pista!.clientWidth;
    anterior!.disabled = pista!.scrollLeft <= 2;
    siguiente!.disabled = pista!.scrollLeft >= max - 2;
    if (!actual) return;
    // Las fotos a la vista: una en el celular, dos en desktop ("1–2 / 6")
    const total = fotos().length;
    const aLaVista = Math.max(1, Math.round(pista!.clientWidth / paso()));
    const primera = Math.min(total - aLaVista + 1, Math.round(pista!.scrollLeft / paso()) + 1);
    actual.textContent = aLaVista > 1 ? `${primera}–${primera + aLaVista - 1}` : String(primera);
  }

  anterior.addEventListener('click', () => pista.scrollBy({ left: -paso() }));
  siguiente.addEventListener('click', () => pista.scrollBy({ left: paso() }));

  // Flechas del teclado cuando la pista tiene el foco
  pista.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); pista.scrollBy({ left: paso() }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); pista.scrollBy({ left: -paso() }); }
  });

  let esperando = false;
  pista.addEventListener(
    'scroll',
    () => {
      if (esperando) return;
      esperando = true;
      requestAnimationFrame(() => {
        esperando = false;
        actualizar();
      });
    },
    { passive: true },
  );
  addEventListener('resize', actualizar);
  actualizar();
});

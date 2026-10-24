// Ver las fotos en grande: tocar una foto la abre en pantalla completa, con zoom de pellizco,
// y se desliza por todas las fotos de la misma galería ([data-galeria]).
// Solo se carga el lanzador; el visor (PhotoSwipe) se descarga recién al primer toque.
import PhotoSwipeLightbox from 'photoswipe/lightbox';

const lightbox = new PhotoSwipeLightbox({
  gallery: '[data-galeria]',
  children: 'a.ampliar',
  pswpModule: () => import('photoswipe'),
  bgOpacity: 0.97,
  // En castellano
  closeTitle: 'Cerrar',
  zoomTitle: 'Acercar',
  arrowPrevTitle: 'Anterior',
  arrowNextTitle: 'Siguiente',
  errorMsg: 'No se pudo cargar la foto',
  indexIndicatorSep: ' de ',
});

// El epígrafe de cada foto, abajo
lightbox.on('uiRegister', () => {
  lightbox.pswp?.ui?.registerElement({
    name: 'epigrafe',
    order: 9,
    isButton: false,
    appendTo: 'root',
    onInit: (el, pswp) => {
      pswp.on('change', () => {
        el.textContent = pswp.currSlide?.data.element?.dataset.epigrafe ?? '';
      });
    },
  });
});

lightbox.init();

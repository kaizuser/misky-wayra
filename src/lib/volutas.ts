/**
 * Volutas: los adornos que florecen sobre la línea del recorrido.
 * Cada trazo es una clotoide: una curva cuya curvatura crece a lo largo del trazo,
 * así empieza casi recta y termina enroscada, como una voluta caligráfica.
 * Se calculan al compilar (cero JavaScript en el navegador) y devuelven el `d` de un <path>.
 *
 * Cada casa tiene su carácter:
 * - mayu (Sumac, agua): la cresta de una ola que baja, sube y rompe enroscándose; con un rulo de espuma.
 * - wayra (Misky, viento): dos ráfagas largas, casi rectas, que se enrulan recién al final.
 *
 * Las dos caben en x 0..125, y -35..25 (el viewBox de Recorrido): así quedan en el hueco entre paradas.
 */

interface Trazo {
  x: number;
  y: number;
  /** dirección inicial, en grados (0 = hacia la derecha, positivo = hacia abajo) */
  ang: number;
  /** largo del trazo, en unidades del viewBox */
  len: number;
  /** curvatura al empezar y al terminar (negativa = gira hacia arriba) */
  k0?: number;
  k1: number;
  /** 1 = la curvatura crece parejo; 3 = se guarda para el final */
  exp?: number;
}

function trazo({ x, y, ang, len, k0 = 0, k1, exp = 1 }: Trazo) {
  const pasos = 90;
  const ds = len / pasos;
  let th = (ang * Math.PI) / 180;
  const pts: [number, number][] = [[x, y]];
  for (let i = 0; i < pasos; i++) {
    th += (k0 + (k1 - k0) * ((i + 0.5) / pasos) ** exp) * ds;
    x += Math.cos(th) * ds;
    y += Math.sin(th) * ds;
    pts.push([x, y]);
  }
  return pts;
}

const aPath = (pts: [number, number][]) =>
  'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L');

/** Los trazos del lado derecho del eje; el izquierdo es su espejo (scaleX(-1) en CSS). */
export function voluta(tema: 'mayu' | 'wayra'): string[] {
  if (tema === 'mayu') {
    const ola = trazo({ x: 4, y: 0, ang: 18, len: 210, k0: 0.012, k1: -0.13 });
    const [ex, ey] = ola[Math.round(ola.length * 0.42)];
    const espuma = trazo({ x: ex, y: ey, ang: 30, len: 46, k0: 0.02, k1: 0.2 });
    return [aPath(ola), aPath(espuma)];
  }

  const larga = trazo({ x: 4, y: -5, ang: -5, len: 150, k0: 0.002, k1: -0.28, exp: 6 });
  const corta = trazo({ x: 4, y: 5, ang: 8, len: 90, k0: 0.003, k1: -0.26, exp: 6 });
  return [aPath(larga), aPath(corta)];
}

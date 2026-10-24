/**
 * Formas de las casas, calculadas al compilar.
 */

/**
 * El festón del techo de Misky: n semicírculos alrededor de un círculo de radio r,
 * en un viewBox 0 0 200 200. Va detrás de las fotos redondas de Misky.
 */
export function feston(n: number, r: number) {
  const semi = (r * Math.sin(Math.PI / n)).toFixed(2);
  const puntos = Array.from({ length: n + 1 }, (_, i) => {
    const a = (2 * Math.PI * i) / n - Math.PI / 2;
    return `${(100 + r * Math.cos(a)).toFixed(2)},${(100 + r * Math.sin(a)).toFixed(2)}`;
  });
  return `M${puntos[0]} ${puntos.slice(1).map((p) => `A${semi},${semi} 0 0 1 ${p}`).join(' ')} Z`;
}

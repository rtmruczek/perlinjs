/* Function to linearly interpolate between a0 and a1
 * Weight w should be in the range [0.0, 1.0]
 */
export const lerp = (a: number, b: number, weight: number) => {
  return (1.0 - weight) * a + weight * b;
};

export const dotProduct = (a: Vector, b: Vector) => {
  return a.x * b.x + a.y * b.y;
};

//Optimized version (less multiplications)
export function fade(t: number) {
  return 6 * Math.pow(t, 5) - 15 * Math.pow(t, 4) + 10 * Math.pow(t, 3);
}

export function normalize(v: Vector) {
  const length = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
  return {
    x: v.x / length,
    y: v.y / length,
  };
}

export function normalizeNum(n: number) {
  return n + 1 / 2;
}
export type Vector = {
  x: number;
  y: number;
};

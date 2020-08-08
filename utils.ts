/* Function to linearly interpolate between a0 and a1
 * Weight w should be in the range [0.0, 1.0]
 */
const lerp = (a: number, b: number, weight: number) => {
  return (1.0 - weight) * a + weight * b;
};

const dotGridGradient = (
  grad: number[][][],
  ix: number,
  iy: number,
  x: number,
  y: number
) => {
  const dx = x - ix;
  const dy = y - iy;

  return dx * grad[iy][ix][0] + dy * grad[iy][ix][1];
};

const dotProduct = (a: Vector, b: Vector) => {
  return a.x * b.x + a.y * b.y;
};

const perlin = (x: number, y: number) => {
  const x1 = x + 1;
  const y1 = y + 1;

  const sx = x1 - x;
  const sy = y1 - y;

  const topRight: Vector = {
    x: sx - 1.0,
    y: sy - 1.0,
  };
  const topLeft: Vector = {
    x: sx,
    y: sy - 1.0,
  };
  const bottomRight: Vector = {
    x: sx - 1.0,
    y: sy,
  };
  const bottomLeft: Vector = {
    x: sx,
    y: sy,
  };
};

type Vector = {
  x: number;
  y: number;
};

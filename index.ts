import {
  Vector,
  lerp,
  dotProduct,
  fade,
  normalize,
  normalizeNum,
} from './utils';

const boxSize = 50;
const noiseLength = 500;

if (noiseLength % boxSize !== 0) {
  throw new Error('noiseLength must be divisible by boxSize');
}
const boxes: Vector[][] = [];
const noise: number[][] = [...new Array(noiseLength)].map(() =>
  [...new Array(noiseLength)].map(() => 0)
);

const boxesPerRow = noiseLength / boxSize;

for (let i = 0; i <= boxesPerRow; i++) {
  const vectorVals = [...new Array(boxesPerRow + 1)].map(() => ({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
  }));
  boxes.push(vectorVals);
}
console.log(boxes);

let ctx: CanvasRenderingContext2D;

window.onload = function () {
  ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
};

setTimeout(() => {
  for (let y = 0; y < noise[0].length; y++) {
    // gimme the noise
    for (let x = 0; x < noise.length; x++) {
      // determine which box i'm in
      const boxX = Math.floor(x / boxSize);
      const boxY = Math.floor(y / boxSize);

      const xMin = boxX * boxSize;
      const yMin = boxY * boxSize;

      const xMax = xMin + boxSize - 1;
      const yMax = yMin + boxSize - 1;

      const sx = x - xMin;
      const sy = y - yMin;

      const gradientVectorTopLeft = boxes[boxX][boxY];
      const gradientVectorTopRight = boxes[boxX + 1][boxY];
      const gradientVectorBottomLeft = boxes[boxX][boxY + 1];
      const gradientVectorBottomRight = boxes[boxX + 1][boxY + 1];

      const vectorTopLeft = normalize({ x: x - xMin, y: y - yMin });
      const vectorTopRight = normalize({ x: x - xMax, y: y - yMin });
      const vectorBottomLeft = normalize({ x: x - xMin, y: y - yMax });
      const vectorBottomRight = normalize({ x: x - xMax, y: y - yMax });

      const dotTL = dotProduct(gradientVectorTopLeft, vectorTopLeft);
      const dotTR = dotProduct(gradientVectorTopRight, vectorTopRight);
      const dotBL = dotProduct(gradientVectorBottomLeft, vectorBottomLeft);
      const dotBR = dotProduct(gradientVectorBottomRight, vectorBottomRight);

      let result = lerp(
        lerp(dotBL, dotTL, sx / boxSize),
        lerp(dotBR, dotTR, sx / boxSize),
        sy / boxSize
      );
      noise[x][y] = result;

      const scaledAlpha = normalizeNum(result);
      const rgbstr = `rgba(0,0,0,${scaledAlpha})`;

      ctx.fillStyle = rgbstr;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  console.log('done');
  console.log(noise);
}, 500);

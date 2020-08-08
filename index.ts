const gridLength = 8;
const grid: Vector[][] = [];

for (let i = 0; i < gridLength; i++) {
  const vectorVals = [...new Array(gridLength)].map(() => ({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
  }));
  grid.push(vectorVals);
}
console.log(grid);

// for (let i = 0; i < grad.length; i++) {
//   for (let j = 0; j < grad[0].length; j++) {
//     perlinValues[i][j] = perlin(i, j);
//   }
// }

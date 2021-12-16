const fs = require("fs");
const path = require("path");

const parseFold = (row) => {
  const [direction, value] = row.substring(11).split('=');
  return {direction, value: parseInt(value, 10)};
}

const parseDots = (row) => {
  const [x, y] = row.split(',');
  return {x: parseInt(x, 10), y: parseInt(y, 10)};
}

const parseRows = (data) => {
  return data.reduce((acc, row) => {
    if (row) {
      if (row.includes('fold along')) {
        acc.folds.push(parseFold(row))
      } else {
        acc.dots.push(parseDots(row));
      }
    }
    return acc;
  }, {dots: [], folds: []})
}

const foldDots = (dots, fold) => {
  return dots.map(d => {
    const {direction, value} = fold;
    const {x, y} = d;
    if (direction === 'x') {
      if (x < value) {
        return {x, y}
      } else {
        return {x: x - ((x - value) * 2), y}
      }
    } else {
      if (y < value) {
        return {x, y}
      } else {
        return {x, y: y - ((y - value) * 2)}
      }
    }
  })
}


const puzzle1 = (data) => {
  const {dots, folds} = data;
  const foldedDots = foldDots(dots, folds[0]);
  const literalDots = foldedDots.map(d => `${d.x}-${d.y}`);
  return literalDots.filter((dot, idx) => literalDots.indexOf(dot) === idx).length;
};

const puzzle2 = (data) => {
  const {dots, folds} = data;
  const foldedDots = folds.reduce((acc, fold) => {
    return foldDots(acc, fold);
  }, dots);
  const [width, height] = foldedDots.reduce((acc, dot) => {
    return [Math.max(acc[0], dot.x), Math.max(acc[1], dot.y)]
  }, [0, 0]);
  const literalDots = foldedDots.map(d => `${d.x}-${d.y}`);
  for (let y = 0; y <= height; y++){
    let row = '';
    for (let x = 0; x <= width; x++) {
      row +=  literalDots.includes(`${x}-${y}`) ? 'X' : ' ';
    }
    console.log(row);
  }
};

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = parseRows(data.toString().split("\n"));
    console.log(puzzle1(dataArray));
    puzzle2(dataArray);
  }
});

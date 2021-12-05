const fs = require("fs");
const path = require("path");

const parseRow = (row) => {
  const regex = /([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/;
  const [_, x1, y1, x2, y2] = row.match(regex);
  return {
    x1: parseInt(x1, 10),
    y1: parseInt(y1, 10),
    x2: parseInt(x2, 10),
    y2: parseInt(y2, 10),
  };
};

const drawLine = (fixed, start, end, acc, reverse) => {
  for (let i = start; i <= end; i++) {
    const key = reverse ? `${i}-${fixed}` : `${fixed}-${i}`;
    acc.grid[key] = acc.grid[key] ? acc.grid[key] + 1 : 1;
    if (acc.grid[key] === 2) {
      acc.counter = acc.counter + 1;
    }
  }
};

const puzzle1 = (data) => {
  const parsedRows = data
    .map((row) => parseRow(row))
    .filter((r) => r.x1 === r.x2 || r.y1 === r.y2);
  const points = parsedRows.reduce(
    (acc, row) => {
      const { x1, y1, x2, y2 } = row;
      if (x1 === x2) {
        const start = Math.min(y1, y2);
        const end = Math.max(y1, y2);
        drawLine(x1, start, end, acc, false);
      } else {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);
        drawLine(y1, start, end, acc, true);
      }
      return acc;
    },
    { grid: {}, counter: 0 }
  );
  return points.counter;
};

const puzzle2 = (data) => {
  const parsedRows = data.map((row) => parseRow(row));
  const points = parsedRows.reduce(
    (acc, row) => {
      const { x1, y1, x2, y2 } = row;
      if (x1 === x2) {
        const start = Math.min(y1, y2);
        const end = Math.max(y1, y2);
        drawLine(x1, start, end, acc, false);
      } else if (y1 === y2) {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);
        drawLine(y1, start, end, acc, true);
      } else {
        const xIncrement = x2 > x1 ? 1 : -1;
        const yIncrement = y2 > y1 ? 1 : -1;
        const length = y2 > y1 ? y2 - y1 : y1 - y2;
        for (let i = 0; i < length + 1; i++) {
          const key = `${x1 + i * xIncrement}-${y1 + i * yIncrement}`;
          acc.grid[key] = acc.grid[key] ? acc.grid[key] + 1 : 1;
          if (acc.grid[key] === 2) {
            acc.counter = acc.counter + 1;
          }
        }
      }
      return acc;
    },
    { grid: {}, counter: 0 }
  );
  return points.counter;
};

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data.toString().split("\n");
    console.log(puzzle1(dataArray));
    console.log(puzzle2(dataArray));
  }
});

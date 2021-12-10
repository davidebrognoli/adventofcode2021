const fs = require("fs");
const path = require("path");

const findNearest = (x, y, data, rowLength) => {
  return findNearestObject(x, y, data, rowLength).map((pos) => pos.value);
};

const findNearestObject = (x, y, data, rowLength) => {
  let top = (bottom = left = right = null);
  if (y > 0) {
    top = { value: data[y - 1][x], x, y: y - 1 };
  }
  if (y < data.length - 1) {
    bottom = { value: data[y + 1][x], x, y: y + 1 };
  }
  if (x > 0) {
    left = { value: data[y][x - 1], x: x - 1, y };
  }
  if (x < rowLength - 1) {
    right = { value: data[y][x + 1], x: x + 1, y };
  }
  return [top, bottom, left, right].filter((item) => item !== null);
};

const calculateBasin = (x, y, data, length, checked) => {
  const key = `${x}-${y}`;
  checked.push(key);
  const nearest = findNearestObject(x, y, data, length).filter(
    (n) => n.value !== 9 && !checked.includes(`${n.x}-${n.y}`)
  );
  if (nearest.length === 0) {
    return [key];
  } else {
    return nearest.reduce(
      (acc, n) => {
        const keys = calculateBasin(n.x, n.y, data, length, checked);
        return [...acc, ...keys];
      },
      [key]
    );
  }
};

const puzzle1 = (data) => {
  const lowest = data.reduce((sum, row, y) => {
    return (
      sum +
      row.reduce((acc, number, x) => {
        const numbers = findNearest(x, y, data, row.length);
        if (numbers.every((n) => n > number)) {
          return acc + (number + 1);
        }
        return acc;
      }, 0)
    );
  }, 0);
  return lowest;
};

const puzzle2 = (data) => {
  const checked = [];
  const basins = [];
  data.forEach((row, y) => {
    row.forEach((el, x) => {
      const key = `${x}-${y}`;
      if (el !== 9 && !checked.includes(key)) {
        const basinArray = calculateBasin(x, y, data, row.length, checked);
        const basin = basinArray.filter(
          (el, i) => basinArray.indexOf(el) === i
        ).length;
        basins.push(basin);
      }
    });
  });
  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, item) => {
      return acc * item;
    }, 1);
};

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data
      .toString()
      .split("\n")
      .map((row) => row.split("").map((n) => parseInt(n)));
    console.log(puzzle1(dataArray));
    console.log(puzzle2(dataArray));
  }
});

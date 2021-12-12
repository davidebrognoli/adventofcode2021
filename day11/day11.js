const fs = require("fs");
const path = require("path");

const incrementAllOctopus = (data) => {
  flashes = [];
  data.forEach((row, y) => {
    row.forEach((n, x) => {
      if (n === 9) {
        data[y][x] = 0;
        flashes.push({ x, y });
      } else {
        data[y][x] = n + 1;
      }
    });
  });
  return { data, flashes };
};

const getAdiacents = (x, y, rowLength, columnLength) => {
  let top =
    (topleft =
    topright =
    bottom =
    bottomleft =
    bottomright =
    left =
    right =
      null);
  if (y > 0) {
    top = { x, y: y - 1 };
    if (x > 0) {
      topleft = { x: x - 1, y: y - 1 };
    }
    if (x < rowLength - 1) {
      topright = { x: x + 1, y: y - 1 };
    }
  }
  if (y < columnLength - 1) {
    bottom = { x, y: y + 1 };
    if (x > 0) {
      bottomleft = { x: x - 1, y: y + 1 };
    }
    if (x < rowLength - 1) {
      bottomright = { x: x + 1, y: y + 1 };
    }
  }
  if (x > 0) {
    left = { x: x - 1, y };
  }
  if (x < rowLength - 1) {
    right = { x: x + 1, y };
  }
  return [
    top,
    topright,
    topleft,
    bottom,
    bottomright,
    bottomleft,
    left,
    right,
  ].filter((item) => item !== null);
};

const incrementAdiacents = (data, oldflashes, rowLength, columnLength) => {
  const flashes = [];
  oldflashes.forEach((flash) => {
    const { x, y } = flash;
    const adiacents = getAdiacents(x, y, rowLength, columnLength);
    adiacents.forEach((a) => {
      const value = data[a.y][a.x];
      if (value === 9) {
        flashes.push({ x: a.x, y: a.y });
        data[a.y][a.x] = 0;
      } else if (value !== 0) {
        data[a.y][a.x] = value + 1;
      }
    });
  });
  return { data, flashes };
};

const puzzle1 = (data, steps) => {
  const input = data.map((row) => [...row]);
  const rowLength = input[0].length;
  const columnLength = input.length;
  return Array(steps)
    .fill(0)
    .reduce((total, _, index) => {
      let { data, flashes } = incrementAllOctopus(input);
      let flashesCounter = flashes.length;
      let flashesTotal = flashes.length;
      let roundFlashes = flashes;
      while (flashesCounter > 0) {
        let increment = incrementAdiacents(
          data,
          roundFlashes,
          rowLength,
          columnLength
        );
        roundFlashes = increment.flashes;
        data = increment.data;
        flashesCounter = roundFlashes.length;
        flashesTotal = flashesTotal + flashesCounter;
      }
      return total + flashesTotal;
    }, 0);
};

const puzzle2 = (data) => {
  const input = data.map((row) => [...row]);
  const rowLength = input[0].length;
  const columnLength = input.length;
  let step = 0;
  let allFlashes = false;
  while (!allFlashes) {
    step++;
    let { data, flashes } = incrementAllOctopus(input);
    let flashesCounter = flashes.length;
    flashesTotal = flashes.length;
    let roundFlashes = flashes;
    while (flashesCounter > 0) {
      let increment = incrementAdiacents(
        data,
        roundFlashes,
        rowLength,
        columnLength
      );
      roundFlashes = increment.flashes;
      data = increment.data;
      flashesCounter = roundFlashes.length;
    }
    allFlashes = data.every((row) => row.every((i) => i === 0));
  }
  return step;
};

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data
      .toString()
      .split("\n")
      .map((row) => row.split("").map((n) => parseInt(n, 10)));
    console.log(puzzle1(dataArray, 100));
    console.log(puzzle2(dataArray));
  }
});

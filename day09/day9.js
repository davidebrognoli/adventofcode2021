const fs = require("fs");
const path = require("path");

const puzzle1 = (data) => {
  const lowest = data.reduce((sum, row, y) => {
    return sum + row.reduce((acc, number, x) => {
      let top = bottom = left = right = null;
      if (y > 0) {
        top = data[y - 1][x];
      }
      if (y < (data.length - 1)){
        bottom = data[y + 1][x];
      }
      if (x > 0){
        left = data[y][x - 1];
      }
      if (x < (row.length - 1)) {
        right = data[y][x + 1];
      }
      const numbers = [top, bottom, left, right].filter(item => item !== null);
      if (numbers.every(n => n > number)) {
        return acc + (number + 1);
      }
      return acc;
    }, 0);
  }, 0);
  return lowest;
};

const puzzle2 = (data) => {
  return 'TBD';
};

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data.toString().split("\n").map(row => row.split('').map(n => parseInt(n)));
    console.log(puzzle1(dataArray));
    console.log(puzzle2(dataArray));
  }
});

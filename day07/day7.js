const fs = require("fs");
const path = require("path");

const puzzle1 = (data) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  let distance;
  for (let i = min; i <= max; i++){
    const indexDistance = data.reduce((acc, item) => {
      const diff = Math.abs(i - item);
      return acc + diff;
    }, 0);
    distance = !distance || distance > indexDistance ? indexDistance : distance;
  }
  return distance;
}

const puzzle2 = (data) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  let distance;
  for (let i = min; i <= max; i++){
    const indexDistance = data.reduce((acc, item) => {
      const diff = Math.abs(i - item);
      const fuelCost = diff * (diff + 1) / 2;
      return acc + fuelCost;
    }, 0);
    distance = !distance || distance > indexDistance ? indexDistance : distance;
  }
  return distance;
}

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data.toString().split(",").map(n => parseInt(n, 10));
    console.log(puzzle1(dataArray));
    console.log(puzzle2(dataArray));
  }
});

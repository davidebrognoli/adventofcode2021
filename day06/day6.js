const fs = require("fs");
const path = require("path");

const getInitialState = (data) => {
  return data.reduce((acc, d) => {
    acc[d] = acc[d] + 1;
    return acc;
  }, Array(9).fill(0))
}

const resolve = (data, days) => {
  const lanternfishes = Array(days).fill(0).reduce((acc, _) => {
    const [pos0, pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8] = acc;
    return [pos1, pos2, pos3, pos4, pos5, pos6, pos7 + pos0, pos8, pos0];
  }, getInitialState(data));
  return lanternfishes.reduce((acc,lanternfish) => acc + lanternfish);
}

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data.toString().split(",").map(n => parseInt(n, 10));
    console.log(resolve(dataArray, 80));
    console.log(resolve(dataArray, 256));
  }
});

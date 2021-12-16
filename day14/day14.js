const fs = require("fs");
const path = require("path");

const puzzle1 = (data) => {
  return "TBD";
};

const puzzle2 = (data) => {
  return "TBD";
};

const filePath = path.join(__dirname, "test.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data.toString().split("\n");
    console.log(puzzle1(dataArray));
    console.log(puzzle2(dataArray));
  }
});

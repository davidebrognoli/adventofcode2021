const fs = require("fs");
const path = require("path");

const openTags = ['(', '[', '{', '<'];
const matches = {
  ')': {open: '(', value: 3},
  ']': {open: '[', value: 57},
  '}': {open: '{', value: 1197},
  '>': {open: '<', value: 25137},
} 


const puzzle1 = (data) => {
  return data.reduce((sum, row) => {
    const acc = [];
    let errorValue = 0;
    for (let i = 0; i < row.length; i++) {
      const nextEl = row[i];
      if (openTags.includes(nextEl)) {
        acc.push(nextEl);
      } else {
        nextAcc = acc.pop();
        const match = matches[nextEl];
        if (nextAcc !== match.open){
          errorValue = match.value;
          break;
        }
      }
    }
    return sum + errorValue;
  },  0)
};

const puzzle2 = (data) => {
  const scoreList = data.reduce((sum, row) => {
    const acc = [];
    let errorValue = 0;
    for (let i = 0; i < row.length; i++) {
      const nextEl = row[i];
      if (openTags.includes(nextEl)) {
        acc.push(nextEl);
      } else {
        nextAcc = acc.pop();
        const match = matches[nextEl];
        if (nextAcc !== match.open){
          errorValue = match.value;
          break;
        }
      }
    }
    if (errorValue === 0) {
      const score = acc.reverse().reduce((scoreSum, item) => {
        return scoreSum * 5 + openTags.indexOf(item) + 1;
      }, 0)
      return [...sum, score];
    }
    return sum;
  },  [])
  return scoreList.sort((a, b) => a - b)[(Math.floor(scoreList.length / 2))]
};

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data.toString().split("\n").map((row) => row.split(''));
    console.log(puzzle1(dataArray));
    console.log(puzzle2(dataArray));
  }
});

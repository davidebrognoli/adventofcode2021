const fs = require("fs");
const path = require("path");

const parseBoard = (board) => {
  const rows = board
    .map((b) => b.split(/\s+/).filter((i) => i))
    .map((r) => r.map((n) => parseInt(n, 10)));
  const columns = Array(5)
    .fill(0)
    .map((_, index) => rows.map((r) => r[index]));
  return [...rows, ...columns];
};

const puzzle1 = (numbers, boards) => {
  parsedBoards = boards.map((b) => parseBoard(b));
  const puzzleNumbers = [...numbers];
  let found = null;
  let analyzedNumbers = [];
  const round = numbers.length;
  while (!found && analyzedNumbers.length < round) {
    analyzedNumbers = [...analyzedNumbers, puzzleNumbers.shift()];
    if (analyzedNumbers.length > 4) {
      parsedBoards.forEach((b) => {
        b.forEach((row) => {
          if (row.every((number) => analyzedNumbers.includes(number))) {
            found = b;
          }
        });
      });
    }
  }
  const sum = found.reduce((acc, row) => {
    return (
      acc +
      row.reduce((rowAcc, n) => {
        if (analyzedNumbers.includes(n)) {
          return rowAcc;
        }
        return rowAcc + n;
      }, 0)
    );
  }, 0);
  const lastNumber = analyzedNumbers[analyzedNumbers.length - 1];
  return (sum / 2) * lastNumber;
};

const puzzle2 = (numbers, boards) => {
  parsedBoards = boards.map((b) => parseBoard(b));
  const puzzleNumbers = [...numbers];
  let found = null;
  let analyzedNumbers = [];
  const round = numbers.length;
  const winningBoards = [];
  while (
    winningBoards.length < parsedBoards.length &&
    analyzedNumbers.length < round
  ) {
    analyzedNumbers = [...analyzedNumbers, puzzleNumbers.shift()];
    if (analyzedNumbers.length > 4) {
      parsedBoards.forEach((b, boardIndex) => {
        b.forEach((row) => {
          if (row.every((number) => analyzedNumbers.includes(number))) {
            if (!winningBoards.includes(boardIndex)) {
              winningBoards.push(boardIndex);
              found = b;
            }
          }
        });
      });
    }
  }
  const sum = found.reduce((acc, row) => {
    return (
      acc +
      row.reduce((rowAcc, n) => {
        if (analyzedNumbers.includes(n)) {
          return rowAcc;
        }
        return rowAcc + n;
      }, 0)
    );
  }, 0);
  const lastNumber = analyzedNumbers[analyzedNumbers.length - 1];
  return (sum / 2) * lastNumber;
};

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data.toString().split("\n");
    const firstRow = dataArray.shift();
    const numbers = firstRow.split(",").map((n) => parseInt(n, 10));
    const boardsCounter = dataArray.length / 6;
    const boards = Array(boardsCounter)
      .fill(0)
      .map((_, index) => {
        const start = index * 6 + 1;
        return dataArray.slice(start, start + 5);
      });
    console.log(puzzle1(numbers, boards));
    console.log(puzzle2(numbers, boards));
  }
});

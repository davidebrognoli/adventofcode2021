const fs = require("fs");
const path = require("path");

const splitItem = (items) => {
  return items
    .split(" ")
    .map((s) => s.trim())
    .filter((el) => el);
};

const parseRow = (row) => {
  const [signals, digits] = row.split("|");
  return { signals: splitItem(signals), digits: splitItem(digits) };
};

const defineSignals = (signals) => {
  const signalNumbers = signals.reduce((acc, s) => {
    const length = s.length;
    const sortedValue = s
      .split("")
      .sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      })
      .join("");
    acc[length] = [...acc[length], sortedValue];
    return acc;
  }, Array(10).fill([]));
  const signalCodes = [
    "",
    ...signalNumbers[2],
    "",
    "",
    ...signalNumbers[4],
    "",
    "",
    ...signalNumbers[3],
    ...signalNumbers[7],
    "",
  ];
  signalCodes[9] = signalNumbers[6].find((s) =>
    signalCodes[4].split("").every((c) => s.split("").includes(c))
  );
  signalCodes[0] = signalNumbers[6].find(
    (s) =>
      s !== signalCodes[9] &&
      signalCodes[1].split("").every((c) => s.split("").includes(c))
  );
  signalCodes[6] = signalNumbers[6].find(
    (s) => s !== signalCodes[9] && s !== signalCodes[0]
  );
  signalCodes[3] = signalNumbers[5].find((s) =>
    signalCodes[1].split("").every((c) => s.split("").includes(c))
  );
  signalCodes[5] = signalNumbers[5].find(
    (s) =>
      s !== signalCodes[3] &&
      s.split("").every((c) => signalCodes[6].split("").includes(c))
  );
  signalCodes[2] = signalNumbers[5].find(
    (s) => s !== signalCodes[3] && s !== signalCodes[5]
  );
  return signalCodes;
};

const retrieveValue = (val, signals) => {
  const mapping = [0, 0, 1, 7, 4, 0, 0, 8, 3];
  const length = val.length;
  if (length !== 5 && length !== 6) {
    return mapping[length];
  }
  const sortedValue = val
    .split("")
    .sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    .join("");
  if (length === 5) {
    switch (sortedValue) {
      case signals[5]:
        return 5;
      case signals[2]:
        return 2;
      case signals[3]:
        return 3;
      default:
        return 0;
    }
  }

  switch (sortedValue) {
    case signals[9]:
      return 9;
    case signals[6]:
      return 6;
    default:
      return 0;
  }
};

const puzzle1 = (data) => {
  const rows = data.map((r) => parseRow(r));
  return rows.reduce((sum, row) => {
    const counter = row.digits.filter((digit) => {
      return [2, 3, 4, 7].includes(digit.length);
    }).length;
    return sum + counter;
  }, 0);
};

const puzzle2 = (data) => {
  const rows = data.map((r) => parseRow(r));
  return rows.reduce((sum, row) => {
    const signals = defineSignals(row.signals);
    const counter = row.digits.reduce((acc, digit) => {
      const value = retrieveValue(digit, signals);
      return acc + value;
    }, "");
    return sum + parseInt(counter, 10);
  }, 0);
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

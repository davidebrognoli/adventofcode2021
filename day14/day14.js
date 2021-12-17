const fs = require("fs");
const path = require("path");

const parseData = (data) => {
  const polymer = data.shift();
  data.shift();
  const rules = data.reduce((acc, d) => {
    const [letters, insert] = d.split(' -> ');
    acc[letters] = `${letters.slice(0,1)}${insert}`
    return acc;
  }, {})
  return {polymer, rules}
}

const parseData2 = (data) => {
  const polymer = data.shift();
  data.shift();
  const rules = data.reduce((acc, d) => {
    const [letters, insert] = d.split(' -> ');
    acc[letters] = insert;
    return acc;
  }, {})
  return {polymer, rules}
}

const parsePolymer = (polymer, rules) => {
  const newPolymer = Array(polymer.length - 1).fill(0).reduce((acc, _, idx) => {
    const str = polymer.slice(idx, idx + 2);
    return `${acc}${rules[str]}`;
  }, '');
  const lastLetter = polymer.slice(polymer.length - 1);
  return `${newPolymer}${lastLetter}`;
}

const puzzle1 = (data, rounds) => {
  const {polymer, rules} = data;
  const bigPolymer =  Array(rounds).fill(0).reduce((acc, _, idx) => {
    return parsePolymer(acc, rules);
  }, polymer);
  const counters = bigPolymer.split('').reduce((acc, l) => {
    acc[l] = acc[l] ? acc[l] + 1 : 1;
    return acc;
  }, {})
  const orderedCounters = Object.values(counters).reduce((acc, c) => {
    const max = acc[0] ? Math.max(acc[0], c): c;
    const min = acc[1] ? Math.min(acc[1], c): c;
    return [max, min];
  }, [null, null]);
  const [max,min] = orderedCounters;
  return max - min;
};

const puzzle2 = (data, rounds) => {
  const {polymer, rules} = data;
  const {pairs, chars} = polymer.split('').reduce((acc, char, idx) => {
    acc.chars[char] = acc.chars[char] ? acc.chars[char] + 1 : 1;
    if (idx < polymer.length - 1) {
      const key = char + polymer[idx + 1];
      acc.pairs[key] = acc.pairs[key] ? acc.pairs[key] + 1 : 1;
    }
    return acc;
  }, {pairs: {}, chars: {}});
  Array(rounds).fill(0).forEach((_, idx) => {
    Object.entries(pairs).forEach(([letters, counter]) => {
      if (counter) {
        const insert = rules[letters];
        const [a, b] = letters;
        pairs[`${a}${b}`] = pairs[`${a}${b}`] - counter;
        pairs[`${a}${insert}`] = pairs[`${a}${insert}`] ? pairs[`${a}${insert}`] + counter : counter;
        pairs[`${insert}${b}`] = pairs[`${insert}${b}`] ? pairs[`${insert}${b}`] + counter : counter;
        chars[insert] = chars[insert] ? chars[insert] + counter : counter;
      }
    })
  });
  const orderedCounters = Object.values(chars).reduce((acc, c) => {
    const max = acc[0] ? Math.max(acc[0], c): c;
    const min = acc[1] ? Math.min(acc[1], c): c;
    return [max, min];
  }, [null, null]);
  const [max,min] = orderedCounters;
  return max - min;
};

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("An Error as occured: ", err);
  } else {
    const dataArray = data.toString().split("\n");
    const parsedData = parseData(dataArray);
    const dataArray2 = data.toString().split("\n");
    const parsedData2 = parseData2(dataArray2);
    console.log(puzzle1(parsedData, 10));
    console.log(puzzle2(parsedData2, 40));
  }
});

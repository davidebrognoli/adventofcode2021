const fs = require('fs')
const path = require('path')

const puzzle1 = (data) => {
  const checks = data.length - 1;
  return data.filter((n, index) => {
    return index < checks && n < data[index + 1];
  }).length;
}

const puzzle2 = (data) => {
  const checks = data.length - 2;
  const groupedSums = data.reduce((acc, d, index) => {
    if (index < checks) {
      return [...acc, d + data[index + 1] + data[index + 2]]
    }
    return acc;
  }, [])
  return puzzle1(groupedSums);
}

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.log('An Error as occured: ', err)
  } else {
    const dataArray = data.toString().split("\n").map(i => parseInt(i, 10))
    console.log(puzzle1(dataArray));
    console.log(puzzle2(dataArray));
  }
})
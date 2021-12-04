const fs = require('fs')
const path = require('path')

const convertToDecimal = (binary) => {
  return parseInt(binary, 2);
}

const getColumnMinMax = (data, x) => {
  return Array(data.length).fill(0).reduce((pos, d, y) => {
    if (data[y][x] === '1') {
      return [pos[0], pos[1] + 1]
    }
    return [pos[0] + 1, pos[1]];
  }, [0, 0])
}

const filterValue = (data, max) => {
  const okValue = max ? 0 : 1;
  const noValue = max ? 1 : 0;
  return Array(data[0].length).fill(0).reduce((acc, _, x) => {
    if (acc.length > 1) {
      const minMax = getColumnMinMax(acc, x);
      const compareValue  = minMax[0] > minMax[1] ? okValue : noValue;
      return acc.filter(d => parseInt(d[x], 10) === compareValue);
    }
    return acc;
  }, data);
}

const puzzle1 = (data) => {
  const resultArray =  Array(data[0].length).fill(0).map((_, x) => {
    return getColumnMinMax(data, x);
  });
  const gamma = convertToDecimal(resultArray.map(p => p[0] > p[1] ? 0 : 1).join(''));
  const epsilon = convertToDecimal(resultArray.map(p => p[0] < p[1] ? 0 : 1).join(''));
  return gamma * epsilon;
}

const puzzle2 = (data) => {
  const oxygen = convertToDecimal(filterValue(data, true)[0]); 
  const co2 = convertToDecimal(filterValue(data, false)[0]); 
  return oxygen * co2;
}

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.log('An Error as occured: ', err)
  } else {
    const dataArray = data.toString().split("\n")
    console.log(puzzle1(dataArray));
    console.log(puzzle2(dataArray));
  }
})
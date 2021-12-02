const fs = require('fs')
const path = require('path')

const parseRow = (row) => {
  const regex = /(forward|down|up)\s([1-9])/;
  const [_, command, variation] = row.match(regex);
  const change = parseInt(variation, 10);
  return  {command, change};
}

const parseSimpleCommand = (row) => {
  const {command, change} = parseRow(row); 
  switch(command) {
    case 'forward':
      return [0, change];
    case 'down':
      return [change, 0];
    case 'up':
      return [change * -1, 0];
    default:
      return [0, 0];
  }
}

const parseComplexCommand = (command, change, currentState) => {
  const [depth, horizontal, aim] = currentState;
  switch(command) {
    case 'forward':
      const increase = change * aim;
      return [depth + increase, horizontal + change, aim];
    case 'down':
      return [depth, horizontal, aim + change];
    case 'up':
      return [depth, horizontal, aim - change];
    default:
      return [...currentState];
  }
}

const puzzle1 = (data) => {
  const variation =  data.reduce((acc, d) => {
    const parsedRow = parseSimpleCommand(d);
    return [acc[0] + parsedRow[0], acc[1] + parsedRow[1]];
  }, [0, 0]);
  return variation[0] * variation[1];
}

const puzzle2 = (data) => {
  const variation =  data.reduce((acc, d) => {
    const {command, change} = parseRow(d); 
    return parseComplexCommand(command, change, acc);
  }, [0, 0, 0]);
  return variation[0] * variation[1];
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
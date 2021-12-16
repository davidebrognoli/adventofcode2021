const fs = require("fs");
const path = require("path");

const createGraph = (data) => {
  return data.reduce((acc, line) => {
    const [s, e] = line.split("-");
    acc[s] = acc[s] ? [...acc[s], e] : [e];
    acc[e] = acc[e] ? [...acc[e], s] : [s];
    return acc;
  }, {});
};

const calculatePath = (graph, point, visited) => {
  if (point === "end") return 1;
  if (visited.includes(point) && point === point.toLowerCase()) return 0;
  if (!visited.includes(point)) {
    visited.push(point);
  }
  const paths = graph[point].reduce((sum, item) => {
    const pathSum = calculatePath(graph, item, visited);
    return sum + pathSum;
  }, 0);

  visited = visited.filter((v) => v === point);
  return paths;
};

const puzzle1 = (data) => {
  const graph = createGraph(data);
  return calculatePath(graph, "start", []);
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

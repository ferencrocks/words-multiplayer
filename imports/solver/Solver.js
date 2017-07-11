const fs = require('fs');

const flatten = arr => [].concat(...arr);
const flatMap = (arr, fn) => flatten(arr.map(fn));
const range = (from, until) => Array.from(new Array(until - from + 1), (x,i) => i + from);

const isSquare = table => {
  const rows = table.length;
  return table
      .map(row => row.length)
      .filter(rowLength => rowLength !== rows)
      .length === 0;
};

function Coord(row, col) {
  this.row = row;
  this.col = col;
  this.eq = coord => coord.row === row && coord.col === col;
  this.toString = () => `[R:${this.row}, C:${this.col}]`;
}

export const neighbors = coord => [
  // up
  new Coord(coord.row - 1, coord.col),
  // up-left
  new Coord(coord.row - 1, coord.col - 1),
  // up-right
  new Coord(coord.row - 1, coord.col + 1),
  // down
  new Coord(coord.row + 1, coord.col),
  // down-left
  new Coord(coord.row + 1, coord.col - 1),
  // down-right
  new Coord(coord.row + 1, coord.col + 1),
  // left
  new Coord(coord.row, coord.col - 1),
  // right
  new Coord(coord.row, coord.col + 1)
];

const Table = (table) => {
  if (!isSquare(table)) throw new Error('Not a square');

  const N = table.length;
  const isValidCoord = coord => coord.row >= 0 && coord.row < N && coord.col >= 0 && coord.col < N;
  const pathToWord = (path) => path.map(coord => table[coord.row][coord.col]).join('');

  const step = (coord, path = []) => {
    const isNotVisited = coord => path.filter(cmpCoord => cmpCoord.eq(coord)).length === 0;
    const availableNeighbors = () =>
      neighbours(coord).map(key => {
        const _coord = directions[key](coord);
        return (isValidCoord(_coord) && isNotVisited(_coord)) ? _coord : null;
      })
        .filter(item => item);

    const ns = availableNeighbors();
    return ns.length > 0 ?
      flatMap(ns, nextCoord => step(nextCoord, [...path, coord])) :
      pathToWord([...path, coord]);
  }

  const rangeN = range(0, N - 1);
  return {
    traverse: () => flatMap(rangeN, row =>
      flatMap(rangeN, col => step( new Coord(row, col) ))
    )
  };
};

function Dict(path, encoding = 'utf8') {
  const wordSet = new Set();
  const data = fs.readFileSync(path, encoding).split("\n");

  return {
    index: cond => data.filter(cond).forEach(word => wordSet.add(word.toLowerCase())),
    has: word => wordSet.has(word.toLowerCase())
  };
}

function Solver(words, dict) {
  return {
    solve: () => {
      const solutions = new Set();
      flatMap(words, word =>
        range(2, word.length).map(subWordLen => word.substr(0, subWordLen))
      )
        .filter(subWord => dict.has(subWord))
        .forEach(wordFound => solutions.add(wordFound));

      return solutions.values();
    }
  };
}
//
// const usaDict = Dict('./dicts/hu.txt');
// usaDict.index(word => word.length > 2);
//
// const table_3x3 = [
//   ['S', 'M', 'P'],
//   ['O', 'L', 'O'],
//   ['K', 'O', 'H']
// ];
// const table_2x2 = [
//   ['A', 'B'],
//   ['D', 'E']
// ];
// const paths = Table(table_3x3).traverse();
//
// console.log( Solver(paths, usaDict).solve() );
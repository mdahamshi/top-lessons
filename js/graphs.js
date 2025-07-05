import {HashSet} from './hashset.js'
function knightMoves(from, to) {
  const size = 8;

  const isValid = ([x, y]) => {
    return (x >= 0 && x < size &&
      y >= 0 && y < size
    )
  };
  const moves = [
    [1, 2], [2, 1], [2, -1], [1, -2],
    [-1, -2], [-2, -1], [-2, 1], [-1, 2]
  ];

  const visited = new HashSet();
  const queue = [[from, [from]]];

  while(queue.length > 0) {
    const [current, path] = queue.shift();
    const key = current.toString();

    if(key === to.toString()) {
      console.log(`You made it in ${path.length - 1} moves! Here's the path:`);
      path.forEach((step) => console.log(step));
      return path;
    }
    if(visited.has(key))
      continue;
    visited.add(key);

    for (const [dx, dy] of moves) {
      const next = [current[0] + dx, current[1] + dy];
      if(isValid(next) && !visited.has(next.toString())) {
        queue.push([next, [...path, next]]);
      }
    }
  }
  return null;
}

knightMoves([3, 3], [4, 3]);

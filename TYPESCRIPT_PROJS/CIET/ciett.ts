const findSnakeOnGrid = (grid: string[]): number[][] => {
  let headPosition: [number, number] | null = null;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'h') {
        headPosition = [x, y];
        break;
      }
    }
    if (headPosition) break;
  }

  if (!headPosition) throw new Error("Cabeça da cobra não encontrada.");

  const directions: { [key: string]: [number, number] } = {
    '>': [1, 0],
    '<': [-1, 0],
    'v': [0, 1],
    '^': [0, -1],
    'h': [-1, 0]
  };

  const bodyPosition: [number, number][] = [];
  let currentPosition = headPosition;
  let tailPosition: [number, number] | null = null;

  let foundNext = false;
  const [x, y] = currentPosition;
  
  for (const [d, [dx, dy]] of Object.entries(directions)) {
    const nx = x + dx;
    const ny = y + dy;
    
    if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny].length) {
      const nextChar = grid[ny][nx];
      if (nextChar === '>' || nextChar === '<' || nextChar === 'v' || nextChar === '^') {
        const nextDirection = directions[nextChar];
        const connectsBack = (nx + nextDirection[0] === x && ny + nextDirection[1] === y);
        
        if (connectsBack) {
          currentPosition = [nx, ny];
          foundNext = true;
          break;
        }
      }
    }
  }

  if (!foundNext) {
    tailPosition = headPosition;
    return [headPosition];
  }

  while (true) {
    const [x, y] = currentPosition;
    const currentChar = grid[y][x];

    if (currentChar !== 'h') {
      bodyPosition.push([x, y]);
    }

    let foundNext = false;
    for (const [d, [dx, dy]] of Object.entries(directions)) {
      const nx = x + dx;
      const ny = y + dy;
      
      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny].length) {
        const nextChar = grid[ny][nx];
        if (nextChar === '>' || nextChar === '<' || nextChar === 'v' || nextChar === '^') {
          const nextDirection = directions[nextChar];
          const connectsBack = (nx + nextDirection[0] === x && ny + nextDirection[1] === y);
          
          if (connectsBack) {
            currentPosition = [nx, ny];
            foundNext = true;
            break;
          }
        }
      }
    }

    if (!foundNext) {
      tailPosition = [x, y];
      break;
    }
  }

  if (!tailPosition) throw new Error("Cauda da cobra não encontrada.");

  const finalBodyPosition = bodyPosition.filter(
    pos => !(pos[0] === tailPosition![0] && pos[1] === tailPosition![1])
  );

  return [headPosition, ...finalBodyPosition, tailPosition];
};

const grid = [
  "           ",
  " >>v  >>>h ",
  " ^ >>>^ v  ",
  " ^<<<<<<<  ",
  "           ",
];

console.log(findSnakeOnGrid(grid));

export { findSnakeOnGrid };

/**
 * Locates the snake's head, body and tail positions on the grid.
 *
 * @param {string[]} grid - The grid to find the snake in.
 * @returns {number[][]} Array containing all snake positions in order (head -> body -> tail).
 */
const findSnakeOnGrid = (grid: string[]): number[][] => {
  // Localizar a posição da cabeça "h"
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

  // Mapear direções de cada caractere
  const directions: { [key: string]: [number, number] } = {
    '>': [1, 0],   // direita
    '<': [-1, 0],  // esquerda
    'v': [0, 1],   // baixo
    '^': [0, -1],  // cima
    'h': [-1, 0]   // cabeça (assume-se que está olhando para a esquerda)
  };

  // Inicializar arrays para armazenar as diferentes partes da cobra
  const bodyPosition: [number, number][] = [];
  let currentPosition = headPosition;
  let tailPosition: [number, number] | null = null;

  // Seguir o caminho da cobra
  while (true) {
    const [x, y] = currentPosition;
    const currentChar = grid[y][x];

    // Se não for a cabeça, adicionar à posição do corpo
    if (currentChar !== 'h') {
      bodyPosition.push([x, y]);
    }

    // Procurar o próximo segmento conectado
    let foundNext = false;
    for (const [d, [dx, dy]] of Object.entries(directions)) {
      const nx = x + dx;
      const ny = y + dy;
      
      // Verificar se a posição está dentro dos limites
      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny].length) {
        const nextChar = grid[ny][nx];
        // Verificar se o próximo caractere é um segmento válido da cobra
        if (nextChar === '>' || nextChar === '<' || nextChar === 'v' || nextChar === '^') {
          // Verificar se este segmento está conectado ao atual
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

    // Se não encontrou próximo segmento, este é o rabo
    if (!foundNext) {
      tailPosition = [x, y];
      break;
    }
  }

  if (!tailPosition) throw new Error("Cauda da cobra não encontrada.");

  // Remover a posição da cauda do corpo
  const finalBodyPosition = bodyPosition.filter(
    pos => !(pos[0] === tailPosition![0] && pos[1] === tailPosition![1])
  );

  // Concatenar todas as posições em ordem: cabeça -> corpo -> cauda
  return [headPosition, ...finalBodyPosition, tailPosition];
};

// Exemplo de uso:
const grid = [
  "           ",
  " >>v  >>>h ",
  " ^ >>>^ v  ",
  " ^<<<<<<<  ",
  "           ",
];

console.log(findSnakeOnGrid(grid));

export { findSnakeOnGrid };

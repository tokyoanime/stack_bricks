// Check for collission
const collission = (playArea, currentBrick) => {
  const brick = currentBrick.brick;
  
  for (let y = 0; y < brick.length; ++y) {
    for (let x = 0; x < brick[y].length; ++x) {
      if (brick[y][x] !== 0 &&
        (playArea[y + currentBrick.pos.y] &&
          playArea[y + currentBrick.pos.y][x + currentBrick.pos.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

export default collission;
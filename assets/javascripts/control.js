// drop brick by one unit
// create a new random brick if collission detected vertically
export const softDrop = (brick) => {
  brick.pos.y++;
};

// move brick based on direction
// move brick back if collission is true so brick won't pass boundary or other bricks
export const move = (dir) => {
  player.pos.x += dir;
  if (collission(playArea, player)) {
    player.pos.x -= dir;
  }
}

// rotate piece
export const playerRotate = (dir) => {
  const pos = player.pos.x;
  let offset = 1;
  rotateBrick(player.brick, dir);

  // check for sidewall collision
  // if part of the brick is over the wall after initial rotation,
  // check for collision with offset value until it is clear. 
  while (collission(playArea, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.brick[0].length) {
      player.pos.x = pos;
      return;
    }
  }
}

// rotate brick with a given direction
const rotateBrick = (brick, dir) => {
  // invert the value of the 2D array of the brick
  for (let i = 0; i < brick.length; i++) {
    for (let j = 0; j < i; j++) {
      [
        brick[j][i],
        brick[i][j]
      ] = [
          brick[i][j],
          brick[j][i]
        ]
    }
  }

  // if dir is positive (rotate right), reverse/switch first el of each array with last el
  // if dir is negative (rotate left), reverse first row with last row
  if (dir > 0) {
    brick.forEach(row => row.reverse());
  } else {
    brick.reverse();
  }
}

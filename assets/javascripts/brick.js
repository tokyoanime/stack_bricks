
import {
  tBrick,
  lBrick,
  jBrick,
  sBrick,
  zBrick,
  iBrick,
  oBrick,
} from './brick_types';

export default class Brick {
  constructor(playArea) {
    this.COLORS = [
      null,
      '#f700ff',
      '#ff9d00',
      '#0038ff',
      '#62ff00',
      '#ff001a',
      '#00eeff',
      '#ffff00'
    ];

    this.pos = {
      x: 4,
      y: 0
    };

    const BRICKS = 'ILJOTSZ';
    this.brick = this.createBrick(BRICKS[Math.floor(Math.random() * BRICKS.length)]);
  }

  // return 2D array based on type
  createBrick(type) {
    switch (type) {
      case "T":
        return tBrick;
      case "L":
        return lBrick;
      case "J":
        return jBrick;
      case "S":
        return sBrick;
      case "Z":
        return zBrick;
      case "I":
        // this piece has a problem with right bound rotation
        return iBrick;
      case "O":
        return oBrick;
      default:
        break;
    };
  };

  // draw brick based on brick's 2D array
  drawBrick(ctx, matrix, pos) {
    matrix.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col) {
          ctx.beginPath();
          ctx.fillStyle = this.COLORS[col]
          ctx.fillRect(
            x + pos.x,
            y + pos.y,
            .9, .9
          );
          ctx.fill();
        }
      });
    });
  };

}
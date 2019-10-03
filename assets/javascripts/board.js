import Brick from './brick';
import Control from './control';

class Board {
  constructor() {
    this.CANVAS_WIDTH = 270;
    this.CANVAS_HEIGHT = 540;

    this.ROW = 20;
    this.COL = 10;

    this.liveBrick = "";
    this.ctx = "";
    this.lastTime = 0;

    this.renderBoard();

    this.gameLoop = this.gameLoop.bind(this);
  }

  createGrid(w, h) {
    const grid = [];
    while (h--) {
      grid.push(new Array(w).fill(0));
    }
    return grid;
  }

  gameLoop(timestamp) {
    let deltatime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.liveBrick.update(deltatime);
    this.liveBrick.drawBrick(this.ctx);

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  renderBoard() {
    const canvas = document.getElementById("tetris");

    this.ctx = canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    this.liveBrick = new Brick(this.CANVAS_WIDTH,this.CANVAS_HEIGHT);
    
    new Control(this.liveBrick);

    this.gameLoop();
  }
}

export default Board;
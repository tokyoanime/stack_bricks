import Brick from './brick';

class Board {
  constructor() {
    const CANVAS_WIDTH = 270;
    const CANVAS_HEIGHT = 540;
    this.rowDim = 20;
    this.colDim = 10;
    this.canvasWidth = CANVAS_WIDTH;
    this.canvasHeight = CANVAS_HEIGHT;
    
    this.liveBrick = "";
    this.ctx = "";
    this.lastTime = 0;

    this.renderBoard();

    this.gameLoop = this.gameLoop.bind(this);
  }

  gameLoop(timestamp) {
    let deltatime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.liveBrick.update(deltatime);
    this.liveBrick.drawBrick(this.ctx);

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  renderBoard() {
    const canvas = document.getElementById("tetris");

    this.ctx = canvas.getContext('2d');

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.liveBrick = new Brick(this.canvasWidth,this.canvasHeight);

    this.gameLoop();
  }
}

export default Board;
import * as Control from './control';
import Board from './board';
import Brick from './brick';
import collission from './collission';

export default class Game {
  constructor() {
    // create a 2D array of 10 x 20
    this.game = new Board(10, 20);

    //default starting score
    this.score = 0;
    this.displayScore();

    this.canvas = document.getElementById('tetris');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(27, 27)
    this.currentBrick = new Brick(this.game.playArea);

    this.gameLoop();

    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.lastTime = 0;

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 37:
          // move brick left by one space
          e.preventDefault();
          Control.move(-1);
          break;
        case 39:
          // move brick right by one space
          e.preventDefault();
          Control.move(1);
          break;
        case 40:
          // move brick down by one space
          e.preventDefault();
          Control.softDrop(this.currentBrick);
          this.dropCounter = 0;
          break;
        case 81:
          e.preventDefault();
          Control.playerRotate(-1);
          break;
        case 38:
          e.preventDefault();
          Control.playerRotate(1);
          break;
        default:
          break;
      };
    });

  }

  // loop function
  gameLoop(timestamp = 0) {
    let deltatime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.dropCounter += deltatime;
    if (this.dropCounter > this.dropInterval) {
      Control.softDrop(this.currentBrick);
      this.dropCounter = 0;
    };
    if (collission(this.game.playArea, this.currentBrick)) {
      this.currentBrick.pos.y--;
      this.score += this.game.clearLine();
      this.updateGameState();
      this.currentBrick = new Brick(this.game.playArea);
      this.displayScore();
    };

    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  };

  // record current position of the active brick in playArea
  updateGameState() {
    this.currentBrick.brick.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col) {
          this.game.playArea[y + this.currentBrick.pos.y][x + this.currentBrick.pos.x] = col;
        };
      });
    });
  };

  // display current score in browser
  displayScore() {
    document.getElementById('score').innerHTML = this.score;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentBrick.drawBrick(this.ctx);
  }

  // reset game
  gameReset() {
    if (collission(this.game.playArea, this.currentBrick.pos)) {
      this.game.playArea.forEach(row => row.fill(0));
      this.score = 0;
      this.currentBrick = new Brick(this.game.playArea);
      this.displayScore();
    };
  };
}
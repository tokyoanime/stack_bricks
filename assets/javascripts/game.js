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

    this.canvas = document.getElementById('tetris');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(27, 27)
    this.currentBrick = new Brick(this.game.playArea);

    this.gameReset();
    this.displayScore();
    this.gameLoop();

    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.lastTime = 0;

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 37:
          // move brick left by one space
          e.preventDefault();
          Control.move(-1, this.currentBrick, this.game.playArea);
          break;
        case 39:
          // move brick right by one space
          e.preventDefault();
          Control.move(1, this.currentBrick, this.game.playArea);
          break;
        case 40:
          // move brick down by one space
          e.preventDefault();
          Control.softDrop(this.currentBrick);
          if (collission(this.game.playArea, this.currentBrick)) {
            this.currentBrick.pos.y--;
            this.updateGameState();
            this.gameReset();
            this.score += this.game.clearLine();
            this.displayScore();
          }
          this.dropCounter = 0;
          break;
        case 81:
          e.preventDefault();
          Control.playerRotate(-1, this.currentBrick, this.game.playArea);
          break;
        case 38:
          e.preventDefault();
          Control.playerRotate(1, this.currentBrick, this.game.playArea);
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
      if (collission(this.game.playArea, this.currentBrick)) {
        this.currentBrick.pos.y--;
        this.updateGameState();
        this.gameReset();
        this.game.clearLine();
        this.displayScore();
      }

      this.dropCounter = 0;
    };

    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  };

  // record current position of the active brick in playArea
  updateGameState() {
    const brick = this.currentBrick;
    const playArea = this.game.playArea;
    brick.brick.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col) {
          playArea[y + brick.pos.y][x + brick.pos.x] = col;
        };
      });
    });
    this.game.playArea = playArea;
  };

  // display current score in browser
  displayScore() {
    document.getElementById('score').innerHTML = this.score;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentBrick.drawBrick(this.ctx, this.game.playArea, {x: 0, y: 0});
    this.currentBrick.drawBrick(this.ctx, this.currentBrick.brick, this.currentBrick.pos);
  }

  // reset game
  gameReset() {
    this.currentBrick = new Brick(this.game.playArea);
    if (collission(this.game.playArea, this.currentBrick)) {
      this.game.playArea.forEach(row => row.fill(0));
      this.score = 0;
      this.currentBrick = new Brick(this.game.playArea);
      this.displayScore();
    };
  };
}
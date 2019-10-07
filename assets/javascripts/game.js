import * as Control from './control';
import Board from './board';
import Brick from './brick';
import collission from './collission';

export default class Game {
  constructor(level) {
    // create a 2D array of 10 x 20
    this.game = new Board(10, 20);

    //default starting score
    this.score = 0;
    this.lineCount = 0;
    this.level = level;

    this.canvas = document.getElementById('tetris');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(27, 27)
    this.currentBrick = new Brick(this.game.playArea);

    this.displayScore();
    this.displayLevel();
    this.gameReset();
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
          let rows = 0;
          Control.softDrop(this.currentBrick);
          if (collission(this.game.playArea, this.currentBrick)) {
            this.currentBrick.pos.y--;
            this.updateGameState();
            this.gameReset();
            rows = this.game.clearLine();
            this.updateScore(rows);
            this.updateLineCount(rows);
            this.updateLevel();
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
    let rows = 0;
    this.dropCounter += deltatime;
    if (this.dropCounter > this.dropInterval) {
      Control.softDrop(this.currentBrick);
      if (collission(this.game.playArea, this.currentBrick)) {
        this.currentBrick.pos.y--;
        this.updateGameState();
        this.gameReset();
        rows = this.game.clearLine();
        this.updateScore(rows);
        this.updateLineCount(rows);
        this.updateLevel();
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

  displayLineCount() {
    document.getElementById('line').innerHTML = this.lineCount;
  }

  displayLevel() {
    document.getElementById('level').innerHTML = this.level;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentBrick.drawBrick(this.ctx, this.game.playArea, {x: 0, y: 0});
    this.currentBrick.drawBrick(this.ctx, this.currentBrick.brick, this.currentBrick.pos);
  }

  updateScore(rowCount) {
    switch (rowCount) {
      case 1:
        this.score += 100;
        break;
      case 2:
        this.score += 300;
        break;
      case 3:
        this.score += 500;
        break;
      case 4:
        this.score += 800;
        break;
      default:
        break;
    }
    this.displayScore();
  }

  updateLineCount(rowCount) {
    this.lineCount += rowCount;
    this.displayLineCount();
  }

  updateLevel() {
    if (this.lineCount >= 90) {
      this.level = 10;
    } else if (this.lineCount >= 80) {
      this.level = 9;
    } else if (this.lineCount >= 70) {
      this.level = 8;
    } else if (this.lineCount >= 60) {
      this.level = 7;
    } else if (this.lineCount >= 50) {
      this.level = 6;
    } else if (this.lineCount >= 40) {
      this.level = 5;
    } else if (this.lineCount >= 30) {
      this.level = 4;
    } else if (this.lineCount >= 20) {
      this.level = 3;
    } else if (this.lineCount >= 10) {
      this.level = 2;
    } else {
      this.level = 1;
    }
    this.updateSpeed();
    this.displayLevel();
  }

  updateSpeed() {
    switch (this.level) {
      case 1:
        this.dropInterval = 1000;
        break;
      case 2:
        this.dropInterval = 900;
        break;
      case 3:
        this.dropInterval = 800;
        break;
      case 4:
        this.dropInterval = 700;
        break;
      case 5:
        this.dropInterval = 600;
        break;
      case 6:
        this.dropInterval = 500;
        break;
      case 7:
        this.dropInterval = 400;
        break;
      case 8:
        this.dropInterval = 300;
        break;
      case 9:
        this.dropInterval = 200;
        break;
      case 10:
        this.dropInterval = 100;
        break;
      default:
        break;
    }
  }

  // reset game
  gameReset() {
    this.currentBrick = new Brick(this.game.playArea);
    if (collission(this.game.playArea, this.currentBrick)) {
      this.game.playArea.forEach(row => row.fill(0));
      this.score = 0;
      this.lineCount = 0;
      this.level = 0;
      this.currentBrick = new Brick(this.game.playArea);
      this.displayScore();
    };
  };
}
import * as Control from './control';
import Board from './board';
import Brick from './brick';
import collission from './collission';
import renderPreview from './preview';
import React from 'react';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    // create a 2D array of 10 x 20
    this.game = new Board(10, 20);

    this.score = 0;
    this.highScores = [15000, 12000, 10000, 5000, 1000];
    this.lineCount = 0;
    this.level = 1;
    this.isPaused = false;
    this.gameOver = false;

    // assign high score from local storage if exists
    if (localStorage.getItem('tetris-high-score')) {
      this.highScores = JSON.parse(localStorage.getItem('tetris-high-score'));
    } else {
      localStorage.setItem(
        'tetris-high-score',
        JSON.stringify(this.highScores)
      );
    }

    this.canvas = document.getElementById('tetris');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.previewBricks = [];

    for (let i = 0; i < 4; i++) {
      this.previewBricks.push(new Brick(this.game.playArea));
    }

    this.currentBrick = new Brick(this.game.playArea);
    this.gameReset = this.gameReset.bind(this);

    renderPreview(this.previewBricks);
    this.displayScore();
    this.displayLevel();
    this.gameLoop();

    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.lastTime = 0;

    document.addEventListener('keydown', (e) => {
      if (this.gameOver) return;

      switch (e.keyCode) {
        case 27:
          e.preventDefault();
          if (this.isPaused) {
            this.isPaused = false;
            document.getElementById('gamePaused').style.display = 'none';
            this.gameLoop();
          } else {
            document.getElementById('gamePaused').style.display = 'flex';
            this.isPaused = true;
          }
          break;
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
        case 32:
          // hard drop when space bar is pressed
          e.preventDefault();
          this.dropInterval = 0;
          break;
        default:
          break;
      }
    });
  }

  // loop function
  gameLoop(timestamp = 0) {
    this.displayLineCount();

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
    }

    this.render();
    const requestAnimation = requestAnimationFrame(this.gameLoop.bind(this));
    if (this.isPaused || this.gameOver) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      cancelAnimationFrame(requestAnimation);
    }
  }

  // record current position of the active brick in playArea
  updateGameState() {
    const brick = this.currentBrick;
    const playArea = this.game.playArea;
    brick.brick.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col) {
          playArea[y + brick.pos.y][x + brick.pos.x] = col;
        }
      });
    });
    this.game.playArea = playArea;
  }

  // display current score in browser
  displayScore() {
    document.getElementById('score').innerHTML = this.score;
  }

  // display # of line clear in browser
  displayLineCount() {
    document.getElementById('line').innerHTML = this.lineCount;
  }

  // display current level in browser
  displayLevel() {
    document.getElementById('level').innerHTML = this.level;
  }

  render() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.scale(27, 27);
    this.game.drawGrid(this.ctx, 10, 20);
    this.currentBrick.drawBrick(this.ctx, this.game.playArea, { x: 0, y: 0 });
    this.currentBrick.drawBrick(
      this.ctx,
      this.currentBrick.brick,
      this.currentBrick.pos
    );
    this.ctx.restore();
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
    this.currentBrick = this.previewBricks.shift();
    this.previewBricks.push(new Brick(this.game.playArea));
    renderPreview(this.previewBricks);

    if (collission(this.game.playArea, this.currentBrick)) {
      this.game.playArea.forEach((row) => row.fill(0));
      this.previewBricks = [];
      this.gameOver = true;

      this.highScores.push(this.score);

      const compareScore = (a, b) => {
        return a - b;
      };
      const topScores = this.highScores
        .sort(compareScore)
        .reverse()
        .slice(0, 5);

      localStorage.setItem('tetris-high-score', JSON.stringify(topScores));

      let htmlScores = '';
      let scoreList = document.getElementById('high-score-list');
      scoreList.innerHTML = '';
      topScores.forEach((score) => {
        htmlScores = htmlScores + `<li>${score}</li>`;
      });
      scoreList.innerHTML = htmlScores;

      document.getElementById('game-over-container').style.display = 'flex';
    }
  }
}

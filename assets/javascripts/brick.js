class Brick {

  constructor(CANVAS_WIDTH, CANVAS_HEIGHT) {
    this.POS_UP = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];

    this.CANVAS_WIDTH = CANVAS_WIDTH;
    this.CANVAS_HEIGHT = CANVAS_HEIGHT;

    this.width = CANVAS_WIDTH / 10;
    this.height = CANVAS_HEIGHT / 20;

    this.position = {
      x: CANVAS_WIDTH / 2 - this.width,
      y: 0
    }

    this.dropCounter = 0;
    this.dropInterval = 1000;
  }

  drawBrick(ctx) {
    this.POS_UP.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col) {
          ctx.fillStyle = 'black';
          ctx.fillRect(this.position.x + (this.width * x), this.position.y + (this.width * y), this.width, this.height)
        }
      })
    })
  }

  moveLeft() {
    this.position.x -= this.CANVAS_WIDTH / 10;
    if (this.position.x < 0) this.position.x = 0;
  }

  moveRight() {
    this.position.x += this.CANVAS_WIDTH / 10;
    if ((this.position.x + this.width) > this.CANVAS_WIDTH) this.position.x = this.CANVAS_WIDTH - this.width;
  }

  moveDown() {
    this.position.y += this.height;
    this.dropCounter = 0;
  }

  update(deltaTime) {
    if (!deltaTime) return;

    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.moveDown();
    }

    // check for collission
    if ((this.position.y + this.height) > this.CANVAS_HEIGHT) {
      this.position.y = this.CANVAS_HEIGHT - this.height;
      this.downSpeed = 0;
    }
  }
}

export default Brick;
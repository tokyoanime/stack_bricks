class Brick {
  constructor(CANVAS_WIDTH, CANVAS_HEIGHT) {
    this.CANVAS_WIDTH = CANVAS_WIDTH;
    this.CANVAS_HEIGHT = CANVAS_HEIGHT;

    this.width = CANVAS_WIDTH / 10;
    this.height = CANVAS_HEIGHT / 20;

    this.downSpeed = this.height / 20;

    this.position = {
      x: CANVAS_WIDTH / 2 - this.width,
      y: 0
    }
  }

  drawBrick(ctx) {
    // ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    // this.position.y += this.height;
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
    this.downSpeed += 5;
  }

  update(deltaTime) {
    if (!deltaTime) return;

    this.position.y += this.downSpeed;

    // check for collission
    if ((this.position.y + this.height) > this.CANVAS_HEIGHT) {
      this.position.y = this.CANVAS_HEIGHT - this.height;
      this.downSpeed = 0;
    }
  }
}

export default Brick;
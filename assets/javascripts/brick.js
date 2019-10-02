class Brick {
  constructor(CANVAS_WIDTH, CANVAS_HEIGHT) {
    this.CANVAS_WIDTH = CANVAS_WIDTH;
    this.CANVAS_HEIGHT = CANVAS_HEIGHT;

    this.width = CANVAS_WIDTH / 10;
    this.height = CANVAS_HEIGHT / 80;

    this.position = {
      x: CANVAS_WIDTH / 10 * 5,
      y: 0
    }
  }

  drawBrick(ctx) {
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.position.x -= this.CANVAS_WIDTH / 10;
    if (this.position.x < 0) this.position.x = 0;
  }

  moveRight() {
    this.position.x += this.CANVAS_WIDTH / 10;
    if (this.position.x > this.CANVAS_WIDTH) this.position.x = this.CANVAS_WIDTH;
  }

  update(deltaTime) {
    if (!deltaTime) return;
    this.position.y += 2 / deltaTime;

    // if (this.position.y > this.CANVAS_HEIGHT) this.position.y = this.CANVAS_HEIGHT;
  }
}

export default Brick;
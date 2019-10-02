class Brick {
  constructor(CANVAS_WIDTH, CANVAS_HEIGHT) {
    this.width = CANVAS_WIDTH / 10;
    this.height = CANVAS_HEIGHT / 80;

    this.position = {
      x: CANVAS_WIDTH / 2 + this.width / 2,
      y: 0
    }
  }

  drawBrick(ctx) {
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    if (!deltaTime) return;
    this.position.y += 2 / deltaTime;
  }
}

export default Brick;
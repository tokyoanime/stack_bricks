export default class Board {
  constructor(width, height, ctx) {
    this.ctx = ctx;
    this.playArea = this.createGrid(width, height);
  }

  // Create an array of w x h and fill each element with 0 for game area
  createGrid(w, h) {
    const grid = [];
    while (h--) {
      grid.push(new Array(w).fill(0));
    };
    return grid;
  };

  drawGrid(ctx, w, h) {
    const p = 1;
    for (let i = 0; i < w + 1; i++) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
    }

    for (let j = 0; j < h + 1; j++) {
      ctx.moveTo(0, j);
      ctx.lineTo(w, j);
    }
    ctx.lineWidth = .01;
    ctx.strokeStyle = 'greenyellow';
    ctx.stroke();
  }

// clear line once every square within a single row is filled
// increase score based on number of row cleared
  clearLine() {
    let rowCount = 0;

    outer: for (let y = this.playArea.length - 1; y > 0; y--) {
      for (let x = 0; x < this.playArea[y].length; x++) {
        if (this.playArea[y][x] === 0) {
          continue outer;
        };
      };

      const row = this.playArea.splice(y, 1)[0].fill(0);
      this.playArea.unshift(row);
      y++;
      rowCount++;
    };

    // return this.scoreCount(rowCount);
    return rowCount;
  }
    
}
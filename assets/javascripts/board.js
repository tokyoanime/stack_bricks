export default class Board {
  constructor(width, height) {
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

    return this.scoreCount(rowCount);
  }

  scoreCount(rowCount) {
    let score = 0;
    switch (rowCount) {
      case 1:
        this.score += 100;
      case 2:
        this.score += 300;
      case 3:
        this.score += 500;
      case 4:
        this.score += 800;
      default:
        return score;
    };
  };
    
}
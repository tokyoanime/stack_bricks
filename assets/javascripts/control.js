export default class Control {
  constructor(liveBrick) {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 37:
          liveBrick.moveLeft();
          break;
        case 39:
          liveBrick.moveRight();
          break;
        case 40:
          liveBrick.moveDown();
          break;
        default:
          break;
      }
    });
  }
}
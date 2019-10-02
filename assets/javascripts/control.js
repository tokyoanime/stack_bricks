export default class Control {
  constructor(liveBrick) {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 37:
          liveBrick.moveLeft();
          break;
        case 39:
          liveBrick.moveRight();
          break;
        default:
          break;
      }
    });
  }
}
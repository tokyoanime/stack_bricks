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
        case 40:
          liveBrick.moveDown();
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 40:
          // alert("key down")
          break;
        default:
          break;
      }
    })
  }
}
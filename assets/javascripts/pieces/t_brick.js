import Brick from '../brick';

class TBrick extends Brick {
  constructor() {
    const POS_UP = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];

    const POS_LEFT = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ];

    const POS_DOWN = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ];

    const POS_RIGHT = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ];

    const POS = [POS_UP, POS_LEFT, POS_DOWN, POS_RIGHT];
  }

  
}
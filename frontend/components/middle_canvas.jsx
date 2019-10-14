import React from 'react';
import Game from '../../assets/javascripts/game'

class MiddleCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  startGame() {
    document.getElementById('start-game').style.display = 'none';

    const level = 1
    let game = new Game(level);
  }

  render() {
    return(
      <div className="tetris-canvas-middle">
        <canvas id="tetris" width="270" height="540"></canvas>
        <div id="gamePaused">
          <p>PAUSED</p>
        </div>
        <div id="start-game" onClick={this.startGame}>START</div>
        <div id="game-over">
          <p>GAME</p>
          <p>OVER</p>
        </div>
      </div>
    )
  }
}

export default MiddleCanvas;
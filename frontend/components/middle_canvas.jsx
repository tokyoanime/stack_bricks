import React from 'react';
import Game from '../../assets/javascripts/game'

class MiddleCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    document.getElementById('start-game').style.display = 'none';
    document.getElementById('game-over-conainer').style.display = 'none';
    document.getElementById('gamePaused').style.display = 'none';
    
    new Game();
  }

  render() {
    return(
      <div className="tetris-canvas-middle">
        <canvas id="tetris" width="270" height="540"></canvas>
        <div id="gamePaused">
          <p>PAUSED</p>
        </div>
        <div id="start-game" onClick={this.startGame}>START</div>
        <div id="game-over-container">
          <div className="game-over-title">GAME OVER</div>
          <div className="high-score-container">
            <div className="high-score-title">
              HIGH SCORE
            </div>
            <div className="high-score">
              <ul id="high-score-list">
              </ul>
            </div>
          </div>
          <div id="play-again" onClick={this.startGame}>
            PLAY AGAIN
          </div>
        </div>
      </div>
    )
  }
}

export default MiddleCanvas;
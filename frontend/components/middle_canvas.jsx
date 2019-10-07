import React from 'react';

class MiddleCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="tetris-canvas-middle">
        <canvas id="tetris" width="270" height="540"></canvas>
        <div id="gamePaused">
          <p>PAUSED</p>
        </div>
      </div>
    )
  }
}

export default MiddleCanvas;
import React from 'react';

class LeftCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="tetris-canvas-left">
        <div className="tetris-hold-container">
          <div className="hold-title">
            HOLD
          </div>
          <div className="hold-display">
            
          </div>
        </div>
        <div className="tetris-score-container">
          <div className="score-title">
            SCORE
          </div>
          <div className="score-display">
            
          </div>
        </div>
      </div>
    )
  }
}

export default LeftCanvas;
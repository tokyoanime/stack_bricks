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
        <div className="tetris-info-container">
          <div className="tetris-score-container">
            <div className="score-title">
              SCORE
            </div>
            <div className="score-display" id="score">
              0
            </div>
          </div>
          <div className="tetris-line-container">
            <div className="line-title">
              LINE
            </div>
            <div className="line-display" id="line">
              0
            </div>
          </div>
          <div className="tetris-level-container">
            <div className="level-title">
              LEVEL
            </div>
            <div className="level-display" id="level">
              0
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default LeftCanvas;
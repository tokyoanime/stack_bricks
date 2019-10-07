import React from 'react';

class RightCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tetris-canvas-right">
        <div className="tetris-preview-container">
          <div className="preview-title">
            Preview
          </div>
          <div className="brick-preview-container">
            <div className="fPreview">
              <canvas id="fPreview" width='75' height='75'></canvas>
            </div>
            <div className="sPreview">
              <canvas id="sPreview" width='75' height='75'></canvas>
            </div>
            <div className="tPreview">
              <canvas id="tPreview" width='75' height='75'></canvas>
            </div>
            <div className="lPreview">
              <canvas id="lPreview" width='75' height='75'></canvas>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default RightCanvas;
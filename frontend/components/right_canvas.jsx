import React from 'react';

class RightCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tetris-canvas-right">
        <div className="tetris-preview">
          Preview
        </div>
      </div>
    )
  }
}

export default RightCanvas;
import React from 'react';
import LeftCanvas from './left_canvas';
import MiddleCanvas from './middle_canvas';
import RightCanvas from './right_canvas';

class SplashPage extends React.Component {

  handleModal(e, currentModalId) {
    const currentModal = document.getElementById(currentModalId);
    currentModal.style.display = "block";
  }

  closeModal(e, currentModalId) {
    const currentModal = document.getElementById(currentModalId);
    currentModal.style.display = "none";
  }

  render() {
    return(
      <div className="main-container">
        <div className="tetris-title-container">
          <div className="tetris-title">
            Stack Bricks
          </div>
          <div className="tetris-title-nav">
            <div className="about" id="modalContent" onClick={(e) => this.handleModal(e, "myModalAbout")}>
              About
            </div>
            <div className="gameplay-info" id="modalContent" onClick={(e) => this.handleModal(e, "myModalGamePlayInfo")}>
              Gameplay Info
            </div>
            <div className="control" id="modalContent" onClick={(e) => this.handleModal(e, "myModalControl")}>
              Control
            </div>
          </div>
        </div>
        <div className="tetris-canvas-container">
          {<LeftCanvas />}
          {<MiddleCanvas />}
          {<RightCanvas />}
        </div>

        <div id="myModalAbout" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={(e) => this.closeModal(e,"myModalAbout")}>&times;</span>
              About
          </div>
            <div className="modal-body">
              Stack Bricks is a clone of a popular classic Tetris game.
          </div>
          </div>
        </div>
        <div id="myModalControl" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={(e) => this.closeModal(e, "myModalControl")}>&times;</span>
              Keyboard Control
          </div>
            <div className="modal-body">
              Body
          </div>
          </div>
        </div>
        <div id="myModalGamePlayInfo" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={(e) => this.closeModal(e, "myModalGamePlayInfo")}>&times;</span>
              General Gameplay Info
          </div>
            <div className="modal-body">
              <div>
                Goal - Score as many points as possible by clearing horizontal lines of bricks.
              </div>
              <div>
                Clear Line - To clear a line, fill every square within a single row.
              </div>
              <div>
                Score Points - Earn points by clearing lines. Clearing multiple lines at once will earn bonus points.
              </div>
              <div>
                Game Over - Game is over once bricks are stacked to the very top.
              </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SplashPage;
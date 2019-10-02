import React from 'react';

class SplashPage extends React.Component {

  handleModal(e, currentModalId) {
    // const currentClass = e.currentTarget.className[0].toUpperCase() + e.currentTarget.className.slice(1);
    // const currentModalId = "myModal" + currentClass;
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
            <div className="control" id="modalContent" onClick={(e) => this.handleModal(e, "myModalControl")}>
              Control
            </div>
            <div className="gameplay-info" id="modalContent" onClick={(e) => this.handleModal(e, "myModalGamePlayInfo")}>
              Gameplay Info
            </div>
          </div>
        </div>
        <div className="tetris-canvas-container">
          <div className="tetris-canvas-left">
            <div className="tetris-hold">

            </div>
            <div className="tetris-score">

            </div>
          </div>
          <div className="tetris-canvas-middle">
            <canvas id="tetris"></canvas>
          </div>
          <div className="tetris-canvas-right">
            <div className="tetris-preview">

            </div>
          </div>
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
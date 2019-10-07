const modalAbout = document.getElementById("myModalAbout");
const modalControl = document.getElementById("myModalControl");
const modalObjective = document.getElementById("myModalObjective");
const modalGamePlayInfo = document.getElementById("myModalGamePlayInfo");

// Get the button that opens the modal
const modal = document.getElementById("modalContent");

// When the user clicks the button, open the modal 
modal.onclick = (event) => {
  switch (event.currentTarget.className) {
    case "about":
      modalAbout.style.display = "block";
      break;
    case "control":
      modalControl.style.display = "block";
      break;
    default:
      break;
  }
}

const close = document.getElementsByClassName("close")[0];
close.onclick = () => {
  modalAbout.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modalAbout) {
    modalAbout.style.display = "none";
  }
}
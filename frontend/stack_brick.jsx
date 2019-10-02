import React from 'react';
import ReactDOM from 'react-dom';
import SplashPage from './components/splash_page';
import Board from '../assets/javascripts/board';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  ReactDOM.render(<SplashPage />, root);

  const newGame = new Board();
});

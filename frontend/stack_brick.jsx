import React from 'react';
import ReactDOM from 'react-dom';
import SplashPage from './components/splash_page'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  ReactDOM.render(<SplashPage />, root);
});

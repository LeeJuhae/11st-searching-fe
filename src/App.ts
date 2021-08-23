import Home from './views/Home';
import TimeBar from './components/TimeBar';
import './App.css';

class App {
  home;
  constructor() {
    const $header = document.querySelector('#time-bar');
    const $screen = document.querySelector('#app-screen');
    const timeBar = new TimeBar($header, {});
    this.home = new Home($screen, {});
    setInterval(() => {
      timeBar.render();
    }, 1000);
  }
}

window.onload = () => {
  const app = new App();
  window.onpopstate = () => {
    app.home.render();
  };
};

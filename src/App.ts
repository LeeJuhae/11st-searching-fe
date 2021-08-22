import Home from './views/Home';
import TimeBar from './components/TimeBar';
import './App.css';

class App {
  constructor() {
    const $header = document.querySelector('#time-bar');
    const $screen = document.querySelector('#app-screen');
    const timeBar = new TimeBar($header, {});
    new Home($screen, {});
    setInterval(() => {
      timeBar.render();
    }, 1000);
  }
}

new App();

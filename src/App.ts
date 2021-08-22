import Home from './views/Home';
import './App.css';

class App {
  constructor() {
    const $root = document.querySelector('#root');
    new Home($root, {});
  }
}

new App();

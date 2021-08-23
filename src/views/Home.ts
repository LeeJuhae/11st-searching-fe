import Component from '../core/Component';
import Alarm from './Alarm';
import Memo from './Memo';
import Photo from './Photo';
import '../assets/styles/Home.css';

export default class Home extends Component {
  setup() {
    this.$state = { apps: ['alarm', 'memo', 'photo'], active: 'home' };
  }
  template() {
    const { apps } = this.$state;
    return `
      ${apps.map(app => `<button class='app'/>${app}</button>`).join('')}
	`;
  }
  mounted() {
    const pathname = window.location.pathname;
    if (pathname === '/alarm') new Alarm(this.$target, {});
    else if (pathname === '/memo') new Memo(this.$target, {});
    else if (pathname === '/photo') new Photo(this.$target, {});
  }
  setEvent() {
    const { apps } = this.$state;
    const routes = { alarm: '/alarm', memo: '/memo', photo: '/photo' };
    this.addEvent('click', '.app', ({ target }) => {
      const pathName = routes[target.innerHTML];
      window.history.pushState({}, pathName, window.location.origin + pathName);
      this.setState({ apps, active: target.innerHTML });
    });
  }
}

window.onpopstate = () => {
  console.log('here');
};

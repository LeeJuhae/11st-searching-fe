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
      ${apps.map(app => `<button class='app' draggable='true'/>${app}</button>`).join('')}
	`;
  }
  mounted() {
    if (this.$state['active'] === 'alarm') new Alarm(this.$target, {});
    else if (this.$state['active'] === 'memo') new Memo(this.$target, {});
    else if (this.$state['active'] === 'photo') new Photo(this.$target, {});
  }
  setEvent() {
    const { apps } = this.$state;
    const routes = { alarm: '/alarm', memo: '/memo', photo: '/photo' };
    this.addEvent('click', '.app', ({ target }) => {
      const pathName = routes[target.innerHTML];
      window.history.pushState({}, pathName, window.location.origin + pathName);
      this.setState({ apps, active: target.innerHTML });
    });
    this.addEvent('drag', '.app', ({ target }) => {
      console.log(target.innerHTML, 'drag');
    });
    this.addEvent('drop', '.app', ({ target }) => {
      console.log('drop');
    });
  }
}

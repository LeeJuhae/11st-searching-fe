import Component from '../core/Component';
import Alarm from './Alarm';
import Memo from './Memo';
import Photo from './Photo';
import '../assets/styles/Home.css';

export default class Home extends Component {
  setup() {
    this.$state = {
      apps: JSON.parse(window.localStorage.getItem('apps')) || ['alarm', 'memo', 'photo'],
      active: 'home',
      routes: {
        '/alarm': new Alarm(this.$target, {}),
        '/memo': new Memo(this.$target, {}),
        '/photo': new Photo(this.$target, {})
      }
    };
  }

  template() {
    const { apps } = this.$state;
    return `
      ${apps
        .map(
          (app, idx) =>
            `<button class="app" data-index="${idx}" draggable="true" droppable="true"/>${app}</button>`
        )
        .join('')}
	`;
  }

  mounted() {
    const pathname = window.location.pathname;
    if (pathname !== '/') {
      this.$state.routes[pathname].render();
    }
  }

  setEvent() {
    const { apps } = this.$state;
    const routes = { alarm: '/alarm', memo: '/memo', photo: '/photo' };
    let dragIdx = -1;

    this.addEvent('click', '.app', ({ target }) => {
      const pathName = routes[target.innerHTML];
      window.history.pushState({}, pathName, window.location.origin + pathName);
      this.setState({ ...this.$state, active: target.innerHTML });
    });

    this.addEvent('drag', '.app', ({ target }) => {
      dragIdx = target.dataset.index;
    });

    this.addEvent('drop', '.app', ({ target }) => {
      if (dragIdx !== -1) {
        const newApps = this.$state.apps;
        newApps[target.dataset.index] = this.$state.apps[dragIdx];
        newApps[dragIdx] = target.innerHTML;
        this.setState({ ...this.$state, apps: newApps });
        window.localStorage.setItem('apps', JSON.stringify(newApps));
        dragIdx = -1;
      }
    });

    this.addEvent('dragover', '.app', event => {
      event.preventDefault();
    });
  }
}

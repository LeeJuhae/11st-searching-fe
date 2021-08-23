import Component from '../core/Component';
import '../assets/styles/Alarm.css';
import { getSequenceArray } from '../utils/getSequenceArray';

export default class Alarm extends Component {
  setup() {
    this.$state = {
      items: JSON.parse(window.localStorage.getItem('alarm')) || [],
      isAddBtnClicked: false,
      infos: { slots: '오전', hours: '00', minutes: '00' }
    };
  }

  template() {
    const { items, isAddBtnClicked, infos } = this.$state;
    const options = {
      slots: ['오전', '오후'],
      hours: getSequenceArray(0, 12, 1),
      minutes: getSequenceArray(0, 60, 10)
    };
    return `
    <div id="alarm-wrapper">
      <div id="btn-wrapper">
        <button id="alarm-back-btn"">Back</button>
        <button id="add-btn">New</button>
      </div>
      <div class=${isAddBtnClicked ? 'alarm-dropdown-wrapper' : 'alarm-dropdown-wrapper hidden'}>
        <label for="slots"></label>
        <select id="slots" name="slots">
        ${options['slots'].map(
          slot => `<option value=${slot} ${infos['slots'] === slot && 'selected'}>${slot}</option>`
        )}
        </select>
        <label for="hours"></label>
        <select id="hours" name="hours">
        ${options['hours'].map(
          hour => `<option value=${hour} ${infos['hours'] === hour && 'selected'}>${hour}</option>`
        )}
        </select>
        <span>시</span>
        <label for="minutes"></label>
        <select id="minutes" name="minutes">
        ${options['minutes'].map(
          minute =>
            `<option value=${minute} ${
              infos['minutes'] === minute && 'selected'
            }>${minute}</option>`
        )}
        </select>
        <span>분</span>
        <button id="save-btn">저장</button>
      </div>
      <div>
      ${items
        .map(
          (item, idx) =>
            `<div>${item}
              <button class="delete-btn" data-index="${idx}">삭제</button>
            </div>`
        )
        .join('')}
      </ㅇ>
    </div>
	  `;
  }

  setEvent() {
    this.addEvent('click', '#add-btn', () => {
      const { isAddBtnClicked } = this.$state;
      this.setState({ ...this.$state, isAddBtnClicked: !isAddBtnClicked });
    });

    this.addEvent('click', '.delete-btn', ({ target }) => {
      const items = [...this.$state.items];
      items.splice(target.dataset.index, 1);
      this.setState({ items });
      window.localStorage.setItem('alarm', JSON.stringify(items));
    });

    this.addEvent('click', '#save-btn', () => {
      const { items, isAddBtnClicked, infos } = this.$state;
      this.setState({
        ...this.$state,
        items: [...items, `${infos['slots']} ${infos['hours']}시 ${infos['minutes']}분 `],
        isAddBtnClicked: false
      });
      window.localStorage.setItem('alarm', JSON.stringify(this.$state['items']));
    });

    this.addEvent('change', 'select', ({ target }) => {
      const { infos } = this.$state;
      this.setState({ ...this.$state, infos: { ...infos, [target.id]: target.value } });
    });

    this.addEvent('click', '#alarm-back-btn', () => {
      window.history.back();
    });
  }
}

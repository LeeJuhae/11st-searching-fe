import Component from '../core/Component';
import '../assets/styles/Memo.css';

export default class Memo extends Component {
  setup() {
    this.$state = { items: [], isAddBtnClicked: false };
  }

  template() {
    const { items, isAddBtnClicked } = this.$state;
    return `
    <div>
      <button class="add-btn">New</button>
      <div class=${isAddBtnClicked ? 'memo-input-wrapper' : 'memo-input-wrapper hidden'}>
        <input id='memo-input' type='text' placeholder='메모를 입력하세요'/>
      </div>
      <ul>
      ${items.map((item, key) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
	  `;
  }

  setEvent() {
    this.addEvent('click', '.add-btn', ({ target }) => {
      const { items, isAddBtnClicked } = this.$state;
      this.setState({ ...this.$state, isAddBtnClicked: !isAddBtnClicked });
    });

    this.addEvent('keypress', '#memo-input', event => {
      const { items } = this.$state;
      if (event.keyCode === 13) {
        this.setState({
          items: [...items, event.target.value],
          isAddBtnClicked: false
        });
      }
    });
  }
}

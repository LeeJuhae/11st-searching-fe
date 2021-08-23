import Component from '../core/Component';
import '../assets/styles/Memo.css';

export default class Memo extends Component {
  setup() {
    // memo example: 가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하
    this.$state = {
      items: JSON.parse(window.localStorage.getItem('memo')) || [],
      isAddBtnClicked: false,
      selectedIdx: -1
    };
  }
  template() {
    const { items, isAddBtnClicked, selectedIdx } = this.$state;
    return `
    <div id="memo-wrapper">
      <button class="add-btn">New</button>
      <div class=${isAddBtnClicked ? 'memo-input-wrapper' : 'memo-input-wrapper hidden'}>
        <input id="memo-input" type="text" placeholder="메모를 입력하세요"/>
      </div>
      <div>
      ${items
        .map(
          (item, key) =>
            `<div class=${
              selectedIdx == key ? 'memo-input-unfold' : 'memo-input'
            } data-index=${key}>${item}</div>`
        )
        .join('')}
      </div>
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
        window.localStorage.setItem('memo', JSON.stringify(this.$state.items));
      }
    });

    this.addEvent('click', '.memo-input', ({ target }) => {
      this.setState({ ...this.$state, selectedIdx: target.dataset.index });
    });
  }
}

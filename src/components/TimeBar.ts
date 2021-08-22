import Component from '../core/Component';

export default class TimeBar extends Component {
  setup() {
    this.$state = { items: ['item1', 'item2'] };
  }
  template() {
    const { items } = this.$state;
    return `
      <div>TimeBar</div>
    `;
  }

  setEvent() {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });
  }
}

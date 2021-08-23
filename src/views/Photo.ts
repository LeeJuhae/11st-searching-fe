import Component from '../core/Component';
import photos from '../utils/getPhotos';
import { getSequenceArray } from '../utils/getSequenceArray';
import '../assets/styles/Photo.css';

export default class Photo extends Component {
  setup() {
    this.$state = { selectedIdx: 0 };
  }

  template() {
    const { selectedIdx } = this.$state;
    return `
    <div id="photo-wrapper">
      <button id="photo-back-btn"">Back</button>
      <div id="photo-list">
        ${getSequenceArray(0, 10, 1)
          .map((ele, idx) => {
            const className = selectedIdx == idx ? 'selected-photo' : 'photo';
            return `<img class=${className} data-index=${idx} src=${photos[idx]}/>`;
          })
          .join('')}
      </div>
      <div id="selected-photo-wrapper">
        <img src=${photos[selectedIdx]} width="100%' height="100%"/>
      </div>
    </div>
	  `;
  }

  setEvent() {
    this.addEvent('click', '.photo', ({ target }) => {
      this.setState({ selectedIdx: target.dataset.index });
    });

    this.addEvent('click', '#photo-back-btn', () => {
      window.history.back();
    });
  }
}

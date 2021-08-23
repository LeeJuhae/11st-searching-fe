import Component from '../core/Component';
import photos from '../utils/getPhotos';
import { getSequenceArray } from '../utils/getSequenceArray';
import '../assets/styles/Photo.css';

export default class Photo extends Component {
  setup() {}
  template() {
    return `
    <div id='photo-wrapper'>
      <div id='photo-list'>
      ${getSequenceArray(0, 10, 1)
        .map((ele, idx) => `<img data-index=${idx} src=${photos['img' + (idx + 1)]}/>`)
        .join('')}
      </div>
    </div>
	  `;
  }
}

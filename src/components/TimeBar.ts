import Component from '../core/Component';
import '../assets/styles/TimeBar.css';

export default class TimeBar extends Component {
  setup() {}
  template() {
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `
      <time datetime='${date}'>${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초</time>
    `;
  }
}

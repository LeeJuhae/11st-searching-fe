import img3 from './images/img-1.jpg';
import './index.css';

const img = document.createElement('img');
const body = document.querySelector('body');
img.src = img3;
body.appendChild(img);

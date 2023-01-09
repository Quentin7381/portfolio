import {Ellipse} from './circle.js'

const target = document.querySelector('.target');
const newElt = new Ellipse(
    target,
    {
        width : '100px',
        height : '100px',
        'background-color' : 'red'
    }
    , [
        'test'
    ]);


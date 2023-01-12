import {CircleProgress} from './circleProgress.js'
import { Circle } from './circle.js';
import { Element } from './element.js';

const target = document.querySelector('.target');

const newElt = new CircleProgress(
    50,
    target,
    {
        width : '100px',
        height : '100px',
        padding : '10px',
        'background-color' : 'red',
        border : 'solid black 2px'
    }
    , [
        'test'
    ], 'div', 'some text');


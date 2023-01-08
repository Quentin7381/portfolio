import {Element} from './element.js'

const target = document.querySelector('.target');
const newElt = new Element(
    target,
    {
        width : '100px',
        height : '100px',
        backgroundColor : 'red'
    }, [
        'test'
    ]);


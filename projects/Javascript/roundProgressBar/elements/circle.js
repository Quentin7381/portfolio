import {Element} from './element.js'

export class Circle extends Element{

    constructor(
        target,
        css = {},
        classes = [],
        tag = 'div',
        text = '',
        childrens = [],
        asChild = false
        ){
        super(target, css, [...classes, 'circle'], tag, text, childrens, asChild)
    }

    pushCss(target = this.getTarget(), css = this.getCss()){
        /* Add a css of border-radius of radius the bigger between height and width */
        this.addCss('border-radius', '9999px')
        
        super.pushCss(target, css);
    }

}
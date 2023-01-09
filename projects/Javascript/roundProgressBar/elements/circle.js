import {Element} from './element.js'

export class Ellipse extends Element{

    pushCss(target = this.getTarget(), css = this.getCss()){
        /* Add a css of border-radius of radius the bigger between height and width */
        this.addCss('border-radius', '9999px')
        
        super.pushCss(target, css);
    }

}
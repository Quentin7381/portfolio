import { Circle } from "./circle.js";
import { Element } from "./element.js";

export class CircleProgress extends Circle{
    
    constructor(
        progress,
        target,
        css = {},
        classes = [],
        tag = 'div',
        text = 'blablabla',
        childrens = [],
        asChild = false
    ){
        super(target, css, [...classes, 'circleProgress__outer', 'circleProgress'], tag, text, childrens);

        this.addChildren(
            new Circle(
                document.createElement('div'),
                {
                    'clip-path' : this.calcClip(),
                    display : 'flex',
                    margin : 'auto',
                    size : '100%'
                },
                ['circleProgress__progress', 'circleProgress'],
                'div',
                '',
                [new Circle(
                    document.createElement('div'),
                    {
                        'display' : 'flex',
                        'margin' : 'auto',
                        size : '100%'
                    }, 
                    ['circleProgress__inner', 'circleProgress'], 
                    'div', '',
                    [new Element(
                        document.createElement('div'),
                        {
                            margin : 'auto',
                            size : '100%'
                        },
                        ['circleProgress__text', 'circleProgress'],
                        'div', this.getText()
                    )],
                    true
                )],
                true
            )),
            true

        this.progress = progress;
        this.text = '';
        this.display();
    }

    getProgress(){
        return progress;
    }

    setProgress(newProgress){
        this.progress = newProgress;
    }

    addProgress(addedProgress){
        this.progress += addedProgress;
        if(this.progress > 100){
            this.progress = 100;
        } else if (this.progress < 0){
            this.progress = 0;
        }
    }

    calcClip(progress = this.progress){
        /* Transforms the progress in a clip-path that masks 100 - progress % of the element
            progress : the % of progress that the clip-path will be calculated from
        */
        let maskStr = "polygon(50% 50%, 50% 0%",
            stencil = {
                X : 50,
                Y : 0
            },
            axis = 'X',
            direction = 1,
            progressLeft = progress*4;

        while(progressLeft>0){
            console.log("left : ", progressLeft, "| axis : ", axis, "| direction : ", direction, "| mask : ", maskStr, );
            const add = progressLeft > 50? 50 : progressLeft;

            stencil[axis] += direction*add;
            if(stencil[axis]==100||stencil[axis]==0){
                if(axis=='Y'){
                    direction *= -1;
                }
                axis = (axis=='X')? 'Y' : 'X';
            }
            progressLeft -= add;
            maskStr += `, ${stencil['X']}% ${stencil['Y']}%`;
        }

        maskStr += ')';

        return maskStr;
    }

    display(target = this.target){
        super.display();
    }

    genCustomCss(customProperty, value){
    }
}

class ircleProgress{

    constructor(progress, text){
        this.progress = progress;
        this.text = text;
        this.css = {
            size : "200px"
        }
    }

    calcClip(){
        let maskStr = "polygon(50% 50%, 50% 0%",
            stencil = {
                X : 50,
                Y : 0
            },
            axis = 'X',
            direction = 1,
            progressLeft = this.progress*4;

        while(progressLeft>0){
            console.log("left : ", progressLeft, "| axis : ", axis, "| direction : ", direction, "| mask : ", maskStr, );
            const add = progressLeft > 50? 50 : progressLeft;

            stencil[axis] += direction*add;
            if(stencil[axis]==100||stencil[axis]==0){
                if(axis=='Y'){
                    direction *= -1;
                }
                axis = (axis=='X')? 'Y' : 'X';
            }
            progressLeft -= add;
            maskStr += `, ${stencil['X']}% ${stencil['Y']}%`;
        }

        maskStr += ')';

        return maskStr;
    }

    draw(target){
        target.innerHTML = `
            <div class="progressCircle__outer">
                <div class="progressCircle__progress"></div>
                <div class="progressCircle__inner">
                    <div class="progressCircle__text">
                        ${this.text}
                    </div>
                </div>
            </div>
        `;
    }

    setCss(target){
        const elts = target.querySelectorAll("div");
        
        elts[0].style.cssText = `
            --size : 100px
        `
        elts[1].style.clipPath = this.calcClip();
    }
}
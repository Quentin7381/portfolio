const target = document.querySelector(".target");
let progress = 0;



class circle extends element{
    constructor(
        target,
        css = {          
            size : "",
            backgroundColor : ""
        },
        classes = [

        ]
    ){
        this.css = css;
        this.classes = classes;
        this.target = target;
    }

    draw(target){
        target.innerHTML=`
            <div class="circle"></div>
        `
    }

    pushClasses(){

    }

    pushCss(){

    }
}

class circleProgress{

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

const circle1 = new circleProgress(75, "bla");

circle1.calcClip();
circle1.draw(target);
circle1.setCss(target);
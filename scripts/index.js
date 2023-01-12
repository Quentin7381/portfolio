


export class CircleProgress{

    constructor(progress, text, target){
        this.progress = progress;
        this.text = text;
        this.container = target;
        this.target = '';

        console.log(progress, text)

        console.log(this);
        this.draw()
    }

    setProgress(progress){
        this.progress = progress;
        this.calcClip();
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
            const add = progressLeft > 50 ? 50 : progressLeft;

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
        console.log(maskStr);

        console.log(this.target);
        const clipTarget = this.target.querySelector('.progressCircle__progress');
        clipTarget.style.clipPath = maskStr;
    }

    draw(container = this.container){
        const newElt = document.createElement('div');
        newElt.classList.add('progressCircle__outer');
        newElt.innerHTML = `
                <div class="progressCircle__progress">
                </div>
                    <div class="progressCircle__inner">
                        <div class="progressCircle__text">
                            ${this.text}
                        </div>
                    </div>
                
        `;
        
        this.target = newElt;
        container.append(newElt);
        this.calcClip();
    }
}
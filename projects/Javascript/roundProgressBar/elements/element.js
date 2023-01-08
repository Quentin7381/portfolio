export class Element{
    constructor(
        target,
        css = {},
        classes = [],
        tag = 'div'
    ){
        this.css = css;
        this.classes = classes;
        this.target = target;
        this.tag = tag;

        this.draw();
        this.pushClasses();
        this.pushCss();
        
        console.log(this.target.style.cssText);
    }

    getTag(){
        return this.tag;
    }

    setTag(newTag){
        this.tag = newTag;
    }

    getCss(){
        return this.css;
    }

    setCss(newCss){
        this.css = newCss;
    }

    getclasses(){
        return this.classes;
    }

    setclasses(newclasses){
        this.classes = newclasses;
    }

    getTarget(){
        return this.target;
    }

    setTarget(newTarget){
        this.target = newTarget;
    }

    draw(target = this.getTarget()){
        console.log("draw");
        const elt = document.createElement(`${this.getTag()}`);
        elt.classList.add(...target.classList, "element");

        this.getTarget().parentNode.replaceChild(elt, target);
        if(target == this.getTarget()){         
            this.setTarget(elt);
        }
    }

    pushClasses(classes = this.getclasses()){
        console.log("class");
        classes.forEach(elt => {
            this.getTarget().classList.add(elt);
        });
        
    }

    pushCss(css = this.getCss()){
        console.log(this.css);
        const target = this.getTarget();
        for (const key in css) {
            target.style.cssText += `${key} : ${css[key]};`
            console.log(key, css[key], '|', target.style.cssText);
        }
    }
}
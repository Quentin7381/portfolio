

export class Element{
    constructor(
        target,
        css = {},
        classes = [],
        tag = 'div',
        text = '',
        childrens = [],
        asChild = false
    ){
        /*  target : DOM element that will be REPLACED by the new created object
            css : object of properties : value (eg : width : '100px'). /!\ In case of hyphen write 'background-color' and NOT 'backgroundColor'
            classes : class list to be pushed within the object
            tag : the tag of the brackets surrounding the new created object
            text : the text within the object (NO INNER HTML)
            childrens : an array of elements objects that are childrens of this object in the DOM
        */
        
        this.css = css;
        this.classes = [...classes, 'element'];
        this.target = target;
        this.tag = tag;
        this.text = text;
        this.childrens = childrens;
        this.asChild = asChild;


        this.display();
    }

    getChildrens(){
        return this.childrens;
    }

    addChildren(newChild){
        this.childrens.push(newChild);
    }

    removeChildren(oldChild){
        const index = this.childrens.indexOf(oldChild);
        this.childrens.splice(index, index);
    }

    getText(){
        return this.text;
    }

    setText(newText){
        this.text = newText
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

    delCss(oldCssProperty){
        delete this.css[oldCssProperty]
    }

    addCss(newCssProperty, value){
        this.css[newCssProperty] = value;
    }

    setCss(newCss){
        this.css = newCss;
    }

    getClasses(){
        return this.classes;
    }

    setClasses(newclasses){
        this.classes = newclasses;
    }

    removeClass(oldClass){
        const index = this.classes.indexOf(oldClass);
        this.classes.splice(index, index);
    }

    getTarget(){
        return this.target;
    }

    setTarget(newTarget){
        this.target = newTarget;
    }

    display(target = this.getTarget(), asChild = this.asChild){
        /*  Display the object by replacing the target with it
            target : the DOM element that will be REPLACED by the object
        */

        console.log(this);
            
        this.pushClasses(target);
        this.pushCss(target);

        const elt = document.createElement(`${this.getTag()}`);
        elt.classList.add(...target.classList);
        elt.innerText = this.getText();

        if(asChild == false){
            target.parentNode.replaceChild(elt, target);
            if(target == this.getTarget()){         
                this.setTarget(elt);
            }
        }else{
            target.append(elt);
        }
        
        this.appendChildrens(target);
    }

    appendChildrens(target = this.target, childrens = this.childrens){
        childrens.forEach((child) => {
            target.append(child.getTarget());
        })
    }

    pushClasses(target = this.getTarget(), classes = this.getClasses()){    
        /*  Push all the classes contained in the classes in the target of the object 
            classes : an array of string classes to be pushed in the DOM element
            target : the element that will receive the classes
        */
        classes.forEach(elt => {
            target.classList.add(elt);
        });
        
    }

    genCustomCss(customProperty, value){
        /* Transform a custom name css property into one or more css properties
            eg : 'size : 100px' becomes 'width : 100px' & 'height : 100px'
            customCss is deleted afterwards
        */
        switch(customProperty){
            case 'size' :
                this.addCss('width', value);
                this.addCss('height', value);
                break;

            default :
                return;
        }

        this.delCss(customProperty);    
    }

    pushCss(target = this.getTarget(), css = this.getCss()){
        /*
            Push all the css of the object in the target
            /!\ this css will be hight specificity, it should be only used for core properties
            css : an array of two strings arrays. The first string is the property, the second the value
            target : the DOM element that will receive the css properties
        */
        
        
        for(const key in css){
            this.genCustomCss(key, css[key])
        }

        for (const key in css) {
            target.style.cssText += `${key}: ${css[key]};`
        }
        
        
            
    }
}
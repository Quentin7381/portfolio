let tabs = Array.from(document.getElementsByClassName("tab"));

let colors = {
    [tabs[0].id] : ["#E9D9FF","#350080"],
    [tabs[1].id] : ["#CCF8FF","#006E80"],
    [tabs[2].id] : ["#D9FFCC","#258C00"],
    [tabs[3].id] : ["#FFF1CC","#805E00"],
    [tabs[4].id] : ["#FFD1CC","#800D00"] 
}

function assignStyles(){
    for(let tab of tabs){
        tab.style.backgroundColor = colors[tab.id][0];
        tab.style.color = colors[tab.id][1];
    }
    document.body.style.backgroundColor = colors.contacts[0];
}

function tabClick(event){

    target = event.currentTarget;

    for(let tab of tabs){
        tab.classList.remove("active");
        tab.children[1].classList.remove("active");
    }

    target.classList.add("active");
    target.children[1].classList.add("active");

    document.body.style.backgroundColor = colors[target.id][0];
    
}

assignStyles();

for(let tab of tabs){
    tab.addEventListener("click", tabClick, {useCapture : true});
}
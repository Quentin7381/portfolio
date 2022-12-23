

const handArray = [
    document.querySelector(".hour-hand"),
    document.querySelector(".min-hand"),
    document.querySelector(".second-hand")
]

function timeToDegree(time, base){
    time = time%base;
    return time/base*360;
}

function applyTransforms(){
    var date = new Date();
    const timeArray = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ];
    console.log("called");
    handArray[0].style.transform = `rotate(${timeToDegree(timeArray[0],12)}deg)`;
    handArray[1].style.transform = `rotate(${timeToDegree(timeArray[1],60)}deg)`;
    handArray[2].style.transform = `rotate(${timeToDegree(timeArray[2],60)}deg)`;
}

refresh = setInterval(applyTransforms, 100 );

/* A ameliorer :
    La transition depuis la seconde 59 vers la seconde 0 fait revenir l'aiguille en arrière au lieu de continuer en avant
*/
console.log("HelloWorld");

const keyArray = document.getElementsByClassName("key");
const audioArray = document.getElementsByTagName("audio") 
console.log(keyArray);
console.log(audioArray);

document.getElementById("playMe").play();

document.addEventListener('keypress', (e) => {
    console.log(e.code);
    switch(e.code){
        case 'KeyQ' :
            keyArray[0].classList.add("playing");
            audioArray[0].play();
            break;
        case 'KeyW' : 
            keyArray[1].classList.add("playing");
            audioArray[1].play();
            break;
        case 'KeyE' : 
            keyArray[2].classList.add("playing");
            audioArray[2].play();
            break;
        case 'KeyR' : 
            keyArray[3].classList.add("playing");
            audioArray[3].play();
            break;
        case 'KeyT' : 
            keyArray[4].classList.add("playing");
            audioArray[4].play();
            break;
        case 'KeyY' : 
            keyArray[5].classList.add("playing");
            audioArray[5].play();
            break;
        case 'KeyU' : 
            keyArray[6].classList.add("playing");
            audioArray[6].play();
            break;
        case 'KeyI' : 
            keyArray[7].classList.add("playing");
            audioArray[7].play();
            break;
        case 'KeyO' : 
            keyArray[8].classList.add("playing");
            audioArray[8].play();
            break;
    }
})

/* Problèmes rencontrés :
    L'audio doit être lu intégralement avant d'être joué à nouveau (pafois long)
    Retirer la classe "playing" trop vite empêche l'affichage de la bordure. Un minuteur ne semble pas être une solution maladroite
    Le switch fonctionne, mais la maintenance du code est terrible : la même app utilisant toutes les touches du clavier serait un calvaire à coder de cette manière
*/
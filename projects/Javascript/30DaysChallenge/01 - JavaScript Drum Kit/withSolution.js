function playAudio(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)

    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

function reverseTransition(e){
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

window.addEventListener('keydown', playAudio);

const keys = document.getElementsByClassName("key");
for (const key of keys) {
    document.addEventListener('transitionend', reverseTransition)
}

/* Ce que j'ai appris :
    le switch peut être remplacé par un querySelector ce qui permet d'avoir une fonction générique
    la propriete currentTime des tags audio permet de revenir à un temps de lecture choisi, et donc de rejouer instantanément l'audio
    il existe des event listener transition<...> pour écouter le status d'une transition sur les éléments écoutés

    Ce que je pourrais améliorer :
    Déplacer les querySelector en début de programme pour créer deux arrays devrait augmenter les performance (querySelector joué seulement en chargement de page)
    Ajuster les keys pour qu'elles correspondent au clavier français
*/
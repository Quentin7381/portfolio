/*  Ce que je pourrais améliorer :
    Déplacer les querySelector en début de programme pour créer deux arrays devrait augmenter les performance (querySelector joué seulement en chargement de page) : pas OK
    Ajuster les keys pour qu'elles correspondent au clavier français : OK
*/

/* Note : le code suivant ne fonctionne pas, les commentaires ont été laissés pour clarifier ce qui a voulu être fait */

const audios = Array; //on crée un Array audios vide destine a recevoir les elements audios
const keys = Array; // même chose pour les elements possédant une classe keys


document.getElementsByTagName('audio').forEach(audio => { // pour chaque element de type audio
    audios.push({ //j'ajoute dans mon array audios
        audio.dataset.key : audio // une paire clé - valeur prenant pour clé le nombre audio.dataset.key (la touche associée), et pour valeur l'élément audio
    })
});

document.getElementsByClassName('audio').forEach(key => { // même chose pour les elements de classe key
    keys.push({
        key.dataset.key : key
    })
});

function playAudio(e){
    const audio = audios[e.keyCode] // J'accède à l'audio correspondant à la touche associée à l'évènement
    const key = keys[e.keyCode] // même chose pour la key

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

for (const key of keys) {
    document.addEventListener('transitionend', reverseTransition)
}
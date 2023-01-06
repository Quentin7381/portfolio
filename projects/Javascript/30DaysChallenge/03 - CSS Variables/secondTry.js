const input = document.querySelectorAll("input");

function refresh(){
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

input.forEach(elt => {
    elt.addEventListener('mousemove', refresh);
});

/* Ce que j'ai appris
    l'utilisation des data tag et name permet de créer des fonctions génériques
*/
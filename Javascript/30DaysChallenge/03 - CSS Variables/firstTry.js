const spacingInput = document.getElementById("spacing");
const blurInput = document.getElementById("blur");
const baseInput = document.getElementById("base");
const frame = document.querySelector(".frame");
const img = document.querySelector("img");

console.log(spacingInput);
console.log(frame);

spacingInput.addEventListener('change', (e)=> {
    frame.style.setProperty('--spacing', `${spacingInput.value}px`)
});

blurInput.addEventListener('change', (e)=> {
    img.style.setProperty('--blur', `${blurInput.value}px`)
});

baseInput.addEventListener('change', (e)=> {
    console.log(baseInput.value);
    frame.style.setProperty('--base', `${baseInput.value}`)
});
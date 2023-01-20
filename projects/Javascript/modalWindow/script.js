'use strict';

const btnsShowModal = document.querySelectorAll('.show-modal'),
    modal = document.querySelector('.modal'),
    btnCloseModal = document.querySelector('.close-modal'),
    overlay = document.querySelector('.overlay');

function openModal(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsShowModal.forEach((elt) => {
    elt.addEventListener('click', openModal);
});

[btnCloseModal, overlay].forEach((elt) => {
    elt.addEventListener('click', closeModal);
});

window.addEventListener('keydown', (e) => {
    if(e.key==='Escape') closeModal();
})
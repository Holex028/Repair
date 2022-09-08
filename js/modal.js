let openPopUp = document.querySelectorAll('.btn-text');
let popUp = document.querySelectorAll('#modal-call');
let closePopUp = document.querySelector('.modal__close');

openPopUp[0].addEventListener('click', function(e) {
    e.preventDefault();
    popUp.classList.add('active');
})

openPopUp[1].addEventListener('click', function(e) {
    e.preventDefault();
    popUp.classList.add('active');
})
let modal = document.getElementById('modal')
let overlay = document.getElementById('overlay')
let openModal = document.getElementById('openModal')
let closeModal = document.getElementById('closeModal')

let drawer = document.getElementById('productDrawer')
let closeDrawer = document.getElementById('closeDrawer')

let problemModal = document.getElementById('problemModal')
let catModal = document.getElementById('catModal')

let successMessage = document.getElementById('successMessage')

openModal.onclick = function () {
    modal.classList.add('show')
    overlay.classList.add('show')
}

closeModal.onclick = function () {
    modal.classList.remove('show')
    overlay.classList.remove('show')
}

closeDrawer.onclick = function () {
    drawer.classList.remove('show')
    overlay.classList.remove('show')
}

overlay.onclick = function () {
    modal.classList.remove('show')
    drawer.classList.remove('show')
    problemModal.classList.remove('show')
    catModal.classList.remove('show')
    overlay.classList.remove('show')
}

function problemModalBagla() {
    problemModal.classList.remove('show')
    overlay.classList.remove('show')
}

function showMessage(text) {
    successMessage.innerHTML = text

    setTimeout(() => {
        successMessage.innerHTML = ''
    }, 2000)
}
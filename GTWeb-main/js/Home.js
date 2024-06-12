const modalDentesRetos = document.querySelector('.modal-containerDentesRetos')
const modalConicas = document.querySelector('.modal-containerConicas')
const modalHelicoidal = document.querySelector('.modal-containerHelicoidal')
const modalTransmissao = document.querySelector('.modal-containerTransmissao')

function openModalDentesRetos() {
  modalDentesRetos.classList.add('activeDentesRetos')
}
function closeModalDentesRetos() {
  modalDentesRetos.classList.remove('activeDentesRetos')
}
function openModalConicas() {
  modalConicas.classList.add('activeConicas')
}
function closeModalConicas() {
  modalConicas.classList.remove('activeConicas')
}
function openModalHelicoidal() {
  modalHelicoidal.classList.add('activeHelicoidal')
}
function closeModalHelicoidal() {
  modalHelicoidal.classList.remove('activeHelicoidal')
}
function openModalTransmissao() {
  modalTransmissao.classList.add('activeTransmissao')
}
function closeModalTransmissao() {
  modalTransmissao.classList.remove('activeTransmissao')
}
function sair() {
  window.location.href = 'WelcometoGearTech.html'
  localStorage.removeItem('token')
}

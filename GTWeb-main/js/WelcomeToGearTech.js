function expandSearch() {
  var searchInput = document.getElementById("searchInput");
  searchInput.classList.toggle("expand");
  searchInput.focus();
}
function saibaMais() {
  var textoAluno = document.getElementById("textoAluno");
  textoAluno.classList.toggle("expandTexto")
  textoAluno.focus();
}

let darkMode = localStorage.getItem('darkMode') === 'true';

applyMode(); // Aplicar o modo escuro inicialmente
function applyMode() {
  var imgAluno = document.getElementById('imgAluno');
  if (darkMode) {
    document.documentElement.style.setProperty("--body-color", "#18191a");
    document.documentElement.style.setProperty("--sidebar-color", "#242526");
    document.documentElement.style.setProperty("--corDestaque", "#e71d36");
    document.documentElement.style.setProperty("--selectBar-color", "#3a3b3c");
    document.documentElement.style.setProperty("--toggle-color", "#e2e2e2");
    document.documentElement.style.setProperty("--text-color", " #fff");
  } else {
    document.documentElement.style.setProperty("--body-color", "#e4e9f7");
    document.documentElement.style.setProperty("--sidebar-color", "#fff");
    document.documentElement.style.setProperty("--corDestaque", "#0096c7");
    document.documentElement.style.setProperty("--selectBar-color", "#dddce9");
    document.documentElement.style.setProperty("--toggle-color", "#333");
    document.documentElement.style.setProperty("--text-color", "#000");
  }
}

function scrollToSection() {
  // Encontrar a posição da seção de destino
  const section = document.getElementById('secaoDestino');
  const sectionPosition = section.offsetTop;

  // Rolar a página até a posição da seção
  window.scrollTo({
    top: sectionPosition,
    behavior: 'smooth' // Isso faz com que a rolagem seja suave
  });
}

const a2 = document.getElementById("a2");
function temporizador() {
  setTimeout(() => {

  }, "1000");
}
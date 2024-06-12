const body = document.querySelector("body"),
  BarraLateral = body.querySelector(".BarraLateral"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwtich = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  BarraLateral.classList.toggle("close");
});
searchBtn.addEventListener("click", () => {
  BarraLateral.classList.remove("close");
});

let darkMode = localStorage.getItem("darkMode") === "true";
applyMode();
modeSwtich.addEventListener("click", toggleMode);
function toggleMode() {
  darkMode = !darkMode;
  applyMode(); // Aplicar o modo escuro quando o botão é clicado
  localStorage.setItem("darkMode", darkMode);
  body.classList.toggle("dark");
}
function applyMode() {
  if (darkMode) {
    document.documentElement.style.setProperty("--body-color", "#18191a");
    document.documentElement.style.setProperty("--sidebar-color", "#242526");
    document.documentElement.style.setProperty("--corDestaque", "#e71d36");
    document.documentElement.style.setProperty("--selectBar-color", "#3a3b3c");
    document.documentElement.style.setProperty("--toggle-color", "#e2e2e2");
    document.documentElement.style.setProperty("--text-color", " #fff");
    modeText.innerText = "Modo Claro";
  } else {
    document.documentElement.style.setProperty("--body-color", "#e4e9f7");
    document.documentElement.style.setProperty("--sidebar-color", "#fff");
    document.documentElement.style.setProperty("--corDestaque", "#0096c7");
    document.documentElement.style.setProperty("--selectBar-color", "#dddce9");
    document.documentElement.style.setProperty("--toggle-color", "#333");
    document.documentElement.style.setProperty("--text-color", "#000");
    modeText.innerText = "Modo Escuro";
  }
}

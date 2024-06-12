function ValidarCadastro() {
  var inputNomeText = document.getElementById("inputNomeText").value;
  var inputNIFText = document.getElementById("inputNIFText").value;
  var inputEmailProfessor = document.getElementById("inputEmailProfessor").value;
  var inputSenhaText = document.getElementById("inputSenhaText").value;
  var inputSenhaConfirmeText = document.getElementById(
    "inputSenhaConfirmeText"
  ).value;

  const apiUrl = "http://10.110.12.16:8080/auth/registerProfessor";

  var errorNome = document.getElementById("errorNome");
  var errorNIF = document.getElementById("errorNIF");
  var errorSenha = document.getElementById("errorSenha");
  var errorEmailProfessor = document.getElementById("errorEmailProfessor");
  var errorConfirmeSenha = document.getElementById("errorConfirmeSenha");

  errorNome.textContent = "";
  errorEmailProfessor.textContent = "";
  errorNIF.textContent = "";
  errorSenha.textContent = "";
  errorConfirmeSenha.textContent = "";

  var nomeRegex = /^[a-zA-Z\s]+$/;
  var numNIFRegex = /^\d{8}$/;

  var isValid = true; // Flag para verificar se todas as informações estão corretas

  if (inputNomeText === "") {
    errorNome.textContent = "*Insira um nome.";
    isValid = false;
  } else if (!nomeRegex.test(inputNomeText)) {
    errorNome.textContent = "*Nome deve conter apenas letras.";
    isValid = false;
  }
  if (inputNIFText === "") {
    errorNIF.textContent = "*Insira o numero do NIF.";
    isValid = false;
  } else if (!numNIFRegex.test(inputNIFText)) {
    errorNIF.textContent = "*Numero de NIF não aceito";
    isValid = false;
  }
  if (inputSenhaText === "") {
    errorSenha.textContent = "*Insira uma senha.";
    isValid = false;
  } else if (inputSenhaText.length < 8) {
    errorSenha.textContent = "*A senha não pode ter menos de 8 dígitos.";
    isValid = false;
  } else if (inputSenhaText.length > 20) {
    errorSenha.textContent = "*A senha não pode ter mais de 20 dígitos.";
    isValid = false;
  }
  if (inputSenhaConfirmeText === "") {
    errorConfirmeSenha.textContent = "*Confirme a senha.";
    isValid = false;
  } else if (inputSenhaConfirmeText !== inputSenhaText) {
    errorConfirmeSenha.textContent = "*As senhas não coincidem.";
    isValid = false;
  }

  // Se todas as informações estiverem corretas, execute uma ação
  if (isValid) {
    axios
      .post(apiUrl, {
        nome: inputNomeText,
        nif: inputNIFText,
        email: inputEmailProfessor,
        senha: inputSenhaText
      })
      .then(function (response) {
        console.log("Sim", response);
        setTimeout(function () {
          window.location.href = "LoginProfessor.html";
        }, 1000);
      })
      .catch(function (error) {
        console.log("Nao", error);
      });
  }
}

function togglePasswordVisibilitySenha() {
  var passwordInput = document.getElementById("inputSenhaText");
  var showPasswordIcon = document.getElementById("showPasswordIconSenha");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    // Troca o ícone para o olho aberto quando a senha é exibida
    showPasswordIcon.setAttribute("name", "eye-off-outline");
  } else {
    passwordInput.type = "password";
    // Troca o ícone para o olho fechado quando a senha é ocultada
    showPasswordIcon.setAttribute("name", "eye-outline");
  }
}
function togglePasswordVisibilityConfiSenha() {
  var passwordInput = document.getElementById("inputSenhaConfirmeText");
  var showPasswordIcon = document.getElementById("showPasswordIconConfiSenha");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    // Troca o ícone para o olho aberto quando a senha é exibida
    showPasswordIcon.setAttribute("name", "eye-off-outline");
  } else {
    passwordInput.type = "password";
    // Troca o ícone para o olho fechado quando a senha é ocultada
    showPasswordIcon.setAttribute("name", "eye-outline");
  }
}

let darkMode = localStorage.getItem("darkMode") === "true";

applyMode(); // Aplicar o modo escuro inicialmente
function applyMode() {
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

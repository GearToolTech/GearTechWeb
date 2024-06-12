async function ValidarEntrada() {
  var inputNIFText = document.getElementById("inputNIFText").value;
  var inputSenhaText = document.getElementById("inputSenhaText").value;
  var errorNIF = document.getElementById("errorNIF");
  var errorSenha = document.getElementById("errorSenha");

  const apiUrl = "http://10.110.12.16:8080/auth/loginProfessor";

  const apiUrlToken = "http://10.110.12.16:8080/professor";

  errorNIF.textContent = "";
  errorSenha.textContent = "";

  var NIFRegex = /^\d{8}$/;
  if (!NIFRegex.test(inputNIFText)) {
    errorNIF.textContent = "*Por favor, insira um NIF válido.";
  }

  if (inputSenhaText === "") {
    errorSenha.textContent = "*Insira uma senha.";
  } else if (inputSenhaText.length < 8) {
    errorSenha.textContent = "*Senha incorreta.";
  } else if (inputSenhaText.length > 20) {
    errorSenha.textContent = "*Senha incorreta.";
  }

  // Verifica se não há mensagens de erro
  if (errorNIF.textContent === "" && errorSenha.textContent === "") {
    // Se todas as validações passarem, redireciona para "Home.html" após 1 segundo
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("tokenProfessor");
      localStorage.removeItem("id");
      const response = await axios.post(apiUrl, {
        nif: inputNIFText,
        senha: inputSenhaText,
      });
      const tokenProfessor = response.data.token;
      localStorage.setItem("token", tokenProfessor);
      if (tokenProfessor != null) {
        console.log("Token: ", tokenProfessor);
        axios.get(apiUrlToken, {
          headers: {
            "Authorization" : `Bearer ${tokenProfessor}`
          }
        })
        .then(response => {
          const id = response.data;
          localStorage.setItem("id", id);
          const user = "professor"
          localStorage.setItem("user", user);
          console.log(id);
        })
        .catch(error => {
          console.error("Error: ", error);
        });
      
        setTimeout(function () {
          window.location.href = "Home.html";
        }, 1000);
      } else {
        console.log("Não");
      }
      return token;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }
}

function togglePasswordVisibility() {
  var passwordInput = document.getElementById("inputSenhaText");
  var showPasswordIcon = document.getElementById("showPasswordIcon");

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
    document.documentElement.style.setProperty("--toggle-color", "##e2e2e2");
    document.documentElement.style.setProperty("--text-color", " #fff");
    document.documentElement.style.setProperty("--link-color", " #fcbf49");
  } else {
    document.documentElement.style.setProperty("--body-color", "#e4e9f7");
    document.documentElement.style.setProperty("--sidebar-color", "#fff");
    document.documentElement.style.setProperty("--corDestaque", "#0096c7");
    document.documentElement.style.setProperty("--selectBar-color", "#dddce9");
    document.documentElement.style.setProperty("--toggle-color", "#333");
    document.documentElement.style.setProperty("--text-color", "#000");
    document.documentElement.style.setProperty("--link-color", " #0096c7");
  }
}

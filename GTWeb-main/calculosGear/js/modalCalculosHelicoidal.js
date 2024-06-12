function limparInputs3() {
  document.getElementById('modulo5Input').value = "";
  document.getElementById('modulo6Input').value = "";
  document.getElementById('numeroDentes5Input').value = "";
  document.getElementById('numeroDentes6Input').value = "";
  document.getElementById('AnguloInclinacaoInput').value = "";
}

function calcularHelicoidal() {
  var modulo5Input = parseFloat(document.getElementById('modulo5Input').value)
  var modulo6Input = parseFloat(document.getElementById('modulo6Input').value)
  var numeroDentes5Input = parseFloat(
    document.getElementById('numeroDentes5Input').value
  )
  var numeroDentes6Input = parseFloat(
    document.getElementById('numeroDentes6Input').value
  )
  var AnguloInclinacaoInput = parseFloat(
    document.getElementById('AnguloInclinacaoInput').value
  )

  if (
    isNaN(modulo5Input) ||
    isNaN(modulo6Input) ||
    isNaN(numeroDentes5Input) ||
    isNaN(numeroDentes6Input) ||
    isNaN(AnguloInclinacaoInput)
  ) {
    alert('Erro: Entradas inválidas')
    return
  }

  const CirculoPrimitivo1 = modulo5Input * numeroDentes5Input
  const CirculoPrimitivo2 = modulo6Input * numeroDentes6Input
  const ModuloNormal = modulo5Input / Math.cos(AnguloInclinacaoInput)
  const PassoNormal = Math.PI * ModuloNormal
  const PassoHelicoidal = PassoNormal / Math.cos(AnguloInclinacaoInput)
  const DistanciaEntreEixos = (CirculoPrimitivo2 - CirculoPrimitivo1) / 2

  let resultadoString = `
      <table border="1">
          <tr>
              <th>Parâmetro</th>
              <th>Valor</th>
          </tr>
          <tr>
              <td>Círculo Primitivo 1</td>
              <td>${CirculoPrimitivo1.toFixed(3)}</td>
          </tr>
          <tr>
              <td>Círculo Primitivo 2</td>
              <td>${CirculoPrimitivo2.toFixed(3)}</td>
          </tr>
          <tr>
              <td>Módulo Normal</td>
              <td>${ModuloNormal.toFixed(3)}</td>
          </tr>
          <tr>
              <td>Passo Normal</td>
              <td>${PassoNormal.toFixed(3)}</td>
          </tr>
          <tr>
              <td>Passo Helicoidal</td>
              <td>${PassoHelicoidal.toFixed(3)}</td>
          </tr>
          <tr>
              <td>Distância Entre Eixos</td>
              <td>${DistanciaEntreEixos.toFixed(3)}</td>
          </tr>
      </table>
  `;

  const id = localStorage.getItem("id");

  axios
    .post(apiUrl + "resultadoDentesHelicoidas", {
      circuloPrimitivo1: CirculoPrimitivo1,
      circuloPrimitivo2: CirculoPrimitivo2,
      moduloNormal: ModuloNormal,
      passoNormal: PassoNormal,
      passoHelicoidal: PassoHelicoidal,
      distanciaEntreEixos: DistanciaEntreEixos,
      aluno: {
        numMatricula: id
      }
    })
    .then(function (response) {
      console.log('Sim', response)
    })
    .catch(function (error) {
      console.log('Nao', error)
    });

  // Atribua a string formatada ao elemento <p> resultadoHelicoidal
  document.getElementById('resultadoHelicoidal').innerHTML = resultadoString
}

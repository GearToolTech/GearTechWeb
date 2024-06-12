function limparInputs2() {
  document.getElementById('modulo3Input').value = "";
  document.getElementById('modulo4Input').value = "";
  document.getElementById('numeroDentes3Input').value = "";
  document.getElementById('numeroDentes4Input').value = "";
  document.getElementById('numeroAngulo1Input').value = "";
  document.getElementById('numeroAngulo2Input').value = "";
}

function calcularConicas() {
  var modulo3Input = parseFloat(document.getElementById('modulo3Input').value)
  var modulo4Input = parseFloat(document.getElementById('modulo4Input').value)
  var numeroDentes3Input = parseFloat(
    document.getElementById('numeroDentes3Input').value
  )
  var numeroDentes4Input = parseFloat(
    document.getElementById('numeroDentes4Input').value
  )
  var numeroAngulo1Input = parseFloat(
    document.getElementById('numeroAngulo1Input').value
  )
  var numeroAngulo2Input = parseFloat(
    document.getElementById('numeroAngulo2Input').value
  )

  if (
    isNaN(modulo3Input) ||
    isNaN(modulo4Input) ||
    isNaN(numeroDentes3Input) ||
    isNaN(numeroDentes4Input) ||
    isNaN(numeroAngulo1Input) ||
    isNaN(numeroAngulo2Input)
  ) {
    alert('Erro: Entradas inválidas')
    return
  }

  const CirculoPrimitivo1 = modulo3Input * numeroDentes3Input
  const CirculoPrimitivo2 = modulo4Input * numeroDentes4Input
  const AnguloConeCabe1 =
    (numeroDentes3Input + 2 * Math.cos((numeroAngulo1Input * Math.PI) / 180)) /
    (numeroDentes4Input - 2 * Math.sin((numeroAngulo1Input * Math.PI) / 180))
  const AnguloConeCabe2 =
    (numeroDentes4Input + 2 * Math.cos((numeroAngulo2Input * Math.PI) / 180)) /
    (numeroDentes3Input - 2 * Math.sin((numeroAngulo2Input * Math.PI) / 180))
  const AnguloPrimitivo1 = CirculoPrimitivo1 / CirculoPrimitivo2
  const AnguloPrimitivo2 = CirculoPrimitivo2 / CirculoPrimitivo1
  const AnguloEixos = AnguloPrimitivo1 + AnguloPrimitivo2

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
        <td>Ângulo Cone Cabeça 1</td>
        <td>${AnguloConeCabe1.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Ângulo Cone Cabeça 2</td>
        <td>${AnguloConeCabe2.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Ângulo Primitivo 1</td>
        <td>${AnguloPrimitivo1.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Ângulo Primitivo 2</td>
        <td>${AnguloPrimitivo2.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Ângulo Entre Eixos</td>
        <td>${AnguloEixos.toFixed(3)}</td>
      </tr>
    </table>
  `;

  const id = localStorage.getItem("id");
  
   axios
    .post(apiUrl + "resultadoDentesConicos", {
      circuloPrimitivo1: CirculoPrimitivo1,
      circuloPrimitivo2: CirculoPrimitivo2,
      anguloConeCabe1: AnguloConeCabe1,
      anguloConeCabe2: AnguloConeCabe2,
      anguloPrimitivo1: AnguloPrimitivo1,
      anguloPrimitivo2: AnguloPrimitivo2,
      anguloEixos: AnguloEixos,
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
  document.getElementById('resultadoConicas').innerHTML = resultadoString
}

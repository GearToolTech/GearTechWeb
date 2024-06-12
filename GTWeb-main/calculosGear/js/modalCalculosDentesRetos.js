function limparInputs1() {
  document.getElementById("modulo1Input").value = "";
  document.getElementById("modulo2Input").value = "";
  document.getElementById("numeroDentes1Input").value = "";
  document.getElementById("numeroDentes2Input").value = "";
}

function calcularDentesRetos() {
  let modulo1Input = parseFloat(document.getElementById("modulo1Input").value);
  let modulo2Input = parseFloat(document.getElementById("modulo2Input").value);
  let numeroDentes1Input = parseFloat(document.getElementById("numeroDentes1Input").value);
  let numeroDentes2Input = parseFloat(document.getElementById("numeroDentes2Input").value);

  if (isNaN(modulo1Input) || isNaN(modulo2Input) || isNaN(numeroDentes1Input) || isNaN(numeroDentes2Input)) {
    alert("Erro: Entradas inválidas");
    return;
  }

  const CirculoPrimitivo1 = modulo1Input * numeroDentes1Input;
  const CirculoPrimitivo2 = modulo2Input * numeroDentes2Input;
  const passo = Math.PI * modulo1Input;
  const folgaCabeca = 0.167 * modulo1Input;
  const alturaCabecaDente = modulo1Input;
  const alturaPeDente = modulo1Input + folgaCabeca;
  const alturaDente = 2 * modulo1Input + folgaCabeca;
  const circuloCabeca = CirculoPrimitivo1 + 2 * modulo1Input;
  const circuloPe = CirculoPrimitivo1 - 2 * (modulo1Input + folgaCabeca);
  const distanciaEixos = CirculoPrimitivo1 / 2 + CirculoPrimitivo1 / 2;
  const circuloCabecaInterno = CirculoPrimitivo1 - 2 * modulo1Input;
  const circuloPeInterno = CirculoPrimitivo1 + 2 * (modulo1Input + folgaCabeca);
  const distanciaEixosInterno = (CirculoPrimitivo2 - CirculoPrimitivo1) / 2;

  // Organize the results in an HTML table
  let resultadoString = `
    <table border="1">
      <tr>
        <th>Parâmetro</th>
        <th>Valor</th>
      </tr>
      <tr>
        <td>Circulo Primitivo 1</td>
        <td>${CirculoPrimitivo1.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Passo</td>
        <td>${passo.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Folga da Cabeça</td>
        <td>${folgaCabeca.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Altura da Cabeça do Dente</td>
        <td>${alturaCabecaDente.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Altura Pe do Dente</td>
        <td>${alturaPeDente.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Altura do Dente</td>
        <td>${alturaDente.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Circulo da Cabeça</td>
        <td>${circuloCabeca.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Circulo Pe</td>
        <td>${circuloPe.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Distancia dos Eixos</td>
        <td>${distanciaEixos.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Circulo da Cabeça Interno</td>
        <td>${circuloCabecaInterno.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Circulo Pe Interno</td>
        <td>${circuloPeInterno.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Circulo Primitivo 2</td>
        <td>${CirculoPrimitivo2.toFixed(3)}</td>
      </tr>
      <tr>
        <td>Distancia dos Eixos Interno</td>
        <td>${distanciaEixosInterno.toFixed(3)}</td>
      </tr>
    </table>
  `;

  const id = localStorage.getItem("id");

  axios
    .post(apiUrl + "resultadoDentesRetos", {
      circuloPrimitivo1: CirculoPrimitivo1,
      circuloPrimitivo2: CirculoPrimitivo2,
      passo: passo,
      folgaCabeca: folgaCabeca,
      alturaCabecaDente: alturaCabecaDente,
      alturaPeDente: alturaPeDente,
      alturaDente: alturaDente,
      circuloCabeca: circuloCabeca,
      circuloPe: circuloPe,
      distanciaEixos: distanciaEixos,
      circuloCabecaInterno: circuloCabecaInterno,
      circuloPeInterno: circuloPeInterno,
      distanciaEixosInterno: distanciaEixosInterno,
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




  document.getElementById("resultadoDentesRetos").innerHTML = resultadoString;
}
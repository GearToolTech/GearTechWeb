document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-input-btn');
  const removeButton = document.getElementById('remove-input-btn')
  let inputCount = 0;

  addButton.addEventListener('click', addInput);
  removeButton.addEventListener('click', removeInput)

  function addInput() {
    const inputsContainer = document.getElementById('inputs-container');
    if (inputCount < 8) {
      inputCount++;
      const input = document.createElement('input');
      input.type = 'number';
      input.name = 'input' + inputCount;
      input.placeholder = 'Input ' + inputCount;
      inputsContainer.appendChild(input);
    } else {
      alert('Você atingiu o limite máximo de inputs (8).');
    }
  }
  function removeInput() {
    const inputsContainer = document.getElementById('inputs-container');
    const inputs = inputsContainer.querySelectorAll('input[type="number"]');
    
    if (inputs.length > 0) {
        inputs[inputs.length - 1].remove();
        inputCount--;
    }
}
});

function calcularTransmissao() {
  const inputs = document.querySelectorAll('#inputs-container input');
  const numerosDentes = Array.from(inputs).map(input => parseInt(input.value));

  if (numerosDentes.length === 0 || numerosDentes.some(dente => isNaN(dente))) {
    alert('Por favor, preencha todos os inputs com valores numéricos válidos.');
    return;
  }

  const result = Calculos(numerosDentes);
  if (result) {
    result.then(res => {
    resultadoTransmissao.textContent = `Relação de transmissão total (iTotal): ${res.iTotal}, Multiplicação das relações individuais de transmissão (Iindividuais): ${res.Iindividuais}`;

    const id = localStorage.getItem("id");

    const iTotal = res.iTotal;

    const iIndividuais = res.Iindividuais;

    axios.post(apiUrl + "resultadoTransmissoes", {
      iTotal: iTotal,
      iIndividuais: iIndividuais,
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
    })
  }
}

const Calculos = async (numerosDentes) => {
  if (!numerosDentes || numerosDentes.length === 0) {
    console.error("Números de dentes das engrenagens não foram fornecidos!");
    return null;
  }

  // Verificando se todos os valores em numerosDentes são números válidos
  if (numerosDentes.some((dente) => isNaN(parseInt(dente)))) {
    console.error("Um ou mais valores de números de dentes não são válidos!");
    return null;
  }

  const numeroEngrenagens = numerosDentes.length;

  // Calculando o numerador e o denominador da relação de transmissão total
  let numerador = 1;
  let denominador = 1;
  for (let i = 1; i < numeroEngrenagens; i += 2) {
    numerador *= numerosDentes[i];
    denominador *= numerosDentes[i - 1];
  }

  // Calculando a relação de transmissão total
  const iTotal = numerador / denominador;

  // Calculando a multiplicação das relações individuais de transmissão
  let Iindividuais = 1;
  for (let i = 1; i < numeroEngrenagens; i += 2) {
    Iindividuais *= numerosDentes[i] / numerosDentes[i - 1];
  }

  return {
    iTotal: iTotal.toFixed(3),
    Iindividuais: Iindividuais.toFixed(3),
  };
};

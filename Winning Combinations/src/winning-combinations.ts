type WinningCombinationsResult = [number, number[]][];

// Logic that will be developed - store the paying numbers and the wild card in a variable.
// After that, I need to go through the line in search of the result of 3 equal or greater symbols in sequence.

function call(lines: number[]): WinningCombinationsResult {
  // Variavél para guardar os valores válidos
  const symbolsPayment: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Variavél para guardar o símbolo coringa
  const symbolZero: number = 0;

  // Variavél que será retornada no final da função
  let result: [number, number[]][] = [];

  let countSymbol: number = 0;

  // Função para validar se o símbolo é um symbolo válido
  function validateSymbol(elem: number, array: number[]) {
    // Se não tiver elemento, para aqui
    if (!elem) {
      return false;

      // Caso o elemento esteja incluido nos símbolos de pagamento, retorna True
    } else {
      return array.includes(elem);
    }
  }

  function validateZero(elem: number) {
    // Se não tiver elemento, para aqui
    if (elem == 0) {
      return true;
    } else {
      return false;
    }
  }

  function resultPreparZero(elem: number, indice: number, array: number[]) {}

  // Função para realizar a contagem de sequência de simbolos, aonde se for maior que 2 retorna True e se for menor, retorna False
  function symbolCount(elem: number, indice: number, array: number[]) {
    countSymbol = 0;
    // Primeira validação o próximo item do array tem que ser igual ao elemento ou coringa
    if (elem == array[indice + 1] || array[indice + 1] == 0) {
      countSymbol++;
    } else {
      return false;
    }
    // Segunda validação depois de 2 casas o item do array tem que ser igual ao elemento ou coringa
    if (elem == array[indice + 2] || array[indice + 2] == 0) {
      countSymbol++;
    }
    return countSymbol >= 2;
  }

  // Função para prerar o resultado caso o "countSymbol" for maior que 2, isto é, encontrar 3 na sequência
  function resultPrepar(elem: number, indice: number, array: number[]) {
    if (
      array[indice + 4] == 0 ||
      (elem == array[indice + 4] && array[indice + 3] == 0) ||
      elem == array[indice + 3]
    ) {
      if (array[indice + 4] == undefined) {
        let auxResult: [number, number[]] = [
          elem,
          [indice, indice + 1, indice + 2, indice + 3],
        ];
        result.push(auxResult);
      } else {
        let auxResult: [number, number[]] = [
          elem,
          [indice, indice + 1, indice + 2, indice + 3, indice + 4],
        ];
        result.push(auxResult);
      }
    } else if (array[indice + 3] == 0 || elem == array[indice + 3]) {
      let auxResult: [number, number[]] = [
        elem,
        [indice, indice + 1, indice + 2, indice + 3],
      ];
      result.push(auxResult);
    } else {
      let auxResult: [number, number[]] = [
        elem,
        [indice, indice + 1, indice + 2],
      ];
      result.push(auxResult);
    }
  }

  // Pendente - Concluir as validações do 0!
  function validAllZero(array: number[]) {
    let initialValue = 0;
    const sumWithInitial = array.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    if (sumWithInitial == 0) {
      return true;
    } else {
      return false;
    }
  }

  // Percorrendo o array de lines e chamando as funções feitas anteriormente.
  lines.forEach((elem, index) => {
    // Validação do simbolo iniciando em Zero
    const symbolZero = validateZero(elem);

    if (symbolZero) {
      const allZero = validAllZero(lines);

      if (allZero) {
        result = [[0, [0, 1, 2, 3, 4]]];
        console.log(result);
        return result;
      } else {
        resultPreparZero(elem, index, lines);
      }
    }

    // Valida se o simbolo é um tipo "válido"
    const symbolValid = validateSymbol(elem, symbolsPayment);

    // Se for do tipo válido, irá realizar a contagem para encontrar 3 ou mais elementos repetidos (considerando o coringa)
    if (symbolValid) {
      const findSymbol = symbolCount(elem, index, lines);
      if (findSymbol) {
        // validação para se no percorrer do array for encontrado algum pagamento, não repetir 2x o mesmo pagamento
        // com o mesmo símbolo
        if (result[0] == undefined || result[0][0] !== elem) {
          resultPrepar(elem, index, lines);
        }
      }
    }
  });

  return result;
}
export const WinningCombinations = { call };

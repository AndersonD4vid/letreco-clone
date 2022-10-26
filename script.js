// Selecionando a div responsável pelas linhas e coluna
const tiles = document.querySelector(".tile-container");
// Criando div apagar e enter
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
// Adiciondo as letras do teclado
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

// Letras que iremos usar
const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

// Adicionando 6 linhas e 5 colunas
const rows = 6;
const columns = 5;
// Verifica qual posição da linha e da coluna estou
let currentRow = 0;
let currentColumn = 0;

// Letreco: Palavras
const letreco = "VASCO";
// Mapa do letreco
let letrecoMap = {};
for (let index = 0; index < letreco.length; index++) {
  letrecoMap[letreco[index]] = index;
}
// Palpites
const guesses = [];

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  guesses[rowIndex] = new Array(columns);
  // Criando uma div para a fileira de 6 linhas
  const tileRow = document.createElement("div");
  // Adicionando atributos a div, para quando precisar poder acessar!
  tileRow.setAttribute("id", "row" + rowIndex);
  tileRow.setAttribute("class", "tile-row");

  // Criando uma div para a fileira de 5 colunas
  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    const tileColumn = document.createElement("div");
    tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    tileColumn.setAttribute(
      "class",
      rowIndex === 0 ? "tile-column typing" : "tile-column disable"
    );
    // Adicionando a coluna na fileira
    tileRow.append(tileColumn);
    guesses[rowIndex][columnIndex] = "";
  }
  // Adicionando a fileira
  tiles.append(tileRow);
}

//
const checkGuess = () => {
  // Pegando o que foi  escrito; .join pega todas as letras da matrix e junta sem espaço
  const guess = guesses[currentRow].join("");
  // Verificando se a quantidade é diferente do limite das colunas a gente não verifica nada
  if (guess.length !== columns) {
    return;
  }

  // Pegando todos os elementos que tem a class typing
  var currentColumns = document.querySelectorAll(".typing");
  // Verificando a palavra se é a correta
  for (let index = 0; index < columns; index++) {
    // Verificando a letra
    const letter = guess[index];
    // Se não tiver a letra no letreco, adicionamos a letra na class "wrong"
    if (letrecoMap[letter] === undefined) {
      currentColumns[index].classList.add("wrong");
    } else {
      // Se tiver a letra no letreco e a posição do index for igual quer dizer que ele achou a letra e a posição certa, conseguimos adicionar o css certo
      if (letrecoMap[letter] === index) {
        currentColumns[index].classList.add("right");
      } else {
        // Se tiver a letra mas na posição do index errada, adicionamos uma class para tal
        currentColumns[index].classList.add("displaced");
      }
    }
  }

  if (guess === letreco) {
    window.alert("Uauuuu, você é espetacular!!");
    return;
  } {
    // Se a palavra não estar, verifica se a fileira que ele estar é a ultima.
    if (currentRow === rows - 1) {
      window.alert("Opsss, tente novamente mais tarde, próximo letreco em:");
    } else {
      moveToNextRow();
    }
  }
};

const moveToNextRow = () => {
  // Pegando as class .typing e remover e jogar para a próxima fileira abaixo
  var typingColumns = document.querySelectorAll(".typing");
  for (let index = 0; index < typingColumns.length; index++) {
    typingColumns[index].classList.remove("typing");
    typingColumns[index].classList.add("disabled");
    
  }
  currentRow++;
  currentColumn = 0;

  // Pegando a fileira atual e adicionando na fileira atual os css correto
  const currentRowEl = document.querySelector("#row" + currentRow);
  var currentColumns = currentRowEl.querySelectorAll(".tile-column");
  for (let index = 0; index < currentColumns.length; index++) {
    currentColumns[index].classList.remove("disabled");
    currentColumns[index].classList.add("typing");
    
  }
};

// Inserindo letras nos campos permitindo
const handleKeyboardOnClick = (key) => {
  // Se a coluna atual for o máximo de coluna permitido, ele não faz nada
  if (currentColumn === columns) {
    return;
  }

  // Pegando a posição do box que ele estar, da row
  const currentTile = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  // Pegando a posição e inserindo na posição que estou
  currentTile.textContent = key;
  // Toda vez que adicionar uma letra, pega a posição atual e adiciona a letra
  guesses[currentRow][currentColumn] = key;
  // Fazendo com que as letras digitadas se movam até o final da row
  currentColumn++;
};

// Criando a primeira fileira do teclado
// pegando as letras do array keysFirstRow
const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach((key) => {
    var buttonElement = document.createElement("button");
    buttonElement.textContent = key; // Adicionando o nome ao botão, no caso a própia letra
    buttonElement.setAttribute("id", key);
    buttonElement.setAttribute("class", "keyboard-button");
    // Acão do botão
    buttonElement.addEventListener("click", () => handleKeyboardOnClick(key)); // key = passando a tecla/letra que eu cliquei

    // Adicionando as letras do array keysFirstRow a div keyboardFirstRow
    keyboardRow.append(buttonElement);
  });
};

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

// Apagando a letra
const handleBackspace = () => {
  // Verifica se estar na coluna inicial
  if(currentColumn === 0){
    return;
  }

  currentColumn--;
  guesses[currentRow][currentColumn] = "";
  const tile = document.querySelector("#row" + currentRow + "column" + currentColumn);
  tile.textContent = "";
};

// Criando o botão apagar
const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "⌫";
backspaceButton.setAttribute("class", "button-remove-and-enter");
backspaceAndEnterRow.append(backspaceButton);

const enterButton = document.createElement("button");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "✔";
enterButton.setAttribute("class", "button-remove-and-enter");
backspaceAndEnterRow.append(enterButton);

// Configurando teclado fisico
document.onkeydown = function(event){
  event = event || window.event;
  if(event.key === "Enter"){
    checkGuess();
  }else if(event.key === "Backspace") {
    handleBackspace();
  } else {
    handleKeyboardOnClick(event.key.toUpperCase());
  }
}

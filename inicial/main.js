var frasecorreta;
var qtdganho = 0 ;

const getSoletraPt = () => {
  fetch('http://localhost:8000/palavrapt')
    .then(response => response.json())
      .then(json => {
        //soletra = data.toUpperCase()
        frasecorreta = json;
        console.log(frasecorreta)
      })
    .catch(erro => {
      console.log(erro)
    });
}

const getSoletraEn = () => {
  fetch('http://localhost:8000/palavraen')
    .then(response => response.json())
      .then(json => {
        //soletra = data.toUpperCase()
        frasecorreta = json;
        console.log(frasecorreta)
      })
    .catch(erro => {
      console.log(erro)
    });
}


async function resultadoModal(){
  let resultContainer = document.getElementById('results-container');
  resultContainer.innerHTML = '';
}


document.addEventListener('DOMContentLoaded', function () {
  createSquares();
  getSoletraPt();

  let modal = document.getElementById("Modal");
  let span = document.getElementsByClassName("close")[0];


  let guessedWords = [[]];
  let availableSpace = 1;

  let guessedWordCount = 0;
  const keys = document.querySelectorAll(".keyboard-row button");


  document.getElementById('playnovamente').addEventListener('click', async () => {
    modal.style.display = "none";
    document.getElementById("board").innerHTML = "";
    createSquares();
    guessedWords = [[]];
    availableSpace = 1;
    guessedWordCount = 0;
    getSoletraPt();

  })

  span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 


  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter == 'enter') {
        handleSubmitWord();
        return;
      }
      if (letter == 'del') {
        handleDeleteLetter();
        return;
      }

      updateGuessedWords(letter)

    };
  }

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];

  }



  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }

  function getTileColor(letter, index) {
    const isCorrectLetter = frasecorreta.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(255, 121, 111)";
    }

    const letterInThatPosition = frasecorreta.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }

    return "rgb(219, 194, 81)";
  }

  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();


    const currentWord = currentWordArr.join("");

    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 200;

    currentWordArr.forEach((letter, index) => {
      setTimeout(() => {
        const tileColor = getTileColor(letter, index);

        const letterId = firstLetterId + index;
        const letterEl = document.getElementById(letterId);
        letterEl.classList.add("animate__flipInX");
        letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;

      }, interval * index);

      if (currentWordArr.length !== 5) {
        window.alert("A Palavra deve ter 5 letras");
      }


    });

    

    guessedWordCount += 1;

    if (currentWord == frasecorreta) {
      modal.style.display = "block";
      resultadoModal();

    }

    if (guessedWords.length === 6) {
      window.alert("Você perdeu");
    }


    guessedWords.push([]);

  }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animatedX");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }
  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    const removedLetter = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
  }




});


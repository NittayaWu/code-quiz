var popQuiz = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<JavaScript>", "<Script>", "<JS>", "<Java>"],
    correct: "<Script>",
  },
  {
    question: "Which of the following is not a primitive data type?",
    choices: ["boolean", "string", "number", "object"],
    correct: "object",
  },
  {
    question: "Which symbol is used for a single line comment in Javascript?",
    choices: ["//", "*/", "/*", "!--"],
    correct: "//",
  },
  {
    question: " What would 3+2+”6″ console log as?",
    choices: ["11", "38", "56", "326"],
    correct: "56",
  },
  {
    question: "Which type of Pop up box is not available in JavaScript?",
    choices: ["target", "alert", "prompt", "confirm"],
    correct: "target",
  },
  {
    question: "Which method takes the last element off of a given array and returns it?",
    choices: ["toString()", "pop()", "push()", "shift()"],
    correct: "pop()",
  },
  {
    question: "Which method stores a data item in a storage?",
    choices: ["localStorage.getItem() ", "localStorage.setItem() ", "	localStorage.letItem() ", "localStorage.tetItem() "],
    correct: "localStorage.setItem() ",
  },
  {
    question: "How do you create a function in JavaScript?",
    choices: ["function = myFunction", "function = myFunction()", "function:myFunction()", "function myFunction() "],
    correct: "function myFunction()  ",
  },
  {
    question: "How does a FOR loop start?",
    choices: ["for (i <= 8; i++)", "for (i = 0; i <= 8)", "for (i = 0; i <= 8; i++)  ", "for i = 1 to 8 "],
    correct: "for (i = 0; i <= 8; i++)",
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choices: ["=  ", ";", "()", ":"],
    correct: "= ",
  },
];
var index = 0
// console.log(popQuiz[index])
// index ++
// console.log(popQuiz[index])
var startButton = document.querySelector("#start-button");

function startGame() {
  setTime();
  beginQuiz();
  hideHome();
}

function beginQuiz(){
  document.querySelector("#quiz").textContent = popQuiz[index].question
  document.querySelector('#selections').innerHTML ="";
  for (let i = 0; i < popQuiz[index].choices.length; i++) {
    const element =  popQuiz[index].choices[i];
    var selectionBtn = document.createElement("button")
    selectionBtn.textContent = element;
    selectionBtn.onclick = checkAnswer;
    document.querySelector("#selections").append(selectionBtn);
  }
}

function checkAnswer(event){
console.log(event.target)
if (event.target.textContent === popQuiz[index].correct) {
  console.log("correct")
  
  
} else {
  console.log("incorrect")
}
index++
beginQuiz();
}

startButton.addEventListener("click", startGame);
var startTimer = document.querySelector("#timer");

var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    startTimer.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }
  }, 1000);
}
// Hide start button when quiz begins
function hideHome() {
  var home = document.getElementById("home");
  if (home.style.display === "none") {
    home.style.display = "block";
  } else {
    home.style.display = "none";
  }
}
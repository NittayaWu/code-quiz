// popQuiz objects
var popQuiz = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<JavaScript>", "<Script>", "<JS>", "<Java>"],
    answer: "<Script>",
  },
  {
    question: "Which of the following is not a primitive data type?",
    choices: ["boolean", "string", "number", "object"],
    answer: "object",
  },
  {
    question: "Which symbol is used for a single line comment in Javascript?",
    choices: ["//", "*/", "/*", "!--"],
    answer: "//",
  },
  {
    question: " What would 3+2+”6″ console log as?",
    choices: ["11", "38", "56", "326"],
    answer: "56",
  },
  {
    question: "Which type of Pop up box is not available in JavaScript?",
    choices: ["target", "alert", "prompt", "confirm"],
    answer: "target",
  },
  {
    question:
      "Which method takes the last element off of a given array and returns it?",
    choices: ["toString()", "pop()", "push()", "shift()"],
    answer: "pop()",
  },
  {
    question: "Which method stores a data item in a storage?",
    choices: [
      "localStorage.getItem() ",
      "localStorage.setItem() ",
      "localStorage.letItem() ",
      "localStorage.tetItem() ",
    ],
    correct: "localStorage.setItem() ",
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    choices: [
      '"var letters = ["A", "B", "C"]"',
      '"var letters = "A", "B", "C"',
      '"var letters = (1:"A, 2:"B", 3:"C")"',
      '"var letters = 1 = ("A"), 2 = ("B"), 3 = ("C")"',
    ],
    answer: '"var letters = ["A", "B", "C"]"',
  },
  {
    question: "How does a FOR loop start?",
    choices: [
      "for (i <= 8; i++)",
      "for (i = 0; i <= 8)",
      "for (i = 0; i <= 8; i++)  ",
      "for i = 1 to 8 ",
    ],
    answer: "for (i = 0; i <= 8; i++)",
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choices: ["=  ", ";", "()", ":"],
    answer: "= ",
  },
  
];
// Declared variables
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var container = document.querySelector("#container");
// Seconds left
var secondsLeft = 80;
var holdInterval = 0;
//  penalty time in seconds
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Event listener for timer
timer.addEventListener("click", function () {
  if (holdInterval === 0) {
      holdInterval = setInterval(function () {
          secondsLeft--;
          currentTime.textContent = "Seconds Remaining: " + secondsLeft;

          if (secondsLeft <= 0) {
              clearInterval(holdInterval);
              allDone();
              currentTime.textContent = "Time is up!";
          }
      }, 1000);
  }
  render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
  // Clears existing data 
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";
  // For loops to loop through all info in array
  for (var i = 0; i < popQuiz.length; i++) {
      // Appends question title only
      var userQuestion = popQuiz[questionIndex].question;
      var userChoices = popQuiz[questionIndex].choices;
      questionsDiv.textContent = userQuestion;
  }
  // New for each for question choices
  userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsDiv.appendChild(ulCreate);
      ulCreate.appendChild(listItem);
      listItem.addEventListener("click", (compare));
  })
}
// Event to compare choices with answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      // Correct condition 
      if (element.textContent == popQuiz[questionIndex].answer) {
          score++;
          createDiv.textContent = "Correct! The answer is:  " + popQuiz[questionIndex].answer;
      } else {
          // Will deduct 10 seconds off secondsLeft for wrong answers
          secondsLeft = secondsLeft - penalty;
          createDiv.textContent = "Wrong! The correct answer is:  " + popQuiz[questionIndex].answer;
      }

  }
  // Question Index determines number question user is on
  questionIndex++;

  if (questionIndex >= popQuiz.length) {
      // All done will append last page with user stats
      endQuiz();
      createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + popQuiz.length + " Correct!";
  } else {
      render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);

}
// endQuiz will append last page
function endQuiz() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  // create h1
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "End of Quiz!"

  questionsDiv.appendChild(createH1);

  // Paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  // Calculates time remaining and replaces it with score
  if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      var createP2 = document.createElement("p");
      clearInterval(holdInterval);
      createP.textContent = "Your final score is: " + timeRemaining;
      questionsDiv.appendChild(createP2);
  }

  // Label
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";
  questionsDiv.appendChild(createLabel);

  // input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";
  questionsDiv.appendChild(createInput);

  // submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";
  questionsDiv.appendChild(createSubmit);

  // Event listener to capture initials and local storage for initials and score
  createSubmit.addEventListener("click", function () {
      var initials = createInput.value;

      if (initials === null) {

          console.log("No value entered!");

      } else {
          var finalScore = {
              initials: initials,
              score: timeRemaining
          }
          console.log(finalScore);
          var allScores = localStorage.getItem("allScores");
          if (allScores === null) {
              allScores = [];
          } else {
              allScores = JSON.parse(allScores);
          }
          allScores.push(finalScore);
          var newScore = JSON.stringify(allScores);
          localStorage.setItem("allScores", newScore);
          window.location.replace("./high-score.html");
      }
  });

}


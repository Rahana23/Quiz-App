const questions = [
  {
    question: "What is the best way to learn JavaScript?",
    answers: [
      {
        correct: "true",
        text: "Watching a video",
      },
      {
        correct: "false",
        text: "Reading a book",
      },
      {
        correct: "false",
        text: "Listening to a podcast",
      },
      {
        correct: "false",
        text: "Doing a coding challenge",
      },
    ],
  },

  {
    question: "What is the best way to learn React?",
    answers: [
      {
        correct: "false",
        text: "Watching a video",
      },
      {
        correct: "false",
        text: "Reading a book",
      },
      {
        correct: "true",
        text: "Listening to a podcast",
      },
      {
        correct: "false",
        text: "Doing a coding challenge",
      },
    ],
  },

  {
    question: "What is the best way to learn Node.js?",
    answers: [
      {
        correct: "false",
        text: "Watching a video",
      },
      {
        correct: "true",
        text: "Reading a book",
      },
      {
        correct: "false",
        text: "Listening to a podcast",
      },
      {
        correct: "false",
        text: "Doing a coding challenge",
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer); // Corrected event listener
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
}

startQuiz();

const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const startBtn = document.querySelector('.startBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const timer = document.querySelector('.timer');

//Make an array of objects that stores question, choices of question and answer
const quiz = [
  {
    question: 'Q. What is the capital city of France?',
    choices: ['London', 'Paris', 'Berlin', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'Q. Who wrote the play "Romeo and Juliet"?',
    choices: [
      'William Shakespeare',
      'Jane Austen',
      'Charles Dickens',
      'Mark Twain',
    ],
    answer: 'William Shakespeare',
  },
  {
    question: 'Q. What is the largest planet in our solar system?',
    choices: [' Earth', ' Mars', 'Jupiter', 'Saturn'],
    answer: 'Jupiter',
  },
  {
    question: 'Which country is famous for the Great Wall?',
    choices: ['India', 'China', 'Egypt', 'Russia'],
    answer: 'China',
  },
];

// Making variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;

// Arrow function to Show question

const showQuestions = () => {
  const questionDetails = quiz[currentQuestionIndex];
  questionBox.textContent = questionDetails.question;
  choicesBox.textContent = '';
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement('div');
    choiceDiv.classList.add('multiChoices');
    choiceDiv.textContent = currentChoice;
    choicesBox.appendChild(choiceDiv);
    choiceDiv.addEventListener('click', () => {
      if (choiceDiv.classList.contains('selected')) {
        choiceDiv.classList.remove('selected');
      } else {
        choiceDiv.classList.add('selected');
      }
    });
  }
  if (currentQuestionIndex < quiz.length) {
    startTimer();
  }
};

// Function to check answer
const checkAnswer = () => {
  const selectedChoice = document.querySelector('.multiChoices.selected');
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
    // alert('Right Answer');
    displayAlert('Right Answer');
    score++;
  } else {
    // alert('Wrong Answer');
    displayAlert(
      `wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`,
    );
  }
  timeLeft = 15;
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestions();
  } else {
    stopTimer();
    showScore();
  }
};

// Function to show score
const showScore = () => {
  questionBox.textContent = '';
  choicesBox.textContent = '';
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}`;
  displayAlert('you have complete this quiz');
  nextBtn.textContent = 'Play Again';
  timer.style.display = 'none';
  quizOver = true;
};

//Function to show alert
const displayAlert = (msg) => {
  alert.style.display = 'block';
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = 'none';
  }, 2000);
};

// Function to Start Timer
const startTimer = () => {
  clearInterval(timerId); //  check for any exist Timers
  timer.textContent = timeLeft;
  const countDown = () => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
      const confirmUser = confirm(
        'Time Up!! Do you want to play the quiz again',
      );
      if (confirmUser) {
        timeLeft = 15;
        startQuiz();
      } else {
        startBtn.style.display = 'block';
        container.style.display = 'none';
        return;
      }
    }
  };
  timerId = setInterval(countDown, 1000);
};

// Function to stop timer
const stopTimer = () => {
  clearInterval(timerId);
};

// Function to shuffle question
const shuffleQuestions = () => {
  for (let i = quiz.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestions();
};

//Function to Start Quiz
const startQuiz = () => {
  timeLeft = 15;
  timer.style.display = 'flex';
  shuffleQuestions();
};
//Adding EventListner to Start Button
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  container.style.display = 'block';
  startQuiz();
});

nextBtn.addEventListener('click', () => {
  const selectedChoice = document.querySelector('.multiChoices.selected');
  if (!selectedChoice && nextBtn.textContent === 'Next') {
    displayAlert('Select Your Answaer');
    return;
  }
  if (quizOver === true) {
    nextBtn.textContent = 'Next';
    scoreCard.textContent = '';
    currentQuestionIndex = 0;
    quizOver = false;
    score = 0;
    startQuiz();
  } else {
    checkAnswer();
  }
});

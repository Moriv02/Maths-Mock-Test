import { questions } from './questions.js';

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);
let timer;
let timeLeft = 60 * 60; // 60 minutes

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const submitBtn = document.getElementById('submit');
const timerElement = document.getElementById('timer');

function displayQuestion(index) {
  const q = questions[index];
  questionElement.innerText = `Q${index + 1}: ${q.question}`;
  optionsElement.innerHTML = '';

  q.options.forEach((option, i) => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.innerText = option;
    div.addEventListener('click', () => selectOption(i));
    if (userAnswers[index] === i) div.classList.add('selected');
    optionsElement.appendChild(div);
  });

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === questions.length - 1;
}

function selectOption(index) {
  userAnswers[currentQuestion] = index;
  displayQuestion(currentQuestion);
}

function calculateScore() {
  score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score += 5;
    else if (userAnswers[i] !== null) score -= 1;
  });
}

function showResult() {
  calculateScore();
  localStorage.setItem('score', score);
  localStorage.setItem('total', questions.length * 5);
  localStorage.setItem('attempted', userAnswers.filter(a => a !== null).length);
  localStorage.setItem('correct', userAnswers.filter((a, i) => a === questions[i].answer).length);
  window.location.href = 'results.html';
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(timer);
    showResult();
  }
}

nextBtn.addEventListener('click', () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion(currentQuestion);
  }
});

prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion(currentQuestion);
  }
});

submitBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to submit the test?')) {
    showResult();
  }
});

window.onload = () => {
  displayQuestion(currentQuestion);
  timer = setInterval(updateTimer, 1000);
};
const questions = [
  {
    question: "Which of the following best defines “structured interviews” in hiring processes?",
    options: [" Interviews where candidates are allowed to speak freely without prompts", 
        " Interviews that follow a fixed set of questions and scoring system", 
        " Interviews based on hypothetical storytelling",
        " Interviews conducted in an informal setting"],
    correct: 1
  },
  {
    question: " In competency-based hiring, which of the following methods is most effective for assessing soft skills?",
    options: ["Reviewing academic transcripts",
         " Conducting panel interviews with hypothetical questions",
        " Observing candidate behavior during role plays or simulations",
         " Assigning coding tests"],
    correct: 2
  },
  {
    question: " What is the main objective of a Skills Gap Analysis in HR strategy?",
    options: [" To evaluate employee satisfaction",
        " To identify high-performing teams",
        " To determine training needs and workforce planning",
        " To assess company profitability"],
    correct: 2
  },
  {
    question: " Which of the following is not a key principle of competency mapping in skill development? ",
    options: [" Identifying critical job roles",
        " Mapping required competencies to roles",
        " Assessing employee proficiency against required levels",
        " Tracking employee attendance records"],
    correct: 3
  },
  {
    question: " When hiring for a role requiring rapidly changing digital skills, what is the most critical trait to assess in candidates?",
    options: [" Willingness and ability to learn continuously",
        " Past experience in the same job role",
        " Number of technical certifications",
        " Years of service in similar organizations"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";  // <--- You had id="start", not "start-screen"
  document.getElementById("quiz-container").style.display = "block";
  showQuestion();
  updateProgress();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("question-counter").textContent = 
    `Question ${currentQuestion + 1} of ${questions.length}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const optionDiv = document.createElement("div");
optionDiv.className = "option-box";

const radio = document.createElement("input");
radio.type = "radio";
radio.name = "option";
radio.id = `option-${idx}`;
radio.value = idx;

const label = document.createElement("label");
label.htmlFor = radio.id;
label.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;

optionDiv.appendChild(radio);
optionDiv.appendChild(label);
optionsDiv.appendChild(optionDiv);

    optionDiv.addEventListener('click', function() {
      const radio = this.querySelector('input');
      radio.checked = true;
      
      document.querySelectorAll('.option-box').forEach(box => {
        box.classList.remove('selected');
      });
      
      this.classList.add('selected');
      document.getElementById('submit-btn').classList.add('active');
    });
    optionsDiv.appendChild(optionDiv);
  });

  const existingFeedback = document.getElementById("feedback-message");
  if (existingFeedback) existingFeedback.remove();

  updateScore();
  document.getElementById('submit-btn').classList.remove('active');
}

function submitAnswer() {
  const selectedRadio = document.querySelector('input[name="option"]:checked');
  if (!selectedRadio) {
    alert("Please select an option.");
    return;
  }

  const selected = parseInt(selectedRadio.value);
  const correctIndex = questions[currentQuestion].correct;
  const isCorrect = selected === correctIndex;

  if (!isCorrect) {
    endQuiz(false);
    return;
  }
  score++;

  const modal = document.createElement('div');
  modal.className = 'feedback-modal';
  modal.innerHTML = `
    <div class="feedback-content">
      <img src="https://media.tenor.com/ihcPxsWhMUgAAAAi/100-legit.gif" alt="correct" style="height:55px" >
      <h3>Correct!</h3>
      <p>Great job!</p>
    </div>
  `;
  document.body.appendChild(modal);

  document.querySelectorAll('.option-box').forEach((option, idx) => {
    option.style.pointerEvents = 'none';
    if (idx === correctIndex) option.classList.add('correct-answer');
  });

  setTimeout(() => {
    modal.remove();
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
      updateProgress();
    } else {
      endQuiz(true);
    }
  }, 1500);
}

function endQuiz(success) {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  const resultText = document.getElementById("result-text");
  
  if (success) {
    resultText.innerHTML = `
     <div class="trophy-container">
        <div class="trophy">🏆</div>
      <h2 style="color: green;">🎉 Congratulations!</h2>
      </div>
      <p>You scored ${score}/${questions.length}</p>
      <p>You have won a voucher from ETS!</p>
      <button onclick="restartQuiz()" class="restart-btn">Try Again</button>
    `;
    
    if (typeof party !== "undefined") {
      party.confetti(document.body, { count: 150, spread: 90 });
      party.sparkles(resultText, { count: 200, speed: 300 });
    }
  } else {
    resultText.innerHTML = `
      <h2 style="color: red;">Oops! Try Again</h2>
      <p>You got question ${currentQuestion + 1} wrong.</p>
      <p>Final Score: ${score}/${questions.length}</p>
      <button onclick="restartQuiz()" class="restart-btn">Try Again</button>
    `;
  }
}

function updateProgress() {
  const progress = (currentQuestion / questions.length) * 100;
  document.getElementById("progress").style.width = `${progress}%`;
  updateScore();
}

function updateScore() {
  document.getElementById("score-text").textContent = `Score: ${score}/${questions.length}`;
}


function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("question-counter").textContent = 
    `Question ${currentQuestion + 1} of ${questions.length}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, idx) => {
     const optionDiv = document.createElement("div");
    optionDiv.className = "option-box";
    optionDiv.innerHTML = `
      <input type="radio" name="option" id="option-${idx}" value="${idx}">
      <label for="option-${idx}">${String.fromCharCode(65 + idx)}. ${opt}</label>
    `;
    optionDiv.addEventListener("click", function() {
      document.querySelectorAll('.option-box').forEach(box => {
        box.classList.remove('selected');
      });
      this.classList.add('selected');
      document.getElementById('submit-btn').classList.add('active');
    });
    optionsDiv.appendChild(optionDiv);
  });
const existingFeedback = document.getElementById("feedback-message");
  if (existingFeedback) existingFeedback.remove();

  updateScore();
  document.getElementById('submit-btn').classList.remove('active');
}


function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  document.getElementById("progress").style.width = progress + "%";
  document.getElementById("score-text").innerText = `Score: ${score}`;
}
function endQuiz(success) {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  const resultText = document.getElementById("result-text");

  if (success) {
    resultText.innerHTML = `
      <h2 style="color: green; margin-bottom: 10px;">Congratulations!</h2>
      <p style="font-size: 20px;">You have won a voucher from ETS!</p>
      <p style="margin-top: 20px;">Final Score: ${score}/5</p>
      <button onclick="restartQuiz()" style="height:45px; width:110px; font-size: 17px; margin-top:15px;border-radius:20px;cursor: pointer;">Try Again</button>
    `; 
    if (typeof party !== "undefined") {
      party.confetti(document.body, { count: 150, spread: 90 });
      party.confetti(document.body, { x: 0, y: 0 });
      party.confetti(document.body, { x: 1, y: 0 });
      party.confetti(document.body, { x: 0, y: 1 });
      party.confetti(document.body, { x: 1, y: 1 });

      party.sparkles(resultText, {
        count: 200,
        speed: 300,
        spread: 10,
      });
    }
  } else {
    resultText.innerHTML = `
      <h2 style="color: red; margin-bottom: 10px;">Oops! You have got it wrong.</h2>
      <p style="font-size: 18px;">Better luck next time!</p>
      <p style="margin-top: 20px;">Final Score: ${score}/5</p>
      <button onclick="restartQuiz()" style="height:45px; width:110px; font-size: 17px; margin-top:15px;border-radius:20px;cursor: pointer;">Try Again</button>
    `;
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  document.getElementById("result-container").style.display = "none";
  document.getElementById("start-screen").style.display = "block";

  document.getElementById("progress").style.width = "0%";
  document.getElementById("score-text").innerText = "Score: 0";
}

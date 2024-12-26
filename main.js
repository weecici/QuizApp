document.getElementById('surveyForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const relation = document.getElementById('relation').value;
  document.getElementById('surveyForm').classList.add('hidden');
  renderQuestion(relation);
});

const questions = {
  common: [
    {
      text: "Q1. Mô tả chung về sự ảnh hưởng của mối quan hệ này đến việc học của bạn?",
      choices: [
        { text: "Rất tích cực", scores: [10, 10, 10, -5, -5, -5] },
        { text: "Tích cực", scores: [8, 0, 8, -3, -3, -3] },
        { text: "Bình thường", scores: [5, 0, 5, -1, -1, -1] },
        { text: "Tiêu cực", scores: [-5, -5, -5, 10, 10, 10] },
      ],
    },
    {
      text: "Q2. Mức độ dành thời gian của bạn cho mối quan hệ này?",
      choices: [
        { text: "Rất nhiều thời gian", scores: [0, 0, 10, 5, 0, 0] },
        { text: "Đủ thời gian", scores: [0, 0, 8, 0, 0, 0] },
        { text: "Ít thời gian", scores: [0, 0, 3, 3, 0, 0] },
        { text: "Hầu như không dành thời gian", scores: [0, 0, 0, 10, 0, 0] },
      ],
    },
  ],
  family: [
    // Add family-specific questions here
  ],
  love: [
    // Add love-specific questions here
  ],
  friends: [
    // Add friends-specific questions here
  ],
  teacher: [
    // Add teacher-specific questions here
  ],
  colleague: [
    // Add colleague-specific questions here
  ],
};

let currentQuestion = 0;
const categories = { M: 0, E: 0, Su: 0, D: 0, St: 0, C: 0 };
const maxScores = { M: 20, E: 10, Su: 20, D: 15, St: 15, C: 15 };

const surveyContainer = document.getElementById("surveyContainer");
const resultsDiv = document.getElementById("results");
const progressBar = document.getElementById("progress");
const partNames = {
  family: "Family Relationships",
  love: "Romantic Relationships",
  friends: "Friendship Dynamics",
  teacher: "Teacher-Student Interactions",
  colleague: "Colleague Relations",
  common: "General Relationships",
};

function renderQuestion(relation) {
  const allQuestions = [...questions.common, ...questions[relation]];
  if (currentQuestion >= allQuestions.length) {
    showResults();
    return;
  }
   // Determine which part name to display
   let partName = "Common Question Part";
   if (currentQuestion >= 15) {
    if(relation in partNames) {
      partName = partNames[relation];
    }
   }
   
   // Display the part name
   document.getElementById("partName").innerText = partName;
   document.getElementById("partName").style.display = "block"; // Show part name element

  const progressPercent = ((currentQuestion / allQuestions.length) * 100).toFixed(0);
  progressBar.style.width = `${progressPercent}%`;

  const question = allQuestions[currentQuestion];
  surveyContainer.innerHTML = `
    <div class="question active">
      <h3>${question.text}</h3>
      ${question.choices
        .map(
          (choice, index) =>
            `<button class="choice" data-scores="${choice.scores}">
              ${choice.text}
            </button>`
        )
        .join("")}
    </div>
  `;

  document.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", (e) => {
      const scores = e.target.getAttribute("data-scores").split(",").map(Number);
      updateScores(scores);
      slideToNextQuestion(relation);
    });
  });
}

function slideToNextQuestion(relation) {
  const currentElement = document.querySelector(".question.active");
  currentElement.classList.remove("active");
  currentElement.style.opacity = "0";
  currentElement.style.transform = "translateX(-100%)";

  setTimeout(() => {
    currentQuestion++;
    renderQuestion(relation);
  }, 500);
}

function updateScores(scores) {
  categories.M += scores[0];
  categories.E += scores[1];
  categories.Su += scores[2];
  categories.D += scores[3];
  categories.St += scores[4];
  categories.C += scores[5];
}

let selectedRelation = ''; // Store the selected relation

document.getElementById('surveyForm').addEventListener('submit', (e) => {
  e.preventDefault();
  selectedRelation = document.getElementById('relation').value; // Save selected relation
  document.getElementById('surveyForm').classList.add('hidden');
  renderQuestion(selectedRelation); // Pass relation to renderQuestion
});

function showResults() {
  progressBar.style.width = "100%";
  surveyContainer.style.display = "none";
  resultsDiv.style.display = "block";

  const normalizedScores = {};
  for (let key in categories) {
    normalizedScores[key] = Math.round((categories[key] / maxScores[key]) * 100);
  }

  const labels = ["Motivation (M)", "Encouragement (E)", "Supportiveness (Su)", "Distraction (D)", "Stress (St)", "Conflict (C)"];
  const data = Object.values(normalizedScores);

  const ctx = document.getElementById("resultsChart").getContext("2d");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Relationship Impact",
          data: data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });

  document.getElementById("retryQuiz").style.display = "block"; // Show retry button after the quiz
}

// Attach event listener to the retry button only once
document.getElementById("retryQuiz").addEventListener("click", resetQuiz);

function resetQuiz() {
    currentQuestion = 0;
    for (let key in categories) {
        categories[key] = 0; // Reset all category scores
    }
    progressBar.style.width = "0%"; // Reset progress bar
    surveyContainer.style.display = "block";
    resultsDiv.style.display = "none";
    document.getElementById("retryQuiz").style.display = "none"; // Hide retry button during the quiz
    renderQuestion(selectedRelation); // Pass the saved relation
}

// Start the survey
renderQuestion(); // Call this with a relation after form submission
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".quiz").forEach(function (quiz) {
    quiz.querySelectorAll(".quiz-question").forEach(function (question) {
      const correctAnswer = question.dataset.answer;
      const options = question.querySelectorAll(".quiz-option");

      options.forEach(function (option) {
        option.addEventListener("click", function () {
          if (question.dataset.answered === "true") return;

          const selected = option.dataset.opt;
          const isCorrect = selected === correctAnswer;

          options.forEach(function (opt) {
            opt.classList.remove("is-correct", "is-wrong", "correct", "incorrect");
          });

          if (isCorrect) {
            option.classList.add("is-correct", "correct");
            question.dataset.answered = "true";
          } else {
            option.classList.add("is-wrong", "incorrect");
          }

          let feedback = question.querySelector(".quiz-feedback");
          if (!feedback) {
            feedback = document.createElement("div");
            feedback.className = "quiz-feedback";
            question.appendChild(feedback);
          }

          feedback.textContent = isCorrect
            ? "✅ ¡Correcto!"
            : "❌ Incorrecto. Inténtalo de nuevo.";
          feedback.style.color = isCorrect ? "#16a34a" : "#dc2626";
        });
      });
    });
  });
});
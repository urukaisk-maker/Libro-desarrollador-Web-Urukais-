// Quiz interactivo para el Libro del Desarrollador Web
document.addEventListener('DOMContentLoaded', function () {
    const quizzes = document.querySelectorAll('.quiz');

    quizzes.forEach(function (quiz) {
        const questions = quiz.querySelectorAll('.quiz-question');

        questions.forEach(function (question) {
            const correct = question.getAttribute('data-answer');
            const options = question.querySelectorAll('.quiz-option');

            options.forEach(function (option) {
                option.addEventListener('click', function () {
                    // Si ya está respondida, no hacer nada
                    if (question.classList.contains('answered')) return;
                    question.classList.add('answered');

                    const chosen = option.getAttribute('data-opt');

                    if (chosen === correct) {
                        option.classList.add('is-correct');
                    } else {
                        option.classList.add('is-wrong');
                        // Marcar la correcta
                        options.forEach(function (opt) {
                            if (opt.getAttribute('data-opt') === correct) {
                                opt.classList.add('is-correct');
                            }
                        });
                    }
                });
            });
        });
    });
});

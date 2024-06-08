document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById("form");
    const input = document.getElementById("input");
    const quizButton = document.getElementById("quizButton");
    const quizApp = document.getElementById("quiz-app");
    const questionText = document.getElementById("question-text");
    const answerA = document.getElementById("answer-a");
    const answerB = document.getElementById("answer-b");
    const answerC = document.getElementById("answer-c");
    const second = document.getElementById("second");
    const questionCount = document.getElementById("question-count");
    const nextQuestionButton = document.getElementById("next-question-button");


    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 10;
    let correctAnswers = 0;
    let username = "";


    const questions = [
        {
            question: "Which is the javascript package management application?",
            choices: ["Node.js", "Typescript", "Npm"],
            correctAnswer: "Npm"
        },
        {
            question: "Which is the most popular language in the world right now?",
            choices: ["Java Script", "Python", "Java"],
            correctAnswer: "Python"
        },
        {
            question: "Which one is used for clean code?",
            choices: ["Angular", "Typescript", "React"],
            correctAnswer: "Typescript"
        },
        {
            question: "What language does the Macos operating system use?",
            choices: ["Java", "C++", "Swift"],
            correctAnswer: "C++"
        },
        {
            question: "When was the java language created?",
            choices: ["1997", "1995", "1993"],
            correctAnswer: "1995"
        }
    ];



    quizButton.addEventListener("click", startQuiz);
    nextQuestionButton.addEventListener("click", nextQuestion);

    function startQuiz(e) {
        username = input.value.trim();
        if (username === "") {
            alert("Please enter your name.");
            return;
        }
        e.preventDefault();
        form.classList.add("d-none");
        quizApp.classList.remove("d-none");
        displayQuestion();
        startTimer();
    }

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = `${currentQuestionIndex + 1}-${currentQuestion.question}`;
        answerA.textContent = `a: ${currentQuestion.choices[0]}`;
        answerB.textContent = `b: ${currentQuestion.choices[1]}`;
        answerC.textContent = `c: ${currentQuestion.choices[2]}`;
        questionCount.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
        document.querySelectorAll(".answers p").forEach(p => {
            p.removeEventListener("click", selectAnswer);
            p.addEventListener("click", selectAnswer);
        });
    }

    function selectAnswer(event) {
        clearInterval(timer);
        const selectedAnswer = event.target.textContent.split(": ")[1];
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        if (selectedAnswer === correctAnswer) {
            correctAnswers++;
        }
        nextQuestion();
    }

    function startTimer() {
        timeLeft = 10;
        second.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            second.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                autoSelectAnswer();
            }
        }, 1000);
    }

    function autoSelectAnswer() {
        nextQuestion();
    }

    function nextQuestion() {
        clearInterval(timer);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            startTimer();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        quizApp.innerHTML = `<h1>Quiz Completed!</h1><span>${username}, ${questions.length} from the question ${correctAnswers} you got that one right.</span><br>
        <button id="finish-quiz-button" type="button">Finish Quiz</button>`;
       
        document.getElementById("finish-quiz-button").addEventListener("click", function(){
            location.reload();
        });
    }


})


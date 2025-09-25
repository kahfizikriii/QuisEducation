document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const currentQuestionNumberSpan = document.getElementById('current-question-number');
    const scoreSpan = document.getElementById('score');
    const restartBtn = document.getElementById('restart-btn');
    const progressBar = document.getElementById('progress-bar');

    let currentQuestionIndex = 0;
    let score = 0;
    let quizData = []; // Akan diisi dari API atau hardcoded

    // Data kuis contoh (ganti dengan data Anda sendiri)
    const questions = [
        {
            question: "Apa ibu kota dari negara Jepang?",
            answers: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
            correct: "Tokyo"
        },
        {
            question: "Berapa jumlah planet di tata surya?",
            answers: ["7", "8", "9", "10"],
            correct: "8"
        },
        {
            question: "Siapa penemu lampu pijar?",
            answers: ["Nikola Tesla", "Thomas Edison", "Albert Einstein", "Isaac Newton"],
            correct: "Thomas Edison"
        },
        {
            question: "Organ mana yang berfungsi memompa darah ke seluruh tubuh?",
            answers: ["Paru-paru", "Hati", "Jantung", "Ginjal"],
            correct: "Jantung"
        },
        {
            question: "Apa elemen kimia dengan simbol 'O'?",
            answers: ["Emas", "Oksigen", "Helium", "Besi"],
            correct: "Oksigen"
        },
        {
            question: "Kapan proklamasi kemerdekaan Indonesia?",
            answers: ["17 Agustus 1945", "28 Oktober 1928", "1 Juni 1945", "10 November 1945"],
            correct: "17 Agustus 1945"
        },
        {
            question: "Berapa sisi dari sebuah heksagon?",
            answers: ["4", "5", "6", "7"],
            correct: "6"
        },
        {
            question: "Di benua mana Sungai Nil berada?",
            answers: ["Asia", "Amerika", "Eropa", "Afrika"],
            correct: "Afrika"
        },
        {
            question: "Siapa penulis novel 'Laskar Pelangi'?",
            answers: ["Andrea Hirata", "Tere Liye", "Pramoedya Ananta Toer", "Dewi Lestari"],
            correct: "Andrea Hirata"
        },
        {
            question: "Berapa hari dalam setahun kabisat?",
            answers: ["365", "366", "364", "367"],
            correct: "366"
        }
    ];

    // Fungsi untuk menampilkan halaman
    function showPage(page) {
        document.querySelectorAll('.container').forEach(container => {
            container.classList.remove('active');
        });
        page.classList.add('active');
    }

    // Fungsi untuk memulai kuis
    function startQuiz() {
        // Shuffle questions
        quizData = questions.sort(() => Math.random() - 0.5).slice(0, 10);
        currentQuestionIndex = 0;
        score = 0;
        showPage(quizContainer);
        showQuestion();
    }

    // Fungsi untuk menampilkan pertanyaan
    function showQuestion() {
        const question = quizData[currentQuestionIndex];
        questionText.textContent = question.question;
        answersContainer.innerHTML = '';
        currentQuestionNumberSpan.textContent = currentQuestionIndex + 1;
        updateProgressBar();

        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => selectAnswer(answer, question.correct));
            answersContainer.appendChild(button);
        });
    }

    // Fungsi saat jawaban dipilih
    function selectAnswer(selectedAnswer, correctAnswer) {
        const buttons = answersContainer.querySelectorAll('.answer-btn');
        buttons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
            if (button.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
                button.classList.add('incorrect');
            }
            button.disabled = true;
        });

        if (selectedAnswer === correctAnswer) {
            score++;
        }

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1500); // Tunggu 1.5 detik sebelum pindah pertanyaan
    }

    // Fungsi untuk memperbarui progress bar
    function updateProgressBar() {
        const progress = (currentQuestionIndex + 1) / quizData.length * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Fungsi untuk menampilkan hasil akhir
    function showResult() {
        scoreSpan.textContent = score;
        showPage(resultContainer);
    }

    // Event Listeners
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            startQuiz();
        } else {
            alert("Nama pengguna tidak boleh kosong!");
            usernameInput.focus();
        }
    });

    restartBtn.addEventListener('click', () => {
        showPage(loginContainer);
        usernameInput.value = '';
    });
});
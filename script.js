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
            question: "Jumlah maksimum elektron pada kulit M adalah?",
            answers: ["2", "8", "18", "32"],
            correct: "18"
        },
        {
            question: "Elektron valensi adalah?",
            answers: ["Elektron yang ada di kulit pertama", "Elektron yang ada di kulit terdalam", "Elektron yang ada di kulit terluar", "emua elektron dalam atom"],
            correct: "Elektron yang ada di kulit terluar"
        },
        {
            question: "Unsur dengan nomor atom 10 memiliki konfigurasi elektron?",
            answers: ["2, 8", "2, 8, 1", "2, 6", "2, 8, 2"],
            correct: "2, 8,"
        },
        {
            question: "Unsur dengan konfigurasi elektron 2, 8, 7 adalah?",
            answers: ["Oksigen", "Klor", "Fluorin", "Natrium"],
            correct: "Klor"
        },
        {
            question: " Konfigurasi elektron dari unsur natrium (Z = 11) adalah?",
            answers: ["2, 8, 1", "2, 8, 2", "2, 7, 2", "2, 9"],
            correct: "2, 8, 1"
        },
        {
            question: "Unsur dengan konfigurasi elektron 2, 8, 2 terletak pada periode?",
            answers: ["1", "2", "3", "4"],
            correct: "3"
        },
        {
            question: "Unsur dengan konfigurasi elektron 1s² 2s² 2p⁶ adalah?",
            answers: ["Oksigen", "Neon", "Fluorin", "Natrium"],
            correct: "Neon"
        },
        {
            question: "Jika suatu unsur memiliki konfigurasi elektron 2, 8, 8, 1 maka nomor atomnya adalah?",
            answers: ["17", "18", "19", "20"],
            correct: "19"
        },
        {
            question: "Unsur dengan elektron valensi 6 termasuk golongan?",
            answers: ["IA", "IVA", "VIA", "VIIA"],
            correct: "VIA"
        },
        {
            question: "Unsur dengan nomor atom 20 memiliki konfigurasi elektron?",
            answers: ["2, 8, 8, 2", "2, 8, 8, 1", "2, 8, 2", "2, 8, 18"],
            correct: "2, 8, 8, 2"
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
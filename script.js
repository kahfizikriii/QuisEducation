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
        q: "1. Limit dari sin(3x)/x saat x→0 adalah ...",
        options: ["0", "1", "2", "3", "∞"],
        correct: "3"
      },
      {
        q: "2. Turunan dari f(x) = ln(x² + 1) adalah ...",
        options: ["2x/(x²+1)", "1/(x²+1)", "2/(x²+1)", "x/(x²+1)", "2x/ln(x²+1)"],
        correct: "2x/(x²+1)"
      },
      {
        q: "3. ∫(1/x) dx = ...",
        options: ["ln|x| + C", "ln(x²) + C", "x⁻¹ + C", "½ln|x| + C", "eˣ + C"],
        correct: "ln|x| + C"
      },
      {
        q: "4. Jumlah akar dari x² - 5x + 6 = 0 adalah ...",
        options: ["6", "5", "1", "-5", "30"],
        correct: "5"
      },
      {
        q: "5. Determinan dari [[1,2],[3,4]] adalah ...",
        options: ["-2", "-1", "1", "2", "5"],
        correct: "-2"
      },
      {
        q: "6. Jika sinθ=3/5 dan θ di kuadran I, maka tanθ=...",
        options: ["3/4", "4/3", "3/5", "5/3", "1/√2"],
        correct: "3/4"
      },
      {
        q: "7. Barisan aritmetika a₁=7, d=-2, maka suku ke-4 = ...",
        options: ["1", "3", "-1", "-3", "0"],
        correct: "1"
      },
      {
        q: "8. Banyak cara memilih 2 buku dari 4 buku berbeda = ...",
        options: ["6", "12", "8", "4", "16"],
        correct: "6"
      },
      {
        q: "9. Jika 2ˣ = 16, maka x = ...",
        options: ["2", "3", "4", "8", "1/4"],
        correct: "4"
      },
      {
        q: "10. Panjang vektor (3, -4) adalah ...",
        options: ["5", "7", "√25", "A dan C benar", "√13"],
        correct: "5"
      },
      {
        q: "11. Konjugat dari z = 2 + 3i adalah ...",
        options: ["2+3i", "-2+3i", "2-3i", "-2-3i", "3+2i"],
        correct: "2-3i"
      },
      {
        q: "12. f(x) = -x² + 4x + 1 mencapai maksimum di x = ...",
        options: ["0", "1", "2", "4", "-2"],
        correct: "2"
      },
      {
        q: "13. Luas di bawah kurva y = 2x dari 0 sampai 3 adalah ...",
        options: ["6", "9", "3", "12", "18"],
        correct: "9"
      },
      {
        q: "14. Median dari data {4,7,9,2,10} adalah ...",
        options: ["4", "7", "6", "8", "9"],
        correct: "7"
      },
      {
        q: "15. Titik (1,0) diputar 90° berlawanan arah jarum jam menjadi ...",
        options: ["(0,1)", "(1,0)", "(0,-1)", "(-1,0)", "(1,1)"],
        correct: "(0,1)"
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
        questionText.textContent = question.q;
        answersContainer.innerHTML = '';
        currentQuestionNumberSpan.textContent = currentQuestionIndex + 1;
        updateProgressBar();

        question.options.forEach(answer => {
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
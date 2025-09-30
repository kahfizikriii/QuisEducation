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
            question: "Organisme yang hanya dapat dilihat dengan mikroskop disebut?",
            answers: ["Hewan", "Tumbuhan", "Mikroorganisme", "Vertebrata"],
            correct: "Mikroorganisme"
        },
        {
            question: "Tempat berlangsungnya fotosintesis pada tumbuhan adalah?",
            answers: ["Akar", "Daun", "Batang", "Bunga"],
            correct: "Daun"
        },
        {
            question: "Berikut ini yang termasuk hewan vertebrata adalah?",
            answers: ["Cacing", "Udang", "Ikan", "Serangga"],
            correct: "Ikan"
        },
        {
            question: "Manusia bernapas dengan menggunakan?",
            answers: ["Insang", "Trakea", "Kulit", "Paru-paru"],
            correct: "Paru-paru"
        },
        {
            question: " Proses perubahan hewan dari larva hingga dewasa disebut?",
            answers: ["Metamorfosis", "Respirasi", "Fotosintesis", "Transpirasi"],
            correct: "Metamorfosis"
        },
        {
            question: "Bagian darah yang berfungsi mengangkut oksigen adalah?",
            answers: ["Plasma darah", "Trombosit", "Eritrosit", "Leukosit"],
            correct: "Eritrosit"
        },
        {
            question: "Proses pengeluaran zat sisa metabolisme dari tubuh disebut?",
            answers: ["Respirasi", "Ekskresi", "Pencernaan", "Sirkulasi"],
            correct: "Ekskresi"
        },
        {
            question: "Tumbuhan yang berakar serabut biasanya dimiliki ole?",
            answers: ["Tumbuhan dikotil", "Tumbuhan monokotil", "Tumbuhan berkayu", "Tumbuhan menjalar"],
            correct: "Tumbuhan monokotil"
        },
        {
            question: "Berikut ini yang termasuk simbiosis mutualisme adalah?",
            answers: ["Tali putri dengan inangnya", "Bunga dengan kupu-kupu", "Cacing pita dengan manusia", "Benalu dengan mangga"],
            correct: "Bunga dengan kupu-kupu"
        },
        {
            question: "Alat kelamin jantan pada bunga disebut?",
            answers: ["Putik", "Mahkota", "Kelopak", "Benang sari"],
            correct: "Benang sari"
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
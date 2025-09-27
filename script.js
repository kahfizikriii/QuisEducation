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
            question: "Berapakah hasil dari 245 + 138?",
            answers: ["393", "483", "383", "372"],
            correct: "383"
        },
        {
            question: "Pak Ali memiliki 5 kotak pensil. Setiap kotak berisi 12 pensil. Berapakah jumlah total pensil Pak Ali?",
            answers: ["60", "72", "17", "50"],
            correct: "60"
        },
        {
            question: "Sebuah segitiga memiliki panjang sisi a=6 cm, b=8 cm, dan c=10 cm. Berapakah keliling segitiga tersebut?",
            answers: ["24 cm", "48 cm", "14 cm", "18 cm"],
            correct: "24 cm"
        },
        {
            question: "Jika sebuah bilangan dikurangi 15 hasilnya adalah 25. Berapakah bilangan tersebut?",
            answers: ["10", "30", "40", "50"],
            correct: "40"
        },
        {
            question: " Urutkan bilangan berikut dari yang terkecil hingga terbesar: 125,521,215,512?",
            answers: ["125, 215, 512, 521", "125, 521, 215, 512", "521, 512, 215, 125", "215, 125, 512, 521"],
            correct: "125, 215, 512, 521"
        },
        {
            question: "Pada pukul berapa jarum jam pendek dan jarum jam panjang menunjukkan arah yang sama (saling menumpuk)?",
            answers: ["Pukul 06.00", "Pukul 12.00", "Pukul 03.00", "Pukul 09.00"],
            correct: "Pukul 12.00"
        },
        {
            question: "Berapakah hasil dari operasi hitung campuran: 10×(5−2)+7?",
            answers: ["37", "30", "47", "13"],
            correct: "37"
        },
        {
            question: "48 buku akan dibagi rata kepada 6 siswa. Berapa banyak buku yang diterima setiap siswa?",
            answers: ["6 buku", "8 buku", "7 buku", "9 buku"],
            correct: "9 buku"
        },
        {
            question: "Sebuah persegi panjang memiliki panjang 10 cm dan lebar 5 cm. Berapakah keliling persegi panjang tersebut?",
            answers: ["20 cm", "15 cm", "50 cm", "30 cm"],
            correct: "30 cm"
        },
        {
            question: "Paman membeli 3 kg apel dan 200 gram anggur. Berapakah total berat belanjaan Paman dalam satuan gram?",
            answers: ["3200 gram", "5000 gram", "320 gram", "2300 gram"],
            correct: "3200 gram"
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
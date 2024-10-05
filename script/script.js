document.addEventListener("DOMContentLoaded", () => {
    const correctGuess = "thirdwheel"; // Replace with the actual answer
    const guessButton = document.getElementById("submit-guess");
    const messageElement = document.getElementById("game-message");
    const gameContainer = document.getElementById("game-container");
    const mainContent = document.getElementById("main-content");

    if (guessButton) {
        guessButton.addEventListener("click", function () {
            const userGuess = document.getElementById("snack-guess").value.trim();

            if (userGuess.toLowerCase() === correctGuess.toLowerCase()) {
                messageElement.innerText = "🎉 Correct! Welcome to the world of MilkShake and Sahil Shake! 🎉";
                gameContainer.style.display = "none"; // Hide guessing game
                mainContent.style.display = "block"; // Show main content

                // Play Ishq Risk audio after a correct guess
                const ishqRiskAudio = new Audio('public/Isq Risk.mp3'); // Path to the audio file
                ishqRiskAudio.play().catch((error) => {
                    console.error("Error playing audio: ", error);
                });
            } else {
                messageElement.innerText = "❌ Wrong guess! Try again!";
            }
        });
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    let isDarkMode = true; // Start with dark mode
    
    function setInitialTheme() {
        if (isDarkMode) {
            themeIcon.src = "public/whitemode.webp"; // Dark mode icon
            themeToggleBtn.innerHTML = `<img id="theme-icon" src="public/darkmode.webp" alt="Dark Mode Icon" style="width: 20px; height: 20px; margin-right: 5px;"> Switch to york Mode`; // Button text for dark mode
        } else {
            themeIcon.src = "public/darkmode.webp"; // Light mode icon
            themeToggleBtn.innerHTML = `<img id="theme-icon" src="public/whitemode.webp" alt="White Mode Icon" style="width: 20px; height: 20px; margin-right: 5px;"> Switch to Jivi Mode`; // Button text for light mode
        }
    }
    
    if (themeToggleBtn) {
        setInitialTheme();
        themeToggleBtn.addEventListener('click', function () {
            document.body.classList.toggle('dark');
            document.querySelector('.container').classList.toggle('dark');
            document.querySelector('h1').classList.toggle('dark');
            document.querySelectorAll('h2').forEach(h2 => h2.classList.toggle('dark'));
            document.querySelectorAll('button').forEach(button => button.classList.toggle('dark'));
    
            // Toggle the mode
            isDarkMode = !isDarkMode; // Toggle state after updating the theme
            setInitialTheme(); // Set the theme for the new state
        });
    }
    
    // MilkShake's talk more button
// Get action div once to improve efficiency
const actionDiv = document.getElementById("actions");

// Function to handle MilkShake button click
const handleMilkShakeButtonClick = () => {
    const milkshakeResponses = [
        "MilkShake just found out that unicorns love chocolate milk!",
        "Did you know MilkShake once tried to convince a cow to make strawberry milk?",
        "MilkShake believes that talking to fruit makes them grow sweeter!",
        "MilkShake has an entire debate on why chocolate should be a primary food group!"
    ];
    const randomResponse = milkshakeResponses[Math.floor(Math.random() * milkshakeResponses.length)];
    actionDiv.innerHTML = `<p>${randomResponse}</p>`;
    actionDiv.style.color = "#ff4081"; // MilkShake color
};

// Function to handle Sahil Shake button click
const handleSahilShakeButtonClick = () => {
    const sahilResponses = [
        "Sahil Shake thinks that dancing with spoons is the ultimate workout!",
        "Did you know Sahil once tried to shake hands with a jellyfish? That was a weird day!",
        "Sahil Shake just made a dance move called 'The Wobble Shake'!",
        "Sahil believes that pancakes should be served with high-fives!"
    ];
    const randomResponse = sahilResponses[Math.floor(Math.random() * sahilResponses.length)];
    actionDiv.innerHTML = `<p>${randomResponse}</p>`;
    actionDiv.style.color = "#00bcd4"; // Sahil color
};

// MilkShake button event listener
const talkMoreButton = document.getElementById("talkMore");
if (talkMoreButton) {
    talkMoreButton.addEventListener("click", handleMilkShakeButtonClick);
}

// Sahil Shake button event listener
const sahilShakeButton = document.getElementById("shakeItOff");
if (sahilShakeButton) {
    sahilShakeButton.addEventListener("click", handleSahilShakeButtonClick);
}

    // Play Sahil's audio
    const sahilAudioButton = document.getElementById("playAudio");
    if (sahilAudioButton) {
        const sahilAudio = new Audio('public/sahil.mp3');
        sahilAudioButton.addEventListener("click", function () {
            sahilAudio.play().catch((error) => {
                console.error("Error playing audio: ", error);
            });
        });
    }

    // Quiz Logic
    const questions = [
        {
            question: "What is the favorite time of Milkshake & Sahil to do gululu with each other?",
            options: ["Early morning", "mid night", "afternoon", "kabhi nhi"],
            answer: 1
        },
        {
            question: "What is Sahil Shake's superpower?",
            options: ["Napping", "yapping", "nodding", "getting insulted"],
            answer: 3
        },
        {
            question: "What is the name of Milkshake's favorite beverage?",
            options: ["Sahil shake", "Oreo shake (with pudina)", "Banana shake", "Bourbon shake"],
            answer: 0
        },
        {
            question: "What is the battery percentage of Sahil's phone RIGHT NOW!!!?",
            options: ["100% (are you sure??)", "75% (seriously?)", "69% (lil horny?)", "1%"],
            answer: 3
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const totalQuestions = questions.length;

    // Declare background music for the quiz
    const quizMusic = new Audio('public/KBC Timer.mp3');
    quizMusic.loop = true;

    const startQuizButton = document.getElementById("start-quiz");
    const nextButton = document.getElementById("next-button");

    if (startQuizButton) {
        startQuizButton.addEventListener("click", function () {
            startQuiz();
            quizMusic.play().catch((error) => {
                console.error("Error playing quiz music: ", error);
            });
        });
    }

    function startQuiz() {
        const quizContainer = document.getElementById("quiz-container");
        if (quizContainer) {
            quizContainer.style.display = "block";
            displayQuestion();
        }
    }

    function displayQuestion() {
        clearTimeout(timer);
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById("question");
        const optionsContainer = document.getElementById("options");

        if (questionElement && optionsContainer) {
            questionElement.innerText = currentQuestion.question;
            optionsContainer.innerHTML = ''; // Clear previous options

            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.innerText = option;
                button.onclick = () => selectAnswer(index);
                optionsContainer.appendChild(button);
            });

            startTimer();
        }
    }

    function startTimer() {
        let timeLeft = 30;
        const timerElement = document.getElementById("timer");

        if (timerElement) {
            timerElement.innerText = `Time left: ${timeLeft} seconds`;
            timer = setInterval(() => {
                timeLeft--;
                timerElement.innerText = `Time left: ${timeLeft} seconds`;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    nextQuestion(); // Automatically go to the next question when time's up
                }
            }, 1000);
        }
    }

    function selectAnswer(selectedIndex) {
        const correctAnswerIndex = questions[currentQuestionIndex].answer;
        if (selectedIndex === correctAnswerIndex) {
            score++;
        }
        clearInterval(timer);
        nextButton.style.display = "block";
    }

    if (nextButton) {
        nextButton.addEventListener("click", nextQuestion);
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            displayQuestion();
            nextButton.style.display = "none";
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timer);
        alert(`Quiz Finished! Your score: ${score}/${totalQuestions}`);
        quizMusic.pause();
    }

    // Lazy Load Images Logic
    const lazyLoadImages = document.querySelectorAll(".lazy-load");
    if (lazyLoadImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src'); // Use data-src for the actual image path
                    img.classList.add("loaded");
                    observer.unobserve(img); // Stop observing once the image is loaded
                }
            });
        });

        lazyLoadImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
});

// script.js

// Array of image paths
const images = [
    "public/screenshots/1.png",
    "public/screenshots/2.png",
    "public/screenshots/3.png",
    "public/screenshots/4.png",
    "public/screenshots/5.png",
    "public/screenshots/6.png",
    "public/screenshots/7.png",
    "public/screenshots/8.png"
];

// Get DOM elements
const currentImage = document.getElementById('current-image');
const randomButton = document.getElementById('random-button');

// Function to show a random image
function showRandomImage() {
    // Generate a random index based on the length of the images array
    const randomIndex = Math.floor(Math.random() * images.length);
    
    // Update the image source
    currentImage.src = images[randomIndex];
}

// Event listener for the button
randomButton.addEventListener('click', showRandomImage);


let selectedCategory;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timeLeft;
let timer;

const categories = {
    fruits: ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🥝', '🍒'],
    animals: ['🐶', '🐱', '🐻', '🐯', '🦁', '🐸', '🐷', '🐭'],
    cartoons: ['🦸', '🦹', '🤡', '👽', '🧙', '🦄', '👾', '🤖']
};

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('timeOptions').style.display = 'block';
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame(selectedTime) {
    cards = [...categories[selectedCategory], ...categories[selectedCategory]];
    cards = shuffle(cards);
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    document.getElementById('message-box').style.display = 'none';
    matchedPairs = 0;
    timeLeft = selectedTime;
    clearInterval(timer);
    document.getElementById('timer').textContent = timeLeft;
    
    cards.forEach((symbol, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
    startTimer();
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('matched')) {
        this.textContent = this.dataset.symbol; // Show emoji
        this.classList.add('flipped');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            document.getElementById('win-message').style.display = 'block';
            document.getElementById('lose-message').style.display = 'none';
            document.getElementById('message-box').style.display = 'block';
            clearInterval(timer);
        }
    } else {
        card1.classList.remove('flipped');
        card1.textContent = '';
        card2.classList.remove('flipped');
        card2.textContent = '';
    }
    flippedCards = [];
}

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            document.getElementById('win-message').style.display = 'none';
            document.getElementById('lose-message').style.display = 'block';
            document.getElementById('message-box').style.display = 'block';
            document.querySelectorAll('.card').forEach(card => card.removeEventListener('click', flipCard));
        }
    }, 1000);
}
// script.js

const quadrants = document.querySelectorAll('.quadrant');
const quadrantIds = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

// Mapear os números para cada quadrante conforme a solicitação
const quadrantNumbers = {
    'a': [1, 10, 19, 28, 37, 46],
    'b': [2, 11, 20, 29, 38, 47],
    'c': [3, 12, 21, 30, 39, 48],
    'd': [4, 13, 22, 31, 40, 49],
    'e': [5, 14, 23, 32, 41, 50],
    'f': [6, 15, 24, 33, 42, 51],
    'g': [7, 16, 25, 34, 43, 52],
    'h': [8, 17, 26, 35, 44, 53],
    'i': [9, 18, 27, 36, 45, 54]
};

const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const showLinesButton = document.getElementById('show-lines-button');
const timerDisplay = document.getElementById('timer');
let timerInterval;
let seconds = 0;
let currentNumber = 1;
let lastQuadrant = null;
let isTimerRunning = false;
let allNumbersCircled = new Set(); // Conjunto para rastrear números circulados

// Função para distribuir os números entre os quadrantes
function distributeNumbers() {
    quadrantIds.forEach(id => {
        const quadrant = document.getElementById(`quadrant-${id}`);
        const numbers = quadrantNumbers[id];
        
        // Embaralha os números dentro do quadrante
        const shuffledNumbers = shuffle(numbers);

        quadrant.innerHTML = ''; // Limpa o conteúdo atual do quadrante

        shuffledNumbers.forEach(number => {
            const button = document.createElement('button');
            button.textContent = number;
            button.classList.add('number');

            // Define um tamanho aleatório para os números
            const size = Math.floor(Math.random() * 40) + 30; // Tamanho entre 30px e 70px
            button.style.width = `${size}px`;
            button.style.height = `${size}px`;
            button.style.fontSize = `${size / 2}px`;

            // Aplica a classe "upside-down" aleatoriamente para alguns números
            if (Math.random() < 0.2) {  // Aproximadamente 20% dos números de cabeça para baixo
                button.classList.add('upside-down');
            }

            // Evento de clique para controlar a sequência correta e o cronômetro
            button.addEventListener('click', function() {
                const numberValue = parseInt(this.textContent);

                if (numberValue === 1 && !isTimerRunning) {
                    startTimer();
                }

                if (numberValue === currentNumber) {
                    const currentQuadrantElem = this.parentNode;

                    // Garante que o número correto está em um quadrante diferente do anterior
                    if (lastQuadrant !== currentQuadrantElem || lastQuadrant === null) {
                        this.classList.add('circled');
                        lastQuadrant = currentQuadrantElem;
                        currentNumber++;

                        // Adiciona o número ao conjunto de números circulados
                        allNumbersCircled.add(numberValue);

                        // Verifica se todos os números foram circulados
                        if (allNumbersCircled.size === 54) {
                            stopTimer();
                        }
                    }
                }
            });

            quadrant.appendChild(button);
        });
    });
}

// Função para embaralhar os números aleatoriamente
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para iniciar o cronômetro
function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);
    }
}

// Função para parar o cronômetro
function stopTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }
}

// Função para reiniciar o jogo
function resetGame() {
    // Parar o cronômetro
    stopTimer();
    // Zerar o cronômetro e o contador de números
    seconds = 0;
    timerDisplay.textContent = '00:00';
    currentNumber = 1;
    lastQuadrant = null;
    isTimerRunning = false;
    allNumbersCircled.clear(); // Limpa o conjunto de números circulados
    // Re-distribuir os números
    distributeNumbers();
}

// Função para mostrar/ocultar as linhas dos quadrantes
function toggleLines() {
    quadrants.forEach(quadrant => {
        quadrant.classList.toggle('show-lines');
    });
}

// Adiciona eventos aos botões
startButton.addEventListener('click', () => {
    if (currentNumber === 1 && !isTimerRunning) {
        startTimer();
    }
});

resetButton.addEventListener('click', resetGame);

showLinesButton.addEventListener('click', toggleLines);

// Distribui os números conforme o esquema solicitado
distributeNumbers();

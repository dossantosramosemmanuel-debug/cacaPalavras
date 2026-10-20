const WORDS = [
  { word: 'JOGADA', category: 'Tática', hint: 'Movimento inteligente em campo' },
  { word: 'DEFESA', category: 'Time', hint: 'Parte que protege o gol' },
  { word: 'ATAQUE', category: 'Ataque', hint: 'Parte que tenta marcar' },
  { word: 'GOLADA', category: 'Gols', hint: 'Resultado alto em uma partida' },
  { word: 'CAMISA', category: 'Uniforme', hint: 'Roupa usada pelo jogador' },
  { word: 'TREINO', category: 'Preparação', hint: 'Sessão para melhorar o jogo' },
  { word: 'EMPATE', category: 'Resultado', hint: 'Quando os times ficam iguais' },
  { word: 'PENALTI', category: 'Jogada', hint: 'Cobrança após falta dentro da área' },
  { word: 'DRIBLE', category: 'Tática', hint: 'Finta para enganar o marcador' },
  { word: 'TABELA', category: 'Estatística', hint: 'Lugar para ver resultados' },
  { word: 'FUTBOL', category: 'Esporte', hint: 'Jogo praticado por times' },
  { word: 'MARCAR', category: 'Tática', hint: 'Seguir o adversário no campo' },
  { word: 'CHUTAR', category: 'Ação', hint: 'Enviar a bola para o gol' },
  { word: 'TRAVES', category: 'Gol', hint: 'Chute que passa perto do alvo' },
  { word: 'ESCUDO', category: 'Clube', hint: 'Emblema do time' },
  { word: 'GOLAZO', category: 'Gol', hint: 'Chute muito forte e certeiro' },
  { word: 'PONTOS', category: 'Tabela', hint: 'Resultado que vale na competição' },
  { word: 'CANTOA', category: 'Campo', hint: 'Lado do gramado para a cobrança' },
  { word: 'TIMADA', category: 'Time', hint: 'Partida com muito coração' },
  { word: 'NEYMAR', category: 'Jogador', hint: 'Craque brasileiro muito habilidoso' },
  { word: 'PEDRO', category: 'Jogador', hint: 'Atacante com nome de fruta' },
  { word: 'RONALDO', category: 'Jogador', hint: 'Fenômeno histórico do futebol' },
  { word: 'CAVANI', category: 'Jogador', hint: 'Atacante uruguaio de muita potência' },
  { word: 'MENDES', category: 'Jogador', hint: 'Lateral ou zagueiro do futebol atual' },
  { word: 'LUCAS', category: 'Jogador', hint: 'Nome comum em clubes de futebol' },
  { word: 'ZLATAN', category: 'Jogador', hint: 'Atacante sueco famoso pelo físico' },
  { word: 'MILITAO', category: 'Jogador', hint: 'Zagueiro brasileiro muito veloz' },
  { word: 'VITOR', category: 'Jogador', hint: 'Nome de atleta muito usado' },
  { word: 'BOSQUE', category: 'Campo', hint: 'Não é futebol, mas tem a cara de um campo' },
  { word: 'ESTRADA', category: 'Viagem', hint: 'Caminho de muitos times' },
  { word: 'GOLPE', category: 'Tática', hint: 'Movimento rápido para surpreender' },
  { word: 'MARCAR', category: 'Defesa', hint: 'Seguir o adversário em campo' },
  { word: 'GOLEI', category: 'Gol', hint: 'Ação de finalizar com sucesso' },
  { word: 'COUTINHO', category: 'Jogador', hint: 'Nome de atacante com toques de categoria' },
  { word: 'GABRIEL', category: 'Jogador', hint: 'Nome muito usado em times brasileiros' },
  { word: 'VINICIUS', category: 'Jogador', hint: 'Atacante veloz e decisivo' },
  { word: 'RAPIDO', category: 'Atributo', hint: 'Característica de quem sai na frente' },
  { word: 'ALCANCE', category: 'Campo', hint: 'Distância que um jogador consegue alcançar' },
  { word: 'AREIA', category: 'Campo', hint: 'Superfície usada em muitas práticas esportivas' },
  { word: 'MASSA', category: 'Time', hint: 'Grupo de jogadores com boa química' },
  { word: 'CATEGOR', category: 'Tática', hint: 'Tipo de plano usado pelo técnico' },
  { word: 'FALHA', category: 'Erro', hint: 'Erro que pode custar um gol' },
  { word: 'BOLA', category: 'Objeto', hint: 'Elemento central do esporte' },
  { word: 'TORCIDA', category: 'Futebol', hint: 'Grupo que apoia o time' },
  { word: 'ARTILHEIRO', category: 'Jogador', hint: 'Quem faz muitos gols' },
  { word: 'MELHORIA', category: 'Treino', hint: 'Objetivo de cada preparação' }
];

const MAX_GUESSES = 6;
const DEFAULT_WORD_LENGTH = 5;
const LENGTH_OPTIONS = [5, 6, 7, 8];
const STORAGE_KEY = 'palavra-em-6-stats';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const boardElement = document.getElementById('board');
const keyboardElement = document.getElementById('keyboard');
const statusMessage = document.getElementById('status-message');
const categoryEl = document.getElementById('category');
const hintEl = document.getElementById('hint');
const statsEl = document.getElementById('stats');
const newGameButton = document.getElementById('new-game');

const state = {
  secretWord: '',
  category: '',
  hint: '',
  wordLength: DEFAULT_WORD_LENGTH,
  currentRow: 0,
  currentCol: 0,
  board: [],
  resultGrid: [],
  keyboardStatus: {},
  isFinished: false,
  stats: readStats()
};

function readStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { wins: 0, games: 0, streak: 0, best: 0 };
  } catch (error) {
    return { wins: 0, games: 0, streak: 0, best: 0 };
  }
}

function saveStats() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.stats));
  } catch (error) {
    updateStatus('Não foi possível salvar suas estatísticas localmente.');
  }
}

function updateStatsView() {
  statsEl.textContent = `${state.stats.wins} vitórias • ${state.stats.games} partidas`;
}

function createBoard() {
  state.board = Array.from({ length: MAX_GUESSES }, () => Array(state.wordLength).fill(''));
  state.resultGrid = Array.from({ length: MAX_GUESSES }, () => Array(state.wordLength).fill(''));
  boardElement.style.setProperty('--word-length', String(state.wordLength));
}

function buildKeyboard() {
  keyboardElement.innerHTML = '';
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<']
  ];

  rows.forEach((row) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'keyboard-row';

    row.forEach((key) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = key === '<' ? '⌫' : key;
      button.className = 'key';

      if (key === 'ENTER' || key === '<') {
        button.classList.add('wide');
      }

      if (key !== 'ENTER' && key !== '<') {
        const status = state.keyboardStatus[key];
        if (status) {
          button.classList.add(status);
        }
      }

      button.setAttribute('aria-label', key === '<' ? 'Apagar' : key === 'ENTER' ? 'Enviar tentativa' : `Letra ${key}`);
      button.addEventListener('click', () => handleKeyInput(key));
      rowEl.appendChild(button);
    });

    keyboardElement.appendChild(rowEl);
  });
}

function renderBoard() {
  boardElement.innerHTML = '';

  state.board.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.className = 'row';

    row.forEach((letter, colIndex) => {
      const cell = document.createElement('div');
      const value = letter || '';
      cell.className = 'cell';
      cell.textContent = value;

      if (value) {
        cell.classList.add('filled');
      }

      const status = state.resultGrid[rowIndex]?.[colIndex];
      if (status) {
        cell.classList.add(status);
        cell.classList.add('revealed');
      }

      rowElement.appendChild(cell);
    });

    boardElement.appendChild(rowElement);
  });
}

function updateStatus(message) {
  statusMessage.textContent = message;
}

function getRandomWord() {
  const length = LENGTH_OPTIONS[Math.floor(Math.random() * LENGTH_OPTIONS.length)];
  const filtered = WORDS.filter((entry) => entry.word.length === length);
  const candidatePool = filtered.length > 0 ? filtered : WORDS;
  const chosen = candidatePool[Math.floor(Math.random() * candidatePool.length)] || WORDS[0];
  state.wordLength = chosen.word.length;
  return chosen;
}

function startNewGame() {
  const chosen = getRandomWord();
  state.secretWord = chosen.word.trim().toUpperCase();
  state.category = chosen.category;
  state.hint = chosen.hint;
  state.currentRow = 0;
  state.currentCol = 0;
  state.isFinished = false;
  createBoard();
  state.keyboardStatus = {};
  categoryEl.textContent = chosen.category;
  hintEl.textContent = chosen.hint;
  buildKeyboard();
  renderBoard();
  updateStatus(`Adivinhe a palavra em até 6 tentativas com ${state.wordLength} letras.`);
}

function normalizeLetter(key) {
  if (typeof key !== 'string') return '';
  const value = key.trim().toUpperCase();
  return ALPHABET.includes(value) ? value : '';
}

function addLetter(letter) {
  if (state.isFinished) return;
  if (state.currentCol >= state.wordLength) return;

  state.board[state.currentRow][state.currentCol] = letter;
  state.currentCol += 1;
  renderBoard();
}

function removeLetter() {
  if (state.isFinished) return;
  if (state.currentCol === 0) return;
  state.currentCol -= 1;
  state.board[state.currentRow][state.currentCol] = '';
  renderBoard();
}

function evaluateGuess(guess) {
  const result = Array(state.wordLength).fill('absent');
  const secretCopy = state.secretWord.split('');
  const guessLetters = guess.split('');

  guessLetters.forEach((letter, index) => {
    if (letter === secretCopy[index]) {
      result[index] = 'correct';
      secretCopy[index] = null;
    }
  });

  guessLetters.forEach((letter, index) => {
    if (result[index] === 'correct') return;
    const secretIndex = secretCopy.indexOf(letter);
    if (secretIndex !== -1) {
      result[index] = 'present';
      secretCopy[secretIndex] = null;
    }
  });

  state.resultGrid[state.currentRow] = [...result];

  result.forEach((status, index) => {
    const letter = guess[index];
    const current = state.keyboardStatus[letter];
    if (!current || priorityMap(status) > priorityMap(current)) {
      state.keyboardStatus[letter] = status;
    }
  });

  buildKeyboard();
  renderBoard();
}

function priorityMap(status) {
  const map = { correct: 3, present: 2, absent: 1, '': 0 };
  return map[status] ?? 0;
}

function submitGuess() {
  if (state.isFinished) return;

  const guess = state.board[state.currentRow].join('').trim().toUpperCase();
  if (guess.length !== state.wordLength || !/^[A-Z]+$/.test(guess)) {
    updateStatus(`Sua palavra precisa ter ${state.wordLength} letras.`);
    return;
  }

  evaluateGuess(guess);

  if (guess === state.secretWord) {
    state.isFinished = true;
    state.stats.games += 1;
    state.stats.wins += 1;
    state.stats.streak += 1;
    state.stats.best = Math.max(state.stats.best, state.stats.streak);
    saveStats();
    updateStatsView();
    updateStatus(`Você venceu! A palavra era ${state.secretWord}.`);
    return;
  }

  if (state.currentRow === MAX_GUESSES - 1) {
    state.isFinished = true;
    state.stats.games += 1;
    state.stats.streak = 0;
    saveStats();
    updateStatsView();
    updateStatus(`Fim de jogo! A palavra era ${state.secretWord}.`);
    return;
  }

  state.currentRow += 1;
  state.currentCol = 0;
  updateStatus('Boa tentativa! Continue.');
}

function handleKeyInput(rawKey) {
  const key = rawKey.toString().toUpperCase();

  if (key === 'ENTER') {
    submitGuess();
    return;
  }

  if (key === 'BACKSPACE' || key === '<') {
    removeLetter();
    return;
  }

  const letter = normalizeLetter(key);
  if (letter) {
    addLetter(letter);
  }
}

document.addEventListener('keydown', (event) => {
  const targetTag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : '';

  if (event.key === 'Enter' && targetTag !== 'button') {
    handleKeyInput('ENTER');
    return;
  }

  if (event.key === 'Backspace' && targetTag !== 'button') {
    event.preventDefault();
    handleKeyInput('BACKSPACE');
    return;
  }

  const letter = normalizeLetter(event.key);
  if (letter && targetTag !== 'button') {
    handleKeyInput(letter);
  }
});

newGameButton.addEventListener('click', () => {
  startNewGame();
});

updateStatsView();
startNewGame();

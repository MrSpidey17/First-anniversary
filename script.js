/* ═══════════════════════════════════════════════════════════
   script.js — Romantic Anniversary Website
   ✏️ CUSTOMIZE: Edit quiz questions, future plans, password,
   typed message, and other content sections below.
═══════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────
   0. WAIT FOR DOM
──────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initPetals();
  initNav();
  initScrollAnimations();
  initEasterEggs();
  initMusic();
  initQuiz();
  initTypedMessage();
  renderFuturePlans();
  initFutureAnimations();
});

/* ────────────────────────────────────────────────────────
   1. CUSTOM CURSOR
──────────────────────────────────────────────────────── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  if (!cursor) return;

  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    // Smooth trail
    trailX += (e.clientX - trailX) * 0.18;
    trailY += (e.clientY - trailY) * 0.18;
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';
  });

  // Grow cursor on clickable elements
  document.querySelectorAll('a, button, .quiz-option, .easter-egg, .falling-heart').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.7)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}

/* ────────────────────────────────────────────────────────
   2. FLOATING PETALS ON HERO
──────────────────────────────────────────────────────── */
function initPetals() {
  const container = document.getElementById('petals');
  if (!container) return;
  const symbols = ['🌸', '🌺', '🌹', '💮', '✿'];

  // Create 18 petals with random props
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement('span');
    petal.classList.add('petal');
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left      = Math.random() * 100 + '%';
    petal.style.fontSize  = (0.8 + Math.random() * 1.4) + 'rem';
    petal.style.animationDuration  = (6 + Math.random() * 12) + 's';
    petal.style.animationDelay     = (Math.random() * 10) + 's';
    container.appendChild(petal);
  }
}

/* ────────────────────────────────────────────────────────
   3. NAVIGATION — shrink on scroll
──────────────────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ────────────────────────────────────────────────────────
   4. SCROLL ANIMATIONS (Intersection Observer)
──────────────────────────────────────────────────────── */
function initScrollAnimations() {
  // Add animation classes to timeline items
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'slide-right' : 'slide-left');
  });

  // Add fade-in to section headers
  document.querySelectorAll('.section-header').forEach(el => el.classList.add('fade-in'));

  // Generic observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in').forEach(el => observer.observe(el));
}

/* ────────────────────────────────────────────────────────
   5. EASTER EGGS
──────────────────────────────────────────────────────── */
function initEasterEggs() {
  document.querySelectorAll('.easter-egg').forEach(el => {
    el.addEventListener('click', () => {
      showEggModal(el.dataset.msg);
    });
  });
}

function showEggModal(msg) {
  const modal = document.getElementById('eggModal');
  document.getElementById('eggModalMsg').textContent = msg;
  modal.classList.remove('hidden');
}

function closeEggModal() {
  document.getElementById('eggModal').classList.add('hidden');
}

// Close on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('eggModal');
  if (e.target === modal) closeEggModal();
});

/* ────────────────────────────────────────────────────────
   6. BACKGROUND MUSIC
──────────────────────────────────────────────────────── */
function initMusic() {
  const btn   = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');
  if (!btn || !audio) return;

  let playing = false;

  // Try autoplay (will likely be blocked by browser — user must click)
  audio.volume = 0.35;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.title = 'Play music';
      btn.querySelector('.music-icon').textContent = '♪';
      btn.classList.add('muted');
    } else {
      audio.play().catch(() => {});
      btn.title = 'Pause music';
      btn.querySelector('.music-icon').textContent = '♬';
      btn.classList.remove('muted');
    }
    playing = !playing;
  });
}

/* ────────────────────────────────────────────────────────
   7. QUIZ
   ✏️ CUSTOMIZE: Edit questions, options, and correct answers
──────────────────────────────────────────────────────── */
const quizQuestions = [
  {
    q: '✏️ "Accha relationship t oha r kotha tu ki bhabe"---timing of this famous line?',
    options: ['2:13 AM', '2:23 AM', '2:32 AM', '2:29 AM'],
    answer: 2   // ✏️ index of correct option (0 = first)
  },
  {
    q: '✏️ Date of our first call?',
    options: ['5 Feb 2025', '7 Feb 2025', '6 Feb 2025', '4 Feb 2025'],
    answer: 0
  },
  {
    q: '✏️ Date of our first VC?',
    options: ['17 Aug 2025', '8 Aug 2025', '27 July 2025', '11 Aug 2025'],
    answer: 1
  },
  {
    q: '✏️ What song I sang for the very first time?',
    options: ['Sawarne Lage', 'Rangdhali', 'Paro', 'Motoliya 2.0'],
    answer: 3
  },
  {
    q: '✏️ At what time we saw each other for the first time physically?',
    options: ['11:13 AM', '11:20 AM', '11:09 AM', '11:17 AM'],
    answer: 0
  }
];

// Result messages based on score
const quizResults = [
  { min: 5, emoji: '🥰', title: 'Soulmate Status!', msg: 'You know me better than I know myself. I am yours, completely.' },
  { min: 3, emoji: '💕', title: 'Pretty Good, Love!', msg: 'You pay attention. That is one of the things I love most about you.' },
  { min: 1, emoji: '🌸', title: 'Still Learning!', msg: 'We have forever to learn every little thing about each other. And I cannot wait.' },
  { min: 0, emoji: '😄', title: 'We Need More Dates!', msg: 'That is okay — every wrong answer is just an excuse to spend more time together.' }
];

let currentQuestion = 0;
let score = 0;

function initQuiz() {
  showQuestion();
}

function showQuestion() {
  const wrap = document.getElementById('quizQuestionWrap');
  const counter = document.getElementById('quizCounter');
  const progress = document.getElementById('quizProgress');
  if (!wrap) return;

  const q = quizQuestions[currentQuestion];
  progress.style.width = ((currentQuestion / quizQuestions.length) * 100) + '%';
  counter.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

  wrap.innerHTML = `
    <p class="quiz-question">${q.q}</p>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" onclick="selectAnswer(${i})">${opt}</button>
      `).join('')}
    </div>
  `;
}

function selectAnswer(index) {
  const q = quizQuestions[currentQuestion];
  const buttons = document.querySelectorAll('.quiz-option');

  // Disable all buttons
  buttons.forEach(btn => btn.disabled = true);

  // Highlight correct / wrong
  buttons[q.answer].classList.add('correct');
  if (index !== q.answer) {
    buttons[index].classList.add('wrong');
  } else {
    score++;
  }

  // Move to next question after delay
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      showQuestion();
    } else {
      showQuizResult();
    }
  }, 900);
}

function showQuizResult() {
  document.getElementById('quizQuestionWrap').innerHTML = '';
  document.getElementById('quizProgress').style.width = '100%';
  document.getElementById('quizCounter').textContent = 'Complete!';

  const result = quizResults.find(r => score >= r.min);
  document.getElementById('resultEmoji').textContent = result.emoji;
  document.getElementById('resultTitle').textContent = result.title + ' (' + score + '/' + quizQuestions.length + ')';
  document.getElementById('resultMsg').textContent = result.msg;
  document.getElementById('quizResult').classList.remove('hidden');
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('quizResult').classList.add('hidden');
  showQuestion();
}

/* ────────────────────────────────────────────────────────
   8. MINI GAME — Catch the Hearts
──────────────────────────────────────────────────────── */
let gameScore  = 0;
let gameBest   = 0;
let gameTime   = 30;
let gameActive = false;
let gameIntervals = [];

const heartTypes = ['♥', '💕', '💗', '💖', '💝'];

function startGame() {
  // Reset state
  gameScore  = 0;
  gameTime   = 30;
  gameActive = true;
  gameIntervals.forEach(clearInterval);
  gameIntervals = [];

  // Clear arena
  const arena = document.getElementById('gameArena');
  arena.innerHTML = '';
  document.getElementById('gameStartOverlay')?.remove();
  document.getElementById('gameOverOverlay').classList.add('hidden');

  updateGameHUD();

  // Spawn hearts every 700ms
  const spawnInterval = setInterval(() => {
    if (!gameActive) { clearInterval(spawnInterval); return; }
    spawnHeart();
  }, 700);
  gameIntervals.push(spawnInterval);

  // Countdown
  const timerInterval = setInterval(() => {
    if (!gameActive) { clearInterval(timerInterval); return; }
    gameTime--;
    document.getElementById('gameTimer').textContent = gameTime;
    if (gameTime <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
  gameIntervals.push(timerInterval);
}

function spawnHeart() {
  const arena = document.getElementById('gameArena');
  const heart = document.createElement('span');
  heart.classList.add('falling-heart');
  heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];

  const duration = 2.5 + Math.random() * 2; // seconds
  heart.style.left = Math.random() * 88 + '%';
  heart.style.animationDuration = duration + 's';

  heart.addEventListener('click', (e) => {
    if (!gameActive) return;
    gameScore++;
    updateGameHUD();
    showPopText(e.clientX, e.clientY, '+1');
    heart.remove();
  });

  arena.appendChild(heart);

  // Remove after fall
  setTimeout(() => heart.remove(), duration * 1000 + 200);
}

function showPopText(x, y, text) {
  const pop = document.createElement('span');
  pop.classList.add('pop-text');
  pop.textContent = text;
  const arena = document.getElementById('gameArena');
  const rect  = arena.getBoundingClientRect();
  pop.style.left = (x - rect.left) + 'px';
  pop.style.top  = (y - rect.top)  + 'px';
  arena.appendChild(pop);
  setTimeout(() => pop.remove(), 700);
}

function updateGameHUD() {
  document.getElementById('gameScore').textContent = gameScore;
  document.getElementById('gameTimer').textContent = gameTime;
}

function endGame() {
  gameActive = false;
  gameIntervals.forEach(clearInterval);

  // Update best
  if (gameScore > gameBest) {
    gameBest = gameScore;
    document.getElementById('gameBest').textContent = gameBest;
  }

  // Messages based on score
  let msg = '';
  if      (gameScore >= 20) msg = `🎉 ${gameScore} hearts! You caught them all — just like you caught mine.`;
  else if (gameScore >= 10) msg = `💕 ${gameScore} hearts! Pretty impressive, love.`;
  else                       msg = `😊 ${gameScore} hearts! Not bad — there will always be more hearts for you.`;

  document.getElementById('gameOverMsg').textContent = msg;
  document.getElementById('gameOverOverlay').classList.remove('hidden');
}

/* ────────────────────────────────────────────────────────
   9. TYPED MESSAGE
   ✏️ CUSTOMIZE: Edit the message text below
──────────────────────────────────────────────────────── */
function initTypedMessage() {
  const el = document.getElementById('typedMessage');
  if (!el) return;

  // ✏️ CUSTOMIZE: Replace this text with your own message
  const message = `Meeting you was like finding a song I had always been searching for but never knew the name of. Every single day with you feels like the chorus I want to keep replaying. You are my favourite part of every story I will ever tell.`;

  let i = 0;
  const speed = 45; // ms per character

  // Wait until section is in view, then start typing
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      const type = () => {
        if (i < message.length) {
          el.textContent += message[i];
          i++;
          setTimeout(type, speed);
        }
      };
      setTimeout(type, 400);
    }
  }, { threshold: 0.4 });

  observer.observe(el.closest('.message-box') || el);
}

/* ────────────────────────────────────────────────────────
   10. SECRET PASSWORD
   ✏️ CUSTOMIZE: Change the password below
──────────────────────────────────────────────────────── */
function checkPassword() {
  // ✏️ CUSTOMIZE: Set your secret date/password here (case-insensitive)
  const correctPassword = '26112024'; // example: DDMMYYYY of first meeting

  const input = document.getElementById('secretInput').value.trim();
  const error = document.getElementById('secretError');
  const letter = document.getElementById('loveLetter');

  if (input.toLowerCase() === correctPassword.toLowerCase()) {
    error.classList.add('hidden');
    letter.classList.remove('hidden');
    letter.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    error.classList.remove('hidden');
    // Shake the input
    const inp = document.getElementById('secretInput');
    inp.style.animation = 'none';
    void inp.offsetWidth;
    inp.style.animation = 'shake 0.4s ease';
  }
}

// Allow Enter key in secret input
document.addEventListener('DOMContentLoaded', () => {
  const si = document.getElementById('secretInput');
  if (si) si.addEventListener('keydown', e => { if (e.key === 'Enter') checkPassword(); });
});

// Shake keyframe (injected via JS since it's just one-off)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-8px)}
    40%{transform:translateX(8px)}
    60%{transform:translateX(-6px)}
    80%{transform:translateX(6px)}
  }
`;
document.head.appendChild(shakeStyle);

/* ────────────────────────────────────────────────────────
   11. FUTURE PLANS
   ✏️ CUSTOMIZE: Edit the plans array below
──────────────────────────────────────────────────────── */
const futurePlans = [
  { icon: '✈️', title: '✏️ Travel Together',     desc: '✏️ Start in Assam… explore India… end up traveling the world with you ❤️✈️' },
  { icon: '🏡', title: '✏️ Our Own Place',       desc: '✏️ Our own cozy home… and bacche do hi acche ❤️' },
  { icon: '🐶', title: '✏️ A Pet Together',      desc: '✏️ Why not have your favorite golden retriever as our little family member? 🐾❤️' },
  { icon: '🎂', title: '✏️ More Anniversaries',  desc: '✏️ Anniversaries may count linearly… but our love multiplies endlessly ❤️' },
  { icon: '📚', title: '✏️ Learning Together',   desc: '✏️ First, we finish our engineering… then build our lives, side by side ❤️' },
  { icon: '🌙', title: '✏️ Everyday With You',  desc: '✏️ Every day with you is special… today through screens, tomorrow in every phase of life ❤️' },
];

function renderFuturePlans() {
  const grid = document.getElementById('futureGrid');
  if (!grid) return;

  futurePlans.forEach((plan, i) => {
    const card = document.createElement('div');
    card.classList.add('future-card');
    card.style.transitionDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <div class="icon">${plan.icon}</div>
      <h4>${plan.title}</h4>
      <p>${plan.desc}</p>
    `;
    grid.appendChild(card);
  });
}

function initFutureAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.future-card').forEach(card => card.classList.add('visible'));
      }
    });
  }, { threshold: 0.2 });

  const grid = document.getElementById('futureGrid');
  if (grid) observer.observe(grid);
}

/* ────────────────────────────────────────────────────────
   12. CONFETTI
──────────────────────────────────────────────────────── */
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Pin the canvas over the ENTIRE viewport so confetti covers the whole page
  canvas.style.position   = 'fixed';
  canvas.style.top        = '0';
  canvas.style.left       = '0';
  canvas.style.width      = '100vw';
  canvas.style.height     = '100vh';
  canvas.style.zIndex     = '9999';
  canvas.style.pointerEvents = 'none';
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors  = ['#e8678a','#c0395e','#f8bbd0','#fce4ec','#ff8fab','#ffb3c6','#fff0f3'];
  const shapes  = ['♥','●','★'];
  const pieces  = [];

  // Create 140 confetti pieces
  for (let i = 0; i < 140; i++) {
    pieces.push({
      x:     Math.random() * canvas.width,
      y:     -20 - Math.random() * canvas.height * 0.5,
      dx:    (Math.random() - 0.5) * 4,
      dy:    2 + Math.random() * 4,
      size:  10 + Math.random() * 14,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rot:   Math.random() * 360,
      rotV:  (Math.random() - 0.5) * 5,
      opacity: 0.8 + Math.random() * 0.2
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle   = p.color;
      ctx.font = p.size + 'px serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.shape, 0, 0);
      ctx.restore();

      p.x   += p.dx;
      p.y   += p.dy;
      p.rot += p.rotV;

      // Reset if off screen
      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });

    frame++;
    if (frame < 300) requestAnimationFrame(draw); // run for ~5s
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Return canvas to its original in-section state
      canvas.style.position = '';
      canvas.style.top      = '';
      canvas.style.left     = '';
      canvas.style.width    = '';
      canvas.style.height   = '';
      canvas.style.zIndex   = '';
    }
  }
  draw();
}

// Auto-trigger confetti when final section comes into view
const finalObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    setTimeout(launchConfetti, 600);
    finalObs.disconnect();
  }
}, { threshold: 0.5 });

const finalSection = document.getElementById('final');
if (finalSection) finalObs.observe(finalSection);

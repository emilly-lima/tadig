/* ==========================
   ESTADO GLOBAL E RASTREAMENTO
========================== */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Flags de controle de input
let isTouching = false;
let lastInputType = "MOUSE"; // 'MOUSE' ou 'TOUCH'

const root = document.documentElement;

// Atualiza posição e verifica colisão da lanterna
function updateState(x, y) {
  mouseX = x;
  mouseY = y;

  //Atualiza as variáveis visuais??
  root.style.setProperty("--cursorX", x + "px");
  root.style.setProperty("--cursorY", y + "px");

  checkLanternCollision();
}

// Verifica colisão da lanterna com os painéis
function checkLanternCollision() {
  const hoveredEl = document.elementFromPoint(mouseX, mouseY);

  if (
    hoveredEl &&
    hoveredEl.matches('img[alt="Panel 5"], img[alt="Panel 6"]')
  ) {
    root.classList.add("no-lantern");
  } else {
    root.classList.remove("no-lantern");
  }
}

/* ==========================
   HANDLERS DE INPUT
========================== */

function handleInput(e) {
  let x, y;

  if (e.type.startsWith("touch")) {
    lastInputType = "TOUCH";
    isTouching = true;
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    lastInputType = "MOUSE";
    isTouching = false; // Mouse não é "touch"
    x = e.clientX;
    y = e.clientY;
  }

  if (x !== undefined && y !== undefined) {
    updateState(x, y);
  }
}

function handleTouchEnd() {
  isTouching = false;
}

// Listeners de movimento e interação
window.addEventListener("mousemove", handleInput);
window.addEventListener("touchstart", handleInput, { passive: true });
window.addEventListener("touchmove", handleInput, { passive: true });
window.addEventListener("touchend", handleTouchEnd);

// Listener de Scroll
window.addEventListener("scroll", checkLanternCollision, { passive: true });

/* ==========================
   SCROLL AUTOMÁTICO
========================== */

const edgeSize = 100; // Tamanho da borda ativa
const maxSpeed = 15; // Velocidade máxima de scroll

function autoScroll() {
  // Se for Touch e o usuário soltou o dedo, não faz scroll.
  // Pra scroll infinito no mobile depois de um toque só na borda.
  if (lastInputType === "TOUCH" && !isTouching) {
    requestAnimationFrame(autoScroll);
    return;
  }

  const vh = window.innerHeight;
  let speed = 0;

  // Lógica de Scroll com suavização nas bordas
  if (mouseY < edgeSize) {
    // Borda superior
    const intensity = (edgeSize - mouseY) / edgeSize;
    speed = -maxSpeed * intensity;
  } else if (mouseY > vh - edgeSize) {
    // Borda inferior
    const intensity = (mouseY - (vh - edgeSize)) / edgeSize;
    speed = maxSpeed * intensity;
  }

  if (speed !== 0) {
    window.scrollBy(0, speed);
  }

  requestAnimationFrame(autoScroll);
}

autoScroll();

/* ==========================
   PLAYER DE ÁUDIO
========================== */

const podcastAudio = document.getElementById("podcast-audio");
const playBtn = document.getElementById("podcast-play");
const pauseBtn = document.getElementById("podcast-pause");

function playShow() {
  podcastAudio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function pauseShow() {
  podcastAudio.pause();
  playBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
}

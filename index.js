/* ==========================
   LANTERNA + POSIÇÃO DO MOUSE
========================== */

let mouseY = window.innerHeight / 2;

function update(e) {
  const x = e.clientX || e.touches?.[0].clientX;
  const y = e.clientY || e.touches?.[0].clientY;

  if (x !== undefined && y !== undefined) {
    document.documentElement.style.setProperty('--cursorX', x + 'px');
    document.documentElement.style.setProperty('--cursorY', y + 'px');
    mouseY = y;
  }
}

document.addEventListener('mousemove', update);
document.addEventListener('touchmove', update);


/* ==========================
   SCROLL AUTOMÁTICO POR BORDA
========================== */

const edgeSize = 120;
const maxSpeed = 12;

function autoScroll() {
  const vh = window.innerHeight;
  let speed = 0;

  if (mouseY < edgeSize) {
    speed = -maxSpeed * (1 - mouseY / edgeSize);
  } else if (mouseY > vh - edgeSize) {
    speed = maxSpeed * (1 - (vh - mouseY) / edgeSize);
  }

  if (speed !== 0) {
    window.scrollBy(0, speed);
  }

  requestAnimationFrame(autoScroll);
}

autoScroll();


/* ==========================
   CONTROLE ROBUSTO DA LANTERNA
========================== */

/* ==========================
   CONTROLE ROBUSTO DA LANTERNA
   (penúltimo + último quadro)
========================== */

const lightPanels = document.querySelectorAll('.light-panel');
const root = document.documentElement;

let lanternDisabledByLightPanel = false;

lightPanels.forEach(panel => {
  panel.addEventListener('mouseenter', () => {
    lanternDisabledByLightPanel = true;
    root.classList.add('no-lantern');
  });

  panel.addEventListener('mouseleave', () => {
    lanternDisabledByLightPanel = false;
    root.classList.remove('no-lantern');
  });
});

// Mouse sai da janela
window.addEventListener('mouseleave', () => {
  if (!lanternDisabledByLightPanel) {
    root.classList.remove('no-lantern');
  }
});

// Troca de aba / foco
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !lanternDisabledByLightPanel) {
    root.classList.remove('no-lantern');
  }
});



/* ==========================
   PLAYER DE ÁUDIO
========================== */

const podcastAudio = document.getElementById('podcast-audio');
const playBtn = document.getElementById('podcast-play');
const pauseBtn = document.getElementById('podcast-pause');

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

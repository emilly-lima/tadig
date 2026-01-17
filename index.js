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

const finalPanel = document.querySelector('.final-panel');
const root = document.documentElement;

let lanternDisabledByFinalPanel = false;

if (finalPanel) {
  finalPanel.addEventListener('mouseenter', () => {
    lanternDisabledByFinalPanel = true;
    root.classList.add('no-lantern');
  });

  finalPanel.addEventListener('mouseleave', () => {
    lanternDisabledByFinalPanel = false;
    root.classList.remove('no-lantern');
  });
}

window.addEventListener('mouseleave', () => {
  if (!lanternDisabledByFinalPanel) {
    root.classList.remove('no-lantern');
  }
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !lanternDisabledByFinalPanel) {
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

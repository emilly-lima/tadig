
/* ==========================
   LANTERNA (já existente)
========================== */

function update(e) {
  const x = e.clientX || e.touches?.[0].clientX;
  const y = e.clientY || e.touches?.[0].clientY;

  document.documentElement.style.setProperty('--cursorX', x + 'px');
  document.documentElement.style.setProperty('--cursorY', y + 'px');

  mouseY = y;
}

document.addEventListener('mousemove', update);
document.addEventListener('touchmove', update);


/* ==========================
   SCROLL POR POSIÇÃO DO MOUSE
========================== */

let mouseY = window.innerHeight / 2;
const edgeSize = 120;       // área sensível (px)
const maxSpeed = 12;        // velocidade máxima

function autoScroll() {
  const viewportHeight = window.innerHeight;
  let scrollSpeed = 0;

  // TOPO
  if (mouseY < edgeSize) {
    scrollSpeed = -maxSpeed * (1 - mouseY / edgeSize);
  }

  // BASE
  else if (mouseY > viewportHeight - edgeSize) {
    scrollSpeed =
      maxSpeed *
      (1 - (viewportHeight - mouseY) / edgeSize);
  }

  if (scrollSpeed !== 0) {
    window.scrollBy(0, scrollSpeed);
  }

  requestAnimationFrame(autoScroll);
}

autoScroll();


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

/* ==========================
   CONTROLE DA LANTERNA FINAL
========================== */

const finalPanel = document.querySelector('.final-panel');
const root = document.documentElement;

if (finalPanel) {
  finalPanel.addEventListener('mouseenter', () => {
    root.classList.add('no-lantern');
  });

  finalPanel.addEventListener('mouseleave', () => {
    root.classList.remove('no-lantern');
  });
}

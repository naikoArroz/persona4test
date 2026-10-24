// TODDYNO.EXE — scripts do portfólio
// Personalize o conteúdo no index.html e as cores no início de style.css.

document.body.classList.add('loading');

const loader = document.getElementById('loader');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const loaderMessage = document.getElementById('loaderMessage');
const messages = [
  'SINTONIZANDO FREQUÊNCIA',
  'PROCURANDO SINAL...',
  'CARREGANDO ARQUIVOS',
  'ABRINDO O TV WORLD',
  'CONEXÃO ESTABELECIDA'
];

let progress = 0;
let messageIndex = 0;
const progressTimer = window.setInterval(() => {
  // Incrementos irregulares para dar sensação de carregamento de jogo.
  progress = Math.min(100, progress + (Math.random() * 8 + 3));
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${String(Math.floor(progress)).padStart(2, '0')}%`;

  const nextMessage = Math.min(messages.length - 1, Math.floor(progress / 22));
  if (nextMessage !== messageIndex) {
    messageIndex = nextMessage;
    loaderMessage.textContent = messages[messageIndex];
    loaderMessage.classList.remove('blink');
    void loaderMessage.offsetWidth;
    loaderMessage.classList.add('blink');
  }

  if (progress >= 100) {
    window.clearInterval(progressTimer);
    window.setTimeout(() => {
      loader.classList.add('is-done');
      document.body.classList.remove('loading');
      window.setTimeout(() => loader.remove(), 650);
    }, 250);
  }
}, 105);

// Menu mobile.
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.menu-lines').textContent = isOpen ? '✕' : '☰';
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.menu-lines').textContent = '☰';
  });
});

// Animação de entrada das seções conforme aparecem na tela.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Modal dos quadros da galeria.
const modal = document.getElementById('galleryModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

document.querySelectorAll('.gallery-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    modalTitle.textContent = tile.dataset.title || 'ART FILE';
    modalDescription.textContent = tile.dataset.description || '';
    if (typeof modal.showModal === 'function') modal.showModal();
    else alert(`${modalTitle.textContent}\n${modalDescription.textContent}`);
  });
});

document.getElementById('modalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target === modal) modal.close();
});

document.getElementById('year').textContent = new Date().getFullYear();

// Opcional: respeita preferência por movimento reduzido; o loader ainda termina rapidamente.
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.clearInterval(progressTimer);
  progress = 100;
  progressFill.style.width = '100%';
  progressText.textContent = '100%';
  loaderMessage.textContent = 'CONEXÃO ESTABELECIDA';
  window.setTimeout(() => {
    loader.classList.add('is-done');
    document.body.classList.remove('loading');
    window.setTimeout(() => loader.remove(), 100);
  }, 150);
}

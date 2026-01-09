// Require electron IPC at the top level
const { ipcRenderer } = require('electron');

// Basic counter logic in the renderer
const countEl = document.getElementById('count');
let value = 0;

const update = () => {
  countEl.textContent = value;
};

document.getElementById('increment').addEventListener('click', () => {
  value += 1;
  update();
});

document.getElementById('decrement').addEventListener('click', () => {
  value -= 1;
  update();
});

document.getElementById('reset').addEventListener('click', () => {
  value = 0;
  update();
});

update();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === '+') {
    e.preventDefault();
    value += 1;
    update();
  } else if (e.key === 'ArrowDown' || e.key === '-') {
    e.preventDefault();
    value -= 1;
    update();
  } else if (e.key.toLowerCase() === 'r') {
    value = 0;
    update();
  }
});

// Light/dark theme toggle
const themeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'theme-preference';

const updateThemeLabel = () => {
  themeToggle.textContent = document.body.classList.contains('light') ? 'Dark mode' : 'Light mode';
};

// Load saved theme preference
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === 'light') {
  document.body.classList.add('light');
}
updateThemeLabel();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
  updateThemeLabel();
});

// IPC listeners for menu actions
ipcRenderer.on('increment-counter', () => {
  value += 1;
  update();
});

ipcRenderer.on('decrement-counter', () => {
  value -= 1;
  update();
});

ipcRenderer.on('reset-counter', () => {
  value = 0;
  update();
});

ipcRenderer.on('toggle-theme', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
  updateThemeLabel();
});

console.log('IPC listeners registered successfully');

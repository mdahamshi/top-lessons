const toggleButton = document.getElementById('themeToggle');
const html = document.documentElement;

function getCurrentTheme() {
  return html.getAttribute('data-theme') || 'auto';
}

function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

toggleButton.addEventListener('click', toggleTheme);

// Optional: load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
}

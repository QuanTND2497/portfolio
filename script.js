document.getElementById('year').textContent = new Date().getFullYear();

const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme = null;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch {}

function applyTheme(theme) {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  themeButton.querySelector('[aria-hidden]').textContent = dark ? '☀' : '☾';
  themeButton.querySelector('.theme-label').textContent = dark ? 'Giao diện sáng' : 'Giao diện tối';
}
applyTheme(savedTheme || (systemTheme.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  savedTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', savedTheme); } catch {}
  applyTheme(savedTheme);
});
systemTheme.addEventListener('change', event => {
  if (!savedTheme) applyTheme(event.matches ? 'dark' : 'light');
});

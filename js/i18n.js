// --- i18n.js: gestione traduzioni ---
let currentLang = 'it';
let translations = {};

async function loadTranslations() {
  const res = await fetch('js/translations.json');
  translations = await res.json();
  applyTranslations(currentLang);
}

function switchLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang);
  // Aggiorna bottoni lingua
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  applyTranslations(lang);
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  // Titolo pagina
  document.title = t.page_title;

  // Tutti gli elementi con data-i18n: sostituisce textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Elementi con data-i18n-html: sostituisce innerHTML (per contenuti con tag HTML)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Placeholder degli input
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Option del select (primo option è il placeholder)
  const select = document.querySelector('#rsvp select[name="presenza"]');
  if (select && t.rsvp_attending) {
    select.options[0].textContent = t.rsvp_attending;
    select.options[1].textContent = t.rsvp_yes;
    select.options[2].textContent = t.rsvp_no;
  }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', loadTranslations);

// ../assets/portfolio-engine.js
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Render portfolio grid if sectorConfig is defined on the page
  if (typeof sectorConfig !== 'undefined') {
    renderPortfolio(sectorConfig);
  }
});

function renderPortfolio(config) {
  const gridContainer = document.getElementById('portfolio-grid');
  if (!gridContainer) return;
  gridContainer.innerHTML = '';

  config.projects.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'card';

    let imageHtml = `<img src="${item.image}" alt="${item.title}" class="thumb">`;
    
    if (item.link && item.link.trim() !== "") {
      imageHtml = `<a href="#" onclick="openProjectViewer('${item.link}'); return false;">${imageHtml}</a>`;
    }

    article.innerHTML = `
      ${imageHtml}
      <h3>${item.link ? `<a href="#" onclick="openProjectViewer('${item.link}'); return false;" style="color: var(--accent);">${item.title}</a>` : item.title}</h3>
      <p class="meta">${item.meta ? item.meta : ""}</p>
      <p>${item.description}</p>
    `;

    gridContainer.appendChild(article);
  });
}

// Viewer Control Functions (Portfolio Iframe Viewer)
function openProjectViewer(url) {
  document.getElementById('mainPortfolioView').style.display = 'none';
  document.getElementById('viewerWrapper').classList.add('active');
  document.getElementById('projectIframe').src = url;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeProjectViewer() {
  const container = document.getElementById('projectViewerContainer');
  if (container && container.classList.contains('fullscreen')) {
    toggleFullscreen('projectViewerContainer', 'expandBtn');
  }
  
  document.getElementById('viewerWrapper').classList.remove('active');
  document.getElementById('mainPortfolioView').style.display = 'block';
  document.getElementById('projectIframe').src = '';
}

// Universal Fullscreen Toggle (Works for Portfolio Viewers & Maps)
function toggleFullscreen(containerId = 'projectViewerContainer', btnId = 'expandBtn') {
  const container = document.getElementById(containerId);
  const btn = document.getElementById(btnId);
  if (!container || !btn) return;
  
  container.classList.toggle('fullscreen');
  
  if (container.classList.contains('fullscreen')) {
    btn.textContent = ' 🗗 ';
    document.body.style.overflow = 'hidden';
  } else {
    btn.textContent = ' ⛶ ';
    document.body.style.overflow = '';
  }
}

// Append Google Translate script and hidden element on page load
document.addEventListener('DOMContentLoaded', () => {
  // 1. Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Render portfolio grid if sectorConfig is defined on the page
  if (typeof sectorConfig !== 'undefined') {
    renderPortfolio(sectorConfig);
  }

  // 3. Inject Google Translate hidden element and script globally
  if (!document.getElementById('google_translate_element')) {
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.style.display = 'none';
    document.body.appendChild(translateDiv);

    // Define global callback expected by Google
    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'fr,en',
        autoDisplay: false
      }, 'google_translate_element');
    };

    // Load Google Translate script dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  }
});

// Global function to trigger French translation and show the disclaimer
function triggerFrenchTranslation() {
  const selectField = document.querySelector('.goog-te-combo');
  if (selectField) {
    selectField.value = 'fr';
    selectField.dispatchEvent(new Event('change'));

    // Reveal the translation disclaimer in the footer
    const disclaimer = document.getElementById('translationDisclaimer');
    if (disclaimer) {
      disclaimer.classList.add('visible');
    }
  } else {
    alert("Translation engine is still loading. Please try again in a moment.");
  }
}

// ... keep your existing renderPortfolio, openProjectViewer, closeProjectViewer, and toggleFullscreen functions below ...
(() => {
  const data = window.STUDY_DATA;
  if (!data) return;

  const nav = document.getElementById('topic-nav');
  const content = document.getElementById('main-content');
  const searchInput = document.getElementById('search-input');
  const menuButton = document.getElementById('menu-button');
  const closeButton = document.getElementById('close-menu');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const questionMap = new Map();
  data.sections.forEach((section, sectionIndex) => {
    section.questions.forEach((question) => questionMap.set(question.id, sectionIndex));
  });

  let activeSection = 0;
  let language = localStorage.getItem('study-language') || 'both';
  if (!['both', 'ar', 'en'].includes(language)) language = 'both';

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);

  function closeMenu(restoreFocus = false) {
    sidebar.classList.remove('is-open');
    backdrop.hidden = true;
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuButton.focus();
  }

  function openMenu() {
    sidebar.classList.add('is-open');
    backdrop.hidden = false;
    document.body.classList.add('menu-open');
    menuButton.setAttribute('aria-expanded', 'true');
    sidebar.querySelector('a')?.focus();
  }

  function renderNav() {
    nav.innerHTML = data.sections.map((section, index) => {
      const active = index === activeSection;
      return `<div class="nav-group ${active ? 'is-active' : ''}">
        <a class="nav-topic" href="#${section.id}" ${active ? 'aria-current="page"' : ''}>
          <span class="nav-number">${String(index + 1).padStart(2, '0')}</span>
          <span class="nav-title">${escapeHtml(section.shortTitle)}</span>
          ${section.questions.length ? `<span class="nav-count">${section.questions.length}</span>` : ''}
        </a>
        ${active && section.questions.length ? `<div class="nav-questions">${section.questions.map((q) => `
          <a href="#${q.id}"><span>${escapeHtml(q.number)}</span>${escapeHtml(q.arTitle)}</a>`).join('')}</div>` : ''}
      </div>`;
    }).join('');
  }

  function languageControl() {
    return `<div class="language-control" role="group" aria-label="لغة الإجابات">
      <button type="button" data-language="both" aria-pressed="${language === 'both'}">الاتنين</button>
      <button type="button" data-language="ar" aria-pressed="${language === 'ar'}">عربي</button>
      <button type="button" data-language="en" aria-pressed="${language === 'en'}">English</button>
    </div>`;
  }

  function questionCard(question) {
    return `<article class="question-card" id="${question.id}" data-question>
      <div class="question-topline"><span class="question-number">${escapeHtml(question.number)}</span><a class="question-anchor" href="#${question.id}" aria-label="رابط مباشر للسؤال ${escapeHtml(question.number)}" title="رابط مباشر للسؤال">#</a></div>
      <h2 class="question-title">${escapeHtml(question.arTitle)}</h2>
      <p class="english-question" lang="en" dir="ltr">${escapeHtml(question.enTitle)}</p>
      <div class="answer-grid ${language === 'both' ? 'show-both' : ''}">
        <section class="answer-panel ar-panel" aria-label="الإجابة بالعربي" ${language === 'en' ? 'hidden' : ''}>
          <div class="answer-label"><span class="answer-dot ar-dot"></span>الإجابة بالعربي</div>
          <div class="prose ar-prose">${question.arHtml}</div>
        </section>
        <section class="answer-panel en-panel" aria-label="Answer in English" lang="en" dir="ltr" ${language === 'ar' ? 'hidden' : ''}>
          <div class="answer-label"><span class="answer-dot en-dot"></span>INTERVIEW ANSWER</div>
          <div class="prose en-prose">${question.enHtml}</div>
        </section>
      </div>
    </article>`;
  }

  function chapterFooter(index) {
    const prev = data.sections[index - 1];
    const next = data.sections[index + 1];
    return `<nav class="chapter-pagination" aria-label="التنقل بين المحاور">
      ${prev ? `<a href="#${prev.id}"><span>السابق</span><strong>${escapeHtml(prev.shortTitle)}</strong></a>` : '<span></span>'}
      ${next ? `<a href="#${next.id}"><span>التالي</span><strong>${escapeHtml(next.shortTitle)}</strong></a>` : '<span></span>'}
    </nav>`;
  }

  function decorateLinks() {
    content.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach((link) => {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  function renderSection(index, targetQuestion = null) {
    activeSection = index;
    const section = data.sections[index];
    renderNav();
    content.innerHTML = `<header class="chapter-header">
      <div class="chapter-eyebrow"><span class="eyebrow-line"></span> ${index < 12 ? `CHAPTER ${String(index + 1).padStart(2, '0')}` : 'REFERENCE'} <span class="eyebrow-separator">/</span> SENIOR ANGULAR</div>
      <h1>${escapeHtml(section.shortTitle)}</h1>
      <div class="chapter-meta"><span>${section.questions.length ? `${section.questions.length} أسئلة مركزة` : 'مرجع سريع'}</span><span class="meta-dot"></span><span>عربي + English</span></div>
      ${section.questions.length ? languageControl() : ''}
    </header>
    ${section.introHtml ? `<div class="chapter-intro prose">${section.introHtml}</div>` : ''}
    <div class="question-list">${section.questions.map(questionCard).join('')}</div>
    ${chapterFooter(index)}`;
    decorateLinks();
    if (targetQuestion) {
      requestAnimationFrame(() => document.getElementById(targetQuestion)?.scrollIntoView({ block: 'start' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  function renderSearch(query) {
    const normalized = query.toLocaleLowerCase().trim();
    const matches = [];
    data.sections.forEach((section) => {
      section.questions.forEach((question) => {
        if (question.searchText.includes(normalized)) matches.push({ section, question });
      });
    });
    content.innerHTML = `<header class="chapter-header search-header">
      <div class="chapter-eyebrow"><span class="eyebrow-line"></span> QUICK FIND</div>
      <h1>نتائج البحث</h1>
      <div class="chapter-meta">${matches.length} نتيجة لـ «${escapeHtml(query.trim())}»</div>
    </header>
    <div class="search-results">${matches.length ? matches.map(({ section, question }) => `<a class="search-result" href="#${question.id}">
      <span class="search-result-section">${escapeHtml(section.shortTitle)} <span>·</span> ${escapeHtml(question.number)}</span>
      <strong>${escapeHtml(question.arTitle)}</strong>
      <span lang="en" dir="ltr">${escapeHtml(question.enTitle)}</span>
    </a>`).join('') : '<p class="empty-state">مفيش سؤال بالاسم ده. جرّب كلمة أقصر أو مصطلح بالإنجليزي.</p>'}</div>`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function navigate() {
    const hash = decodeURIComponent(location.hash.slice(1));
    let targetQuestion = null;
    let sectionIndex = data.sections.findIndex((section) => section.id === hash);
    if (sectionIndex < 0 && questionMap.has(hash)) {
      sectionIndex = questionMap.get(hash);
      targetQuestion = hash;
    }
    if (sectionIndex < 0) sectionIndex = 0;
    if (searchInput.value) searchInput.value = '';
    renderSection(sectionIndex, targetQuestion);
    closeMenu();
  }

  menuButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', () => closeMenu(true));
  backdrop.addEventListener('click', () => closeMenu(true));
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim()) renderSearch(searchInput.value);
    else navigate();
  });
  content.addEventListener('click', (event) => {
    const button = event.target.closest('[data-language]');
    if (!button) return;
    language = button.dataset.language;
    localStorage.setItem('study-language', language);
    renderSection(activeSection);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (sidebar.classList.contains('is-open')) closeMenu(true);
      else if (searchInput.value) { searchInput.value = ''; navigate(); searchInput.focus(); }
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      searchInput.focus();
    }
  });
  window.addEventListener('hashchange', navigate);
  navigate();
})();

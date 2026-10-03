(() => {
  'use strict';

  const NAV_HTML = `
    <header class="modern-header site-global-header">
      <div class="container header-inner">
        <a class="modern-logo" href="/" aria-label="MS Docente Moussa Salisou">
          <span class="logo-mark">M/S</span>
          <span class="logo-text">Docente <span>Moussa</span></span>
        </a>
        <button class="modern-toggle site-nav-toggle" aria-expanded="false" aria-label="Apri menu" type="button">☰</button>
        <nav class="modern-nav modern-menu site-global-menu" aria-label="Navigazione principale">
          <a href="/" data-i18n="nav.home">Home</a>
          <a href="/#servizi" data-i18n="nav.services">Servizi</a>
          <a href="/courses/" data-i18n="nav.courses">Corsi</a>
          <a href="/monitoraggio">Progetti</a>
          <a href="/#chi-sono" data-i18n="nav.about">Chi sono</a>
          <a href="/risorse" data-i18n="nav.resources">Risorse</a>
          <a class="nav-cta" href="/contact" data-i18n="nav.contact">Contattami</a>
        </nav>
        <div class="language-switcher" aria-label="Selettore lingua">
          <button type="button" class="language-current">IT</button>
          <div class="language-menu">
            <button type="button" data-lang="it">Italiano</button>
            <button type="button" data-lang="en">English</button>
            <button type="button" data-lang="fr">Français</button>
            <button type="button" data-lang="es">Español</button>
            <button type="button" data-lang="de">Deutsch</button>
          </div>
        </div>
      </div>
    </header>`;

  window.MOUSSA_SITE_NAVBAR_HTML = NAV_HTML;

  function bind() {
    const toggle = document.querySelector('.site-nav-toggle');
    const menu = document.querySelector('.site-global-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  function mount() {
    if (document.querySelector('.site-global-header')) return;
    const existing = document.querySelector('header.modern-header');
    if (existing) existing.remove();

    const wrapper = document.createElement('div');
    wrapper.innerHTML = NAV_HTML.trim();
    const header = wrapper.firstElementChild;
    document.body.insertBefore(header, document.body.firstChild);
    bind();
  }

  window.mountMoussaNavbar = mount;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
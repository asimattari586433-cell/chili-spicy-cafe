document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent='☰';
    }));
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const filterButtons = document.querySelectorAll('[data-filter]');
  const menuItems = document.querySelectorAll('[data-category]');
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.toggle('active', b === btn));
    const filter = btn.dataset.filter;
    menuItems.forEach(item => item.hidden = !(filter === 'all' || item.dataset.category === filter));
  }));

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const out = document.querySelector('.form-message');
      if (!name || !email || !message) { out.textContent = 'Please complete the required fields.'; return; }
      // Static demo behaviour: no backend/email service is connected.
      out.textContent = 'Thanks, ' + name + '! This demo form is working locally, but messages are not sent yet. Connect an email or form service before launch.';
      form.reset();
    });
  }
});

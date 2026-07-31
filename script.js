const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const quoteForm = document.getElementById('quote-form');
const formNote = document.getElementById('form-note');

document.getElementById('year').textContent = new Date().getFullYear();

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!quoteForm.checkValidity()) {
      quoteForm.reportValidity();
      return;
    }
    const data = new FormData(quoteForm);
    const body = [
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      data.get('city') ? `Property city: ${data.get('city')}` : null,
      '',
      'Project details:',
      data.get('details')
    ].filter((line) => line !== null).join('\r\n');
    formNote.textContent = 'Opening your email app with your project note…';
    window.location.href = `mailto:peakepropertysolutions@gmail.com?subject=Peake%20website%20project%20inquiry&body=${encodeURIComponent(body)}`;
  });
}

const galleryLinks = [...document.querySelectorAll('[data-lightbox]')];

if (galleryLinks.length) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close photo">×</button><img alt="" />';
  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const closeLightbox = () => lightbox.close();

  galleryLinks.forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    const image = link.querySelector('img');
    lightboxImage.src = link.href;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  }));

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

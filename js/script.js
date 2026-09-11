// Chama o Wil - script.js

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.style.background = '#ffffff';
      header.style.boxShadow = '0 8px 20px rgba(0,0,0,.12)';
    } else {
      header.style.background = '#ffffffee';
      header.style.boxShadow = 'none';
    }
  });

  const topButton = document.createElement('button');
  topButton.id = 'topButton';
  topButton.innerHTML = '↑';

  Object.assign(topButton.style, {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: 'none',
    background: '#E30613',
    color: '#fff',
    cursor: 'pointer',
    display: 'none',
    zIndex: '9999'
  });

  document.body.appendChild(topButton);

  window.addEventListener('scroll', () => {
    topButton.style.display = window.scrollY > 400 ? 'block' : 'none';
  });

  topButton.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section,.card,blockquote').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = '.7s';
    observer.observe(el);
  });

  const whatsapp = document.createElement('a');
  whatsapp.href = 'https://wa.me/5500000000000';
  whatsapp.target = '_blank';
  whatsapp.innerHTML = '💬';

  Object.assign(whatsapp.style, {
    position: 'fixed',
    right: '20px',
    bottom: '80px',
    width: '58px',
    height: '58px',
    borderRadius: '50%',
    background: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '28px',
    zIndex: '9999'
  });

  document.body.appendChild(whatsapp);

});

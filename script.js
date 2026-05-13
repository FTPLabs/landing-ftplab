'use strict';

// Sticky header shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.08)' : 'none';
});

// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = '#fff';
  navLinks.style.padding = '16px 24px';
  navLinks.style.borderBottom = '1px solid #eee';
});

// Smooth active nav
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => observer.observe(s));

// Phone mask
const phoneInput = document.querySelector('input[type="tel"]');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.startsWith('7') || v.startsWith('8')) v = v.slice(1);
    v = v.slice(0, 10);
    let out = '+7 ';
    if (v.length > 0) out += '(' + v.slice(0, 3);
    if (v.length >= 3) out += ') ' + v.slice(3, 6);
    if (v.length >= 6) out += '-' + v.slice(6, 8);
    if (v.length >= 8) out += '-' + v.slice(8, 10);
    e.target.value = out;
  });
}

// Booking form
const form = document.getElementById('bookingForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = '✅ Запись отправлена!';
  btn.disabled = true;
  btn.style.background = '#22c55e';
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Записаться';
    btn.disabled = false;
    btn.style.background = '';
  }, 3000);
});

// Animate on scroll
const animEls = document.querySelectorAll('.card, .master-card, .price-row');
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

animEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  animObserver.observe(el);
});

// ==============================
// 📱 Mobile Menu Toggle
// ==============================
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Collapse mobile menu when link clicked
document.querySelectorAll('.navbar__links, .button').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 960 && menu.classList.contains('is-active')) {
      menu.classList.remove('is-active');
      menuLinks.classList.remove('active');
    }
  });
});

// ==============================
// 🔦 Highlight Navbar on Scroll
// ==============================
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page'); // ← Add this
  const projectsMenu = document.querySelector('#projects-page');
  const certificationsMenu = document.querySelector('#certifications-page');
  const contactMenu = document.querySelector('#contact-link');

  let scrollPos = window.scrollY;

  if (window.innerWidth > 960) {
    if (scrollPos < 600) {
      homeMenu?.classList.add('highlight');
      aboutMenu?.classList.remove('highlight');
      projectsMenu?.classList.remove('highlight');
      certificationsMenu?.classList.remove('highlight');
      contactMenu?.classList.remove('highlight');
    } else if (scrollPos < 1100) {
      homeMenu?.classList.remove('highlight');
      aboutMenu?.classList.add('highlight'); // ✅ Add this line
      projectsMenu?.classList.remove('highlight');
      certificationsMenu?.classList.remove('highlight');
      contactMenu?.classList.remove('highlight');
    } else if (scrollPos < 1900) {
      homeMenu?.classList.remove('highlight');
      aboutMenu?.classList.remove('highlight');
      projectsMenu?.classList.add('highlight');
      certificationsMenu?.classList.remove('highlight');
      contactMenu?.classList.remove('highlight');
    } else if (scrollPos < 2700) {
      homeMenu?.classList.remove('highlight');
      aboutMenu?.classList.remove('highlight');
      projectsMenu?.classList.remove('highlight');
      certificationsMenu?.classList.add('highlight');
      contactMenu?.classList.remove('highlight');
    } else {
      homeMenu?.classList.remove('highlight');
      aboutMenu?.classList.remove('highlight');
      projectsMenu?.classList.remove('highlight');
      certificationsMenu?.classList.remove('highlight');
      contactMenu?.classList.add('highlight');
    }
  }

  if (elem && (window.innerWidth <= 960 || scrollPos < 600)) {
    elem.classList.remove('highlight');
  }
};


window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);


// ==============================
// 🧭 Tab Switching (Projects)
// ==============================
const tabButtons = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-tab');
    const targetTab = document.querySelector(`.${target}-tab`);

    // Hide all tabs
    tabContents.forEach(tab => {
      tab.style.display = 'none';
    });

    // Show selected tab
    if (targetTab) {
      targetTab.style.display = 'flex';
    }

    // Update active button
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// ==============================
// 🎯 Certification Carousel (Manual Only)
// ==============================
const certCarousel = document.getElementById('certificationCarousel');
const scrollLeftBtn = document.querySelector('.left-arrow');
const scrollRightBtn = document.querySelector('.right-arrow');
let cardWidth = 0;
let gap = 40;

function setupCarousel() {
  const cards = certCarousel.querySelectorAll('.certification-card');

  if (cards.length > 0) {
    cardWidth = cards[0].offsetWidth;

    // Clone first and last cards
    const firstCard = cards[0].cloneNode(true);
    const lastCard = cards[cards.length - 1].cloneNode(true);

    // Scroll to first actual card
    certCarousel.scrollLeft = cardWidth + gap;
  }
}

function scrollCerts(direction) {
  const scrollAmount = cardWidth + gap;
  certCarousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

scrollLeftBtn.addEventListener('click', () => scrollCerts(-1));
scrollRightBtn.addEventListener('click', () => scrollCerts(1));

window.addEventListener('load', () => {
  setupCarousel();
});

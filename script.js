document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const welcomeSection = document.getElementById('welcome');
  const mainContent = document.getElementById('main-content');
  const enterBtn = document.getElementById('enter-btn');
  const musicToggleBtn = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');

  // Navigation buttons and sections
  const navButtons = document.querySelectorAll('.nav-btn');
  const contentSections = document.querySelectorAll('.content-section');

  // Photo album elements
  const categoryButtons = document.querySelectorAll('.category-btn');
  const slideImage = document.getElementById('slide-image');
  const slideCaption = document.getElementById('slide-caption');
  const prevBtn = document.querySelector('.slide-btn.prev');
  const nextBtn = document.querySelector('.slide-btn.next');

  // Love letter container
  const loveLetterEl = document.getElementById('love-letter');

  // Her response elements
  const herResponseTextarea = document.getElementById('her-response');
  const saveResponseBtn = document.getElementById('save-response');
  const responseSavedMsg = document.getElementById('response-saved-msg');

  // Background music control
  let musicPlaying = false;

  // Sample photos data (20+ photos with categories and captions)
  const photos = [
    { src: 'https://i.ibb.co/7QpKsCX/travel1.jpg', caption: 'Sunset at the beach', category: 'travel' },
    { src: 'https://i.ibb.co/3WzZ9vF/travel2.jpg', caption: 'Mountain hike adventure', category: 'travel' },
    { src: 'https://i.ibb.co/2dYqZqZ/date1.jpg', caption: 'Romantic dinner night', category: 'dates' },
    { src: 'https://i.ibb.co/0Jmshvb/date2.jpg', caption: 'Picnic in the park', category: 'dates' },
    { src: 'https://i.ibb.co/4VqZqZq/selfie1.jpg', caption: 'Selfie with you', category: 'selfies' },
    { src: 'https://i.ibb.co/5YqZqZq/selfie2.jpg', caption: 'Laughing together', category: 'selfies' },
    { src: 'https://i.ibb.co/6ZqZqZq/funny1.jpg', caption: 'Silly faces', category: 'funny' },
    { src: 'https://i.ibb.co/7ZqZqZq/funny2.jpg', caption: 'Goofy moments', category: 'funny' },
    // Add more photos to reach 20-40 as needed
  ];

  // Current photo index and filtered photos
  let currentCategory = 'all';
  let filteredPhotos = photos;
  let currentIndex = 0;

  // Function to update slideshow image and caption
  function updateSlide() {
    if (filteredPhotos.length === 0) {
      slideImage.src = '';
      slideImage.alt = 'No photos available';
      slideCaption.textContent = 'No photos in this category.';
      return;
    }
    const photo = filteredPhotos[currentIndex];
    slideImage.style.opacity = 0;
    setTimeout(() => {
      slideImage.src = photo.src;
      slideImage.alt = photo.caption;
      slideCaption.textContent = photo.caption;
      slideImage.style.opacity = 1;
    }, 300);
  }

  // Filter photos by category
  function filterPhotos(category) {
    currentCategory = category;
    if (category === 'all') {
      filteredPhotos = photos;
    } else {
      filteredPhotos = photos.filter(p => p.category === category);
    }
    currentIndex = 0;
    updateSlide();
  }

  // Navigation button click handler
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and sections
      navButtons.forEach(b => b.classList.remove('active'));
      contentSections.forEach(section => section.classList.remove('active'));

      // Add active class to clicked button
      btn.classList.add('active');

      // Show corresponding section
      const targetId = btn.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // Category button click handler
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      filterPhotos(btn.getAttribute('data-category'));
    });
  });

  // Slideshow controls
  prevBtn.addEventListener('click', () => {
    if (filteredPhotos.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    updateSlide();
  });

  nextBtn.addEventListener('click', () => {
    if (filteredPhotos.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredPhotos.length;
    updateSlide();
  });

  // Enter button to show main content
  enterBtn.addEventListener('click', () => {
    welcomeSection.classList.remove('active');
    welcomeSection.classList.add('hidden');
    mainContent.classList.remove('hidden');
    mainContent.classList.add('active');
    // Start music automatically
    bgMusic.play().catch(() => {
      // Autoplay might be blocked, user can toggle manually
    });
    musicPlaying = true;
    musicToggleBtn.textContent = '🔊';
  });

  // Music toggle button
  musicToggleBtn.addEventListener('click', () => {
    if (musicPlaying) {
      bgMusic.pause();
      musicToggleBtn.textContent = '🔈';
    } else {
      bgMusic.play();
      musicToggleBtn.textContent = '🔊';
    }
    musicPlaying = !musicPlaying;
  });

  // Love letter typing effect
  const loveLetterText = `My Dearest Love,

Every moment with you feels like a beautiful dream come true. These three years have been filled with laughter, adventures, and endless love. I cherish every smile, every touch, and every heartbeat we share.

Thank you for being my partner, my best friend, and my forever love.

Yours always,
Bob`;

  function typeLoveLetter(text, element, delay = 50) {
    let i = 0;
    element.textContent = '';
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
  }

  // Start typing love letter when section is shown
  const loveLetterSection = document.getElementById('love-letter-section');
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.target.classList.contains('active')) {
        typeLoveLetter(loveLetterText, loveLetterEl);
      }
    });
  });
  observer.observe(loveLetterSection, { attributes: true, attributeFilter: ['class'] });

  // Save her response to localStorage
  saveResponseBtn.addEventListener('click', () => {
    const response = herResponseTextarea.value.trim();
    if (response.length > 0) {
      localStorage.setItem('herResponse', response);
      responseSavedMsg.hidden = false;
      setTimeout(() => {
        responseSavedMsg.hidden = true;
      }, 3000);
    }
  });

  // Load saved response on page load
  const savedResponse = localStorage.getItem('herResponse');
  if (savedResponse) {
    herResponseTextarea.value = savedResponse;
  }

  // Initialize slideshow with all photos
  filterPhotos('all');

  // Floating hearts animation (optional enhancement)
  function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = 4 + Math.random() * 3 + 's';
    heart.style.fontSize = 12 + Math.random() * 24 + 'px';
    document.getElementById('floating-hearts').appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }

  setInterval(createFloatingHeart, 800);

});

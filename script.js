// Wait for DOM content
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

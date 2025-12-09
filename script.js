// ============================================
// MODERN PORTFOLIO JAVASCRIPT
// ============================================

// Navigation Dropdown Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navBrand = document.querySelector('.nav-brand');
  const navDropdown = document.querySelector('.nav-dropdown');
  
  console.log('Nav Brand:', navBrand);
  console.log('Nav Dropdown:', navDropdown);
  
  if (navBrand && navDropdown) {
    // Toggle dropdown on logo click
    navBrand.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Logo clicked, current active state:', navDropdown.classList.contains('active'));
      navBrand.classList.toggle('active');
      navDropdown.classList.toggle('active');
      console.log('New active state:', navDropdown.classList.contains('active'));
    });

    // Close dropdown when clicking on a link
    const links = navDropdown.querySelectorAll('a');
    console.log('Found links:', links.length);
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        navBrand.classList.remove('active');
        navDropdown.classList.remove('active');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      const clickInsideNav = navDropdown.contains(e.target) || navBrand.contains(e.target);
      if (!clickInsideNav && navDropdown.classList.contains('active')) {
        navBrand.classList.remove('active');
        navDropdown.classList.remove('active');
      }
    });
  } else {
    console.error('Navigation elements not found');
  }

  // Navbar scroll effect
  const nav = document.querySelector('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Scroll Animations
  const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, scrollObserverOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
  animatedElements.forEach(el => scrollObserver.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Parallax effect for hero section (initial)
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add animation classes to cards and project cards
  const cards = document.querySelectorAll('.card, .project-card, .gallery-item');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    // Add stagger animation
    card.classList.add('fade-in');
  });

  // Enhanced scroll animations with Intersection Observer
  const cardObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, cardObserverOptions);

  // Observe all cards
  cards.forEach(card => {
    cardObserver.observe(card);
  });

  // Form submission handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const name = document.getElementById('name')?.value;
      const email = document.getElementById('email')?.value;
      const message = document.getElementById('message')?.value;

      if (!name || !email || !message) {
        alert('Mohon lengkapi semua field.');
        return;
      }

      const data = {
        name: name,
        email: email,
        message: message
      };

      try {
        await fetch("https://formsubmit.co/ajax/last.ibrahim123@gmail.com", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });

        contactForm.reset();
        const popup = document.getElementById('successPopup');
        if (popup) {
          popup.classList.add('show');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      }
    });
  }

  // Close popup function
  window.closePopup = function() {
    const popup = document.getElementById('successPopup');
    if (popup) {
      popup.classList.remove('show');
    }
  };

  // Close popup on outside click
  const popup = document.getElementById('successPopup');
  if (popup) {
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        closePopup();
      }
    });
  }

  // Lightbox functionality for gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) {
        // Create or get lightbox
        let lightbox = document.getElementById('lightbox');
        if (!lightbox) {
          lightbox = document.createElement('div');
          lightbox.id = 'lightbox';
          lightbox.className = 'lightbox';
          lightbox.innerHTML = `
            <div class="lightbox-content">
              <img src="" alt="Gallery Image">
              <button class="lightbox-close">&times;</button>
            </div>
          `;
          document.body.appendChild(lightbox);
          
          // Close lightbox handlers
          const closeBtn = lightbox.querySelector('.lightbox-close');
          closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
          });
          
          lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
              lightbox.classList.remove('active');
              document.body.style.overflow = '';
            }
          });
          
          // Close on ESC key
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
              lightbox.classList.remove('active');
              document.body.style.overflow = '';
            }
          });
        }
        
        // Show image in lightbox
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Enhanced typing effect with glow animation
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && window.innerWidth > 768) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      } else {
        // Add completion glow effect
        heroTitle.style.textShadow = '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(99, 102, 241, 0.6)';
        setTimeout(() => {
          heroTitle.style.textShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        }, 1000);
      }
    };
    
    // Start typing after a delay
    setTimeout(typeWriter, 500);
  }

  // Add click ripple effect to all interactive elements
  const interactiveElements = document.querySelectorAll('.btn, .card, .project-card, .gallery-item, .social-link');
  interactiveElements.forEach(element => {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple-animation 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Enhanced cursor trail effect with particles
  if (window.innerWidth > 768) {
    let cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let particles = [];

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create particle on mouse move
      if (Math.random() > 0.7) {
        createParticle(e.clientX, e.clientY);
      }
    });

    function createParticle(x, y) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = `radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent)`;
      particle.style.borderRadius = '50%';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9998';
      particle.style.transition = 'all 0.5s ease-out';
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) scale(0)`;
        setTimeout(() => particle.remove(), 500);
      }, 10);
    }

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      // Make cursor glow on hover over interactive elements
      const hovered = document.elementFromPoint(mouseX, mouseY);
      if (hovered && (hovered.classList.contains('btn') || hovered.classList.contains('card') || hovered.classList.contains('gallery-item'))) {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.borderColor = 'rgba(99, 102, 241, 0.8)';
      } else {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'rgba(99, 102, 241, 0.5)';
      }
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // Add parallax effect to hero section (enhanced)
  const heroParallax = document.querySelector('.hero');
  if (heroParallax) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      heroParallax.style.transform = `translateY(${rate}px)`;
      heroParallax.style.opacity = 1 - (scrolled / 800);
    });
  }

  // Add smooth reveal animation to sections
  const sections = document.querySelectorAll('section, .card, .project-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(section);
  });
});

// Handle form submission
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name') ? document.getElementById('name').value : '';
  const email = document.getElementById('email') ? document.getElementById('email').value : '';
  const msg = document.getElementById('message') ? document.getElementById('message').value : '';
  const res = document.getElementById('result');
  if (!name || !email || !msg) {
    if (res) {
      res.textContent = 'Mohon lengkapi semua field.';
      res.className = 'text-red-600';
    }
    return false;
  }
  if (res) {
    res.textContent = 'Terima kasih, ' + name + '! Pesan diterima (demo).';
    res.className = 'text-green-600';
  }
  e.target.reset();
  return false;
}

// ============================================
// MUSIC PLAYER FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const playButtons = document.querySelectorAll('.play-button');
  
  // Format time helper function
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  // Setup each audio player
  document.querySelectorAll('audio').forEach((audio, index) => {
    // Set volume to maximum
    audio.volume = 1;
    
    // Add crossorigin attribute
    const sources = audio.querySelectorAll('source');
    sources.forEach(source => {
      source.crossOrigin = 'anonymous';
    });
    
    // Update progress bar and time
    audio.addEventListener('timeupdate', function() {
      if (this.duration) {
        const progress = (this.currentTime / this.duration) * 100;
        const progressFill = document.getElementById('progress-' + index);
        if (progressFill) {
          progressFill.style.width = progress + '%';
        }
        
        // Update current time - find in the music-info div
        const musicCard = this.closest('.music-card');
        const currentTimeEl = musicCard ? musicCard.querySelector('.time-current') : null;
        if (currentTimeEl) {
          currentTimeEl.textContent = formatTime(this.currentTime);
        }
      }
    });
    
    // Update duration when loaded
    audio.addEventListener('loadedmetadata', function() {
      const musicCard = this.closest('.music-card');
      const durationEl = musicCard ? musicCard.querySelector('.time-duration') : null;
      if (durationEl) {
        durationEl.textContent = formatTime(this.duration);
      }
    });
    
    // Reset progress when audio ends
    audio.addEventListener('ended', function() {
      const button = document.querySelector('[data-audio="' + index + '"]');
      if (button) {
        button.classList.remove('playing');
      }
      const progressFill = document.getElementById('progress-' + index);
      if (progressFill) {
        progressFill.style.width = '0%';
      }
      const musicCard = this.closest('.music-card');
      const currentTimeEl = musicCard ? musicCard.querySelector('.time-current') : null;
      if (currentTimeEl) {
        currentTimeEl.textContent = '0:00';
      }
    });
    
    // Handle progress bar click
    const musicCard = audio.closest('.music-card');
    const progressBar = musicCard ? musicCard.querySelector('.progress-bar') : null;
    if (progressBar) {
      progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        if (audio.duration) {
          audio.currentTime = percent * audio.duration;
        }
      });
    }
  });
  
  // Play button click handlers
  playButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const audioId = this.getAttribute('data-audio');
      const audio = document.getElementById('audio-' + audioId);
      
      if (audio) {
        // Stop all other audio
        document.querySelectorAll('audio').forEach(a => {
          if (a.id !== audio.id) {
            a.pause();
            a.currentTime = 0;
          }
        });
        
        // Remove playing class from all buttons
        playButtons.forEach(btn => btn.classList.remove('playing'));
        
        // Toggle play/pause
        if (audio.paused) {
          // Ensure audio is loaded
          audio.load();
          
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              console.log('Audio playing: ' + audioId);
              this.classList.add('playing');
            }).catch(err => {
              console.error('Error playing audio:', err);
              alert('Gagal memutar audio. Periksa file atau izin browser.');
            });
          } else {
            this.classList.add('playing');
          }
        } else {
          audio.pause();
          this.classList.remove('playing');
        }
      } else {
        console.error('Audio element not found: audio-' + audioId);
      }
    });
  });
  
  // Preload all audio
  document.querySelectorAll('audio').forEach((audio, index) => {
    audio.preload = 'metadata';
    audio.load();
  });
});


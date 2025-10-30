        // Letter stagger animation for hero title only (removed for paragraph)
        function animateHeroTitle() {
          const title = document.getElementById('heroTitle');
          const text = title.textContent;
          title.innerHTML = ''; // Clear
          for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = (i * 0.1) + 's'; // Stagger delay
            if (window.innerWidth < 768) {
              span.style.animationDuration = '0.6s'; // Faster on mobile
            }
            title.appendChild(span);
          }
          title.style.opacity = 1; // Show after splitting
        }
        
        // No more stagger for paragraph - now whole slide in via CSS
        
        // Call on load
        document.addEventListener('DOMContentLoaded', function() {
          animateHeroTitle();
          initSlider(); // Initialize slider
        });
        
        // Slider Functions
        let currentSlide = 0;
        const totalSlides = 10; // 10 images
        
        function initSlider() {
          const track = document.getElementById('sliderTrack');
          const dotsContainer = document.getElementById('sliderDots');
          const container = document.getElementById('sliderContainer');
          
          // Create dots
          for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
          }
          
          // Animate container on load
          container.classList.add('animate');
        }
        
        function changeSlide(direction) {
          currentSlide += direction;
          if (currentSlide >= totalSlides) currentSlide = 0;
          if (currentSlide < 0) currentSlide = totalSlides - 1;
          updateSlider();
        }
        
        function goToSlide(index) {
          currentSlide = index;
          updateSlider();
        }
        
        function updateSlider() {
          const track = document.getElementById('sliderTrack');
          track.style.transform = `translateX(-${currentSlide * 100}%)`;
          
          // Update dots
          document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
          });
        }
        
        // Auto-slide (optional: every 5 seconds)
        setInterval(() => changeSlide(1), 5000);
        
        // Hamburger Menu Toggle - Show/hide mobile menu
        function toggleMenu() {
          const navList = document.getElementById('navList');
          const hamburger = document.getElementById('hamburger');
          navList.classList.toggle('active');
          hamburger.classList.toggle('active');
        }
        
        // Close mobile menu when nav link is clicked
        document.querySelectorAll('#navList a').forEach(link => {
          link.addEventListener('click', () => {
            const navList = document.getElementById('navList');
            const hamburger = document.getElementById('hamburger');
            navList.classList.remove('active');
            hamburger.classList.remove('active');
          });
        });
        
        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.query.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        });
        
        // Scroll to Top Function - Triggered by logo click
        function scrollToTop() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Header Background Change on Scroll
        window.addEventListener('scroll', () => {
          document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
        });
        
        // Enhanced Intersection Observer - Animate elements on scroll with staggered and responsive delays
        const observerOptions = {
          threshold: 0.15,
          rootMargin: '0px 0px -100px 0px' // Trigger earlier on scroll
        };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
            }
          });
        }, observerOptions);
        
        // Observe headings, skills, projects, about, contact, footer, and home-img/about-img (removed gallery-item since now slider)
        document.querySelectorAll('h2, .skill-item, .project-item, .about-text, .home-img, .about-img, #contact-form form, .footer-main, .slider-container').forEach(el => {
          observer.observe(el);
        });
        
        // **FIX: Force animate footer on load to ensure it's always visible on desktop**
        document.addEventListener('DOMContentLoaded', function() {
          const footerMain = document.querySelector('.footer-main');
          if (footerMain) {
            footerMain.classList.add('animate');
          }
        });
        
        // Lightbox Functions - Open and close enlarged image/video modal
        function openLightbox(src) {
          const lightbox = document.getElementById('lightbox');
          const content = document.getElementById('lightboxContent');
          if (src.endsWith('.mp4')) {
            content.innerHTML = `<video src="${src}" controls autoplay loop muted style="max-width:90%; max-height:90%; border-radius:10px;"></video>`;
          } else {
            content.innerHTML = `<img src="${src}" alt="Enlarged Image" style="max-width:90%; max-height:90%; border-radius:10px; transform:scale(0.8); animation:zoomIn 0.5s ease-out forwards;">`;
          }
          lightbox.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // Prevent body scroll
        }
        
        function closeLightbox(event) {
          if (event.target.classList.contains('lightbox') || event.target.classList.contains('close')) {
            document.getElementById('lightbox').style.display = 'none';
            document.getElementById('lightboxContent').innerHTML = ''; // Clear content
            document.body.style.overflow = 'auto'; // Restore body scroll
          }
        }
        
        // Web3Forms Submission Handler
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          const form = e.target;
          const messageDiv = document.getElementById('message');
          const formData = new FormData(form);
          
          try {
            const response = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              body: formData,
            });
            
            const json = await response.json();
            
            if (json.success) {
              messageDiv.textContent = 'Thank you! Your message has been sent successfully. We will contact you soon.';
              messageDiv.className = 'message success';
              messageDiv.style.display = 'block';
              form.reset();
            } else {
              messageDiv.textContent = 'Oops! There was a problem submitting the form. Please try again.';
              messageDiv.className = 'message error';
              messageDiv.style.display = 'block';
            }
          } catch (error) {
            messageDiv.textContent = 'There was an error. Please try again later.';
            messageDiv.className = 'message error';
            messageDiv.style.display = 'block';
            console.error('Error:', error);
          }
        });
        
        // Enhanced Parallax Effect (scroll-based for backgrounds and responsiveness)
        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          const parallax = document.querySelector('#home');
          const speed = window.innerWidth > 768 ? 0.3 : 0.1; // Slower on mobile
          parallax.style.transform = `translateY(${scrolled * speed}px)`;
          
          // Responsive scroll-triggered nav highlight (optional enhancement)
          const sections = document.querySelectorAll('section');
          let current = '';
          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
              current = section.getAttribute('id');
            }
          });
          document.querySelectorAll('#navList a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
              a.classList.add('active');
            }
          });
        });
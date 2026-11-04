document.addEventListener('DOMContentLoaded', () => {

  function debounce(fn, ms) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
  }

  // ── CAROUSEL ──
  const wrapper = document.getElementById('carousel');
  let carouselTimer;
  if (wrapper) {
    const dots = document.querySelectorAll('#dots button');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = wrapper.querySelectorAll('.carousel-card');
    let current = 0;

    function goTo(index) {
      if (index < 0) index = cards.length - 1;
      if (index >= cards.length) index = 0;
      current = index;
      wrapper.scrollTo({ left: cards[current].offsetLeft - wrapper.offsetLeft, behavior: 'smooth' });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function syncDots() {
      if (!cards.length) return;
      const scrollLeft = wrapper.scrollLeft;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const cardLeft = card.offsetLeft - wrapper.offsetLeft;
        const dist = Math.abs(scrollLeft - cardLeft);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      if (closest !== current) {
        current = closest;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
      }
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    wrapper.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])').forEach(el => {
      el.addEventListener('focus', () => {
        const card = el.closest('.carousel-card');
        if (card) {
          const i = Array.from(cards).indexOf(card);
          if (i !== -1 && i !== current) {
            current = i;
            wrapper.scrollTo({ left: cards[current].offsetLeft - wrapper.offsetLeft, behavior: 'instant' });
            dots.forEach((d, j) => d.classList.toggle('active', j === current));
            clearInterval(carouselTimer);
          }
        }
      });
    });

    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); clearInterval(carouselTimer); }));
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); clearInterval(carouselTimer); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); clearInterval(carouselTimer); });

    wrapper.addEventListener('scroll', syncDots);

    carouselTimer = setInterval(next, 20000);

    let touchStartX = 0;
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) { next(); clearInterval(carouselTimer); }
        else { prev(); clearInterval(carouselTimer); }
      }
    }, { passive: true });
  }

  // ── ABOUT TEXT SWAP ──
  const aboutToggle = document.getElementById('aboutToggle');
  const aboutPrimary = document.getElementById('aboutPrimary');
  const aboutSecondary = document.getElementById('aboutSecondary');
  const titlePrimary = document.getElementById('titlePrimary');
  const titleSecondary = document.getElementById('titleSecondary');
  let showingAlt = false;
  if (aboutToggle && aboutPrimary && aboutSecondary && titlePrimary && titleSecondary) {
    aboutToggle.addEventListener('click', () => {
      showingAlt = !showingAlt;
      if (showingAlt) {
        const wrap = aboutPrimary.parentElement;
        if (wrap) aboutSecondary.style.maxHeight = wrap.offsetHeight + 'px';
      } else {
        aboutSecondary.style.maxHeight = '';
      }
      aboutPrimary.classList.toggle('is-hidden', showingAlt);
      aboutSecondary.classList.toggle('is-visible', showingAlt);
      titlePrimary.classList.toggle('is-hidden', showingAlt);
      titleSecondary.classList.toggle('is-visible', showingAlt);
      aboutToggle.textContent = showingAlt ? 'SHOW LESS ←' : 'READ MORE →';
      clearInterval(carouselTimer);
    });

    const updateAboutHeight = () => {
      if (showingAlt) {
        const wrap = aboutPrimary.parentElement;
        if (wrap) aboutSecondary.style.maxHeight = wrap.offsetHeight + 'px';
      }
    };
    window.addEventListener('resize', debounce(updateAboutHeight, 150));
  }

  // ── REACH OUT → CONTACT CARD ──
  document.querySelector('.about-reach-out')?.addEventListener('click', (e) => {
    e.preventDefault();
    const w = document.getElementById('carousel');
    if (!w) return;
    const cards = w.querySelectorAll('.carousel-card');
    if (cards.length >= 3) {
      w.scrollTo({ left: cards[2].offsetLeft - w.offsetLeft, behavior: 'smooth' });
      clearInterval(carouselTimer);
    }
  });

  // ── HOME LIGHTBOX ──
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = document.getElementById('lbImg');
    const lbVid = document.getElementById('lbVid');
    const lbSiteBtn = document.getElementById('lbSiteBtn');
    const lbCounter = document.getElementById('lbCounter');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    const portItems = document.querySelectorAll('.portfolio-item');
    const items = Array.from(portItems);
    let lbIndex = 0;

    function hideHomeLbMedia() {
      lightboxImg.style.display = 'none';
      lbVid.style.display = 'none';
      lbVid.pause();
      lbVid.src = '';
      lbVid.load();
      lbSiteBtn.style.display = 'none';
    }

    function openHomeLightbox(index) {
      lbIndex = index;
      const item = items[lbIndex];
      if (!item) return;
      const type = item.dataset.type || 'image';
      hideHomeLbMedia();

      lbCounter.textContent = `${lbIndex + 1} / ${items.length}`;

      if (type === 'animation') {
        lbVid.style.display = '';
        lbVid.poster = item.dataset.thumb || '';
        lbVid.src = item.dataset.src;
        lbVid.load();
        lbVid.volume = 0.5;
        lbVid.play().catch(() => {});
      } else if (type === 'website') {
        lbVid.style.display = '';
        lbVid.poster = item.dataset.thumb || '';
        lbVid.src = item.dataset.src;
        lbVid.load();
        lbVid.volume = 0.5;
        lbVid.play().catch(() => {});
        lbSiteBtn.style.display = '';
        lbSiteBtn.href = item.dataset.link || '#';
      } else {
        lightboxImg.style.display = '';
        lightboxImg.src = item.dataset.src;
      }

      void lightbox.offsetHeight;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      const closeBtn = lightbox.querySelector('.lightbox-close');
      if (closeBtn) closeBtn.focus();
    }

    function closeHomeLightbox() {
      hideHomeLbMedia();
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function prevHomeItem() {
      if (!items.length) return;
      lbIndex = (lbIndex - 1 + items.length) % items.length;
      openHomeLightbox(lbIndex);
    }

    function nextHomeItem() {
      if (!items.length) return;
      lbIndex = (lbIndex + 1) % items.length;
      openHomeLightbox(lbIndex);
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => openHomeLightbox(i));
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openHomeLightbox(i); }
      });
    });

    const lbClose = document.querySelector('.lightbox-close');
    if (lbClose) lbClose.addEventListener('click', closeHomeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-body') || e.target.classList.contains('lightbox-view')) closeHomeLightbox();
    });
    if (lightboxImg) lightboxImg.addEventListener('click', (e) => e.stopPropagation());
    if (lbPrev) lbPrev.addEventListener('click', prevHomeItem);
    if (lbNext) lbNext.addEventListener('click', nextHomeItem);

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeHomeLightbox();
      if (e.key === 'ArrowLeft') prevHomeItem();
      if (e.key === 'ArrowRight') nextHomeItem();
    });
  }

  // ── PORTFOLIO CAROUSEL ──
  const portWrapper = document.getElementById('portfolioCarousel');
  if (portWrapper) {
    const portPrev = document.getElementById('portPrevBtn');
    const portNext = document.getElementById('portNextBtn');
    const portItems = portWrapper.querySelectorAll('.portfolio-item');
    let portCurrentPage = 0;
    let portPages = 0;
    let portPerView = 0;

    function getPortPerView() {
      const w = window.innerWidth;
      if (w <= 600) return 2;
      if (w <= 1024) return 3;
      return 0;
    }

    function rebuildPortDots() {
      portPerView = getPortPerView();
      if (!portPerView) {
        portItems.forEach(item => item.style.display = '');
        return;
      }

      portItems.forEach(item => item.style.display = '');

      portPages = Math.ceil(portItems.length / portPerView);

      if (portCurrentPage >= portPages) portCurrentPage = 0;

      const container = document.getElementById('portDots');
      container.innerHTML = '';
      for (let i = 0; i < portPages; i++) {
        const btn = document.createElement('button');
        if (i === portCurrentPage) btn.classList.add('active');
        btn.addEventListener('click', () => { portGoTo(i); });
        container.appendChild(btn);
      }
      portGoTo(portCurrentPage);
    }

    function portGoTo(page) {
      if (!portPerView) return;
      if (page < 0) page = portPages - 1;
      if (page >= portPages) page = 0;
      portCurrentPage = page;
      const targetIndex = portCurrentPage * portPerView;
      const target = portItems[targetIndex];
      if (target) portWrapper.scrollTo({ left: target.offsetLeft - portWrapper.offsetLeft, behavior: 'smooth' });
      const btns = document.querySelectorAll('#portDots button');
      btns.forEach((d, i) => d.classList.toggle('active', i === portCurrentPage));
    }

    if (portPrev) portPrev.addEventListener('click', () => { portGoTo(portCurrentPage - 1); });
    if (portNext) portNext.addEventListener('click', () => { portGoTo(portCurrentPage + 1); });
    window.addEventListener('resize', debounce(rebuildPortDots, 150));
    rebuildPortDots();

    let portTouchStartX = 0;
    portWrapper.addEventListener('touchstart', (e) => {
      portTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    portWrapper.addEventListener('touchend', (e) => {
      const diff = portTouchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50 && portPerView) {
        if (diff > 0) portGoTo(portCurrentPage + 1);
        else portGoTo(portCurrentPage - 1);
      }
    }, { passive: true });
  }

  // ── ESCAPE HANDLER (skill overlay only — lightbox handled above) ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const so = document.getElementById('skillOverlay');
      if (so && so.classList.contains('open')) so.classList.remove('open');
    }
  });

  // ── INTERSECTION OBSERVER ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── HAMBURGER / MOBILE NAV ──
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('header') && !e.target.closest('#mobileNav')) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── SKILL DATA ──
  const skillData = {
    'Arch Linux': {
      desc: 'Daily-driving <a href="https://cachyos.org" target="_blank" rel="noopener noreferrer">CachyOS</a>, an Arch-based distro optimized for performance.\nDeep familiarity with pacman and the AUR.\nHelping people switch to Linux and get the most out of it, from setting up dual boots to full migrations, providing ongoing support for compatibility and parity with existing workflows.',
      tools: ['CachyOS', 'Pacman', 'AUR', 'Systemd', 'BTRFS', 'KDE Plasma']
    },
    'Cybersecurity': {
      desc: 'Developing skills in penetration testing, network analysis, and security hardening. Always keeping up with the latest CVEs and exploitation techniques.\nStrong advocate against age and ID verification online, seeing the huge security risk it poses to people\'s privacy, leaks and hackers are all too common.',
      tools: ['Wireshark', 'Nmap', 'Metasploit', 'Burp Suite', 'GPG', 'Firewalls']
    },
    'Web Development': {
      desc: 'Building clean, responsive websites and web applications for businesses and portfolios. Custom-coded with a focus on performance, simplicity, accessibility, and modern design.',
      tools: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Tailwind', 'Figma']
    },
    'Self-Hosting': {
      desc: 'Running personal infrastructure from home servers, DNS, media streaming, cloud storage, game servers, and more, all containerized and monitored with Docker Compose.\nProviding assistance to anyone looking to set up their own self-hosted services.',
      tools: ['Docker', 'Docker Compose', 'Nginx', 'Jellyfin', 'Nextcloud', 'Pi-hole', 'Prometheus']
    },
    'Photography': {
      desc: 'Capturing portraits, automotive, pets, events, and urban architecture with an eye for composition and lighting. Post-processing in both colour and black & white using professional-grade tools for polished, high-quality results.',
      tools: ['Lightroom', 'Photoshop', 'DaVinci Resolve', 'RAW Processing', 'Composition']
    },
    'Video Editing': {
      desc: 'Post-production across DaVinci Resolve, Adobe Premiere, After Effects, and KDENLive. Experienced in colour grading, transitions, and crafting a polished final cut with engaging storytelling from raw footage.',
      tools: ['DaVinci Resolve', 'Premiere Pro', 'After Effects', 'KDENLive', 'OBS', 'Audacity']
    },
    'Content Creation': {
      desc: 'Former streamer and content creator, primarily streaming Just Chatting with live on-stream effects, often compared to a produced YouTube video. Later expanded into tutorials, product reviews, and gym content.\nExperienced in live streaming, video production, audience engagement, and brand building across multiple platforms.',
      tools: ['OBS', 'Streamlabs', 'Social Media', 'Analytics', 'SEO']
    },
    'Linux Gaming': {
      desc: 'Gaming exclusively on Linux with Wine/Proton, open-source GPU drivers, and custom kernel optimizations for maximum performance.',
      tools: ['Steam', 'Proton', 'Wine', 'MangoHud', 'Gamescope', 'Mesa'],
      specs: {
        label: 'DESKTOP RIG',
        lines: [
          `<a href="https://cachyos.org" target="_blank" rel="noopener noreferrer">CachyOS</a> x86_64 (Arch-Based)`,
          'AMD Ryzen 9 9900X3D (12 / 24) @ 5.58 GHz',
          'AMD Radeon RX 9070 XT — 16GB GDDR6',
          'Kingston Fury 32GB DDR5',
          '4TB NVMe SSD'
        ]
      },
      deck: {
        label: 'STEAM DECK OLED',
        lines: [
          'SteamOS 3.x (Arch-Based)',
          'AMD Zen 2 4c/8t @ 2.4–3.5 GHz',
          '8 RDNA 2 CUs @ 1.6 GHz',
          '16GB LPDDR5',
          '1TB NVMe SSD',
          '7.4" OLED 1280×800 HDR'
        ]
      }
    }
  };

  // ── SKILL OVERLAY ──
  const skillOverlay = document.getElementById('skillOverlay');
  if (skillOverlay) {
    const skillClose = skillOverlay.querySelector('.skill-overlay-close');
    const skillIcon = skillOverlay.querySelector('.skill-overlay-icon');
    const skillName = skillOverlay.querySelector('.skill-overlay-name');
    const skillDesc = skillOverlay.querySelector('.skill-overlay-desc');
    const skillTools = skillOverlay.querySelector('.skill-overlay-tools');
    const skillSpecs = skillOverlay.querySelector('.skill-overlay-specs');

    document.querySelectorAll('.skill-item').forEach(item => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');

      function openSkill() {
        const key = item.dataset.skill;
        const data = skillData[key];
        if (!data) return;
        skillIcon.textContent = item.querySelector('.skill-icon').textContent;
        skillName.textContent = key;
        skillDesc.innerHTML = data.desc;
        skillTools.innerHTML = data.tools.map(t => `<span>${t}</span>`).join('');
        if (skillSpecs) {
          if (data.specs) {
            let html = '<div class="skill-overlay-specs-wrap">';
            [data.specs, data.deck].filter(Boolean).forEach(group => {
              html += `<div class="specs-box"><div class="specs-header">━ ${group.label} ━</div>`;
              group.lines.forEach(line => {
                html += `<div>${line}</div>`;
              });
              html += '</div>';
            });
            html += '</div>';
            skillSpecs.innerHTML = html;
            skillSpecs.style.display = '';
          } else {
            skillSpecs.style.display = 'none';
          }
        }
        skillOverlay.classList.add('open');
        if (skillClose) skillClose.focus();
      }

      item.addEventListener('click', openSkill);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSkill(); }
      });
    });

    if (skillClose) skillClose.addEventListener('click', () => skillOverlay.classList.remove('open'));
    skillOverlay.addEventListener('click', (e) => {
      if (e.target === skillOverlay) skillOverlay.classList.remove('open');
    });
  }

  // ── HERO CHEVRON ──
  const heroChevron = document.getElementById('heroChevron');
  if (heroChevron) {
    heroChevron.addEventListener('click', () => {
      const carousel = document.querySelector('.carousel-section');
      if (carousel) carousel.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── HERO PARTICLES ──
  (function() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    let rafId = null;

    function resize() {
      const hero = canvas.closest('.hero');
      if (!hero) return;
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', debounce(resize, 100));

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.3;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      rafId = requestAnimationFrame(animate);
    }

    function start() {
      if (rafId === null) rafId = requestAnimationFrame(animate);
    }
    function stop() {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    }

    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : start();
    });
    start();
  })();

  // ── COPYRIGHT YEAR ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── RIGHT-CLICK PROTECTION (images & video only) ──
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
      e.preventDefault();
    }
  });

});

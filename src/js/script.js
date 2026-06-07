    /* ── Starfield ── */
    const canvas = document.getElementById('estrelas');
    const ctx = canvas.getContext('2d');
    let estrelas = [];

    function redimensionar() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      criarEstrelas();
    }

    function criarEstrelas() {
      estrelas = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.1,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.004,
      }));
    }

    function desenharEstrelas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      estrelas.forEach(s => {
        s.a = Math.max(0, Math.min(1, s.a + s.da));
        if (s.a <= 0 || s.a >= 1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });
      requestAnimationFrame(desenharEstrelas);
    }

    /* ── Scroll fade (hero elements) ── */
    window.addEventListener('scroll', () => {
      const heroHeight = document.querySelector('.hero').offsetHeight;
      const p = Math.min(window.scrollY / (heroHeight * 0.4), 1);
      document.querySelectorAll('.nebulosa').forEach(n => n.style.opacity = 1 - p);
      document.querySelector('.estrelas-mascara').style.opacity = 1 - p;
      document.querySelector('.earth-container').style.opacity = 1 - p;

      const ind = document.getElementById('indicador-scroll');
      if (window.scrollY > 100) ind.classList.add('oculto');
      else ind.classList.remove('oculto');
    });

    /* ── Intersection Observer — acionar animações ── */
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.12 });

    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll(
        '.card, .stat-card, .obj-card, .publico-card, .ben-card, .tl-item, .pipe-etapa, .selo'
      ).forEach(el => {
        el.style.animationPlayState = 'paused';
        observador.observe(el);
      });
    });

    /* ── Smooth scroll links ── */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 75;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    /* ── Marquee pause on hover ── */
    document.querySelectorAll('.marquee-item a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 75;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    window.addEventListener('resize', redimensionar);
    redimensionar();
    desenharEstrelas();
      // Estrelas no canvas do rodapé
  (function () {
    const canvas = document.getElementById('estrelas-rodape');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
 
    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    }
 
    function init() {
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.004 + 0.001,
        phase: Math.random() * Math.PI * 2,
      }));
    }
 
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() / 1000;
      stars.forEach(s => {
        const alpha = s.a * (0.4 + 0.6 * Math.abs(Math.sin(t * s.speed * 10 + s.phase)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
 
    resize();
        window.addEventListener('resize', resize);
        draw();
    })();
    
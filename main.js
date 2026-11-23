/**
 * LV STUDIO — Portfolio & Architectural Visualization
 * Interactive Engine: Multi-Card Carousel, Spec Lightbox, Estimator & WhatsApp Generator
 * Tools: SketchUp, Blender, 3ds Max, Revit (Pipeline: SketchUp, Blender, 3ds Max, Revit)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initProjectCarousel();
  initProjectModal();
  initTechStackSelector();
  initQuoteEstimator();
});

/* ==========================================================================
   1. Header Scroll State
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('is-open');
    drawer.classList.toggle('is-open', isOpen);
    toggleBtn.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   3. Interactive Project Carousel ("Galería de Proyectos")
   ========================================================================== */
const PROJECTS_DATA = [
  {
    id: 'residencia-la-canada',
    num: '01',
    filter: 'residencial',
    category: 'Arquitectura Residencial · Fotorrealismo',
    title: 'Residencia La Cañada',
    desc: 'Volumetría en cantilever de concreto aparente, carpintería en roble y terraza con alberca infinita al atardecer.',
    image: 'assets/images/hero_cantilever_villa.jpg',
    location: 'Valle de Bravo, México',
    software: '3ds Max · Blender · V-Ray',
    area: '720 m²',
    year: '2025',
    resolution: '4K Ultra HD (3840 x 2160 px)',
    testimonial: '"LV Studio logró transmitir con total precisión la atmósfera crepuscular y la materialidad que convenció al cliente final en la primera presentación."',
    author: '— ARQ. MAURICIO SÁNCHEZ · DIRECTOR DE DESARROLLO INMOBILIARIO'
  },
  {
    id: 'hillside-residence',
    num: '02',
    filter: 'residencial',
    category: 'Visualización Exterior · Diseño Paisajístico',
    title: 'Hillside Modern Villa',
    desc: 'Vivienda escalonada en ladera rocosa, muros de piedra caliza y celosías de concreto integradas con vegetación autóctona.',
    image: 'assets/images/project_hillside_residence.jpg',
    location: 'Puebla, Pue. · Lomas de Angelópolis',
    software: 'Autodesk Revit · 3ds Max',
    area: '540 m²',
    year: '2024',
    resolution: 'Full HD / 4K',
    testimonial: '"El rigor geométrico del modelo 3D y la fidelidad de los materiales aceleraron nuestra preventa en más del 40%."',
    author: '— ING. ROBERTO SALAS · GRUPO PROMOTOR ARCO'
  },
  {
    id: 'pabellon-cultural-lumina',
    num: '03',
    filter: 'comercial',
    category: 'Arquitectura Comercial & Cultural · BIM',
    title: 'Pabellón Lumina & Museo',
    desc: 'Fachada paramétrica de cristal estructural, columnata de concreto rítmico y espejo de agua con iluminación rasante.',
    image: 'assets/images/project_pabellon_cultural.jpg',
    location: 'Ciudad de México · Polanco',
    software: 'Revit BIM · Blender 4.2 · 3ds Max',
    area: '1,850 m²',
    year: '2025',
    resolution: '4K Ultra HD (3840 x 2160 px)',
    testimonial: '"La integración de ingeniería BIM y renderizado cinematográfico permitió coordinar la estructura antes de fabricar."',
    author: '— ARQ. VALENTINA OROZCO · ESTUDIO MORFOLOGÍA'
  },
  {
    id: 'taller-tommy-nogal',
    num: '04',
    filter: 'taller-tommy',
    category: 'Taller Tommy · Mobiliario a Medida',
    title: 'Colección Minimal Nogal & Acero',
    desc: 'Mesa de comedor escultural en madera maciza de roble europeo estufado con bases estriadas de acero negro mate y aparador flotante.',
    image: 'assets/images/taller_tommy_furniture_hero.jpg',
    location: 'Fabricación en Taller Tommy · Puebla',
    software: 'Rhinoceros 3D · SketchUp Pro · Fabricación CNC',
    area: 'Piezas Únicas de Autor',
    year: '2025',
    resolution: 'Fotografía Real & Modelo 3D Previo',
    testimonial: '"La ventaja insuperable de LV Studio es que proyectan el mueble en el render 3D y su división Taller Tommy lo fabrica exactamente idéntico."',
    author: '— DI. CAMILA HERRERA · INTERIORISTA SENIOR'
  },
  {
    id: 'penthouse-bosques',
    num: '05',
    filter: 'interiores',
    category: 'Interiorismo Arquitectónico · Microcemento',
    title: 'Penthouse Bosques 108',
    desc: 'Revestimientos alistonados en nogal americano, piso continuo de microcemento marfil e iluminación lineal indirecta.',
    image: 'assets/images/project_penthouse_bosques.jpg',
    location: 'Bosques de las Lomas, CDMX',
    software: '3ds Max · Blender · Photoshop',
    area: '380 m²',
    year: '2024',
    resolution: '4K Ultra HD (3840 x 2160 px)',
    testimonial: '"Capturaron a la perfección la calidez de la luz natural tamizada y el detalle de cada textura textil y de madera."',
    author: '— ARQ. SANTIAGO DEL VALLE · DEL VALLE ARQUITECTOS'
  }
];

function initProjectCarousel() {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev-btn');
  const nextBtn = document.querySelector('.carousel-next-btn');
  const counterCurrent = document.querySelector('.carousel-counter-current');
  const counterTotal = document.querySelector('.carousel-counter-total');
  const dotsContainer = document.querySelector('.carousel-dots-row');
  const quoteText = document.querySelector('.editorial-quote-text');
  const quoteAuthor = document.querySelector('.editorial-quote-author');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');

  if (!track || !prevBtn || !nextBtn) return;

  let currentFilter = 'all';
  let filteredProjects = [...PROJECTS_DATA];
  let currentIndex = 0;

  // Render cards into track
  function renderCards() {
    track.innerHTML = '';
    filteredProjects.forEach((proj, idx) => {
      const card = document.createElement('article');
      card.className = 'carousel-card';
      card.dataset.index = idx;
      card.dataset.projectId = proj.id;
      card.innerHTML = `
        <div class="carousel-card-img-wrap">
          <img src="${proj.image}" alt="${proj.title}" class="carousel-card-img" loading="${idx < 2 ? 'eager' : 'lazy'}">
        </div>
        <div class="carousel-card-body">
          <div class="carousel-card-meta-top">
            <span class="carousel-card-cat">${proj.category}</span>
            <span class="carousel-card-num">${proj.num}</span>
          </div>
          <h3 class="carousel-card-title">${proj.title}</h3>
          <p class="carousel-card-desc">${proj.desc}</p>
          <div class="carousel-card-specs">
            <span class="carousel-spec-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${proj.location}
            </span>
            <span class="carousel-spec-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              ${proj.software}
            </span>
          </div>
          <div class="carousel-card-action">
            <button type="button" class="btn-link carousel-card-trigger" data-project-id="${proj.id}">
              Ver Ficha Técnica →
            </button>
          </div>
        </div>
      `;
      track.appendChild(card);
    });

    renderDots();
    updateCarousel();
  }

  // Render indicator dots
  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    filteredProjects.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `carousel-dot ${idx === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ir al proyecto ${idx + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Update carousel position and metadata
  function updateCarousel() {
    const total = filteredProjects.length;
    if (total === 0) return;

    if (currentIndex >= total) currentIndex = 0;
    if (currentIndex < 0) currentIndex = total - 1;

    // Calculate translation offset based on card width + gap
    const cards = track.querySelectorAll('.carousel-card');
    if (cards.length > 0 && cards[currentIndex]) {
      const cardEl = cards[currentIndex];
      const offset = cardEl.offsetLeft - track.offsetLeft;
      track.style.transform = `translateX(-${offset}px)`;
    }

    // Update Counter
    if (counterCurrent) counterCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
    if (counterTotal) counterTotal.textContent = String(total).padStart(2, '0');

    // Update Dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    // Update Testimonial quote smoothly
    const currentProj = filteredProjects[currentIndex];
    if (quoteText && currentProj) {
      quoteText.style.opacity = '0';
      setTimeout(() => {
        quoteText.textContent = currentProj.testimonial;
        quoteText.style.opacity = '1';
      }, 150);
    }
    if (quoteAuthor && currentProj) {
      quoteAuthor.textContent = currentProj.author;
    }
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % filteredProjects.length;
    updateCarousel();
  });

  // Filter Tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;

      if (currentFilter === 'all') {
        filteredProjects = [...PROJECTS_DATA];
      } else {
        filteredProjects = PROJECTS_DATA.filter(p => p.filter === currentFilter);
      }

      currentIndex = 0;
      renderCards();
    });
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
      updateCarousel();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % filteredProjects.length;
      updateCarousel();
    }
  });

  // Delegate click for modal
  track.addEventListener('click', (e) => {
    const btn = e.target.closest('.carousel-card-trigger');
    if (btn) {
      const projId = btn.dataset.projectId;
      openProjectModal(projId);
    }
  });

  // Touch Drag / Swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        currentIndex = (currentIndex + 1) % filteredProjects.length;
      } else {
        currentIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
      }
      updateCarousel();
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Initial render
  renderCards();
}

/* ==========================================================================
   4. Project Details Lightbox / Specification Modal
   ========================================================================== */
function initProjectModal() {
  const modal = document.querySelector('.project-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  document.querySelectorAll('[data-project-trigger]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = el.getAttribute('data-project-trigger');
      openProjectModal(projId);
    });
  });
}

function openProjectModal(projectId) {
  const modal = document.querySelector('.project-modal');
  if (!modal) return;

  const proj = PROJECTS_DATA.find(p => p.id === projectId) || PROJECTS_DATA[0];

  modal.querySelector('.modal-category-tag').textContent = proj.category;
  modal.querySelector('.modal-title').textContent = proj.title;
  modal.querySelector('.modal-hero-img').src = proj.image;
  modal.querySelector('.modal-hero-img').alt = proj.title;

  const specsTable = modal.querySelector('.modal-specs-table');
  if (specsTable) {
    specsTable.innerHTML = `
      <tr>
        <td>Ubicación</td>
        <td>${proj.location}</td>
      </tr>
      <tr>
        <td>Superficie</td>
        <td>${proj.area}</td>
      </tr>
      <tr>
        <td>Software & Pipeline</td>
        <td>${proj.software}</td>
      </tr>
      <tr>
        <td>Resolución de Entrega</td>
        <td>${proj.resolution}</td>
      </tr>
      <tr>
        <td>Año de Ejecución</td>
        <td>${proj.year}</td>
      </tr>
    `;
  }

  const narrativeEl = modal.querySelector('.modal-narrative');
  if (narrativeEl) {
    narrativeEl.textContent = `${proj.desc} Proyecto desarrollado íntegramente por el equipo de LV Studio, garantizando precisión geométrica milimétrica, cálculo de iluminación solar físicamente correcta y renderizado en alta definición para comercialización inmobiliaria de alto nivel.`;
  }

  const waBtn = modal.querySelector('.modal-wa-btn');
  if (waBtn) {
    const message = encodeURIComponent(`Hola LV Studio, vi en su portafolio el proyecto "${proj.title}" y me gustaría cotizar un desarrollo similar.`);
    waBtn.href = `https://wa.me/522228167858?text=${message}`;
  }

  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   5. Tech Stack Selector (SketchUp, Blender, 3ds Max, Revit )
   ========================================================================== */
const TECH_INFO = {
  sketchup: {
    title: 'SketchUp Pro',
    role: 'Modelado Volumétrico Ágil & Masa Conceptual',
    desc: 'Utilizado en fases iniciales para explorar volumetrías rápidas, estudios de asoleamiento preliminares y diálogo fluido con anteproyectos de arquitectos.'
  },
  blender: {
    title: 'Blender 4.2',
    role: 'Geometría Orgánica, Simulaciones & Animación Libre',
    desc: 'Pipeline flexible de modelado procedural, vegetación dispersa de alta densidad, simulación de telas y post-procesamiento de texturas complejas.'
  },
  max: {
    title: 'Autodesk 3ds Max',
    role: 'Motor Principal de Renderizado Fotorrealista',
    desc: 'El corazón de nuestro flujo de renderizado: shaders físicamente correctos, cálculo de iluminación precisa, materiales de alta fidelidad y post-producción fotográfica.'
  },
  revit: {
    title: 'Autodesk Revit BIM',
    role: 'Documentación Arquitectónica Paramétrica & Flujos BIM',
    desc: 'Desarrollo de modelos paramétricos estructurados, cuantificación, integración de ingenierías y compatibilidad total con despachos y constructoras.'
  }
};

function initTechStackSelector() {
  const badges = document.querySelectorAll('.tech-badge');
  const descBox = document.querySelector('.tech-desc-box');

  if (!badges.length || !descBox) return;

  badges.forEach(badge => {
    badge.addEventListener('click', () => {
      badges.forEach(b => b.classList.remove('active'));
      badge.classList.add('active');

      const techKey = badge.dataset.tech;
      const data = TECH_INFO[techKey];
      if (data) {
        descBox.innerHTML = `<strong>${data.title}</strong> — <em>${data.role}</em>: ${data.desc}`;
      }
    });
  });
}

/* ==========================================================================
   6. Interactive Project Estimator & WhatsApp Quote Builder
   ========================================================================== */
function initQuoteEstimator() {
  const container = document.querySelector('.estimator-card');
  if (!container) return;

  let state = {
    service: 'Renderizado Fotorrealista (Exteriores & Interiores)',
    type: 'Residencial',
    views: '4 a 6 Vistas Fotorrealistas',
    turnaround: '4 a 6 Días Hábiles'
  };

  const serviceChips = container.querySelectorAll('[data-group="service"] .chip-btn');
  const typeChips = container.querySelectorAll('[data-group="type"] .chip-btn');
  const viewChips = container.querySelectorAll('[data-group="views"] .chip-btn');

  const turnaroundVal = container.querySelector('.summary-turnaround-val');
  const sendWaBtn = container.querySelector('.estimator-send-wa');

  const updateSummary = () => {
    if (state.service.includes('Taller Tommy')) {
      state.turnaround = '15 a 25 Días (Fabricación en Taller)';
    } else if (state.views.includes('1 a 3')) {
      state.turnaround = '3 a 4 Días Hábiles';
    } else if (state.views.includes('4 a 6')) {
      state.turnaround = '5 a 7 Días Hábiles';
    } else {
      state.turnaround = '7 a 10 Días Hábiles (Proyecto Completo)';
    }

    if (turnaroundVal) {
      turnaroundVal.textContent = state.turnaround;
    }

    if (sendWaBtn) {
      const waText = encodeURIComponent(
        `¡Hola LV Studio! Me gustaría solicitar una cotización con las siguientes características:

` +
        `• Servicio: ${state.service}
` +
        `• Tipo de Proyecto: ${state.type}
` +
        `• Alcance / Vistas: ${state.views}
` +
        `• Tiempo estimado esperado: ${state.turnaround}

` +
        `¿Podrían brindarme información y costos? Muchas gracias.`
      );
      sendWaBtn.href = `https://wa.me/522228167858?text=${waText}`;
    }
  };

  const bindGroup = (chips, key) => {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        state[key] = chip.textContent.trim();
        updateSummary();
      });
    });
  };

  bindGroup(serviceChips, 'service');
  bindGroup(typeChips, 'type');
  bindGroup(viewChips, 'views');

  updateSummary();
}



/* =========================================
   LV STUDIO - RENDER CAROUSEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".render-carousel-track");
    const slides = document.querySelectorAll(".render-slide");
    const nextBtn = document.querySelector(".render-next");
    const prevBtn = document.querySelector(".render-prev");
    const counter = document.querySelector(".render-current");

    if (!track || !slides.length) return;

    let currentIndex = 0;

    function updateCarousel() {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        counter.textContent =
            String(currentIndex + 1).padStart(2, "0");

    }

    nextBtn.addEventListener("click", () => {

        currentIndex = (currentIndex + 1) % slides.length;

        updateCarousel();

    });

    prevBtn.addEventListener("click", () => {

        currentIndex =
            (currentIndex - 1 + slides.length) % slides.length;

        updateCarousel();

    });

});

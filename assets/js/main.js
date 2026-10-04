/**
 * Yaago Global - Travel and Tourism LLC - SPC
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initMobileDrawer();
  initHeroSlider();
  initBookingTabs();
  initServicesHub();
  initDestinationsFilter();
  initStatsCounter();
  initScrollTop();
  initModals();
  initContactForms();
});

/* ==========================================================================
   1. Preloader
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const dismiss = () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  };

  // Dismiss on window load or max 1.2s timeout
  window.addEventListener('load', dismiss);
  setTimeout(dismiss, 1200);
}

/* ==========================================================================
   2. Sticky Header
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.querySelector('.drawer-close');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  // Close when nav links clicked
  const drawerLinks = drawer.querySelectorAll('.drawer-nav a');
  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   4. Hero Slider
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');

  if (!slides.length) return;

  let currentIndex = 0;
  let slideInterval = null;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  const startInterval = () => {
    slideInterval = setInterval(nextSlide, 5500);
  };

  const resetInterval = () => {
    clearInterval(slideInterval);
    startInterval();
  };

  startInterval();
}

/* ==========================================================================
   5. Quick Booking Bar Tabs
   ========================================================================== */
function initBookingTabs() {
  const tabBtns = document.querySelectorAll('.booking-tab-btn');
  const form = document.getElementById('quickBookingForm');
  const serviceTypeInput = document.getElementById('bookingServiceType');

  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const service = btn.getAttribute('data-tab');
      if (serviceTypeInput) {
        serviceTypeInput.value = service;
      }

      // Update placeholders based on selected tab
      const originInput = document.getElementById('bookOrigin');
      const destInput = document.getElementById('bookDestination');

      if (service === 'flights') {
        if (originInput) originInput.placeholder = 'e.g. Dubai (DXB) or Calicut (CCJ)';
        if (destInput) destInput.placeholder = 'e.g. London, Istanbul, Georgia';
      } else if (service === 'hotels') {
        if (originInput) originInput.placeholder = 'City / Landmark';
        if (destInput) destInput.placeholder = 'Hotel Name / Area';
      } else if (service === 'holidays') {
        if (originInput) originInput.placeholder = 'Departure City';
        if (destInput) destInput.placeholder = 'Destination (e.g. Bali, Europe)';
      } else if (service === 'visa') {
        if (originInput) originInput.placeholder = 'Your Nationality';
        if (destInput) destInput.placeholder = 'Country to Visit (UAE, Schengen, UK)';
      } else if (service === 'transfers') {
        if (originInput) originInput.placeholder = 'Pickup Location / Airport';
        if (destInput) destInput.placeholder = 'Drop-off Hotel / Address';
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = serviceTypeInput ? serviceTypeInput.value : 'General';
      const origin = document.getElementById('bookOrigin')?.value || '';
      const dest = document.getElementById('bookDestination')?.value || '';
      const date = document.getElementById('bookDate')?.value || '';
      const travelers = document.getElementById('bookTravelers')?.value || '1';

      // Open WhatsApp desk selector with prefilled booking message
      const text = `Hello Yaago Global! I would like to book/enquire about ${service.toUpperCase()}.\n• Origin: ${origin}\n• Destination: ${dest}\n• Travel Date: ${date}\n• Travelers: ${travelers}`;
      if (typeof window.openWhatsAppDeskSelector === 'function') {
        window.openWhatsAppDeskSelector(text);
      } else {
        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/971508921234?text=${encoded}`, '_blank');
      }
    });
  }
}

/* ==========================================================================
   6. "All Services" Hub (Replica of Client's Screenshot 1 with interactive updates)
   ========================================================================== */
const servicesData = {
  'air-travel': {
    title: 'Air Travel & Global Flight Ticketing',
    tag: 'Aviation Solutions',
    badge: 'Best Fares Guaranteed',
    img: 'assets/images/service-air.jpg',
    desc: 'Full-service international and domestic airline bookings across all major global carriers. From economy deals to business & first-class luxury suites, we provide competitive corporate fares, group ticketing, date changes, and 24/7 rebooking support.',
    features: [
      'Worldwide IATA standard airline access',
      'Exclusive group & corporate contracted rates',
      'Instant e-ticket issuance & seat selection',
      '24/7 flight cancellation & change assistance'
    ],
    whatsappMsg: 'Hello Yaago Global! I need flight tickets for domestic/international travel.'
  },
  'hotel-reservations': {
    title: 'Hotel Reservations Worldwide',
    tag: 'Accommodation Services',
    badge: 'Direct Contracting',
    img: 'assets/images/service-hotel.jpg',
    desc: 'Handpicked stays ranging from 5-star beachfront resorts and luxury city hotels to charming boutique villas and executive corporate suites across 150+ countries. Enjoy early check-in, complimentary breakfast, and upgrade privileges.',
    features: [
      'Over 500,000+ vetted hotels globally',
      'Verified customer reviews & photos',
      'Special family & honeymoon packages',
      'Corporate corporate-rate negotiation'
    ],
    whatsappMsg: 'Hello Yaago Global! I need hotel reservations worldwide.'
  },
  'car-rental': {
    title: 'Car Rental & Self-Drive Fleet',
    tag: 'Mobility Solutions',
    badge: 'Premium & Economy',
    img: 'assets/images/service-car.jpg',
    desc: 'Freedom to explore at your own pace. Choose from our modern rental fleet of economy hatchbacks, luxury executive sedans, spacious 7-seater SUVs, and exotic convertibles in Dubai, UAE, and major global destinations.',
    features: [
      'Flexible daily, weekly & monthly rentals',
      'Comprehensive insurance coverage included',
      'Airport pickup & doorstep drop-off',
      'GPS navigation & child seat options'
    ],
    whatsappMsg: 'Hello Yaago Global! I am enquiring about car rental services.'
  },
  'ground-transfers': {
    title: 'Ground Transfers & Airport Chauffeur',
    tag: 'Executive Transfers',
    badge: 'Punctual & Safe',
    img: 'assets/images/service-transfer.jpg',
    desc: 'Reliable, seamless, and secure point-to-point airport transfers and intercity chauffeur-driven vehicles. Avoid taxi queues with our professional bilingual drivers tracking your flight in real-time.',
    features: [
      'Live flight tracking for zero wait time',
      'Clean, sanitized executive luxury cars',
      'Fixed transparent rates with no surge pricing',
      'Inter-emirate travel (Dubai, Abu Dhabi, Sharjah)'
    ],
    whatsappMsg: 'Hello Yaago Global! I need private ground transfers/chauffeur service.'
  },
  'events-management': {
    title: 'Meeting, Group & Event Management (MICE)',
    tag: 'Corporate & Group Travel',
    badge: 'End-to-End Coordination',
    img: 'assets/images/service-events.jpg',
    desc: 'Comprehensive planning and flawless execution for international conferences, company offsites, dealer meets, gala dinners, and incentive travel programs. We handle venue sourcing, airline block-booking, staging, and VIP hosting.',
    features: [
      'Dedicated MICE travel project managers',
      'Customized delegate registration & visa handling',
      'Bespoke team-building & gala dinners',
      'Full audio-visual & technical stage setups'
    ],
    whatsappMsg: 'Hello Yaago Global! We have a corporate MICE/event inquiry.'
  },
  'meet-greet': {
    title: 'Airport Meet & Greet VIP Services',
    tag: 'VIP Concierge',
    badge: 'Fast-Track Protocol',
    img: 'assets/images/service-meetgreet.jpg',
    desc: 'Experience effortless airport journeys with our VIP arrival and departure protocol. Enjoy dedicated hostesses, fast-track customs & immigration clearance, porter assistance, and access to premium lounge retreats.',
    features: [
      'Fast-track immigration & security lanes',
      'Executive airside buggy transport',
      'Complimentary VIP lounge access with buffet',
      'Luggage porterage & curbside escort'
    ],
    whatsappMsg: 'Hello Yaago Global! I would like to book Meet & Greet VIP airport services.'
  },
  'travel-insurance': {
    title: 'Comprehensive Travel Insurance',
    tag: 'Safety & Protection',
    badge: 'Global Coverage',
    img: 'assets/images/service-insurance.jpg',
    desc: 'Travel the world with complete peace of mind. Our international travel insurance policies cover emergency medical expenses, trip delays, baggage loss, emergency evacuation, and passport protection approved for Schengen & global visas.',
    features: [
      'Schengen, UK, USA & UAE visa compliant',
      'Cashless hospital network worldwide',
      'Trip interruption & missed connection cover',
      'Instant policy issuance via email & WhatsApp'
    ],
    whatsappMsg: 'Hello Yaago Global! I need travel insurance for my trip.'
  },
  'visa-services': {
    title: 'Visa Services & Expert Processing',
    tag: 'Global Immigration Assistance',
    badge: '99% Approval Record',
    img: 'assets/images/service-visa.jpg',
    desc: 'Hassle-free visa consulting and express documentation support. We specialize in UAE tourist & Golden Visas, Schengen tourist & business visas, UK visas, US B1/B2 appointments, Canada, Saudi Umrah visas, and Far East eVisa issuance.',
    features: [
      'UAE 30-day, 60-day & 2-year Golden Visas',
      'Schengen & UK appointment scheduling & mock interviews',
      'Complete documentation & itinerary vetting',
      'Express processing with status tracking'
    ],
    whatsappMsg: 'Hello Yaago Global! I need visa processing assistance.'
  },
  'driving-licenses': {
    title: 'International Driving Licenses (IDP)',
    tag: 'Worldwide Permit',
    badge: 'Valid in 150+ Countries',
    img: 'assets/images/service-idp.jpg',
    desc: 'Hit the road overseas with an official International Driving Permit. We facilitate quick, authenticated International Driving Licenses recognized worldwide, enabling you to legally rent and drive cars across Europe, USA, UAE, and beyond.',
    features: [
      'Officially recognized 1-year and 3-year permits',
      'Fast turnaround with express home delivery',
      'Translated into multiple international languages',
      'Accepted by all global car rental companies'
    ],
    whatsappMsg: 'Hello Yaago Global! I need an International Driving License (IDP).'
  },
  'pilgrim-services': {
    title: 'Umrah & Religious Pilgrim Packages',
    tag: 'Spiritual Journeys',
    badge: 'Tailored Spiritual Care',
    img: 'assets/images/service-pilgrim.jpg',
    desc: 'Deeply thoughtful, well-organized Umrah packages offering hotels within walking distance of Haram in Makkah and Madinah. We arrange Umrah visas, luxury transport, guided Ziyarat tours, and experienced multilingual tour leaders.',
    features: [
      'Close-to-Haram 4-star and 5-star hotel options',
      'Umrah visa processing with health coverage',
      'Private luxury coach & train transfers (Haramain)',
      'Experienced religious guides throughout the journey'
    ],
    whatsappMsg: 'Hello Yaago Global! I am enquiring about Umrah pilgrimage packages.'
  }
};

function initServicesHub() {
  const accordionItems = document.querySelectorAll('.service-accordion-item');
  const buttons = document.querySelectorAll('.gold-service-btn');
  const banner = document.getElementById('featuredServiceBanner');

  if (!buttons.length) return;

  const titleEl = document.getElementById('serviceBannerTitle');
  const tagEl = document.getElementById('serviceBannerTag');
  const badgeEl = document.getElementById('serviceBannerBadge');
  const imgEl = document.getElementById('serviceBannerImg');
  const descEl = document.getElementById('serviceBannerDesc');
  const featuresEl = document.getElementById('serviceFeaturesList');
  const whatsappBtn = document.getElementById('serviceWhatsappBtn');
  const quoteBtn = document.getElementById('serviceQuoteBtn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const isMobile = window.innerWidth <= 992;
      const parentItem = btn.closest('.service-accordion-item');
      const serviceKey = btn.getAttribute('data-service');
      const data = servicesData[serviceKey];

      if (isMobile) {
        // MOBILE UX: In-Place Expandable Accordion
        const isCurrentlyActive = parentItem && parentItem.classList.contains('active');

        // Collapse all accordion items
        accordionItems.forEach((item) => {
          item.classList.remove('active');
          const itemBtn = item.querySelector('.gold-service-btn');
          if (itemBtn) {
            itemBtn.classList.remove('active');
            itemBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked item (if it wasn't active, expand it)
        if (!isCurrentlyActive && parentItem) {
          parentItem.classList.add('active');
          btn.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');

          // Smoothly bring the active item into view if it was pushed off screen
          setTimeout(() => {
            const rect = parentItem.getBoundingClientRect();
            if (rect.top < 70 || rect.top > window.innerHeight - 120) {
              const yOffset = -75;
              const y = rect.top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }, 150);
        }
      } else {
        // DESKTOP UX: Two-Column Live Featured Banner
        accordionItems.forEach((item) => item.classList.remove('active'));
        buttons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-expanded', 'false');
        });

        if (parentItem) parentItem.classList.add('active');
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');

        if (!data || !banner) return;

        // Animate banner change
        banner.style.opacity = '0.4';
        setTimeout(() => {
          if (titleEl) titleEl.textContent = data.title;
          if (tagEl) tagEl.textContent = data.tag;
          if (badgeEl) badgeEl.textContent = data.badge;
          if (imgEl) imgEl.src = data.img;
          if (descEl) descEl.textContent = data.desc;

          if (featuresEl) {
            featuresEl.innerHTML = data.features
              .map(
                (f) => `<div class="service-feature-item"><i class="fas fa-check-circle"></i> ${f}</div>`
              )
              .join('');
          }

          if (whatsappBtn) {
            whatsappBtn.href = '#whatsappModal';
            whatsappBtn.setAttribute('data-wa-msg', data.whatsappMsg);
          }

          if (quoteBtn) {
            quoteBtn.setAttribute('data-service-title', data.title);
          }

          banner.style.opacity = '1';
        }, 180);
      }
    });
  });
}


/* ==========================================================================
   7. Curated Destinations Filter
   ========================================================================== */
function initDestinationsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const destCards = document.querySelectorAll('.destination-card');

  if (!filterBtns.length || !destCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      destCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Stats Counter Animation on Scroll
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-count');
  if (!counters.length) return;

  let started = false;

  const countUp = (counter) => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 1600;
    const step = target / (duration / 25);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current).toLocaleString() + suffix;
        setTimeout(update, 25);
      } else {
        counter.textContent = target.toLocaleString() + suffix;
      }
    };
    update();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          counters.forEach(countUp);
        }
      });
    },
    { threshold: 0.25 }
  );

  const statsSection = document.querySelector('.hero-stats-row') || document.querySelector('.about-section');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   9. Scroll To Top Button
   ========================================================================== */
function initScrollTop() {
  const scrollBtn = document.querySelector('.btn-scroll-top');
  if (!scrollBtn) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    },
    { passive: true }
  );

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   10. Modals & Quick Dialogs (Call, Quote & Advanced Dual-Desk WhatsApp)
   ========================================================================== */
const WA_REGIONAL_DESKS = {
  uae: {
    phone: '971508921234',
    name: 'Yaago UAE / Dubai Concierge Desk'
  },
  india: {
    phone: '918848144260',
    name: 'Yaago India Corporate HQ'
  }
};

function initModals() {
  const quoteModal = document.getElementById('quoteModal');
  const callModal = document.getElementById('callModal');
  const whatsappModal = document.getElementById('whatsappModal');
  const quoteTriggers = document.querySelectorAll('.open-quote-modal');
  const callTrigger = document.querySelector('.floating-btn-call');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  const waBtnUae = document.getElementById('waBtnUae');
  const waBtnIndia = document.getElementById('waBtnIndia');
  const waPreview = document.getElementById('waInquiryPreview');
  const waPreviewText = document.getElementById('waInquiryPreviewText');
  const defaultWaMsg = 'Hello Yaago Global! I would like to enquire about your travel services.';
  let currentWaMsg = defaultWaMsg;

  // Open & Configure WhatsApp Desk Selector Modal
  window.openWhatsAppDeskSelector = function(customMessage) {
    currentWaMsg = (customMessage && customMessage.trim()) ? customMessage.trim() : defaultWaMsg;
    const encoded = encodeURIComponent(currentWaMsg);

    if (waBtnUae) {
      waBtnUae.href = `https://wa.me/${WA_REGIONAL_DESKS.uae.phone}?text=${encoded}`;
    }
    if (waBtnIndia) {
      waBtnIndia.href = `https://wa.me/${WA_REGIONAL_DESKS.india.phone}?text=${encoded}`;
    }

    if (waPreview && waPreviewText) {
      if (currentWaMsg && currentWaMsg !== defaultWaMsg) {
        waPreviewText.textContent = currentWaMsg;
        waPreview.style.display = 'block';
      } else {
        waPreview.style.display = 'none';
      }
    }

    if (whatsappModal) {
      whatsappModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  // Bind All WhatsApp Selector Triggers Across Website
  const waTriggers = document.querySelectorAll('.open-whatsapp-modal');
  waTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = trigger.getAttribute('data-wa-msg');
      window.openWhatsAppDeskSelector(msg);
    });
  });

  // Track Clicks on Desk Cards inside WhatsApp Modal
  [waBtnUae, waBtnIndia].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const desk = btn.getAttribute('data-desk') || 'uae';
      const deskInfo = WA_REGIONAL_DESKS[desk] || WA_REGIONAL_DESKS.uae;
      showNotification(`Opening WhatsApp with ${deskInfo.name}...`, 'success');
      setTimeout(() => {
        if (whatsappModal) {
          whatsappModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 500);
    });
  });

  // Open Quote Modal
  quoteTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = trigger.getAttribute('data-service-title') || 'Custom Travel Package';
      const serviceSelect = document.getElementById('quoteServiceSelect');
      if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.includes(serviceName) || serviceSelect.options[i].value === serviceName) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (quoteModal) quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Open Call Modal
  if (callTrigger && callModal) {
    callTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      callModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close Modals
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (quoteModal) quoteModal.classList.remove('active');
      if (callModal) callModal.classList.remove('active');
      if (whatsappModal) whatsappModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on backdrop
  [quoteModal, callModal, whatsappModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (quoteModal) quoteModal.classList.remove('active');
      if (callModal) callModal.classList.remove('active');
      if (whatsappModal) whatsappModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   11. Contact & Inquiry Form Submissions (Instant WhatsApp Dispatch with Desk Routing)
   ========================================================================== */
function initContactForms() {
  const mainForm = document.getElementById('mainInquiryForm');
  const modalForm = document.getElementById('modalQuoteForm');

  // Radio button visual sync for desk selector cards
  const deskRadios = document.querySelectorAll('.desk-select-card input[type="radio"]');
  deskRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const container = radio.closest('.desk-select-grid');
      if (container) {
        container.querySelectorAll('.desk-select-card').forEach((card) => {
          card.classList.remove('active');
        });
        const parentCard = radio.closest('.desk-select-card');
        if (parentCard) parentCard.classList.add('active');
      }
    });
  });

  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName')?.value.trim() || '';
      const phone = document.getElementById('formPhone')?.value.trim() || '';
      const email = document.getElementById('formEmail')?.value.trim() || '';
      const service = document.getElementById('formService')?.value || 'General Inquiry';
      const message = document.getElementById('formMessage')?.value.trim() || '';
      const deskChoice = mainForm.querySelector('input[name="formPreferredDesk"]:checked')?.value || 'uae';
      const targetDesk = WA_REGIONAL_DESKS[deskChoice] || WA_REGIONAL_DESKS.uae;

      const lines = [
        '*New Travel Inquiry - Yaago Global*',
        '-----------------------------------',
        `*Preferred Desk:* ${targetDesk.name}`,
        `*Service:* ${service}`,
        `*Name:* ${name}`,
        `*Phone:* ${phone}`
      ];
      if (email) lines.push(`*Email:* ${email}`);
      lines.push('*Requirements:*');
      lines.push(message || 'Please contact me with quotation and options.');

      const text = lines.join('\n');
      const waUrl = `https://wa.me/${targetDesk.phone}?text=${encodeURIComponent(text)}`;

      showNotification(`Thank you! Connecting you to ${targetDesk.name} on WhatsApp...`, 'success');
      setTimeout(() => {
        window.open(waUrl, '_blank');
        mainForm.reset();
      }, 400);
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quoteName')?.value.trim() || '';
      const phone = document.getElementById('quotePhone')?.value.trim() || '';
      const service = document.getElementById('quoteServiceSelect')?.value || 'Travel Quotation';
      const message = document.getElementById('quoteMessage')?.value.trim() || '';
      const deskChoice = modalForm.querySelector('input[name="quotePreferredDesk"]:checked')?.value || 'uae';
      const targetDesk = WA_REGIONAL_DESKS[deskChoice] || WA_REGIONAL_DESKS.uae;

      const lines = [
        '*Quotation Request - Yaago Global*',
        '----------------------------------',
        `*Preferred Desk:* ${targetDesk.name}`,
        `*Service:* ${service}`,
        `*Name:* ${name}`,
        `*Phone:* ${phone}`,
        '*Requirements:*',
        message || 'Please provide quotation and package details.'
      ];

      const text = lines.join('\n');
      const waUrl = `https://wa.me/${targetDesk.phone}?text=${encodeURIComponent(text)}`;

      showNotification(`Thank you! Connecting you to ${targetDesk.name} on WhatsApp...`, 'success');

      const modal = modalForm.closest('.modal-overlay');
      setTimeout(() => {
        window.open(waUrl, '_blank');
        modalForm.reset();
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 450);
    });
  }
}

// Notification Toast Utility
function showNotification(msg, type = 'success') {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 100000;
      padding: 16px 24px;
      border-radius: 12px;
      color: #fff;
      font-weight: 600;
      font-size: 0.95rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      transition: all 0.4s ease;
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 400px;
    `;
    document.body.appendChild(toast);
  }

  toast.style.background = type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)';
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i> <span>${msg}</span>`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
  }, 4500);
}

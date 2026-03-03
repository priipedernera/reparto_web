/**
 * ============================================
 * REPARTO DE AGUA - Animaciones JavaScript
 * ============================================
 * 
 * Este archivo contiene toda la lógica JavaScript
 * para las animaciones y efectos interactivos.
 * 
 * NO MODIFICA la funcionalidad existente del sitio.
 * Solo añade efectos visuales y animaciones.
 * 
 * CONTENIDO:
 * 1. Inicialización
 * 2. Scroll Reveal Animations
 * 3. Parallax suave
 * 4. Contadores animados
 * 5. Burbujas decorativas
 * 6. Efectos de hover mejorados
 * 7. Navbar dinámico
 * 8. Efectos de cards
 * 
 * ============================================
 */

(function() {
    'use strict';

    // ========================================
    // 1. INICIALIZACIÓN
    // ========================================
    
    document.addEventListener('DOMContentLoaded', function() {
        initScrollReveal();
        initParallax();
        initCounters();
        initBubbles();
        initCardEffects();
        initNavbarEffects();
        initButtonEffects();
    });

    // ========================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ========================================
    
    function initScrollReveal() {
        // Aplicar clases de animación a elementos existentes
        applyAnimationClasses();
        
        // Configurar el observer
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Delay escalonado para elementos hermanos
                    const parent = entry.target.parentElement;
                    if (parent) {
                        const siblings = parent.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-scale-up, .section-fade');
                        const siblingIndex = Array.from(siblings).indexOf(entry.target);
                        if (siblingIndex > -1) {
                            entry.target.style.transitionDelay = `${siblingIndex * 0.1}s`;
                        }
                    }
                    
                    // Activar animación
                    entry.target.classList.add('visible');
                    
                    // Limpiar delay después de la animación
                    setTimeout(() => {
                        entry.target.style.transitionDelay = '0s';
                    }, 1000);
                }
            });
        }, observerOptions);

        // Observar elementos con animación
        const animatedElements = document.querySelectorAll(
            '.section-fade, .animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-scale-up, .animate-fade'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    function applyAnimationClasses() {
        // Agregar animación a cards de características sin modificar estructura
        document.querySelectorAll('.card-feature').forEach((card, index) => {
            if (!card.classList.contains('section-fade') && !card.classList.contains('animate-fade-up')) {
                card.classList.add('animate-fade-up');
                card.style.transitionDelay = `${index * 0.05}s`;
            }
        });

        // Agregar animación a icon-boxes
        document.querySelectorAll('.icon-box').forEach(box => {
            box.classList.add('icon-bounce');
        });

        // Animar badges/spans destacados
        document.querySelectorAll('span[class*="inline-flex"]').forEach(badge => {
            if (!badge.classList.contains('shimmer')) {
                badge.classList.add('shimmer');
            }
        });
    }

    // ========================================
    // 3. PARALLAX SUAVE
    // ========================================
    
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.animate-float, .float-animation');
        
        if (parallaxElements.length === 0) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    parallaxElements.forEach(el => {
                        const speed = parseFloat(el.dataset.parallaxSpeed) || 0.15;
                        const rect = el.getBoundingClientRect();
                        
                        // Solo aplicar si el elemento está visible
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            const yPos = scrolled * speed;
                            el.style.transform = `translateY(${-yPos % 30}px)`;
                        }
                    });

                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ========================================
    // 4. CONTADORES ANIMADOS
    // ========================================
    
    function initCounters() {
        // Buscar elementos con números en estadísticas
        const statElements = document.querySelectorAll('[data-counter]');
        
        // También buscar stats del hero
        const heroStats = document.querySelectorAll('#inicio .text-3xl.font-bold');
        
        heroStats.forEach(stat => {
            const text = stat.textContent;
            const match = text.match(/(\d+)/);
            if (match && !stat.hasAttribute('data-counter')) {
                stat.setAttribute('data-counter', match[1]);
                stat.setAttribute('data-suffix', text.replace(match[1], ''));
                stat.setAttribute('data-original', text);
            }
        });

        // Observer para contadores
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-counter]').forEach(el => {
            counterObserver.observe(el);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function para suavizar
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);

            element.textContent = current + suffix;
            element.classList.add('counter-number', 'counting');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
                element.classList.remove('counting');
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ========================================
    // 5. BURBUJAS DECORATIVAS
    // ========================================
    
    function initBubbles() {
        // Crear contenedor si no existe
        let container = document.getElementById('bubbles-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'bubbles-container';
            container.className = 'bubbles-container';
            document.body.insertBefore(container, document.body.firstChild);
        }

        // Crear burbujas iniciales
        for (let i = 0; i < 10; i++) {
            createBubble(container, Math.random() * 8000);
        }

        // Crear nuevas burbujas periódicamente
        setInterval(() => {
            const bubbles = container.querySelectorAll('.bubble');
            if (bubbles.length < 15) {
                createBubble(container, 0);
            }
        }, 3000);
    }

    function createBubble(container, delay) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        const size = Math.random() * 25 + 8;
        const left = Math.random() * 100;
        const duration = Math.random() * 12 + 10;

        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}ms;
        `;

        container.appendChild(bubble);

        // Remover después de la animación
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        }, (duration * 1000) + delay + 1000);
    }

    // ========================================
    // 6. EFECTOS DE CARDS
    // ========================================
    
    function initCardEffects() {
        const cards = document.querySelectorAll('.card-feature, .card-light');

        cards.forEach(card => {
            // Efecto 3D sutil al mover el mouse
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ========================================
    // 7. NAVBAR DINÁMICO
    // ========================================
    
    function initNavbarEffects() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let lastScrollTop = 0;
        let scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Efecto de sombra al scroll
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            } else {
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            }

            // Ocultar/mostrar navbar al hacer scroll (solo en desktop)
            if (window.innerWidth > 768) {
                if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, { passive: true });
    }

    // ========================================
    // 8. EFECTOS DE BOTONES
    // ========================================
    
    function initButtonEffects() {
        // Agregar efecto ripple a botones primarios
        const primaryButtons = document.querySelectorAll('.btn-primary, .btn-outline');
        
        primaryButtons.forEach(btn => {
            btn.classList.add('ripple-effect');
            
            // Efecto hover mejorado
            btn.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });

        // Botón WhatsApp flotante - agregar animación de pulso
        const whatsappBtn = document.querySelector('a[href*="wa.me"]');
        if (whatsappBtn && whatsappBtn.classList.contains('fixed')) {
            whatsappBtn.classList.add('pulse-soft');
        }

        // Iconos en cards - efecto bounce
        document.querySelectorAll('.icon-box i').forEach(icon => {
            const parent = icon.closest('.card-feature, .card-light');
            if (parent) {
                parent.addEventListener('mouseenter', () => {
                    icon.style.animation = 'iconBounce 0.5s ease';
                });
                parent.addEventListener('mouseleave', () => {
                    icon.style.animation = '';
                });
            }
        });
    }

    // ========================================
    // UTILIDADES
    // ========================================

    // Debounce para optimizar eventos
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle para eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

})();

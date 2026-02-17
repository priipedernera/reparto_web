/**
 * ============================================
 * REPARTO DE AGUA - JavaScript Principal
 * ============================================
 * 
 * Este archivo contiene toda la funcionalidad JavaScript
 * del sitio web de Reparto de Agua.
 * 
 * ESTRUCTURA DEL ARCHIVO:
 * 
 * 1. Inicialización (DOMContentLoaded)
 * 2. Smooth Scroll - Navegación suave
 * 3. Navbar Scroll Effect - Efecto al hacer scroll
 * 4. Menú Móvil - Toggle del menú responsive
 * 5. Animaciones al Scroll - Reveal de elementos
 * 6. Validación de Formulario - Formulario de contacto
 * 7. Funciones de Error - Manejo de errores en form
 * 8. Utilidades - throttle, debounce
 * 9. Contador Animado - Para estadísticas
 * 10. Lazy Loading - Carga diferida de imágenes
 * 
 * ============================================
 */


/* ============================================
   SECCIÓN 1: INICIALIZACIÓN
   ============================================
   Este evento espera a que todo el DOM (estructura HTML)
   esté cargado antes de ejecutar el código JavaScript.
   
   Esto es necesario para poder acceder a elementos HTML
   que se definen más abajo en el documento.
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Llamamos a todas las funciones de inicialización
    initSmoothScroll();      // Navegación suave entre secciones
    initNavbarScroll();      // Efecto de la barra de navegación al scroll
    initMobileMenu();        // Menú hamburguesa para móviles
    initAnimateOnScroll();   // Animaciones cuando elementos entran en pantalla
    initFormValidation();    // Validación del formulario de contacto
});


/* ============================================
   SECCIÓN 2: SMOOTH SCROLL (Navegación Suave)
   ============================================
   
   Esta función hace que cuando el usuario hace clic
   en un enlace del menú (ej: #features, #contact),
   la página se desplace suavemente hasta esa sección
   en lugar de saltar bruscamente.
   
   Cómo funciona:
   1. Busca todos los enlaces que empiezan con "#"
   2. Les añade un evento de clic
   3. Cuando se hace clic, previene el comportamiento normal
   4. Busca el elemento destino y hace scroll suave hacia él
   ============================================ */
function initSmoothScroll() {
    // Selecciona todos los enlaces que empiezan con "#" (anclas internas)
    // Por ejemplo: <a href="#features">
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Añade un evento de clic a cada enlace
        anchor.addEventListener('click', function(e) {
            // Previene el comportamiento por defecto (salto brusco)
            e.preventDefault();
            
            // Obtiene el ID del destino (ej: "#features")
            const targetId = this.getAttribute('href');
            
            // Busca el elemento con ese ID
            const target = document.querySelector(targetId);
            
            // Si el elemento existe...
            if (target) {
                // Primero, cerramos el menú móvil si está abierto
                closeMobileMenu();
                
                // Luego, hacemos scroll suave hacia el elemento
                target.scrollIntoView({
                    behavior: 'smooth',  // Animación suave
                    block: 'start'       // Alinear al inicio de la pantalla
                });
            }
        });
    });
}


/* ============================================
   SECCIÓN 3: NAVBAR SCROLL EFFECT
   ============================================
   
   Esta función cambia la apariencia de la barra
   de navegación cuando el usuario hace scroll.
   
   - Al principio (scroll = 0): La navbar es semi-transparente
   - Al hacer scroll (> 50px): La navbar se vuelve sólida con sombra
   
   Esto mejora la legibilidad cuando hay contenido debajo.
   ============================================ */
function initNavbarScroll() {
    // Busca el elemento <nav> (la barra de navegación)
    const nav = document.querySelector('nav');
    
    // Si no existe la navbar, salimos de la función
    if (!nav) return;
    
    // Escucha el evento de scroll en la ventana
    window.addEventListener('scroll', function() {
        // Si se ha hecho scroll más de 50 pixeles...
        if (window.scrollY > 50) {
            // Añade sombra y fondo sólido
            nav.classList.add('shadow-lg', 'bg-white');
            // Quita el fondo semi-transparente
            nav.classList.remove('bg-white/95');
        } else {
            // Si estamos arriba, volvemos al estado original
            nav.classList.remove('shadow-lg');
            nav.classList.add('bg-white/95');
        }
    });
}


/* ============================================
   SECCIÓN 4: MENÚ MÓVIL
   ============================================
   
   Esta función maneja el menú hamburguesa que
   aparece en dispositivos móviles.
   
   Funcionalidad:
   - Al hacer clic en el botón: abre/cierra el menú
   - Al hacer clic fuera del menú: lo cierra
   - Los enlaces del menú cierran el menú al hacer clic
   ============================================ */
function initMobileMenu() {
    // Busca el botón del menú móvil (el icono de hamburguesa)
    // Se identifica por el atributo data-mobile-menu-button
    const menuButton = document.querySelector('[data-mobile-menu-button]');
    
    // Busca el contenedor del menú móvil
    // Se identifica por el atributo data-mobile-menu
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    // Si no existen estos elementos, salimos de la función
    if (!menuButton || !mobileMenu) return;
    
    // Evento de clic en el botón de menú
    menuButton.addEventListener('click', function() {
        // Verifica si el menú está oculto (tiene clase 'hidden')
        const isOpen = mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            // Si está cerrado, lo abrimos
            mobileMenu.classList.remove('hidden');           // Quita 'hidden'
            mobileMenu.classList.add('flex', 'flex-col');    // Añade flex para mostrarlo
            document.body.classList.add('mobile-menu-open'); // Marca que está abierto
        } else {
            // Si está abierto, lo cerramos
            closeMobileMenu();
        }
    });
    
    // Cerrar el menú cuando se hace clic fuera de él
    document.addEventListener('click', function(e) {
        // Verifica que el clic no fue en el botón ni dentro del menú
        if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

/**
 * Función auxiliar para cerrar el menú móvil
 * Se usa en varios lugares, por eso está separada
 */
function closeMobileMenu() {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');              // Oculta el menú
        mobileMenu.classList.remove('flex', 'flex-col'); // Quita las clases de display
        document.body.classList.remove('mobile-menu-open'); // Marca como cerrado
    }
}


/* ============================================
   SECCIÓN 5: ANIMACIONES AL SCROLL
   ============================================
   
   Esta función hace que los elementos aparezcan
   con una animación suave cuando entran en la
   pantalla al hacer scroll.
   
   Usa la API IntersectionObserver, que es muy eficiente
   porque no ejecuta código constantemente durante el scroll.
   
   Cómo funciona:
   1. Los elementos con clase 'animate-on-scroll' empiezan invisibles
   2. Cuando entran en la pantalla visible, se les añade 'fade-in-up'
   3. La animación CSS hace que aparezcan subiendo suavemente
   ============================================ */
function initAnimateOnScroll() {
    // Configuración del observer
    const observerOptions = {
        threshold: 0.1,                    // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px'   // Margen adicional (activa 50px antes de entrar)
    };
    
    // Crear el observer
    // El callback se ejecuta cuando un elemento entra o sale de la pantalla
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento está entrando en la pantalla...
            if (entry.isIntersecting) {
                // Añade la clase de animación
                entry.target.classList.add('fade-in-up');
                // Deja de observar este elemento (la animación solo ocurre una vez)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Busca todos los elementos que deben animarse
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        // Los hace invisibles inicialmente
        el.style.opacity = '0';
        // Empieza a observarlos
        observer.observe(el);
    });
}


/* ============================================
   SECCIÓN 6: VALIDACIÓN DE FORMULARIO
   ============================================
   
   Esta función valida el formulario de contacto
   antes de enviarlo. Verifica que:
   - El nombre no esté vacío
   - El email sea válido
   - El teléfono no esté vacío
   
   Si hay errores, muestra mensajes de error.
   Si todo está bien, simula el envío exitoso.
   ============================================ */
function initFormValidation() {
    // Busca el formulario de contacto
    // Se identifica por el atributo data-contact-form
    const contactForm = document.querySelector('[data-contact-form]');
    
    // Si no existe el formulario, salimos
    if (!contactForm) return;
    
    // Evento de envío del formulario
    contactForm.addEventListener('submit', function(e) {
        // Previene el envío normal del formulario
        // (lo manejamos con JavaScript)
        e.preventDefault();
        
        // Obtiene referencias a los campos del formulario
        const nombre = this.querySelector('[name="nombre"]');
        const email = this.querySelector('[name="email"]');
        const telefono = this.querySelector('[name="telefono"]');
        const mensaje = this.querySelector('[name="mensaje"]');
        
        // Variable para rastrear si el formulario es válido
        let isValid = true;
        
        // --- VALIDAR NOMBRE ---
        // Verifica que el campo nombre no esté vacío
        if (nombre && !nombre.value.trim()) {
            showError(nombre, 'Por favor, ingresa tu nombre');
            isValid = false;
        } else if (nombre) {
            clearError(nombre);  // Limpia errores anteriores si existe
        }
        
        // --- VALIDAR EMAIL ---
        // Verifica que el email tenga formato correcto
        if (email && !isValidEmail(email.value)) {
            showError(email, 'Por favor, ingresa un email válido');
            isValid = false;
        } else if (email) {
            clearError(email);
        }
        
        // --- VALIDAR TELÉFONO ---
        // Verifica que el teléfono no esté vacío
        if (telefono && !telefono.value.trim()) {
            showError(telefono, 'Por favor, ingresa tu teléfono');
            isValid = false;
        } else if (telefono) {
            clearError(telefono);
        }
        
        // Si todos los campos son válidos, simular envío exitoso
        if (isValid) {
            showSuccessMessage(contactForm);
        }
    });
}

/**
 * Valida que un email tenga formato correcto
 * 
 * @param {string} email - El email a validar
 * @returns {boolean} - true si es válido, false si no
 * 
 * La expresión regular verifica:
 * - Hay texto antes del @
 * - Hay un @ 
 * - Hay texto después del @
 * - Hay un punto
 * - Hay texto después del punto
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


/* ============================================
   SECCIÓN 7: FUNCIONES DE ERROR
   ============================================
   
   Funciones auxiliares para mostrar y limpiar
   mensajes de error en los campos del formulario.
   ============================================ */

/**
 * Muestra un mensaje de error debajo de un campo
 * 
 * @param {HTMLElement} input - El campo con error
 * @param {string} message - El mensaje de error a mostrar
 */
function showError(input, message) {
    // Busca si ya existe un mensaje de error para este campo
    let errorEl = input.parentElement.querySelector('.error-message');
    
    // Si no existe, lo creamos
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-message text-red-300 text-sm mt-1';
        input.parentElement.appendChild(errorEl);
    }
    
    // Establece el texto del mensaje
    errorEl.textContent = message;
    
    // Añade borde rojo al campo para indicar error
    input.classList.add('border-red-400');
}

/**
 * Limpia el mensaje de error de un campo
 * 
 * @param {HTMLElement} input - El campo del cual limpiar el error
 */
function clearError(input) {
    // Busca el mensaje de error
    const errorEl = input.parentElement.querySelector('.error-message');
    
    // Si existe, lo elimina
    if (errorEl) {
        errorEl.remove();
    }
    
    // Quita el borde rojo del campo
    input.classList.remove('border-red-400');
}

/**
 * Muestra mensaje de éxito después de enviar el formulario
 * 
 * @param {HTMLElement} form - El formulario que se envió
 * 
 * Esta función:
 * 1. Cambia el texto del botón a "¡Mensaje enviado!"
 * 2. Cambia el color del botón a verde
 * 3. Limpia el formulario
 * 4. Después de 3 segundos, restaura el botón al estado original
 */
function showSuccessMessage(form) {
    // Busca el botón de envío
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Guarda el texto original del botón
    const originalText = submitBtn.textContent;
    
    // Cambia el texto a mensaje de éxito
    submitBtn.textContent = '¡Mensaje enviado!';
    
    // Añade color verde al botón
    submitBtn.classList.add('bg-green-500');
    
    // Deshabilita el botón temporalmente
    submitBtn.disabled = true;
    
    // Limpia todos los campos del formulario
    form.reset();
    
    // Después de 3 segundos (3000ms), restaura el botón
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('bg-green-500');
        submitBtn.disabled = false;
    }, 3000);
}


/* ============================================
   SECCIÓN 8: UTILIDADES
   ============================================
   
   Funciones de utilidad que pueden usarse en
   varias partes del código.
   ============================================ */

/**
 * Función Throttle
 * 
 * Limita la frecuencia con la que se puede ejecutar una función.
 * Útil para eventos que se disparan muy frecuentemente (como scroll).
 * 
 * @param {Function} func - La función a limitar
 * @param {number} limit - Tiempo mínimo entre ejecuciones (en ms)
 * @returns {Function} - La función limitada
 * 
 * Ejemplo de uso:
 * window.addEventListener('scroll', throttle(handleScroll, 100));
 * // handleScroll se ejecutará máximo cada 100ms
 */
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

/**
 * Función Debounce
 * 
 * Retrasa la ejecución de una función hasta que pasen X milisegundos
 * sin que se vuelva a llamar. Útil para eventos como resize o input.
 * 
 * @param {Function} func - La función a retrasar
 * @param {number} wait - Tiempo de espera (en ms)
 * @returns {Function} - La función con debounce
 * 
 * Ejemplo de uso:
 * window.addEventListener('resize', debounce(handleResize, 250));
 * // handleResize se ejecutará 250ms después de que el usuario deje de redimensionar
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}


/* ============================================
   SECCIÓN 9: CONTADOR ANIMADO
   ============================================
   
   Esta función anima un número desde 0 hasta
   un valor objetivo. Útil para las estadísticas
   como "+1500 repartidores".
   
   @param {HTMLElement} element - El elemento donde mostrar el número
   @param {number} target - El número final al que llegar
   @param {number} duration - Duración de la animación en ms (default: 2000)
   ============================================ */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    
    // Calculamos cuánto incrementar en cada frame
    // Asumimos ~60fps, o sea 16ms por frame
    const increment = target / (duration / 16);
    
    // Función que actualiza el contador
    function updateCounter() {
        start += increment;
        
        // Si aún no llegamos al objetivo...
        if (start < target) {
            // Actualizamos el texto (redondeado hacia abajo)
            element.textContent = Math.floor(start);
            // Pedimos otro frame de animación
            requestAnimationFrame(updateCounter);
        } else {
            // Si llegamos o pasamos, establecemos el valor final exacto
            element.textContent = target;
        }
    }
    
    // Iniciamos la animación
    updateCounter();
}


/* ============================================
   SECCIÓN 10: LAZY LOADING DE IMÁGENES
   ============================================
   
   Carga las imágenes solo cuando están a punto
   de entrar en la pantalla. Mejora el rendimiento
   inicial de la página.
   
   Para usar, añade el atributo data-lazy a las imágenes:
   <img data-lazy="imagen-real.jpg" src="placeholder.jpg">
   
   Cuando la imagen entre en la pantalla, el src
   se reemplazará con el valor de data-lazy.
   ============================================ */
function initLazyLoading() {
    // Busca todas las imágenes con el atributo data-lazy
    const lazyImages = document.querySelectorAll('[data-lazy]');
    
    // Crear un observer para las imágenes
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Cuando la imagen entra en la pantalla...
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Reemplaza el src placeholder con la imagen real
                img.src = img.dataset.lazy;
                
                // Elimina el atributo data-lazy (ya no es necesario)
                img.removeAttribute('data-lazy');
                
                // Deja de observar esta imagen
                observer.unobserve(img);
            }
        });
    });
    
    // Empieza a observar cada imagen lazy
    lazyImages.forEach(img => imageObserver.observe(img));
}

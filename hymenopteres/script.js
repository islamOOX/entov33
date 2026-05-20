// Script principal pour la page des Hyménoptères
document.addEventListener("DOMContentLoaded", function() {
    // Animation de l'icône SVG
    animateHymenopteraIcon();
    
    // Gestion du scroll fluide
    setupSmoothScrolling();
    
    // Animation des cartes au scroll
    setupScrollAnimations();
});

function animateHymenopteraIcon() {
    const icon = document.querySelector(".hymenoptera-icon svg");
    if (!icon) return;

    // Animation des ailes
    const wings = icon.querySelectorAll("ellipse[fill*=\"rgba(255,255,255\"]");
    wings.forEach((wing, index) => {
        wing.style.transformOrigin = "center";
        wing.style.animation = `wingFlap 2s ease-in-out infinite ${index * 0.1}s`;
    });

    // Ajouter les keyframes CSS pour l'animation des ailes
    const style = document.createElement("style");
    style.textContent = `
        @keyframes wingFlap {
            0%, 100% { transform: scaleY(1); opacity: 0.7; }
            50% { transform: scaleY(0.8); opacity: 0.9; }
        }
    `;
    document.head.appendChild(style);
}

function setupSmoothScrolling() {
    // Scroll fluide pour les liens de navigation
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Animation de l'indicateur de scroll
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", () => {
            document.querySelector("#species").scrollIntoView({
                behavior: "smooth"
            });
        });
    }
}

function setupScrollAnimations() {
    // Observer pour les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Observer les groupes de familles
    document.querySelectorAll(".family-group").forEach((group, index) => {
        group.style.opacity = "0";
        group.style.transform = "translateY(30px)";
        group.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(group);
    });

    // Observer les cartes d'espèces
    document.querySelectorAll(".species-card").forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        observer.observe(card);
    });
}

// Gestion des interactions avec les cartes
function setupCardInteractions() {
    document.querySelectorAll(".species-card").forEach(card => {
        // Effet de parallaxe léger sur l'image
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            const image = card.querySelector(".species-image img");
            if (image) {
                image.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        card.addEventListener("mouseleave", () => {
            const image = card.querySelector(".species-image img");
            if (image) {
                image.style.transform = "scale(1)";
            }
        });
    });
}

// Initialiser les interactions des cartes après le chargement
document.addEventListener("DOMContentLoaded", setupCardInteractions);

// Gestion du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
    // Réajuster les tooltips si nécessaires
    const tooltip = document.getElementById("species-tooltip");
    if (tooltip && tooltip.style.display !== "none") {
        tooltip.style.display = "none";
    }
});

// Effet de particules subtil dans le hero
function createParticleEffect() {
    const hero = document.querySelector(".hero-section");
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s;
        `;
        
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        
        hero.appendChild(particle);
    }
}

// Initialiser l'effet de particules
document.addEventListener("DOMContentLoaded", createParticleEffect);



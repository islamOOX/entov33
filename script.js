// Navigation mobile
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Navigation fluide pour les liens d\"ancrage
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Gestion des clics sur les cartes d\"ordres
const orderCards = document.querySelectorAll(".order-card");

orderCards.forEach(card => {
    card.addEventListener("click", function() {
        const order = this.getAttribute("data-order");
        
        // Redirection vers le site de l\"ordre correspondant
        redirectToOrder(order);
    });
});

// Fonction de redirection vers les sites d\"ordres
function redirectToOrder(order) {
    const orderUrls = {
        "coleopteres": "./coleopteres/index.html",
        "hemipteres": "./hemipteres/index.html",
        "lepidopteres": "./lepidopteres/index.html",
        "dipteres": "./dipteres/index.html",
        "thysanopteres": "./thysanopteres/index.html",
        "hymenopteres": "./hymenopteres/index.html",
        "orthopteres": "./orthopteres/index.html"
    };
    
    if (orderUrls[order]) {
        window.location.href = orderUrls[order];
    } else {
        console.error("URL non trouvée pour l\"ordre:", order);
    }
}

// Masquer/afficher la barre de navigation au défilement
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Défilement vers le bas
        navbar.classList.add("hidden");
    } else {
        // Défilement vers le haut
        navbar.classList.remove("hidden");
    }
    lastScrollTop = scrollTop;
});

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    // Effet de typing sur le titre principal (optionnel)
    const title = document.querySelector(".hero-title");
    if (title) {
        const text = title.textContent;
        title.textContent = "";
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});



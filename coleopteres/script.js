// Script principal pour la page Coléoptères

document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    // Attendre que speciesData soit disponible
    const checkSpeciesData = setInterval(() => {
        if (window.speciesData) {
            clearInterval(checkSpeciesData);
            renderSpecies();
            initializeTooltips();
        }
    }, 100);
});

// Initialisation des particules d'arrière-plan
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Rendu des espèces par famille
function renderSpecies() {
    const container = document.getElementById('species-container');
    
    // Ordre des familles pour l'affichage
    const familyOrder = [
        'buprestidae',
        'curculionidae',
        'scolytidae',
        'chrysomelidae',
        'cerambycidae',
        'meloidae',
        'coccinelidae',
        'bostrychidae',
        'elateridae',
        'scarabaeidae',
        'carabidae',
        'dryophthoridae',
        'nitidulidae'
    ];

    // Noms français des familles
    const familyNames = {
        'buprestidae': 'Buprestidae',
        'curculionidae': 'Curculionidae',
        'scolytidae': 'Scolytidae',
        'chrysomelidae': 'Chrysomelidae',
        'cerambycidae': 'Cerambycidae',
        'meloidae': 'Meloidae',
        'coccinelidae': 'Coccinelidae',
        'bostrychidae': 'Bostrychidae',
        'elateridae': 'Elateridae',
        'scarabaeidae': 'Scarabaeidae',
        'carabidae': 'Carabidae',
        'dryophthoridae': 'Dryophthoridae',
        'nitidulidae': 'Nitidulidae'
    };

    familyOrder.forEach(familyKey => {
        if (window.speciesData[familyKey] && window.speciesData[familyKey].length > 0) {
            const familySection = createFamilySection(familyKey, familyNames[familyKey], window.speciesData[familyKey]);
            container.appendChild(familySection);
        }
    });
}

// Création d'une section de famille
function createFamilySection(familyKey, familyName, species) {
    const section = document.createElement('section');
    section.className = 'family-section';
    section.id = `family-${familyKey}`;

    const title = document.createElement('h2');
    title.className = 'family-title';
    title.textContent = `Famille: ${familyName}`;

    const grid = document.createElement('div');
    grid.className = 'species-grid';

    // Créer les cartes pour chaque espèce
    species.forEach(speciesInfo => {
        const card = createSpeciesCard(speciesInfo);
        grid.appendChild(card);
    });

    section.appendChild(title);
    section.appendChild(grid);

    return section;
}

// Création d'une carte d'espèce
function createSpeciesCard(species) {
    const card = document.createElement('div');
    card.className = 'species-card';
    card.dataset.speciesId = species.id;

    // Image de l'espèce
    const image = document.createElement('img');
    image.className = 'species-image';
    image.src = species.image;
    image.alt = `${species.scientificName} - ${species.commonName}`;
    image.onerror = function() {
        this.src = 'https://via.placeholder.com/300x200/667eea/ffffff?text=Image+non+disponible';
    };

    // Nom scientifique avec auteur
    const scientificName = document.createElement('div');
    scientificName.className = 'species-name';
    scientificName.innerHTML = `<em>${species.scientificName}</em>`;

    const author = document.createElement('div');
    author.className = 'species-author';
    author.textContent = species.author;

    // Nom commun
    const commonName = document.createElement('div');
    commonName.className = 'species-common-name';
    commonName.textContent = species.commonName;

    // Informations de base
    const infoContainer = document.createElement('div');
    infoContainer.className = 'species-info';

    const familyTag = document.createElement('span');
    familyTag.className = 'info-tag';
    familyTag.textContent = species.family;
    infoContainer.appendChild(familyTag);

    const sizeTag = document.createElement('span');
    sizeTag.className = 'info-tag';
    sizeTag.textContent = species.size;
    infoContainer.appendChild(sizeTag);

    if (species.suborder) {
        const suborderTag = document.createElement('span');
        suborderTag.className = 'info-tag';
        suborderTag.textContent = species.suborder;
        infoContainer.appendChild(suborderTag);
    }

    // Assemblage de la carte
    card.appendChild(image);
    card.appendChild(scientificName);
    card.appendChild(author);
    card.appendChild(commonName);
    card.appendChild(infoContainer);

    return card;
}

// Initialisation des tooltips
function initializeTooltips() {
    const tooltip = document.getElementById('species-tooltip');
    const cards = document.querySelectorAll('.species-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const speciesId = this.dataset.speciesId;
            const species = findSpeciesById(speciesId);
            
            if (species) {
                showTooltip(e, species, tooltip);
            }
        });

        card.addEventListener('mouseleave', function() {
            hideTooltip(tooltip);
        });

        card.addEventListener('mousemove', function(e) {
            updateTooltipPosition(e, tooltip);
        });
    });
}

// Trouver une espèce par son ID
function findSpeciesById(id) {
    for (const family in window.speciesData) {
        const species = window.speciesData[family].find(s => s.id === id);
        if (species) return species;
    }
    return null;
}

// Afficher le tooltip
function showTooltip(event, species, tooltip) {
    const titleElement = tooltip.querySelector('.tooltip-title');
    const contentElement = tooltip.querySelector('.tooltip-content');

    titleElement.innerHTML = `<em>${species.scientificName}</em> ${species.author}`;
    
    let content = `
        <div class="tooltip-section"><strong>Nom commun:</strong> ${species.commonName || 'Non spécifié'}</div>
        <div class="tooltip-section"><strong>Famille:</strong> ${species.family}</div>
        <div class="tooltip-section"><strong>Sous-ordre:</strong> ${species.suborder}</div>
        <div class="tooltip-section"><strong>Taille:</strong> ${species.size}</div>
        <div class="tooltip-section"><strong>Couleur:</strong> ${species.color}</div>
        <div class="tooltip-section"><strong>Hôte:</strong> ${species.host}</div>
        <div class="tooltip-section"><strong>Description:</strong> ${species.description}</div>
    `;

    contentElement.innerHTML = content;
    
    updateTooltipPosition(event, tooltip);
    tooltip.classList.add('show');
}

// Cacher le tooltip
function hideTooltip(tooltip) {
    tooltip.classList.remove('show');
}

// Mettre à jour la position du tooltip
function updateTooltipPosition(event, tooltip) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let left = event.pageX + 15;
    let top = event.pageY - 10;
    
    // Ajuster si le tooltip dépasse à droite
    if (left + tooltipRect.width > viewportWidth) {
        left = event.pageX - tooltipRect.width - 15;
    }
    
    // Ajuster si le tooltip dépasse en bas
    if (top + tooltipRect.height > viewportHeight + window.scrollY) {
        top = event.pageY - tooltipRect.height - 10;
    }
    
    // Ajuster si le tooltip dépasse en haut
    if (top < window.scrollY) {
        top = event.pageY + 15;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

// Animation d'apparition progressive des cartes
function animateCards() {
    const cards = document.querySelectorAll('.species-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Fonction de recherche (optionnelle pour future extension)
function searchSpecies(query) {
    const cards = document.querySelectorAll('.species-card');
    const searchTerm = query.toLowerCase();
    
    cards.forEach(card => {
        const speciesId = card.dataset.speciesId;
        const species = findSpeciesById(speciesId);
        
        if (species) {
            const searchableText = `
                ${species.scientificName} 
                ${species.commonName} 
                ${species.family} 
                ${species.host}
            `.toLowerCase();
            
            if (searchableText.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    const tooltip = document.getElementById('species-tooltip');
    hideTooltip(tooltip);
});

// Animation au scroll (optionnelle)
function handleScrollAnimation() {
    const sections = document.querySelectorAll('.family-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Initialiser l'animation au scroll après le chargement
setTimeout(handleScrollAnimation, 500);


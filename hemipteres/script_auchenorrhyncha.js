// Script pour la page Auchenorrhyncha

document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();

    renderSpecies();
    initializeTooltips();
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

// Initialisation du modèle 3D
function initialize3DModel() {
    const container = document.getElementById('model-viewer');
    const loadingElement = container.querySelector('.model-loading');
    
    // Configuration de la scène Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Éclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-10, -10, -5);
    scene.add(pointLight);
    
    // Contrôles de la caméra
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.maxDistance = 10;
    controls.minDistance = 2;
    
    // Chargement du modèle GLTF
    const loader = new THREE.GLTFLoader();
    loader.load(
        'hemiptere.glb',
        function(gltf) {
            const model = gltf.scene;
            
            // Ajustement de la taille et position du modèle
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            model.scale.setScalar(scale);
            
            model.position.sub(center.multiplyScalar(scale));
            
            // Activation des ombres
            model.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            scene.add(model);
            
            // Position initiale de la caméra
            camera.position.set(3, 2, 3);
            controls.target.set(0, 0, 0);
            controls.update();
            
            // Masquer le texte de chargement et afficher le rendu
            loadingElement.style.display = 'none';
            container.appendChild(renderer.domElement);
            
            // Animation de rotation automatique
            let autoRotate = true;
            const rotationSpeed = 0.005;
            
            function animate() {
                requestAnimationFrame(animate);
                
                if (autoRotate && !controls.isUserInteracting) {
                    model.rotation.y += rotationSpeed;
                }
                
                controls.update();
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Arrêter la rotation automatique lors de l'interaction
            controls.addEventListener('start', function() {
                autoRotate = false;
            });
            
            controls.addEventListener('end', function() {
                setTimeout(() => {
                    autoRotate = true;
                }, 3000);
            });
        },
        function(progress) {
            const percent = (progress.loaded / progress.total * 100);
            loadingElement.textContent = `Chargement du modèle 3D... ${Math.round(percent)}%`;
        },
        function(error) {
            console.error('Erreur lors du chargement du modèle 3D:', error);
            loadingElement.textContent = 'Erreur lors du chargement du modèle 3D';
        }
    );
    
    // Redimensionnement responsive
    window.addEventListener('resize', function() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// Rendu des espèces d'Auchenorrhyncha
function renderSpecies() {
    const container = document.getElementById('species-container');
    
    if (!window.speciesData || !window.speciesData.auchenorrhyncha) {
        console.error('Données des espèces non disponibles');
        return;
    }
    
    // Noms français des familles
    const familyNames = {
        'cicadellidae': 'Cicadellidae',
        'flatidae': 'Flatidae'
    };
    
    // Ordre des familles pour l'affichage
    const familyOrder = ['cicadellidae', 'flatidae'];
    
    familyOrder.forEach(familyKey => {
        if (window.speciesData.auchenorrhyncha[familyKey] && window.speciesData.auchenorrhyncha[familyKey].length > 0) {
            const familySection = createFamilySection(familyKey, familyNames[familyKey], window.speciesData.auchenorrhyncha[familyKey]);
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
    commonName.textContent = species.commonName || 'Nom commun non spécifié';

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
    for (const family in window.speciesData.auchenorrhyncha) {
        const species = window.speciesData.auchenorrhyncha[family].find(s => s.id === id);
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

// Initialiser l'animation au scroll après le chargement
setTimeout(() => {
    animateCards();
}, 500);

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    const tooltip = document.getElementById('species-tooltip');
    hideTooltip(tooltip);
});


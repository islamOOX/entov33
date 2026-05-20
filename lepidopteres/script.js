// Variables globales
let scene, camera, renderer, controls;
let model;

// Données des espèces
const speciesData = {
    'calliptamus-wattenwylianus': {
        name: 'Calliptamus wattenwylianus',
        family: 'Acrididae',
        subfamily: 'Catantopinae',
        description: 'Espèce d\'orthoptère de la famille des Acrididae, caractérisée par sa coloration brunâtre et ses motifs distinctifs.',
        characteristics: [
            'Taille moyenne à grande',
            'Coloration brunâtre avec motifs variables',
            'Présence de carènes latérales',
            'Habitat: zones sèches et rocailleuses'
        ]
    },
    'calliptamus-barbarus': {
        name: 'Calliptamus barbarus',
        family: 'Acrididae',
        subfamily: 'Catantopinae',
        description: 'Criquet barbare, espèce méditerranéenne reconnaissable à ses ailes postérieures colorées.',
        characteristics: [
            'Ailes postérieures rouges à la base',
            'Pronotum avec carènes bien marquées',
            'Taille: 15-30mm',
            'Habitat: garrigues et maquis méditerranéens'
        ]
    },
    'oedaleus-decorus': {
        name: 'Oedaleus decorus',
        family: 'Acrididae',
        subfamily: 'Oedipodinae',
        description: 'Oedipode soufrée, caractérisée par ses ailes postérieures jaunes et ses motifs en croix.',
        characteristics: [
            'Ailes postérieures jaune soufre',
            'Motifs en croix sur le pronotum',
            'Taille: 20-35mm',
            'Habitat: pelouses sèches et friches'
        ]
    },
    'oedaleus-senegalensis': {
        name: 'Oedaleus senegalensis',
        family: 'Acrididae',
        subfamily: 'Oedipodinae',
        description: 'Criquet sénégalais, espèce migratrice aux ailes postérieures jaunes.',
        characteristics: [
            'Espèce migratrice',
            'Ailes postérieures jaunes avec bande noire',
            'Taille: 25-45mm',
            'Habitat: zones arides et semi-arides'
        ]
    },
    'locusta-migratoria': {
        name: 'Locusta migratoria',
        family: 'Acrididae',
        subfamily: 'Cyrtacanthacridinae',
        description: 'Criquet migrateur, espèce emblématique connue pour ses phases solitaire et grégaire.',
        characteristics: [
            'Carène médiane interrompue par le sillon typique',
            'Ailes postérieures légèrement teintées de jaune',
            'Pronotum avec deux raies noires longitudinales',
            'Couleur généralement vert vif',
            'Tibias postérieurs rouges',
            'Tegmina: >45mm (mâle), >52mm (femelle)',
            'Habitat: milieux sablonneux et humides'
        ]
    },
    'dociostaurus-marrocanus': {
        name: 'Dociostaurus marrocanus',
        family: 'Acrididae',
        subfamily: 'Gomphocerinae',
        description: 'Criquet marocain, espèce de petite à moyenne taille avec une tête sub-conique caractéristique.',
        characteristics: [
            'Taille: 17-33mm',
            'Tête subconique, fastigium pentagonal',
            'Métazone 1.5 fois plus longue que la prozone',
            'Croix jaunâtre claire soulignée par des taches noires',
            'Carènes latérales jaunes',
            'Trois taches noires losangiques sur les fémurs postérieurs',
            'Tibias postérieurs rougeâtres ou jaunâtres'
        ]
    },
    'dociostaurus-jogei': {
        name: 'Dociostaurus jogei',
        family: 'Acrididae',
        subfamily: 'Gomphocerinae',
        description: 'Espèce du genre Dociostaurus, caractérisée par sa couleur brun clair et son dessin en croix.',
        characteristics: [
            'Couleur générale brun clair',
            'Dessin typique en croix bien marquée',
            'Tegmina atteignent l\'extrémité des fémurs postérieurs',
            'Trois taches noires losangiques sur les fémurs postérieurs',
            'Tibias postérieurs pâles ou bleuâtres',
            'Tache noire proximale à la face interne des tibias'
        ]
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialiser le modèle 3D
    init3DModel();
    
    // Initialiser les interactions
    initializeInteractions();
    
    // Initialiser la navigation fluide
    initializeSmoothScrolling();
    
    // Initialiser les animations au scroll
    initializeScrollAnimations();
}

// Initialisation du modèle 3D
function init3DModel() {
    const container = document.getElementById('model-viewer');
    if (!container) return;
    
    // Créer la scène
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    
    // Créer la caméra
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    // Créer le renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Ajouter les contrôles
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    
    // Ajouter l'éclairage
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x7fb069, 0.5);
    pointLight.position.set(-10, -10, -5);
    scene.add(pointLight);
    
    // Charger le modèle 3D
    loadModel();
    
    // Démarrer l'animation
    animate();
    
    // Gérer le redimensionnement
    window.addEventListener('resize', onWindowResize, false);
}

function loadModel() {
    console.log('Chargement du modèle 3D...');
    
    // Créer un loader FBX
    const loader = new THREE.FBXLoader();
    
    // Charger le modèle FBX
    loader.load('models/Untitled.fbx', function(object) {
        console.log('Modèle FBX chargé avec succès');
        
        // Calculer la boîte englobante pour centrer le modèle
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Centrer le modèle
        object.position.sub(center);
        
        // Ajuster la taille du modèle
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        object.scale.setScalar(scale);
        
        // Ajouter le modèle à la scène
        scene.add(object);
        model = object;
        
        // Charger la texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('models/Autumn_Wings_0716140528_texture.png', function(texture) {
            console.log('Texture chargée avec succès');
            
            // Appliquer la texture au modèle
            object.traverse(function(child) {
                if (child.isMesh) {
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                }
            });
        }, undefined, function(error) {
            console.warn('Erreur lors du chargement de la texture:', error);
        });
        
        // Masquer le message d'erreur
        document.getElementById('model-error').style.display = 'none';
        
    }, function(progress) {
        console.log('Progression du chargement:', (progress.loaded / progress.total * 100) + '%');
    }, function(error) {
        console.error('Erreur lors du chargement du modèle FBX:', error);
        
        // Fallback vers le modèle OBJ
        loadOBJModel();
    });
}

function loadOBJModel() {
    console.log('Chargement du modèle OBJ de fallback...');
    
    const loader = new CustomOBJLoader();
    
    // Essayer de charger le modèle fourni
    loader.load('models/Untitled.obj', 'models/Untitled.mtl')
        .then(loadedModel => {
            if (loadedModel) {
                model = loadedModel;
                
                // Calculer la boîte englobante pour ajuster la taille
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim; // Ajuster pour que le modèle fasse environ 2 unités
                
                model.scale.set(scale, scale, scale);
                
                // Centrer le modèle
                const center = box.getCenter(new THREE.Vector3());
                model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
                
                model.castShadow = true;
                model.receiveShadow = true;
                
                // Améliorer le matériau
                model.traverse(function(child) {
                    if (child.isMesh) {
                        child.material = new THREE.MeshPhongMaterial({
                            color: 0x4a7c59,
                            shininess: 100,
                            side: THREE.DoubleSide
                        });
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                
                scene.add(model);
                console.log('Modèle 3D ajouté à la scène');
                
                // Masquer le message d'erreur
                document.getElementById('model-error').style.display = 'none';
            }
        })
        .catch(error => {
            console.warn('Utilisation du modèle de secours:', error);
            // Utiliser le modèle de secours
            model = loader.createFallbackModel();
            scene.add(model);
        });
}
function animate() {
    requestAnimationFrame(animate);
    
    if (controls) {
        controls.update();
    }
    
    if (model) {
        // Animation subtile du modèle
        model.rotation.y += 0.005;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

function onWindowResize() {
    const container = document.getElementById('model-viewer');
    if (!container || !camera || !renderer) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Initialiser les interactions
function initializeInteractions() {
    // Créer un tooltip pour afficher les détails au survol
    const tooltip = document.createElement('div');
    tooltip.id = 'species-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-size: 14px;
        max-width: 300px;
        z-index: 1000;
        display: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    document.body.appendChild(tooltip);
    
    // Ajouter les événements de survol pour chaque carte d'espèce
    document.querySelectorAll('.species-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const speciesId = this.dataset.species;
            const species = speciesDetails[speciesId];
            
            if (species) {
                showSpeciesDetails(species, e);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            hideSpeciesDetails();
        });
        
        card.addEventListener('mousemove', function(e) {
            updateTooltipPosition(e);
        });
    });
}

function showSpeciesDetails(species, event) {
    const tooltip = document.getElementById('species-tooltip');
    
    let detailsHTML = `
        <h3 style="margin: 0 0 10px 0; color: #4CAF50;">${species.title}</h3>
        <p style="margin: 0 0 5px 0;"><strong>Nom commun:</strong> ${species.commonName}</p>
        <p style="margin: 0 0 5px 0;"><strong>Famille:</strong> ${species.family}</p>
        <p style="margin: 0 0 10px 0;"><strong>Sous-ordre:</strong> ${species.suborder}</p>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.2); padding-top: 10px;">
    `;
    
    species.details.forEach(detail => {
        detailsHTML += `<p style="margin: 0 0 5px 0; font-size: 13px;">• ${detail}</p>`;
    });
    
    detailsHTML += '</div>';
    
    tooltip.innerHTML = detailsHTML;
    tooltip.style.display = 'block';
    updateTooltipPosition(event);
}

function hideSpeciesDetails() {
    const tooltip = document.getElementById('species-tooltip');
    tooltip.style.display = 'none';
}

function updateTooltipPosition(event) {
    const tooltip = document.getElementById('species-tooltip');
    const x = event.pageX + 15;
    const y = event.pageY + 15;
    
    // Ajuster la position pour éviter que le tooltip sorte de l'écran
    const tooltipRect = tooltip.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let finalX = x;
    let finalY = y;
    
    if (x + tooltipRect.width > windowWidth) {
        finalX = event.pageX - tooltipRect.width - 15;
    }
    
    if (y + tooltipRect.height > windowHeight) {
        finalY = event.pageY - tooltipRect.height - 15;
    }
    
    tooltip.style.left = finalX + 'px';
    tooltip.style.top = finalY + 'px';
}

function showSpeciesModal(species) {
    const modal = document.getElementById('species-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2>${species.name}</h2>
        <p><strong>Famille:</strong> ${species.family}</p>
        <p><strong>Sous-famille:</strong> ${species.subfamily}</p>
        <p class="description">${species.description}</p>
        <h3>Caractéristiques principales:</h3>
        <ul class="modal-characteristics">
            ${species.characteristics.map(char => `<li>${char}</li>`).join('')}
        </ul>
    `;
    
    modal.style.display = 'block';
}

// Navigation fluide
function initializeSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations au scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les cartes de classification
    document.querySelectorAll('.classification-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observer les cartes d'espèces
    document.querySelectorAll('.species-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observer les sections de genre
    document.querySelectorAll('.genus-section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(section);
    });
}

// Gestion des erreurs pour le modèle 3D
window.addEventListener('error', function(e) {
    if (e.message.includes('THREE') || e.message.includes('WebGL')) {
        console.warn('Erreur 3D détectée, utilisation du mode de secours');
        const container = document.getElementById('model-viewer');
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center;">
                    <div>
                        <p>Modèle 3D non disponible</p>
                        <p style="font-size: 0.8em; opacity: 0.7;">Votre navigateur ne supporte pas WebGL</p>
                    </div>
                </div>
            `;
        }
    }
});

// Styles CSS additionnels pour le modal
const additionalStyles = `
    .modal-characteristics {
        list-style: none;
        padding-left: 0;
        margin-top: 1rem;
    }
    
    .modal-characteristics li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        border-bottom: 1px solid #eee;
    }
    
    .modal-characteristics li::before {
        content: '✓';
        color: var(--accent-color);
        font-weight: bold;
        position: absolute;
        left: 0;
    }
    
    .description {
        font-style: italic;
        color: var(--text-light);
        margin: 1rem 0;
        padding: 1rem;
        background: var(--background-color);
        border-radius: 8px;
    }
`;

// Ajouter les styles au document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);



const speciesDetails = {
    "cossus-cossus": {
        title: "Cossus cossus (Linnaeus, 1758)",
        commonName: "Cossus gâte-bois",
        family: "Cossidae",
        suborder: "Glossata",
        details: [
            "Envergure : 70 à 80 mm",
            "Couleur: grisâtre",
            "Arbres fruitiers et forestiers",
            "Corps massif et recouvert de poils",
            "Les ailes antérieures ont un aspect chagriné avec de nombreuses lignes sinueuses brunes, grises",
            "Les ailes postérieures, trapues, sont pileuses sur leur partie basale."
        ]
    }
};


,
    "zeuzera-pyrina": {
        title: "Zeuzera pyrina (Linnaeus, 1761)",
        commonName: "Zeuzère du poirier",
        family: "Cossidae",
        suborder: "Glossata",
        details: [
            "Arbres fruitiers, Olivier",
            "Envergure: 50 à 60 mm pour la femelle, 35 à 40 mm pour le mâle.",
            "Couleur: blanche de base",
            "Le thorax est blanc velu avec 6 taches bleues",
            "L'abdomen est relativement long",
            "Les ailes antérieurs sont blanches parsemées de petites taches d'un bleu métallique",
            "Les ailes postérieures avec des taches plus diffuses."
        ]
    }


,
    "prays-oleae": {
        title: "Prays oleae (Bernard, 1788)",
        commonName: "Teigne de l'olivier",
        family: "Praydidae",
        suborder: "Glossata",
        details: [
            "Envergure: 14 mm environ",
            "Couleur: grise argentée",
            "Longueur adulte au repos 6 à 7 mm.",
            "Olivier",
            "Les ailes antérieures sont grises à reflets argentés, parsemées de petites taches noires et 2 grosses en leur milieu",
            "Les ailes postérieures, uniformément grises, sont bordées d'une frange de petites soies.",
            "Les tibias 3 à 2 paires d'épine: 1 au milieu et 1 à l'apex",
            "Le corps et les pattes sont recouverts d'écailles grises à reflets argentés."
        ]
    }


,
    "prays-citri": {
        title: "Prays citri Millière, 1873",
        commonName: "Teigne du citronnier",
        family: "Praydidae",
        suborder: "Glossata",
        details: [
            "Envergure: 10 à 12 mm",
            "Citrus",
            "Couleur: gris terne.",
            "Les antennes sont relativement courtes",
            "Les ailes fortement frangées",
            "Les ailes antérieures sont gris brunâtre chagriné, plus sombres sur le bord inférieur et à l'apex",
            "Les ailes postérieures sont très étroites, gris brun uniforme et enfumées vers l'extrémité."
        ]
    }


,
    "yponomeuta-malinella": {
        title: "Yponomeuta malinella (Zeller, 1838)",
        commonName: "Hyponomeute du pommier",
        family: "Yponomeutidae",
        suborder: "Glossata",
        details: [
            "Envergure : 16 à 20 mm",
            "Couleur: blanc pur.",
            "Les ailes antérieures sont piquetées de points noirs",
            "Les ailes postérieures sont grisâtres et frangées.",
            "Pommier"
        ]
    }


,
    "phthorimaea-operculella": {
        title: "Phthorimaea operculella (Zeller, 1873)",
        commonName: "Teigne de la pomme de terre",
        family: "Gelechiidae",
        suborder: "Glossata",
        details: [
            "Envergure : 10 à 12 mm",
            "Couleur: grise de base",
            "Abdomen gris",
            "Solanacées (Pomme de terre)",
            "Antennes presque aussi longues que le corps",
            "Ailes très étroites, les antérieures gris jaunâtre parsemées de petites taches noires; et 2 taches noirâtres allongées au bord postérieur de leur base, apex enfumé",
            "Les ailes postérieures grises portent de longues soies",
            "Pattes postérieures jaunâtres en leurs parties distales."
        ]
    }


,
    "scrobipalpa-ocellatella": {
        title: "Scrobipalpa ocellatella Boyd, 1858",
        commonName: "Teigne de la betterave",
        family: "Gelechiidae",
        suborder: "Glossata",
        details: [
            "Envergure : 10 à 12 mm",
            "Couleur: grise de base",
            "Betterave à sucre",
            "Les ailes antérieures sont étroites, gris jaunâtre, parsemées de petites taches sombres brillants avec une bande claire irrégulière sur le bord inférieur",
            "Les ailes postérieures sont gris clair.",
            "Les ailes sont bordées de longues soies."
        ]
    }


,
    "pectinophora-gossypiella": {
        title: "Pectinophora gossypiella Saunders, 1844",
        commonName: "Ver rose du cotonnier",
        family: "Gelechiidae",
        suborder: "Glossata",
        details: [
            "Envergure : 12 à 20 mm",
            "Couleur: gris brunâtre à reflets brillants",
            "La tête est de couleur brun rougeâtre avec des écailles pâles et irisées",
            "Cotonnier",
            "Les antennes sont brunes et le segment basal porte un peigne de cinq ou six longues écailles raides en forme de poils",
            "Les ailes antérieures sont ovalaires allongées, frangées parsemées de taches transversales; présence de 2 taches médianes visibles",
            "Les ailes postérieures sont gris argentées, enfumées sur leur moitié distale, en forme d'un trapèze irrégulier, apex en pointe sub-arrondie",
            "Les palpes labiaux sont longs et recourbés vers le haut: le deuxième segment porte une brosse poilue légèrement sillonnée sur la face inférieure qui devient lisse distalement et le segment terminal est plus court que le second."
        ]
    }


,
    "anarsia-lineatella": {
        title: "Anarsia lineatella Zeller, 1839",
        commonName: "Petite mineuse du pêcher",
        family: "Gelechiidae",
        suborder: "Glossata",
        details: [
            "Envergure: 14 à 16 mm.",
            "Couleur: grise de base",
            "Arbres fruitiers (Pêcher)",
            "Les ailes sont très étroites: celles antérieures sont grises noires ou brunes et présentent des rayures longitudinales noires et une grande tache brune au milieu du bord antérieur",
            "Les ailes postérieures sont plus larges, grises et frangées, éclaircis dans la zone anale",
            "La tête porte 2 palpes labiaux gris et épais dirigés vers l'avant."
        ]
    }


,
    "tuta-absoluta": {
        title: "Tuta absoluta (Meyrick, 1917)",
        commonName: "Mineuse de la tomate",
        family: "Gelechiidae",
        suborder: "Glossata",
        details: [
            "Envergure: 10 mm",
            "Couleur: Gris argenté",
            "L'adulte de 6-7mm de longueur est gris argenté",
            "Cultures maraîchères (Tomate)",
            "L'adulte présente des taches noires sur les ailes antérieures",
            "Les antennes sont filiformes."
        ]
    }


,
    "cydia-pomonella": {
        title: "Cydia pomonella (Linnaeus 1758)",
        commonName: "Carpocapse des pommes",
        family: "Tortricidae",
        suborder: "Glossata",
        details: [
            "Envergure : 16 à 19 mm",
            "Pommes, poires, prunes, etc.",
            "Couleur: gris-brun",
            "Il y a une tache ovale caractéristique très apparente, brune, bordée de 2 lignes d'un brun doré brillant, à reflets mordorés, sur les ailes antérieures grises",
            "Les ailes postérieures sont brun rougeâtre, finement ciliées",
            "La tête porte deux antennes filiformes étalées."
        ]
    }


,
    "grapholita-molesta": {
        title: "Grapholita molesta Busck, 1916",
        commonName: "Tordeuse orientale du pêcher",
        family: "Tortricidae",
        suborder: "Glossata",
        details: [
            "Synonyme: Cydia molesta (Busck)",
            "Envergure : 10 à 16 mm d'envergure",
            "Couleur: Brun-gris-noir",
            "Arbres fruitiers (Amygdalées, pommacées)",
            "Les ailes antérieures brun-noir rayées de blanc",
            "Les ailes postérieures étant d'un gris foncé uni. Les pattes et le ventre sont argentés",
            "Les ailes sont maintenues dans une position semblable à un toit sur le corps",
            "Les antennes sont repliées vers l'arrière sur les ailes",
            "Pour une identification exacte, une investigation des organes génitaux est nécessaire."
        ]
    }


,
    "cydia-nigricana": {
        title: "Cydia nigricana (Fabricius, 1794)",
        commonName: "Tordeuse du pois",
        family: "Tortricidae",
        suborder: "Glossata",
        details: [
            "Envergure: 15 mm",
            "Couleur: brun -olive",
            "Antennes longues",
            "Les ailes antérieures de couleur brun olive plus ou moins foncé avec des reflets jaune ocre présentent sur leur bord des taches blanches et jaunes en forme de chevrons."
        ]
    }
};


,
    "lobesia-botrana": {
        title: "Lobesia botrana (Denis & Schiffermüller, 1775)",
        commonName: "Eudémis de la vigne",
        family: "Tortricidae",
        suborder: "Glossata",
        details: [
            "Envergure : 10 à 13 mm",
            "Couleur: complexe",
            "Vigne",
            "Les ailes antérieures sont gris perle parsemées de petites zones brun rougeâtre disposant de 3 bandes légèrement obliques: une à la base, une au centre de l'aile élargie dans son milieu et une apicale assez sombre bordée d'une zone plus claire",
            "Les ailes postérieures grisâtres, frangées",
            "Les tibias sont clairs munis de longues épines",
            "Les mâles et les femelles ont la même couleur et des tailles très voisines",
            "L'extrémité ventrale de la femelle à la forme d'une gouttière par laquelle sort l'organe de ponte: l'ovipositeur",
            "Les femelles présentent une pigmentation ventrale brune, l'abdomen étant plus clair chez le mâle"
        ]
    }


,
    "ectomyelois-ceratoniae": {
        title: "Ectomyelois ceratoniae (Zeller, 1839)",
        commonName: "Pyrale des dattes",
        family: "Pyralidae",
        suborder: "Glossata",
        details: [
            "Envergure: 16 à 22mm",
            "Couleur: grise de base",
            "Caroubes, Dattes, Grenadier, fruits mûres divers",
            "Les ailes antérieures sont relativement étroites et grises avec des dessins plus ou moins bien marqués",
            "Les ailes postérieures sont plus claires bordées d'une frange soyeuse blanchâtre"
        ]
    }


,
    "agrotis-segetum": {
        title: "Agrotis segetum (Denis & Schiffermüller, 1775)",
        commonName: "Noctuelle des moissons",
        family: "Noctuidae",
        suborder: "Glossata",
        details: [
            "Envergure: 3,8 à 4,3 cm",
            "Couleur: grise de base",
            "Polyphage (Maraîchage)",
            "Les ailes antérieures gris brun portant des dessins plus clairs (taches réniformes ou orbiculaires) bordés de noir (cercle noir)",
            "Les ailes postérieures sont blanches chez le mâle, grises chez la femelle",
            "Les femelles sont généralement très sombres, sans dessins apparents"
        ]
    }


,
    "agrotis-ipsilon": {
        title: "Agrotis ipsilon (Hufnagel, 1766)",
        commonName: "Noctuelle baignée",
        family: "Noctuidae",
        suborder: "Glossata",
        details: [
            "Envergure: 4,3 à 5cm",
            "Couleur: marron-beige",
            "Polyphage (Maraîchage)",
            "L'adulte est marron et beige avec des ailes antérieures marron marquées d'une zone claire et une tache claire (tache réniforme) par aile prolongée d'un triangle noir",
            "Les ailes postérieures sont beiges très pâles, angle supérieur enfumé et à nervures brunes",
            "Les antennes du mâle sont pectinées sur leur demi-longueur",
            "Les pattes sont plus foncées"
        ]
    }


,
    "spodoptera-exigua": {
        title: "Spodoptera exigua (Hübner, 1808)",
        commonName: "Légionnaire de la betterave",
        family: "Noctuidae",
        suborder: "Glossata",
        details: [
            "Envergure : 7 à 30 mm",
            "Couleur: grise de base",
            "Polyphage (Maraichage)",
            "Le corps est long d'approximativement 15 mm",
            "Les ailes antérieures gris brun envahi de marron foncé ou noir éclatant et d'un dessin jaunâtre, réniforme orbiculaire bien dessinée",
            "Les ailes postérieures, blanches, ont une nervation clairement visible, soulignée de marron",
            "La tête et le thorax sont marron et l'abdomen gris-marron",
            "Les antennes de mâles ciliées",
            "Front sans relief médian"
        ]
    }


,
    "spodoptera-littoralis": {
        title: "Spodoptera littoralis (Boisduval, 1833)",
        commonName: "Ver du cotonnier",
        family: "Noctuidae",
        suborder: "Glossata",
        details: [
            "Envergure: 3 à 4 cm",
            "Couleur : brun-noirâtre",
            "Le corps a une longueur de 1,5 à 2 cm",
            "Polyphage",
            "Les ailes antérieures sont brun-noir et portent des motifs caractéristiques de couleur claire",
            "Les ailes postérieures sont blanc-gris avec des bordures grises et présentant des reflets violacées"
        ]
    }
};


// Script principal pour la page d'accueil des Hémiptères

document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();

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

// Navigation vers les sous-ordres
function navigateToSuborder(suborder) {
    const pages = {
        'heteroptera': 'heteroptera.html',
        'auchenorrhyncha': 'auchenorrhyncha.html',
        'sternorrhyncha': 'sternorrhyncha.html'
    };
    
    if (pages[suborder]) {
        // Animation de transition
        document.body.style.opacity = '0.8';
        document.body.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            window.location.href = pages[suborder];
        }, 300);
    }
}

// Animation d'apparition progressive des cartes
function animateCards() {
    const cards = document.querySelectorAll('.suborder-card, .info-card');
    
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

// Initialiser les animations au chargement
setTimeout(animateCards, 500);

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    // Redimensionner les particules si nécessaire
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        if (Math.random() > 0.8) {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
        }
    });
});

// Effet de parallaxe léger au scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.getElementById('particles');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Gestion des interactions tactiles pour mobile
document.addEventListener('touchstart', function() {
    // Améliorer les performances sur mobile
    document.body.style.webkitUserSelect = 'none';
    document.body.style.webkitTouchCallout = 'none';
});

// Préchargement des pages de sous-ordres
function preloadSuborderPages() {
    const pages = ['heteroptera.html', 'auchenorrhyncha.html', 'sternorrhyncha.html'];
    
    pages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}

// Précharger après le chargement initial
setTimeout(preloadSuborderPages, 2000);


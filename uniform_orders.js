// Script pour uniformiser le design et les modals sur toutes les pages d'ordres
document.addEventListener('DOMContentLoaded', function() {
    // 1. Appliquer le style CSS commun
    if (!document.querySelector('link[href="../style_orders_uniform.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../style_orders_uniform.css';
        document.head.appendChild(link);
    }

    // 2. S'assurer que le conteneur de modal existe
    if (!document.getElementById('species-modal')) {
        const modalHtml = `
            <div id="species-modal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div id="modal-body"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Gérer la fermeture
        document.querySelector('.close-modal').onclick = () => {
            document.getElementById('species-modal').style.display = "none";
        };
    }
});

// Fonction universelle pour ouvrir une modal d'espèce
function openUniformModal(species) {
    const modal = document.getElementById('species-modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="modal-header">
            <h2>${species.scientificName} <small>${species.author}</small></h2>
            <p class="common-name">${species.commonName || ''}</p>
        </div>
        <div class="modal-grid">
            <div class="modal-image">
                <img src="${species.image}" alt="${species.scientificName}">
            </div>
            <div class="modal-info">
                <div class="info-item"><strong>Famille:</strong> ${species.family}</div>
                <div class="info-item"><strong>Taille:</strong> ${species.size}</div>
                <div class="info-item"><strong>Couleur:</strong> ${species.color}</div>
                <div class="info-item"><strong>Hôte:</strong> ${species.host}</div>
                <div class="info-description">
                    <h3>Description</h3>
                    <p>${species.description}</p>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = "block";
}

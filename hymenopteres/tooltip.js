// Gestion des tooltips pour les espèces
class SpeciesTooltip {
    constructor() {
        this.tooltip = null;
        this.init();
    }

    init() {
        // Créer l'élément tooltip s'il n'existe pas
        this.tooltip = document.getElementById('species-tooltip');
        if (!this.tooltip) {
            this.tooltip = document.createElement('div');
            this.tooltip.id = 'species-tooltip';
            this.tooltip.className = 'species-tooltip';
            this.tooltip.innerHTML = `
                <div class="tooltip-content">
                    <h3 class="tooltip-title"></h3>
                    <div class="tooltip-details"></div>
                </div>
            `;
            document.body.appendChild(this.tooltip);
        }

        this.bindEvents();
    }

    bindEvents() {
        // Attacher les événements aux cartes d'espèces
        document.addEventListener('DOMContentLoaded', () => {
            const speciesCards = document.querySelectorAll('.species-card');
            
            speciesCards.forEach(card => {
                card.addEventListener('mouseenter', (e) => this.showTooltip(e));
                card.addEventListener('mouseleave', () => this.hideTooltip());
                card.addEventListener('mousemove', (e) => this.updatePosition(e));
                card.addEventListener('click', (e) => this.showModal(e));
            });
        });
    }

    showTooltip(event) {
        const card = event.currentTarget;
        const speciesId = card.getAttribute('data-species');
        const species = speciesData[speciesId];

        if (!species) return;

        const title = this.tooltip.querySelector('.tooltip-title');
        const details = this.tooltip.querySelector('.tooltip-details');

        title.textContent = `${species.name} ${species.author}`;
        
        details.innerHTML = `
            <p><strong>Taille:</strong> ${species.taille}</p>
            <p><strong>Couleur:</strong> ${species.couleur}</p>
            <p><strong>Hôte:</strong> ${species.hote}</p>
            <div class="details-list">
                ${species.details.slice(0, 3).map(detail => `<p>• ${detail}</p>`).join('')}
                ${species.details.length > 3 ? '<p><em>Cliquez pour voir plus de détails...</em></p>' : ''}
            </div>
        `;

        this.tooltip.style.display = 'block';
        this.updatePosition(event);
    }

    hideTooltip() {
        this.tooltip.style.display = 'none';
    }

    updatePosition(event) {
        if (this.tooltip.style.display === 'none') return;

        const tooltipRect = this.tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let x = event.clientX + 15;
        let y = event.clientY + 15;

        // Ajuster la position si le tooltip dépasse de la fenêtre
        if (x + tooltipRect.width > viewportWidth) {
            x = event.clientX - tooltipRect.width - 15;
        }

        if (y + tooltipRect.height > viewportHeight) {
            y = event.clientY - tooltipRect.height - 15;
        }

        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
    }

    showModal(event) {
        const card = event.currentTarget;
        const speciesId = card.getAttribute('data-species');
        const species = speciesData[speciesId];

        if (!species) return;

        const modal = document.getElementById('species-modal');
        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = `
            <h2 class="modal-species-title">
                ${species.name} ${species.author}
            </h2>
            
            <div class="modal-info-grid">
                <div class="modal-info-item">
                    <span class="modal-info-label">Taille</span>
                    <span class="modal-info-value">${species.taille}</span>
                </div>
                <div class="modal-info-item">
                    <span class="modal-info-label">Couleur</span>
                    <span class="modal-info-value">${species.couleur}</span>
                </div>
                <div class="modal-info-item" style="grid-column: 1 / -1;">
                    <span class="modal-info-label">Hôte</span>
                    <span class="modal-info-value">${species.hote}</span>
                </div>
            </div>
            
            <div class="modal-characteristics">
                <h3>Caractéristiques morphologiques</h3>
                <ul class="characteristics-list">
                    ${species.details.map(detail => `
                        <li>${detail}</li>
                    `).join('')}
                </ul>
            </div>
        `;

        modal.style.display = 'block';

        // Fermer le modal
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => modal.style.display = 'none';

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
}

// Initialiser les tooltips
const tooltip = new SpeciesTooltip();


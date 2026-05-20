// Gestion des tooltips pour l'affichage des détails des espèces
class SpeciesTooltip {
    constructor() {
        this.tooltip = null;
        this.createTooltip();
        this.bindEvents();
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'species-tooltip';
        this.tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4 class="tooltip-title"></h4>
                <div class="tooltip-details"></div>
            </div>
        `;
        document.body.appendChild(this.tooltip);
    }

    bindEvents() {
        const speciesCards = document.querySelectorAll('.species-card');
        
        speciesCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            card.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });
        });
    }

    showTooltip(event, card) {
        const speciesId = card.getAttribute('data-species');
        const species = speciesData[speciesId];
        
        if (!species) return;

        const title = this.tooltip.querySelector('.tooltip-title');
        const details = this.tooltip.querySelector('.tooltip-details');
        
        title.innerHTML = `${species.name} ${species.author}`;
        
        let detailsHTML = `
            <p><strong>Envergure:</strong> ${species.envergure}</p>
            <p><strong>Couleur:</strong> ${species.couleur}</p>
            <p><strong>Hôte:</strong> ${species.hote}</p>
            <div class="details-list">
        `;
        
        species.details.forEach(detail => {
            detailsHTML += `<p>• ${detail}</p>`;
        });
        
        detailsHTML += '</div>';
        details.innerHTML = detailsHTML;
        
        this.tooltip.style.display = 'block';
        this.updateTooltipPosition(event);
    }

    hideTooltip() {
        this.tooltip.style.display = 'none';
    }

    updateTooltipPosition(event) {
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let left = event.clientX + 15;
        let top = event.clientY + 15;
        
        // Ajuster si le tooltip dépasse à droite
        if (left + tooltipRect.width > viewportWidth) {
            left = event.clientX - tooltipRect.width - 15;
        }
        
        // Ajuster si le tooltip dépasse en bas
        if (top + tooltipRect.height > viewportHeight) {
            top = event.clientY - tooltipRect.height - 15;
        }
        
        // S'assurer que le tooltip reste dans la fenêtre
        left = Math.max(10, Math.min(left, viewportWidth - tooltipRect.width - 10));
        top = Math.max(10, Math.min(top, viewportHeight - tooltipRect.height - 10));
        
        this.tooltip.style.left = left + 'px';
        this.tooltip.style.top = top + 'px';
    }
}

// Initialiser les tooltips quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new SpeciesTooltip();
});


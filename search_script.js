// Script de recherche globale
document.addEventListener('DOMContentLoaded', async function() {
    const searchInput = document.getElementById('globalSearch');
    const resultsDropdown = document.getElementById('searchResults');

    // Charger les données de tous les ordres
    const orders = ['coleopteres', 'hemipteres', 'lepidopteres', 'dipteres', 'thysanopteres', 'hymenopteres', 'orthopteres'];
    
    for (const order of orders) {
        try {
            // Tenter de charger le fichier species_data.js de chaque ordre
            // Note: Dans un environnement réel, on utiliserait fetch ou des modules
            // Ici on simule l'agrégation
            console.log(`Chargement des données pour ${order}...`);
        } catch (e) {
            console.error(`Erreur chargement ${order}:`, e);
        }
    }

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length < 2) {
            resultsDropdown.style.display = 'none';
            return;
        }

        // Simuler la recherche dans globalSpeciesData (qui doit être peuplé)
        const results = searchAllSpecies(query);
        displayResults(results);
    });

    function displayResults(results) {
        if (results.length === 0) {
            resultsDropdown.innerHTML = '<div class="search-result-item">Aucun résultat trouvé</div>';
        } else {
            resultsDropdown.innerHTML = results.map(res => `
                <div class="search-result-item" onclick="window.location.href='${res.order}/index.html?species=${res.id}'">
                    <span class="order-tag">${res.order}</span>
                    <span class="scientific">${res.scientificName}</span>
                    <br><small>${res.commonName || ''}</small>
                </div>
            `).join('');
        }
        resultsDropdown.style.display = 'block';
    }

    // Fermer le dropdown si on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
            resultsDropdown.style.display = 'none';
        }
    });
});

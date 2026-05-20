// Données globales de toutes les espèces pour la recherche et l'uniformisation
const globalSpeciesData = {
    coleopteres: [], // Sera rempli par fusion des fichiers species_data.js
    hemipteres: [],
    lepidopteres: [],
    dipteres: [],
    thysanopteres: [],
    hymenopteres: [],
    orthopteres: []
};

// Fonction pour centraliser la recherche
function searchAllSpecies(query) {
    const results = [];
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === "") return results;

    for (const order in globalSpeciesData) {
        globalSpeciesData[order].forEach(species => {
            const searchableText = `${species.scientificName} ${species.commonName} ${species.family} ${species.description}`.toLowerCase();
            if (searchableText.includes(searchTerm)) {
                results.push({ ...species, order: order });
            }
        });
    }
    return results;
}

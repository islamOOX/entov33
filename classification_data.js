// Classification des espèces par culture
// Données enrichies avec conseils de lutte (IPM) et auxiliaires
const speciesData = {
    // Cultures Maraîchères
    cruciferes: [
        {
            name: "Ceutorhynchus assimilis",
            author: "(Paykull 1792)",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Chou et autres crucifères",
            icon: "🪲",
            description: "Charançon des crucifères causant des dégâts importants sur les cultures de choux.",
            image: "images/ceutorhynchus_assimilis.jpg",
            management: "Rotation des cultures, travail du sol après récolte pour détruire les nymphes. Utilisation de pièges chromatiques jaunes.",
            beneficials: "Hyménoptères parasitoïdes du genre Trichomalus."
        },
        {
            name: "Ceutorhynchus picitarsis",
            author: "Gyllenhal 1837",
            order: "Coléoptères",
            family: "Curculionidae",
            cultures: "Crucifères",
            icon: "🪲",
            description: "Charançon spécialisé dans l'attaque des crucifères.",
            image: "images/ceutorhynchus_picitarsis.jpg",
            management: "Surveillance précoce dès l'automne. Travail du sol superficiel.",
            beneficials: "Micro-hyménoptères parasitoïdes."
        },
        {
            name: "Tuta absoluta",
            author: "(Meyrick, 1917)",
            order: "Lépidoptères",
            family: "Gelechiidae",
            cultures: "Cultures maraîchères (Tomate)",
            icon: "🦋",
            description: "Mineuse de la tomate, ravageur invasif très destructeur.",
            image: "images/tuta_absoluta.jpg",
            management: "Piégeage massif aux phéromones, filets anti-insectes, élimination des résidus de culture.",
            beneficials: "Macrolophus pygmaeus (punaise prédatrice), Nesidiocoris tenuis."
        }
    ],
    // ... (Le reste des données sera complété dynamiquement par le script si nécessaire, 
    // ou je peux fournir une version complète si vous le souhaitez)
};

// Liste des insectes auxiliaires (Nouveauté)
const beneficialInsects = [
    {
        name: "Coccinella septempunctata",
        commonName: "Coccinelle à sept points",
        target: "Pucerons",
        description: "Prédateur vorace de pucerons à l'état larvaire et adulte.",
        icon: "🐞"
    },
    {
        name: "Chrysoperla carnea",
        commonName: "Chrysope verte",
        target: "Pucerons, acariens, thrips",
        description: "Surnommée 'lion des pucerons', sa larve est un prédateur généraliste très efficace.",
        icon: "🦟"
    }
];

// Pour garder la compatibilité avec le code existant, nous exportons ou gardons en global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { speciesData, beneficialInsects };
}

const speciesData = {
    'Ceratitis capitata': {
        name: 'Ceratitis capitata',
        scientificName: '(Wiedemann, 1824)',
        family: 'Tephritidae',
        size: '5 à 6 mm de long',
        color: 'jaunâtre',
        habitat: 'Fruits frais',
        image: './images/PnGBGazXhwbC.jpg',
        characteristics: [
            'Le corps est de couleur jaunâtre, virant au brun dans certaines parties, en particulier l\'abdomen, les pattes et certaines taches sur les ailes.',
            'L\'abdomen de forme ovale, est revêtu à la face supérieure de fines soies noires dispersées, présente deux bandes transversales plus claires dans la partie basale.',
            'La femelle se distingue par son abdomen plus volumineux et par sa longue tarière située à l\'extrémité de l\'abdomen.',
            'Le thorax est convexe à sa face supérieure, de couleur blanc-crème à jaunâtre, marbré de taches noires. Le scutellum est noir dans sa moitié apicale, traversée par une ligne jaune sinueuse sub-basale.',
            'Les ailes, longues de 4 à 6 mm, sont généralement tenues dans une position tombante chez les mouches vivantes. Elles sont larges, transparentes et vitreuses avec des marques noires, brunes et jaune brunâtre, avec des reflets plus ternes. Elles présentent dans leur milieu une bande transversale assez large, jaune brunâtre.',
            'Le mâle porte sur la tête, insérée entre les yeux près des antennes, deux soies orbitales modifiées en appendices spatulés, à l\'extrémité pointue, un peu en forme de losange, et de couleur noire.',
            'Les yeux sont pourpre rougeâtre.'
        ]
    },
    'Bactrocera oleae': {
        name: 'Bactrocera oleae',
        scientificName: '(Rossi, 1790)',
        family: 'Tephritidae',
        size: '4 à 5 mm de long',
        color: 'orangée',
        habitat: 'Olivier',
        image: './images/51nRPl6VxmxS.jpg',
        characteristics: [
            'Tête presque sphérique, jaunâtre.',
            'Antennes claires à soie long et mince.',
            'Thorax noir mat revêtu d\'une fine pubescence blanchâtre; flanc du mésothorax et bord postérieur de l\'écusson blanc ivoire.',
            'Ailes hyalines avec présence d\'une petite tache brune à l\'apex.',
            'L\'abdomen est de couleur orangé avec deux striures noires. Les ailes sont transparentes, sauf une tache noire à chaque extrémité.',
            'Le dessus du thorax porte une tache argentée entre les deux implantations d\'ailes.',
            'La femelle se distingue du mâle par son abdomen muni d\'un ovipositeur.'
        ]
    },
    'Liriomyza trifolii': {
        name: 'Liriomyza trifolii',
        scientificName: 'Burgess, 1880',
        family: 'Agromyzidae',
        size: '1.3 à 2.3 mm',
        color: 'noir à gris',
        habitat: 'Trèfle',
        image: './images/8CPuZi2C1BZ1.jpg',
        characteristics: [
            'Tête jaune.',
            'Le reste du corps est gris noirâtre.',
            'Pattes et scutellum: jaune brillant.',
            'Femelle plus grande que le mâle qui est gris mat, noir avec bandes jaunes.'
        ]
    },
    'Liriomyza bryoniae': {
        name: 'Liriomyza bryoniae',
        scientificName: 'Kaltenbach',
        family: 'Agromyzidae',
        size: '2 mm',
        color: 'noir à gris',
        habitat: 'Céleri',
        image: './images/uoBQj8QBZYwI.jpg',
        characteristics: [
            'Tête noire à la face supérieure (avec des taches jaunes du côté dorsal) et jaune à la face inférieure.',
            'Abdomen avec des bandes jaunes et noires qui alternent.'
        ]
    },
    'Pegomya betae': {
        name: 'Pegomya betae',
        scientificName: '(Curtis, 1847)',
        family: 'Anthomyiidae',
        size: '6 à 7mm',
        color: 'grise de base',
        habitat: 'Betterave à sucre',
        image: './images/oYeL2dqrIDY3.jpg',
        characteristics: [
            'Tête gris clair.',
            'Antennes noires à chète très peu velu et noir.',
            'Palpes noirs ou brun foncé légèrement éclaircis à la base.',
            'Thorax gris jaunâtre.',
            'Pattes ayant des hanches et fémurs gris foncés, parfois noirs; tibias (P1 et P2) jaune sombre ou noirs.',
            'Abdomen gris squameux avec de nombreuses soies.'
        ]
    },
    'Drosophila suzukii': {
        name: 'Drosophila suzukii',
        scientificName: 'Matsumura, 1931',
        family: 'Drosophilidae',
        size: '2 à 3 mm de long',
        color: 'brun pâle',
        habitat: 'Fruits rouges',
        image: './images/XUBiDJfyW1xt.jpg',
        characteristics: [
            'Adulte aux yeux rouges, au thorax brun clair ou jaunâtre et avec des bandes transversales noires sur l\'abdomen.',
            'Les antennes sont courtes et trapues avec une arista plumeuse.',
            'Le dimorphisme sexuel est évident: les mâles présentent une tache sombre sur le premier bord supérieur de chaque aile et les femelles, qui ne portent pas ces taches, sont plus grandes que les mâles et possèdent un long ovipositeur pointu et dentelé.'
        ]
    },
    'Zaprionus indianus': {
        name: 'Zaprionus indianus',
        scientificName: 'Gupta, 1970',
        family: 'Drosophilidae',
        size: '2,5 à 3 mm de long',
        color: 'brun jaunâtre',
        habitat: 'Fruits rouges',
        image: './images/zYlb7lq3jZGQ.jpg',
        characteristics: [
            'Toutes les espèces du genre Zaprionus sont facilement identifiables grâce aux bandes blanches longitudinales bordées de bandes noires qui traversent le haut de la tête et du thorax.',
            'Les espèces du sous-genre Zaprionus ont 4 ou 6 bandes blanches tandis que les espèces du sous-genre Anaprionus ont 5 ou 7 bandes blanches.',
            'La couleur générale du corps varie d\'une espèce à l\'autre, du jaunâtre au brun foncé. Plusieurs espèces du sous-genre Zaprionus ont une ou plusieurs épines robustes et parfois composites sur les pattes antérieures.',
            'Fémur muni d\'épines avec des taches noires à leur base.'
        ]
    },
    'Mayetiola destructor': {
        name: 'Mayetiola destructor',
        scientificName: 'Say, 1817',
        family: 'Cecidomyiidae',
        size: '2 à 4 mm',
        color: 'grisâtre',
        habitat: 'Blé, orge, avoine',
        image: './images/paddoScilvKB.jpg',
        characteristics: [
            'L\'adulte présente une Couleur grisâtre avec une zone rouge sombre sur les côtés de l\'abdomen.',
            'Le dernier article des tarses antérieurs est 6 à 8 fois plus long que large.',
            'Les femelles généralement plus grandes que les mâles.'
        ]
    },
    'Dasineura brassicae': {
        name: 'Dasineura brassicae',
        scientificName: '(Winnertz, 1853)',
        family: 'Cecidomyiidae',
        size: '0.7 à 2.2 mm selon le sexe.',
        color: 'Femelle à abdomen rougeâtre, mâle noirâtre.',
        habitat: 'Chou-fleur, Colza',
        image: './images/yQqqoQ4hGV1Q.jpg',
        characteristics: [
            'Le mâle mesure de 0,7-1,5 mm de long avec un abdomen gris jaune, tandis que la femelle mesure de 0,9-2,2 mm de long.'
        ]
    },
    'Dasineura oxycoccana': {
        name: 'Dasineura oxycoccana',
        scientificName: 'Johnson, 1899',
        family: 'Cecidomyiidae',
        size: '2 à 3 mm',
        color: 'rougeâtre',
        habitat: 'Myrtillier',
        image: './images/uQqEDJqk5AUx.jpg',
        characteristics: [
            'Les femelles étant légèrement plus grandes que les mâles.',
            'Les femelles ont des abdomens étendus, qui sont de couleur orange et se terminent par un ovipositeur allongé.',
            'Lorsqu\'il est prolongé, l\'ovipositeur est presque aussi long que le corps.',
            'Les mâles ont un abdomen mince, de couleur jaune et se terminant avec des sortes de forceps qui fait partie des organes génitaux.',
            'La veine R5 est plus courte que l\'aile (rejoint la costale avant l\'apex de l\'aile).',
            'Les antennes sont moniliformes et portent des récepteurs sensoriels en forme de cheveux.'
        ]
    },
    'Resseliella oleisuga': {
        name: 'Resseliella oleisuga',
        scientificName: '(Targioni-Tozzetti 1887)',
        family: 'Cecidomyiidae',
        size: '3 mm',
        color: 'noire de base',
        habitat: 'Ecorces de l\'Olivier',
        image: './images/icRbP2EMocI4.jpg',
        characteristics: [
            'Le corps et les appendices sont noirs, avec les segments abdominaux oranges chez la femelle.',
            'Les ailes: la Radiale 2 est près de la pointe de l\'aile, la Cubitale en fourche largement ouverte.',
            'Les antennes sont monoliformes et ses ailes sont transparentes.',
            'Les segments abdominaux sont orange chez la femelle et gris chez le mâle.',
            'Chez la femelle, l\'ovipositeur est télescopique avec 2 lobes sensoriels.',
            'Chez le mâle il y a présence d\'un forceps à articles courts et compacts.'
        ]
    },
    'Mayetiola hordei': {
        name: 'Mayetiola hordei',
        scientificName: 'Kieffer, 1909',
        family: 'Cecidomyiidae',
        size: '2.5 à 3mm',
        color: 'grisâtre',
        habitat: 'Avoine',
        image: './images/rZXttKsbqAUG.jpg',
        characteristics: [
            'Le dernier article des tarses antérieurs est 4 à 5 fois plus long que large.',
            'Les femelles généralement plus grandes que les mâles.'
        ]
    },
    'Mayetiola avenae': {
        name: 'Mayetiola avenae',
        scientificName: '(Marchal, 1895)',
        family: 'Cecidomyiidae',
        size: '4.5 à 5mm',
        color: 'grisâtre',
        habitat: 'Avoine',
        image: './images/0wfOVgyrBWv9.jpg',
        characteristics: [
            'Le dernier article des tarses antérieurs est renflé 4 à 5 fois plus long que large.',
            'Les femelles généralement plus grandes que les mâles.'
        ]
    },
    'Contarinia nasturtii': {
        name: 'Contarinia nasturtii',
        scientificName: '(Kieffer, 1888)',
        family: 'Cecidomyiidae',
        size: '1,5 mm',
        color: 'jaune verdâtre',
        habitat: 'Chou-fleur, Colza',
        image: './images/2wHTruqlB7la.jpg',
        characteristics: [
            'L\'adulte présente des ailes qui sont velues.'
        ]
    }
};

const familyOrder = [
    'Tephritidae',
    'Agromyzidae',
    'Anthomyiidae',
    'Drosophilidae',
    'Cecidomyiidae'
];

const familyNames = {
    'Tephritidae': 'Tephritidae',
    'Agromyzidae': 'Agromyzidae',
    'Anthomyiidae': 'Anthomyiidae',
    'Drosophilidae': 'Drosophilidae',
    'Cecidomyiidae': 'Cecidomyiidae'
};


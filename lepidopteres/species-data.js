// Données détaillées pour toutes les espèces de Lépidoptères
const speciesData = {
    'cossus-cossus': {
        name: 'Cossus cossus',
        author: '(Linnaeus, 1758)',
        envergure: '70 à 80 mm',
        couleur: 'grisâtre',
        hote: 'Arbres fruitiers et forestiers',
        details: [
            'Corps massif et recouvert de poils',
            'Les ailes antérieures ont un aspect chagriné avec de nombreuses lignes sinueuses brunes, grises',
            'Les ailes postérieures, trapues, sont pileuses sur leur partie basale'
        ]
    },
    'zeuzera-pyrina': {
        name: 'Zeuzera pyrina',
        author: '(Linnaeus, 1761)',
        envergure: '50 à 60 mm pour la femelle, 35 à 40 mm pour le mâle',
        couleur: 'blanche de base',
        hote: 'Arbres fruitiers, Olivier',
        details: [
            'Le thorax est blanc velu avec 6 taches bleues',
            'L\'abdomen est relativement long',
            'Les ailes antérieurs sont blanches parsemées de petites taches d\'un bleu métallique',
            'Les ailes postérieures avec des taches plus diffuses'
        ]
    },
    'prays-oleae': {
        name: 'Prays oleae',
        author: '(Bernard, 1788)',
        envergure: '14 mm environ',
        couleur: 'grise argentée',
        hote: 'Olivier',
        details: [
            'Longueur adulte au repos 6 à 7 mm',
            'Les ailes antérieures sont grises à reflets argentés, parsemées de petites taches noires et 2 grosses en leur milieu',
            'Les ailes postérieures, uniformément grises, sont bordées d\'une frange de petites soies',
            'Les pattes sont recouverts d\'écailles grises à reflets argentés'
        ]
    },
    'prays-citri': {
        name: 'Prays citri',
        author: 'Millière, 1873',
        envergure: '10 à 12 mm',
        couleur: 'gris terne',
        hote: 'Citrus',
        details: [
            'Les antennes sont relativement courtes',
            'Les ailes fortement frangées',
            'Les ailes antérieures sont gris brunâtre chagriné, plus sombres sur le bord inférieur et à l\'apex',
            'Les ailes postérieures sont très étroites, gris brun uniforme et enfumées vers l\'extrémité'
        ]
    },
    'yponomeuta-malinella': {
        name: 'Yponomeuta malinella',
        author: '(Zeller, 1838)',
        envergure: '16 à 20 mm',
        couleur: 'blanc pur',
        hote: 'Pommier',
        details: [
            'Les ailes antérieures sont piquetées de points noirs',
            'Les ailes postérieures sont grisâtres et frangées'
        ]
    },
    'phthorimaea-operculella': {
        name: 'Phthorimaea operculella',
        author: '(Zeller, 1873)',
        envergure: '10 à 12 mm',
        couleur: 'grise de base',
        hote: 'Solanacées (Pomme de terre)',
        details: [
            'Abdomen gris',
            'Antennes presque aussi longues que le corps',
            'Ailes très étroites, les antérieures gris jaunâtre parsemées de petites taches noires; et 2 taches noirâtres allongées au bord postérieur de leur base, apex enfumé',
            'Les ailes postérieures grises portent de longues soies',
            'Pattes postérieures jaunâtres en leurs parties distales'
        ]
    },
    'scrobipalpa-ocellatella': {
        name: 'Scrobipalpa ocellatella',
        author: 'Boyd, 1858',
        envergure: '10 à 12 mm',
        couleur: 'grise de base',
        hote: 'Betterave à sucre',
        details: [
            'Les ailes antérieures sont étroites, gris jaunâtre, parsemées de petites taches sombres brillants avec une bande claire irrégulière sur le bord inférieur',
            'Les ailes postérieures sont gris clair',
            'Les ailes sont bordées de longues soies'
        ]
    },
    'pectinophora-gossypiella': {
        name: 'Pectinophora gossypiella',
        author: 'Saunders, 1844',
        envergure: '12 à 20 mm',
        couleur: 'gris brunâtre à reflets brillants',
        hote: 'Cotonnier',
        details: [
            'La tête est de couleur brun rougeâtre avec des écailles pâles et irisées',
            'Les antennes sont brunes et le segment basal porte un peigne de cinq ou six longues écailles raides en forme de poils',
            'Les ailes antérieures sont ovalaires allongées, frangées parsemées de taches transversales; présence de 2 taches médianes visibles',
            'Les ailes postérieures sont gris argentées, enfumées sur leur moitié distale, en forme d\'un trapèze irrégulier, apex en pointe sub-arrondie',
            'Les palpes labiaux sont longs et recourbés vers le haut: le deuxième segment porte une brosse poilue légèrement sillonnée sur la face inférieure qui devient lisse distalement et le segment terminal est plus court que le second'
        ]
    },
    'anarsia-lineatella': {
        name: 'Anarsia lineatella',
        author: 'Zeller, 1839',
        envergure: '14 à 16 mm',
        couleur: 'grise de base',
        hote: 'Arbres fruitiers (Pêcher)',
        details: [
            'Les ailes sont très étroites: celles antérieures sont grises noires ou brunes et présentent des rayures longitudinales noires et une grande tache brune au milieu du bord antérieur',
            'Les ailes postérieures sont plus larges, grises et frangées, éclaircis dans la zone anale',
            'La tête porte 2 palpes labiaux gris et épais dirigés vers l\'avant'
        ]
    },
    'tuta-absoluta': {
        name: 'Tuta absoluta',
        author: '(Meyrick, 1917)',
        envergure: '10 mm',
        couleur: 'Gris argenté',
        hote: 'Cultures maraîchères (Tomate)',
        details: [
            'L\'adulte de 6-7mm de longueur est gris argenté',
            'L\'adulte présente des taches noires sur les ailes antérieures',
            'Les antennes sont filiformes'
        ]
    },
    'cydia-pomonella': {
        name: 'Cydia pomonella',
        author: '(Linnaeus 1758)',
        envergure: '16 à 19 mm',
        couleur: 'gris-brun',
        hote: 'Pommes, poires, prunes, etc.',
        details: [
            'Il y a une tache ovale caractéristique très apparente, brune, bordée de 2 lignes d\'un brun doré brillant, à reflets mordorés, sur les ailes antérieures grises',
            'Les ailes postérieures sont brun rougeâtre, finement ciliées',
            'La tête porte deux antennes filiformes étalées'
        ]
    },
    'grapholita-molesta': {
        name: 'Grapholita molesta',
        author: 'Busck, 1916',
        envergure: '10 à 16 mm',
        couleur: 'Brun-gris-noir',
        hote: 'Amygdalées, pommacées',
        details: [
            'Synonyme: Cydia molesta (Busck)',
            'Les ailes antérieures brun-noir rayées de blanc',
            'Les ailes postérieures étant d\'un gris foncé uni. Les pattes et le ventre sont argentés',
            'Les ailes sont maintenues dans une position semblable à un toit sur le corps',
            'Les antennes sont repliées vers l\'arrière sur les ailes',
            'Pour une identification exacte, une investigation des organes génitaux est nécessaire'
        ]
    },
    'cydia-nigricana': {
        name: 'Cydia nigricana',
        author: '(Fabricius, 1794)',
        envergure: '15 mm',
        couleur: 'brun-olive',
        hote: 'Pois',
        details: [
            'Antennes longues',
            'Les ailes antérieures de couleur brun olive plus ou moins foncé avec des reflets jaune ocre présentent sur leur bord des taches blanches et jaunes en forme de chevrons'
        ]
    },
    'lobesia-botrana': {
        name: 'Lobesia botrana',
        author: '(Denis & Schiffermüller, 1775)',
        envergure: '10 à 13 mm',
        couleur: 'complexe',
        hote: 'Vigne',
        details: [
            'Les ailes antérieures sont gris perle parsemées de petites zones brun rougeâtre disposant de 3 bandes légèrement obliques: une à la base, une au centre de l\'aile élargie dans son milieu et une apicale assez sombre bordée d\'une zone plus claire',
            'Les ailes postérieures grisâtres, frangées',
            'Les tibias sont clairs munis de longues épines',
            'Les mâles et les femelles ont la même couleur et des tailles très voisines. Par contre, l\'examen de l\'extrémité de l\'abdomen permet de reconnaître le sexe. L\'extrémité ventrale de la femelle à la forme d\'une gouttière par laquelle sort l\'organe de ponte: l\'ovipositeur',
            'L\'extrémité est plus fine chez le mâle, et forme comme 2 lèvres jointes garnies d\'une pilosité importante',
            'Les femelles présentent une pigmentation ventrale brune, l\'abdomen étant plus clair chez le mâle'
        ]
    },
    'ectomyelois-ceratoniae': {
        name: 'Ectomyelois ceratoniae',
        author: '(Zeller, 1839)',
        envergure: '16 à 22mm',
        couleur: 'grise de base',
        hote: 'Caroubes, Dattes, Grenadier, fruits mûres divers',
        details: [
            'Les ailes antérieures sont relativement étroites et grises avec des dessins plus ou moins bien marqués',
            'Les ailes postérieures sont plus claires bordées d\'une frange soyeuse blanchâtre'
        ]
    },
    'agrotis-segetum': {
        name: 'Agrotis segetum',
        author: '(Denis & Schiffermüller, 1775)',
        envergure: '3,8 à 4,3 cm',
        couleur: 'grise de base',
        hote: 'Polyphage (Maraîchage)',
        details: [
            'Les ailes antérieures gris brun portant des dessins plus clairs avec une tache claire (tache réniforme) et une tache orbiculaire soulignée de noir (cercle noir)',
            'Les ailes postérieures sont blanches chez le mâle, grises chez la femelle',
            'Les femelles sont généralement très sombres, sans dessins apparents'
        ]
    },
    'agrotis-ipsilon': {
        name: 'Agrotis ipsilon',
        author: '(Hufnagel, 1766)',
        envergure: '4,3 à 5cm',
        couleur: 'marron-beige',
        hote: 'Polyphage (Maraîchage)',
        details: [
            'L\'adulte est marron et beige avec des ailes antérieures marron marquées d\'une zone claire et une tache claire (tache réniforme) par aile prolongée d\'un triangle noir',
            'Les ailes postérieures sont beiges très pâles, angle supérieur enfumé et à nervures brunes',
            'Les antennes du mâle sont pectinées sur leur demi-longueur',
            'Les pattes sont plus foncées'
        ]
    },
    'spodoptera-exigua': {
        name: 'Spodoptera exigua',
        author: '(Hübner, 1808)',
        envergure: '7 à 30 mm',
        couleur: 'grise de base',
        hote: 'Polyphage (Maraichage)',
        details: [
            'Le corps est long d\'approximativement 15 mm',
            'Les ailes antérieures gris brun envahi de marron foncé ou noir éclatant et d\'un dessin jaunâtre, réniforme orbiculaire bien dessinée',
            'Les ailes postérieures, blanches, ont une nervation clairement visible, soulignée de marron',
            'La tête et le thorax sont marron et l\'abdomen gris-marron',
            'Les antennes de mâles ciliées',
            'Front sans relief médian'
        ]
    },
    'spodoptera-littoralis': {
        name: 'Spodoptera littoralis',
        author: '(Boisduval, 1833)',
        envergure: '3 à 4 cm',
        couleur: 'brun-noirâtre',
        hote: 'Polyphage',
        details: [
            'Le corps a une longueur de 1,5 à 2 cm',
            'Les ailes antérieures sont brun-noir et portent des motifs caractéristiques de couleur claire',
            'Les ailes postérieures sont blanc-gris avec des bordures grises et présentant des reflets violacées'
        ]
    }
};


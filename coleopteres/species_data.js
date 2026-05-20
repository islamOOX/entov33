// Données des espèces de coléoptères
const speciesData = {
  // Famille Buprestidae
  buprestidae: [
    {
      id: "capnodis_tenebrionis",
      scientificName: "Capnodis tenebrionis",
      author: "(Linnaeus, 1767)",
      commonName: "Bupreste du pêcher",
      family: "Buprestidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "15-20 mm",
      color: "Noir mat avec reflets métalliques",
      host: "Arbres fruitiers à noyau",
      description: "Bupreste de grande taille, corps allongé et aplati. Les élytres présentent des côtes longitudinales marquées. Les larves creusent des galeries dans le tronc et les grosses branches des arbres fruitiers.",
      image: "capnodis_tenebrionis.jpg"
    }
  ],

  // Famille Curculionidae
  curculionidae: [
    {
      id: "conorhynchus_mendicus",
      scientificName: "Conorhynchus mendicus",
      author: "(Gyllenhal, 1837)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-4 mm",
      color: "Brun foncé",
      host: "Légumineuses",
      description: "Petit charançon au rostre court et épais. Corps ovale, densément ponctué. Les élytres présentent des stries longitudinales bien marquées.",
      image: "conorhynchus_mendicus.jpg"
    },
    {
      id: "hypera_postica",
      scientificName: "Hypera postica",
      author: "(Gyllenhal, 1813)",
      commonName: "Charançon de la luzerne",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-5 mm",
      color: "Brun avec taches claires",
      host: "Luzerne",
      description: "Charançon de taille moyenne, corps ovale. Rostre relativement court. Les élytres présentent des bandes longitudinales claires caractéristiques.",
      image: "hypera_postica.jpg"
    },
    {
      id: "lixus_juncii",
      scientificName: "Lixus juncii",
      author: "(Boheman, 1835)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "8-12 mm",
      color: "Gris-brun",
      host: "Joncs et plantes aquatiques",
      description: "Grand charançon au corps allongé et cylindrique. Rostre long et fin. Surface du corps couverte d'écailles grises donnant un aspect poudreux.",
      image: "lixus_juncii.jpg"
    },
    {
      id: "otiorhynchus_cribricollis",
      scientificName: "Otiorhynchus cribricollis",
      author: "(Gyllenhal, 1834)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "6-8 mm",
      color: "Noir mat",
      host: "Polyphage",
      description: "Charançon aptère de taille moyenne. Corps ovale, densément ponctué. Pronotum avec ponctuation très dense donnant un aspect criblé.",
      image: "otiorhynchus_cribricollis.jpg"
    },
    {
      id: "lixomorphus_algirus",
      scientificName: "Lixomorphus algirus",
      author: "(Linnaeus, 1758)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "10-15 mm",
      color: "Brun-rouge",
      host: "Ombellifères",
      description: "Grand charançon au corps allongé. Rostre long et incurvé. Élytres avec des côtes longitudinales bien marquées.",
      image: "lixomorphus_algirus.jpeg"
    },
    {
      id: "pachytychius_strumarius",
      scientificName: "Pachytychius strumarius",
      author: "(Fabricius, 1792)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "4-6 mm",
      color: "Brun avec écailles claires",
      host: "Saules",
      description: "Charançon de taille moyenne, corps ovale. Surface couverte d'écailles donnant des motifs caractéristiques.",
      image: "pachytychius_strumarius.png"
    },
    {
      id: "ceutorhynchus_assimilis",
      scientificName: "Ceutorhynchus assimilis",
      author: "(Paykull, 1792)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "2-3 mm",
      color: "Noir",
      host: "Crucifères",
      description: "Petit charançon au corps globuleux. Rostre fin et arqué. Fémurs postérieurs dentés.",
      image: "ceutorhynchus_assimilis.jpg"
    },
    {
      id: "ceutorhynchus_picitarsis",
      scientificName: "Ceutorhynchus picitarsis",
      author: "(Gyllenhal, 1837)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "2-3 mm",
      color: "Noir avec tarses bruns",
      host: "Crucifères",
      description: "Petit charançon similaire à C. assimilis mais avec les tarses brun-rouge caractéristiques.",
      image: "ceutorhynchus_picitarsis.jpg"
    },
    {
      id: "ceutorhynchus_quadridens",
      scientificName: "Ceutorhynchus quadridens",
      author: "(Panzer, 1795)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "2-3 mm",
      color: "Noir",
      host: "Crucifères",
      description: "Petit charançon au fémur postérieur armé de quatre dents caractéristiques.",
      image: "ceutorhynchus_quadridens.jpg"
    },
    {
      id: "ceutorhynchus_napi",
      scientificName: "Ceutorhynchus napi",
      author: "(Gyllenhal, 1837)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "2-3 mm",
      color: "Noir",
      host: "Colza, navette",
      description: "Petit charançon spécialisé sur les crucifères cultivées. Corps globuleux, rostre fin.",
      image: "ceutorhynchus_napi.jpeg"
    },
    {
      id: "baris_quadraticollis",
      scientificName: "Baris quadraticollis",
      author: "(Boheman, 1844)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-4 mm",
      color: "Noir brillant",
      host: "Crucifères",
      description: "Charançon de petite taille au pronotum carré caractéristique. Corps allongé, brillant.",
      image: "baris_quadraticollis.png"
    },
    {
      id: "baris_coerulescens",
      scientificName: "Baris coerulescens",
      author: "(Scopoli, 1763)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-4 mm",
      color: "Noir avec reflets bleus",
      host: "Crucifères",
      description: "Petit charançon au corps allongé avec des reflets métalliques bleus caractéristiques.",
      image: "baris_coerulescens.jpg"
    },
    {
      id: "baris_cuprirostris",
      scientificName: "Baris cuprirostris",
      author: "(Fabricius, 1787)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-4 mm",
      color: "Noir avec rostre cuivré",
      host: "Crucifères",
      description: "Petit charançon reconnaissable à son rostre de couleur cuivrée contrastant avec le corps noir.",
      image: "baris_cuprirostris.jpg"
    },
    {
      id: "sitona_lineatus",
      scientificName: "Sitona lineatus",
      author: "(Linnaeus, 1758)",
      commonName: "Sitone du pois",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-5 mm",
      color: "Brun avec bandes claires",
      host: "Légumineuses",
      description: "Charançon de taille moyenne avec des bandes longitudinales claires caractéristiques sur les élytres.",
      image: "sitona_lineatus.jpeg"
    },
    {
      id: "sitona_crinitus",
      scientificName: "Sitona crinitus",
      author: "(Herbst, 1795)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-4 mm",
      color: "Brun grisâtre",
      host: "Légumineuses",
      description: "Petit charançon au corps densément couvert d'écailles donnant un aspect velu.",
      image: "sitona_crinitus.jpg"
    },
    {
      id: "sitona_limosus",
      scientificName: "Sitona limosus",
      author: "(Rossi, 1792)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-4 mm",
      color: "Brun terne",
      host: "Légumineuses",
      description: "Petit charançon au corps ovale, surface mate avec écailles peu denses.",
      image: "sitona_limosus.jpg"
    },
    {
      id: "brachycerus_algirus",
      scientificName: "Brachycerus algirus",
      author: "(Fabricius, 1781)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "8-12 mm",
      color: "Noir mat",
      host: "Légumineuses",
      description: "Grand charançon aptère au corps massif et globuleux. Surface rugueuse, pattes robustes.",
      image: "brachycerus_algirus.jpg"
    }
  ],

  // Famille Scolytidae (maintenant incluse dans Curculionidae)
  scolytidae: [
    {
      id: "ruguloscolytus_amygdali",
      scientificName: "Ruguloscolytus amygdali",
      author: "(Guérin-Méneville, 1847)",
      commonName: "Scolyte de l'amandier",
      family: "Curculionidae",
      subfamily: "Scolytinae",
      suborder: "Polyphaga",
      size: "2-3 mm",
      color: "Brun foncé",
      host: "Amandier",
      description: "Petit scolyte cylindrique. Les galeries maternelles sont longitudinales sous l'écorce.",
      image: "ruguloscolytus_amygdali.jpg"
    },
    {
      id: "ruguloscolytus_mediterraneus",
      scientificName: "Ruguloscolytus mediterraneus",
      author: "(Eichhoff, 1881)",
      commonName: "",
      family: "Curculionidae",
      subfamily: "Scolytinae",
      suborder: "Polyphaga",
      size: "2-3 mm",
      color: "Brun rougeâtre",
      host: "Arbres fruitiers",
      description: "Scolyte de petite taille, corps cylindrique. Galeries caractéristiques en étoile.",
      image: "ruguloscolytus_mediterraneus.jpg"
    },
    {
      id: "phloeotribus_scarabaeoides",
      scientificName: "Phloeotribus scarabaeoides",
      author: "(Bernard, 1788)",
      commonName: "Phloeotribus de l'olivier",
      family: "Curculionidae",
      subfamily: "Scolytinae",
      suborder: "Polyphaga",
      size: "2-2.5 mm",
      color: "Brun noir",
      host: "Olivier",
      description: "Petit scolyte spécialisé sur l'olivier. Corps cylindrique, déclivité élytrale caractéristique.",
      image: "phloeotribus_scarabaeoides.png"
    },
    {
      id: "hylesinus_oleiperda",
      scientificName: "Hylesinus oleiperda",
      author: "(Fabricius, 1792)",
      commonName: "Hylésine de l'olivier",
      family: "Curculionidae",
      subfamily: "Scolytinae",
      suborder: "Polyphaga",
      size: "1.5-2 mm",
      color: "Brun foncé",
      host: "Olivier",
      description: "Très petit scolyte de l'olivier. Galeries sinueuses caractéristiques dans les rameaux.",
      image: "hylesinus_oleiperda.png"
    }
  ],

  // Famille Chrysomelidae
  chrysomelidae: [
    {
      id: "oulema_melanopus",
      scientificName: "Oulema melanopus",
      author: "(Linnaeus, 1758)",
      commonName: "Criocère des céréales",
      family: "Chrysomelidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "4-5 mm",
      color: "Bleu métallique",
      host: "Céréales",
      description: "Chrysomèle de taille moyenne au corps allongé et brillant. Tête et pronotum rougeâtres, élytres bleu métallique.",
      image: "oulema_melanopus.jpg"
    },
    {
      id: "colaspidema_atrum",
      scientificName: "Colaspidema atrum",
      author: "(Olivier, 1808)",
      commonName: "",
      family: "Chrysomelidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-4 mm",
      color: "Noir brillant",
      host: "Légumineuses",
      description: "Petite chrysomèle au corps ovale et brillant. Entièrement noire avec des reflets métalliques.",
      image: "colaspidema_atrum.jpg"
    },
    {
      id: "psylliodes_chrysocephala",
      scientificName: "Psylliodes chrysocephala",
      author: "(Linnaeus, 1758)",
      commonName: "Altise à tête dorée",
      family: "Chrysomelidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "3-4 mm",
      color: "Noir avec tête dorée",
      host: "Crucifères",
      description: "Altise de taille moyenne reconnaissable à sa tête de couleur dorée contrastant avec le corps noir.",
      image: "psylliodes_chrysocephala.jpg"
    },
    {
      id: "phyllotreta_nigripes",
      scientificName: "Phyllotreta nigripes",
      author: "(Fabricius, 1775)",
      commonName: "Altise des crucifères",
      family: "Chrysomelidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "2-3 mm",
      color: "Noir brillant",
      host: "Crucifères",
      description: "Petite altise entièrement noire et brillante. Pattes postérieures adaptées au saut.",
      image: "phyllotreta_nigripes.jpeg"
    },
    {
      id: "phyllotreta_nemorum",
      scientificName: "Phyllotreta nemorum",
      author: "(Linnaeus, 1758)",
      commonName: "",
      family: "Chrysomelidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "2-3 mm",
      color: "Noir avec bandes jaunes",
      host: "Crucifères",
      description: "Petite altise avec des bandes longitudinales jaunes caractéristiques sur les élytres noirs.",
      image: "phyllotreta_nemorum.jpg"
    },
    {
      id: "cassida_vittata",
      scientificName: "Cassida vittata",
      author: "(Villers, 1789)",
      commonName: "",
      family: "Chrysomelidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "6-7 mm",
      color: "Vert avec bande dorsale",
      host: "Composées",
      description: "Casside de taille moyenne avec une bande longitudinale sombre caractéristique sur les élytres verts.",
      image: "cassida_vittata.png"
    },
    {
      id: "cassida_nebulosa",
      scientificName: "Cassida nebulosa",
      author: "(Linnaeus, 1758)",
      commonName: "",
      family: "Chrysomelidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "6-8 mm",
      color: "Vert avec taches sombres",
      host: "Composées",
      description: "Casside avec des taches sombres irrégulières sur les élytres verts, donnant un aspect nébuleux.",
      image: "cassida_nebulosa.jpg"
    }
  ],

  // Famille Cerambycidae
  cerambycidae: [
    {
      id: "dorysthenes_forficatus",
      scientificName: "Dorysthenes forficatus",
      author: "(Fabricius, 1792)",
      commonName: "",
      family: "Cerambycidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "25-35 mm",
      color: "Brun foncé",
      host: "Chênes",
      description: "Grand longicorne au corps massif. Mandibules très développées chez les mâles, en forme de pinces.",
      image: "dorysthenes_forficatus.jpg"
    },
    {
      id: "phoracantha_semipunctata",
      scientificName: "Phoracantha semipunctata",
      author: "(Fabricius, 1775)",
      commonName: "Longicorne des eucalyptus",
      family: "Cerambycidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "15-25 mm",
      color: "Brun avec taches jaunes",
      host: "Eucalyptus",
      description: "Longicorne de taille moyenne avec des taches jaunes caractéristiques sur les élytres bruns.",
      image: "phoracantha_semipunctata.jpg"
    }
  ],

  // Famille Meloidae
  meloidae: [
    {
      id: "mylabris_oleae",
      scientificName: "Mylabris oleae",
      author: "(Chevrolat, 1837)",
      commonName: "Mylabre de l'olivier",
      family: "Meloidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "8-12 mm",
      color: "Noir avec bandes jaunes",
      host: "Olivier",
      description: "Méloé de taille moyenne avec des bandes transversales jaunes sur les élytres noirs.",
      image: "mylabris_oleae.jpg"
    }
  ],

  // Famille Coccinelidae
  coccinelidae: [
    {
      id: "epilachna_chrysomelina",
      scientificName: "Epilachna chrysomelina",
      author: "(Fabricius, 1775)",
      commonName: "Coccinelle des solanées",
      family: "Coccinelidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "6-8 mm",
      color: "Jaune avec points noirs",
      host: "Solanées",
      description: "Coccinelle phytophage de couleur jaune avec des points noirs. Contrairement aux autres coccinelles, elle se nourrit de végétaux.",
      image: "epilachna_chrysomelina.jpg"
    },
    {
      id: "henosepilachna_argus",
      scientificName: "Henosepilachna argus",
      author: "(Geoffroy, 1762)",
      commonName: "Coccinelle de la bryone",
      family: "Coccinelidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "5-7 mm",
      color: "Jaune avec points noirs",
      host: "Cucurbitacées",
      description: "Coccinelle phytophage spécialisée sur les cucurbitacées. Corps jaune avec de nombreux points noirs.",
      image: "henosepilachna_argus.jpg"
    }
  ],

  // Famille Bostrychidae
  bostrychidae: [
    {
      id: "apate_monachus",
      scientificName: "Apate monachus",
      author: "(Fabricius, 1775)",
      commonName: "Apate moine",
      family: "Bostrychidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "8-12 mm",
      color: "Brun foncé à noir",
      host: "Arbres fruitiers",
      description: "Vrillette de grande taille au corps cylindrique. Pronotum avec tubercules caractéristiques chez les mâles.",
      image: "apate_monachus.jpg"
    }
  ],

  // Famille Elateridae
  elateridae: [
    {
      id: "agriotes_lineatus",
      scientificName: "Agriotes lineatus",
      author: "(Linnaeus, 1767)",
      commonName: "Taupin des moissons",
      family: "Elateridae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "7-10 mm",
      color: "Brun avec lignes claires",
      host: "Polyphage",
      description: "Taupin de taille moyenne avec des lignes longitudinales claires sur les élytres. Capable de se redresser par un saut caractéristique.",
      image: "agriotes_lineatus.jpg"
    },
    {
      id: "agriotes_obscurus",
      scientificName: "Agriotes obscurus",
      author: "(Linnaeus, 1758)",
      commonName: "Taupin obscur",
      family: "Elateridae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "6-9 mm",
      color: "Brun foncé",
      host: "Polyphage",
      description: "Taupin de couleur uniforme brun foncé. Corps allongé, antennes en scie chez les mâles.",
      image: "agriotes_obscurus.jpg"
    },
    {
      id: "agriotes_sputator",
      scientificName: "Agriotes sputator",
      author: "(Linnaeus, 1758)",
      commonName: "",
      family: "Elateridae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "6-8 mm",
      color: "Brun clair",
      host: "Polyphage",
      description: "Taupin de couleur brun clair, plus petit que les autres espèces du genre. Pronotum avec ponctuation fine.",
      image: "agriotes_sputator.jpg"
    }
  ],

  // Famille Scarabaeidae
  scarabaeidae: [
    {
      id: "phyllognathus_excavatus",
      scientificName: "Phyllognathus excavatus",
      author: "(Forster, 1771)",
      commonName: "",
      family: "Scarabaeidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "18-22 mm",
      color: "Luisant, brun rouge",
      host: "Polyphage radicole",
      description: "Corps court, convexe, dessus glabre, Elytres marqués par une double ponctuation fine et éparse, Présence d'un dimorphisme sexuel prononcé: chez les mâles les tarses antérieurs sont élargis, la tête armée d'une petite corne courbée en arrière et le pronotum est marqué par une large excavation arrondie en arrière, Ces caractères sont absents chez les femelles.",
      image: "phyllognathus_excavatus.jpg"
    },
    {
      id: "tropinota_hirta",
      scientificName: "Tropinota hirta",
      author: "(Poda, 1761)",
      commonName: "Cétoine hérissée",
      family: "Scarabaeidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "8-11 mm",
      color: "Noir mat avec taches blanches",
      host: "Polyphage floricole",
      description: "Corps à forte pubescence dressée beige à fauve, brun noir mat ponctué de taches pâles, Le scutellum (écusson) est ponctué latéralement sur la quasi totalité (avec des impressions en fer à cheval), Les élytres avec plus ou moins 12 taches blanches (disparaissent avec l'âge), Le pronotum ne présente pas de plaque lisse le long de la ligne médiane, Les sternites très ponctuées sur toute leur longueur.",
      image: "tropinota_hirta.jpg"
    },
    {
      id: "tropinota_squalida",
      scientificName: "Tropinota squalida",
      author: "(Scopoli, 1763)",
      commonName: "Cétoine hérissée",
      family: "Scarabaeidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "8-11 mm",
      color: "Noir mat avec taches pâles",
      host: "Polyphage floricole",
      description: "Petite cétoine, à dense pubescence dressée beige à fauve, brun noir mat à taches pâles, Le scutellum (écusson) a une ponctuation caractéristique, limitée aux angles antérieurs, Sternites lisses sur leurs parties médiane.",
      image: "tropinota_squalida.jpg"
    }
  ],

  // Famille Carabidae
  carabidae: [
    {
      id: "zabrus_tenebrionides",
      scientificName: "Zabrus tenebrioides",
      author: "(Goeze, 1777)",
      commonName: "Zabre bossu",
      family: "Carabidae",
      subfamily: "",
      suborder: "Adephaga",
      size: "15 à 18 mm",
      color: "Noire ou brun foncé avec un léger reflet métallique",
      host: "Céréales",
      description: "Les élytres sont bombés ornés de neuf bandes longitudinales, Le thorax est également bombé, d'où le nom vernaculaire de zabre bossu, Pronotum est 1/3 plus large que long avec ponctuation plus dense et forte à sa base, Prosternum est ponctué sur les côtés, Les antennes, tibias et tarses sont brun-rouge, Les tibias antérieure sont dilatés, et portent des éperons sur l'angle apical interne.",
      image: "zabrus_tenebrionides.jpg"
    }
  ],

  // Famille Dryophthoridae
  dryophthoridae: [
    {
      id: "rhynchophorus_ferrugineus",
      scientificName: "Rhynchophorus ferrugineus",
      author: "(Olivier, 1790)",
      commonName: "Charançon rouge du palmier",
      family: "Dryophthoridae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "35mm de long et 12mm de large",
      color: "Brun-rouge",
      host: "Palmiers",
      description: "Adulte porte un long rostre incurvé, La tête et le rostre représentent 1/3 de la longueur, Le rostre est brun-noir ventralement et brun-rouge dorsalement, Chez les mâles, le rostre présente sur une partie de sa face supérieure un feutrage brun, Le rostre des femelles est glabre, plus fin, plus incurvé et légèrement plus long, Les yeux, noirs, se situent de part et d'autre de la base du rostre, Le pronotum est brun-rouge avec quelques points noirs de tailles et formes variables, Les élytres sont rouge sombre, fortement nervurées longitudinalement et ne recouvrent pas complètement l'abdomen, Les ailes sont brunes et les adultes sont capables de voler sur de longues distances.",
      image: "rhynchophorus_ferrugineus.jpg"
    }
  ],

  // Famille Nitidulidae
  nitidulidae: [
    {
      id: "brassicogethes_aeneus",
      scientificName: "Brassicogethes aeneus",
      author: "(Fabricius, 1775)",
      commonName: "Méligèthe du colza",
      family: "Nitidulidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "1,5 à 2,5 mm",
      color: "Noire brillante (vert, bleu ou bronzé à reflets métalliques)",
      host: "Crucifères",
      description: "Corps allongé, aplati, à ponctuation noire, dense, Les élytres ne recouvrent pas complètement l'abdomen, Les antennes sont terminées en massue, comportant 2 ou 3 articles, Antennes et pattes sombres, Tibias antérieur brun-roux avec dents au bord externe.",
      image: "brassicogethes_aeneus.jpg"
    },
    {
      id: "brassicogethes_viridescens",
      scientificName: "Brassicogethes viridescens",
      author: "(Fabricius, 1787)",
      commonName: "Méligèthe vert",
      family: "Nitidulidae",
      subfamily: "",
      suborder: "Polyphaga",
      size: "2 à 2,5 mm",
      color: "Vert, bleu",
      host: "Crucifères",
      description: "Le dessus du corps vert ou bleu, parfois avec des élytres brun rouge, La tête et le pronotum sont plus finement ponctués que les élytres, Antennes en massue, Les pattes sont entièrement rousses, Fémurs médianes avec denticule émoussé au bord postérieur.",
      image: "brassicogethes_viridescens.jpg"
    }
  ]
};

// Rendre les données disponibles globalement
window.speciesData = speciesData;


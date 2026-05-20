// Loader OBJ personnalisé pour charger le modèle 3D fourni
class CustomOBJLoader {
    constructor() {
        this.materials = {};
    }
    
    // Charger le fichier MTL
    loadMTL(url) {
        return fetch(url)
            .then(response => response.text())
            .then(data => this.parseMTL(data));
    }
    
    // Parser le fichier MTL
    parseMTL(data) {
        const lines = data.split('\n');
        let currentMaterial = null;
        
        lines.forEach(line => {
            const parts = line.trim().split(/\s+/);
            const command = parts[0];
            
            switch(command) {
                case 'newmtl':
                    currentMaterial = parts[1];
                    this.materials[currentMaterial] = {
                        color: new THREE.Color(0.8, 0.8, 0.8),
                        specular: new THREE.Color(0.1, 0.1, 0.1),
                        shininess: 30
                    };
                    break;
                case 'Kd':
                    if (currentMaterial) {
                        this.materials[currentMaterial].color = new THREE.Color(
                            parseFloat(parts[1]),
                            parseFloat(parts[2]),
                            parseFloat(parts[3])
                        );
                    }
                    break;
                case 'Ks':
                    if (currentMaterial) {
                        this.materials[currentMaterial].specular = new THREE.Color(
                            parseFloat(parts[1]),
                            parseFloat(parts[2]),
                            parseFloat(parts[3])
                        );
                    }
                    break;
                case 'Ns':
                    if (currentMaterial) {
                        this.materials[currentMaterial].shininess = parseFloat(parts[1]);
                    }
                    break;
            }
        });
    }
    
    // Charger le fichier OBJ
    loadOBJ(url) {
        return fetch(url)
            .then(response => response.text())
            .then(data => this.parseOBJ(data));
    }
    
    // Parser le fichier OBJ
    parseOBJ(data) {
        const lines = data.split('\n');
        const vertices = [];
        const normals = [];
        const uvs = [];
        const faces = [];
        let currentMaterial = null;
        
        lines.forEach(line => {
            const parts = line.trim().split(/\s+/);
            const command = parts[0];
            
            switch(command) {
                case 'v':
                    vertices.push(
                        parseFloat(parts[1]),
                        parseFloat(parts[2]),
                        parseFloat(parts[3])
                    );
                    break;
                case 'vn':
                    normals.push(
                        parseFloat(parts[1]),
                        parseFloat(parts[2]),
                        parseFloat(parts[3])
                    );
                    break;
                case 'vt':
                    uvs.push(
                        parseFloat(parts[1]),
                        parseFloat(parts[2])
                    );
                    break;
                case 'usemtl':
                    currentMaterial = parts[1];
                    break;
                case 'f':
                    const face = {
                        material: currentMaterial,
                        vertices: []
                    };
                    
                    for (let i = 1; i < parts.length; i++) {
                        const indices = parts[i].split('/');
                        face.vertices.push({
                            vertex: parseInt(indices[0]) - 1,
                            uv: indices[1] ? parseInt(indices[1]) - 1 : null,
                            normal: indices[2] ? parseInt(indices[2]) - 1 : null
                        });
                    }
                    faces.push(face);
                    break;
            }
        });
        
        return this.createMesh(vertices, normals, uvs, faces);
    }
    
    // Créer le mesh Three.js
    createMesh(vertices, normals, uvs, faces) {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const normalArray = [];
        const uvArray = [];
        
        faces.forEach(face => {
            if (face.vertices.length >= 3) {
                // Triangulation simple pour les faces avec plus de 3 vertices
                for (let i = 1; i < face.vertices.length - 1; i++) {
                    [0, i, i + 1].forEach(idx => {
                        const vertex = face.vertices[idx];
                        
                        // Position
                        const vIdx = vertex.vertex * 3;
                        positions.push(
                            vertices[vIdx],
                            vertices[vIdx + 1],
                            vertices[vIdx + 2]
                        );
                        
                        // Normal
                        if (vertex.normal !== null && normals.length > 0) {
                            const nIdx = vertex.normal * 3;
                            normalArray.push(
                                normals[nIdx],
                                normals[nIdx + 1],
                                normals[nIdx + 2]
                            );
                        } else {
                            normalArray.push(0, 1, 0);
                        }
                        
                        // UV
                        if (vertex.uv !== null && uvs.length > 0) {
                            const uvIdx = vertex.uv * 2;
                            uvArray.push(
                                uvs[uvIdx],
                                uvs[uvIdx + 1]
                            );
                        } else {
                            uvArray.push(0, 0);
                        }
                    });
                }
            }
        });
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normalArray, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvArray, 2));
        
        // Calculer les normales si elles ne sont pas fournies
        if (normalArray.every(n => n === 0)) {
            geometry.computeVertexNormals();
        }
        
        // Créer le matériau
        const material = new THREE.MeshPhongMaterial({
            color: 0x4a7c59,
            shininess: 100,
            side: THREE.DoubleSide
        });
        
        return new THREE.Mesh(geometry, material);
    }
    
    // Méthode principale pour charger le modèle complet
    async load(objUrl, mtlUrl = null) {
        try {
            console.log('Chargement du modèle 3D:', objUrl);
            if (mtlUrl) {
                await this.loadMTL(mtlUrl);
            }
            const mesh = await this.loadOBJ(objUrl);
            console.log('Modèle 3D chargé avec succès');
            return mesh;
        } catch (error) {
            console.warn('Erreur lors du chargement du modèle 3D:', error);
            console.log('Utilisation du modèle de secours');
            return this.createFallbackModel();
        }
    }
    
    // Modèle de secours en cas d'erreur
    createFallbackModel() {
        const geometry = new THREE.BoxGeometry(2, 1, 0.5);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x4a7c59,
            shininess: 100
        });
        
        const model = new THREE.Mesh(geometry, material);
        model.castShadow = true;
        model.receiveShadow = true;
        
        // Ajouter des détails pour simuler un orthoptère
        this.addOrthopterDetails(model);
        
        return model;
    }
    
    // Ajouter des détails d'orthoptère au modèle de secours
    addOrthopterDetails(model) {
        // Pattes
        const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8);
        const legMaterial = new THREE.MeshPhongMaterial({ color: 0x2c5530 });
        
        for (let i = 0; i < 6; i++) {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            const angle = (i / 6) * Math.PI * 2;
            leg.position.set(Math.cos(angle) * 0.8, -0.6, Math.sin(angle) * 0.3);
            leg.rotation.z = angle;
            model.add(leg);
        }
        
        // Antennes
        const antennaGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1);
        const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
        
        const antenna1 = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna1.position.set(-0.3, 0.3, 0.8);
        antenna1.rotation.x = -0.3;
        model.add(antenna1);
        
        const antenna2 = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna2.position.set(0.3, 0.3, 0.8);
        antenna2.rotation.x = -0.3;
        model.add(antenna2);
        
        // Ailes
        const wingGeometry = new THREE.PlaneGeometry(1.5, 0.8);
        const wingMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x7fb069,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        
        const wing1 = new THREE.Mesh(wingGeometry, wingMaterial);
        wing1.position.set(-0.8, 0.2, 0);
        wing1.rotation.y = -0.3;
        model.add(wing1);
        
        const wing2 = new THREE.Mesh(wingGeometry, wingMaterial);
        wing2.position.set(0.8, 0.2, 0);
        wing2.rotation.y = 0.3;
        model.add(wing2);
    }
}


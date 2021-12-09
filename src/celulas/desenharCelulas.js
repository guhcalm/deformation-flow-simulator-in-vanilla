import * as THREE from '../../three.module.js'

function desenharCelulas( celulas, esferas, estrutura, malha ) {
    console.log( 'Desenhando celulas...' )
    // organizando variaveis...
    let dx, dy, dz
    dx = malha.dimensoes.discretas.x
    dy = malha.dimensoes.discretas.y
    dz = malha.dimensoes.discretas.z
    let ux, uy, uz
    ux = malha.unidades.x
    uy = malha.unidades.y
    uz = malha.unidades.z
    // ... variaveis organizadas.

    for ( let celula of celulas ) { desenharCelula( esferas, celula.posicionamento, dx, dy, dz ) }

    estrutura.add( esferas )
    console.log( '... Celulas desenhadas' )
}
function desenharCelula( esferas, pos, dx, dy, dz ) {
    let material, geometria, mesh
    material = new THREE.MeshPhysicalMaterial({
        color: 'rgb(255,203,225)',
        wireframe: false,
        metalness: 0,
        roughness: 0,
        transparent: true,
        reflectivity: 1,
        refractionRatio: 1,
        opacity: 1
    })
    //geometria = new THREE.BoxGeometry( raio, raio, raio )
    geometria = new THREE.SphereGeometry( .5 , 40, 40 )
    
    mesh = new THREE.Mesh( geometria, material )
    mesh.scale.set( dx*.5, dy*.5, dz*.5 )
    mesh.position.set( pos.x, pos.y, pos.z )
    mesh.geometry.computeVertexNormals()
    mesh.castShadow = true;
    esferas.add(mesh)
}

export default desenharCelulas
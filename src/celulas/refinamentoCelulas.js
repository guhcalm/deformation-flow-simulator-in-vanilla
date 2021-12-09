import parametrizarCores from '../parametrizar cores/parametrizarCores.js'
import * as THREE from '../../three.module.js'


function refinamentoCelulas( esferas, celulas, refinamento, matrizes, malha ) {
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

    console.log( "Refinamento das Celulas..." )
    //ajustando variaveis - inicio
    let unidades = { x: refinamento.y, y: refinamento.x, z: refinamento.z }
    let dimensao = { x: 1/unidades.x, y: 1/unidades.y, z: 1/unidades.z }
    //ajustando variaveis - final
    let malhaCelulas = []
    for ( let celula of celulas ) {
        for ( let i = -unidades.x; i <= unidades.x; i++ ) {
            for ( let j = -unidades.y; j <= unidades.y; j++ ) {
                for ( let k = -unidades.z; k <= unidades.z; k++ ) {
                    let ξ, η, ζ
                    ξ = i * dimensao.x
                    η = j * dimensao.y
                    ζ = k * dimensao.z
                    let vertices, vetores
                    vertices = celula.vertices
                    vetores = celula.vetores
                    let malhaCelula = mapearCoordenadas( ξ, η, ζ, vertices, vetores )
                    if ( matrizes == null || malhaCelula.vetor == null ) {} else {
                        let min, max, ut
                        min = matrizes.vetores.min
                        max = matrizes.vetores.max
                        ut =  malhaCelula.vetor.abs
                        malhaCelula.cor = parametrizarCores( min, max, ut )

                        if ( ξ == 0 && η == 0 && ζ == 0 ) {
                            let cor = malhaCelula.cor
                            let pos = malhaCelula.posicionamento
                            desenharCelula( esferas, pos, dx, dy, dz, cor )
                        }
                    }                    
                    malhaCelulas.push( malhaCelula )
                }
            }
        }
    }
    console.log( "... as Celulas foram refinadas." )
    return malhaCelulas
}
export default refinamentoCelulas

function mapearCoordenadas( ξ, η, ζ, vertices, vetores ) {
    //console.log( "Mapeando das coordenadas locais..." )
    let N, x, y, z
    x = y = z = 0
    let u, v, w, abs, unitario
    u = v = w = 0
    N = Ns( ξ, η, ζ )
    for ( let i in N ) {
        x += vertices.x[i] * N[i]
        y += vertices.y[i] * N[i]
        z += vertices.z[i] * N[i]
        if ( vetores == null ) {} else {
            u += vetores.u[i] * N[i]
            v += vetores.v[i] * N[i]
            w += vetores.w[i] * N[i]
            abs = Math.sqrt( u * u + v * v + w * w )
            if ( abs != 0 ) { unitario = { u: u/abs, v: v/abs, w: w/abs } } else { unitario = { u: 0, v: 0, w: 0 } }
        }
    }
    let mapeamento
    if ( vetores == null ) {
        mapeamento = { vetor: null, posicionamento: { x, y, z } }
    } else {
        mapeamento = { vetor: { u: u, v: v, w: w, abs: abs, unitario: unitario }, posicionamento: { x, y, z }, cor: null }
    }
    
    //console.log( "... as coordenadas locais foram Mapeadas." )
    return mapeamento
}

function Ns( ξ, η, ζ ) {
    //console.log( "Moldando as funções de forma..." )
    let N1, N2, N3, N4, N5, N6, N7, N8
    N1 = Nf( ξ ) * Ni( η ) * Ni( ζ )
    N2 = Nf( ξ ) * Nf( η ) * Ni( ζ )
    N3 = Ni( ξ ) * Nf( η ) * Ni( ζ )
    N4 = Ni( ξ ) * Ni( η ) * Ni( ζ )

    N5 = Nf( ξ ) * Ni( η ) * Nf( ζ )
    N6 = Nf( ξ ) * Nf( η ) * Nf( ζ )
    N7 = Ni( ξ ) * Nf( η ) * Nf( ζ )
    N8 = Ni( ξ ) * Ni( η ) * Nf( ζ )
    //console.log( "... as funções de forma foram Moldadas." )
    return [ N1, N2, N3, N4, N5, N6, N7, N8 ]

    function Ni( t ) { return ( (1/2)*( 1 - t ) ) }
    function Nf( t ) { return ( (1/2)*( 1 + t ) ) }
}

function desenharCelula( esferas, pos, dx, dy, dz, cor ) {
    let material, geometria, mesh
    let r, g, b, t
    r = Math.floor( cor.r * 255 )
    g = Math.floor( cor.g * 255 )
    b = Math.floor( cor.b * 255 )
    t = cor.t
    material = new THREE.MeshPhysicalMaterial({
        color: `rgb(${r},${g},${b})`,
        wireframe: false,
        metalness: 0,
        roughness: 0,
        transparent: true,
        reflectivity: 1,
        refractionRatio: 1,
        opacity: .8
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
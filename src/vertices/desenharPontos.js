import * as THREE from '../../three.module.js'

function desenharPontos( cena, pontos, T, mt ) {
    console.log( 'Desenhando malha...'  )
    // organizando variaveis...
    let dx, dy, dz
    dx = T.dimensoes.discretas.x
    dy = T.dimensoes.discretas.y
    dz = T.dimensoes.discretas.z

    let dm = ( dx >= dy ? ( dy >= dz ? dz : dy ) : ( dx ) ) * .6

    let posicionamentoPontos = new Float32Array( pontos.length * 3 )
    let coresPontos = new Uint8Array( pontos.length * 3 )
    for ( let i in pontos ) {
        posicionamentoPontos[ ( 3 * i ) + 0 ] = pontos[i].posicionamento.x
        posicionamentoPontos[ ( 3 * i ) + 1 ] = pontos[i].posicionamento.y
        posicionamentoPontos[ ( 3 * i ) + 2 ] = pontos[i].posicionamento.z
        
        if ( pontos[i].cor == null ) {
            coresPontos[ ( 3 * i ) + 0 ] = Math.floor( 255 ) 
            coresPontos[ ( 3 * i ) + 1 ] = Math.floor( 255 ) 
            coresPontos[ ( 3 * i ) + 2 ] = Math.floor( 255 ) 
        } else {
            coresPontos[ ( 3 * i ) + 0 ] = pontos[i].cor.r * 255
            coresPontos[ ( 3 * i ) + 1 ] = pontos[i].cor.g * 255
            coresPontos[ ( 3 * i ) + 2 ] = pontos[i].cor.b * 255
        }
        
    }
    
    let pontosGeometria = new THREE.BufferGeometry()
    pontosGeometria.setAttribute( 'position', new THREE.BufferAttribute( posicionamentoPontos, 3 ) )
    pontosGeometria.setAttribute( 'color', new THREE.BufferAttribute( coresPontos, 3, true ) )
    pontosGeometria.setDrawRange( 0, pontos.length )

    let pontosMaterial = new THREE.PointsMaterial({
        vertexColors: THREE.VertexColors,
        onBeforeCompile: shader => {
            shader.fragmentShader = shader.fragmentShader.replace(
            `#include <clipping_planes_fragment>`,
            `
            if (length(gl_PointCoord - 0.5) > 0.5 ) discard; // make points round
            #include <clipping_planes_fragment>
            `
            );
        },
        size: dm*mt,
        blending: THREE.AdditiveBlending,
        transparent: true
    })


    let mesh = new THREE.Points( pontosGeometria, pontosMaterial )

    cena.add(mesh)

    console.log( '... Malha desenhada'  )
}

export default desenharPontos
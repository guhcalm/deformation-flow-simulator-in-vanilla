import * as THREE from '../../three.module.js'
import parametrizarCores from '../parametrizar cores/parametrizarCores.js'
import initCelulas from './initCelulas.js'
import desenharCelulas from './desenharCelulas.js'

function desenharGradiente( cena, malhaCelulas, malha, matrizes, raio, visibilidade ) {
    console.log( 'Desenhando gradiente...' )
    let v1 = visibilidade.v1
    let v2 = visibilidade.v2
    let v3 = visibilidade.v3
    let v4 = visibilidade.v4
    let v5 = visibilidade.v5
    let v6 = visibilidade.v6
    // organizando variaveis...
    let dx, dy, dz
    dx = malha.dimensoes.discretas.x
    dy = malha.dimensoes.discretas.y
    dz = malha.dimensoes.discretas.z

    let dm = ( dx >= dy ? ( dy >= dz ? dz : dy ) : ( dx ) )

    let posP1 = []
    let cP1 = []
    let posP2 = []
    let cP2 = []
    let posP3 = []
    let cP3 = []
    let posP4 = []
    let cP4 = []
    let posP5 = []
    let cP5 = []
    let posP6 = []
    let cP6 = []


    let pontosMaterial, pontosGeometria
    
    //if ( malhaCelulas.length == 27 ) {} else {
        let posicionamentoPontos = new Float32Array( malhaCelulas.length * 3 )
        let coresPontos = new Uint8Array( malhaCelulas.length * 3 )
        for ( let i in malhaCelulas ) {
            posicionamentoPontos[ ( 3 * i ) + 0 ] = malhaCelulas[i].posicionamento.x
            posicionamentoPontos[ ( 3 * i ) + 1 ] = malhaCelulas[i].posicionamento.y
            posicionamentoPontos[ ( 3 * i ) + 2 ] = malhaCelulas[i].posicionamento.z
            
            if ( malhaCelulas[i].vetor == null ) {
                let r, g, b
                r = 217
                g = 164
                b = 84
                coresPontos[ ( 3 * i ) + 0 ] = Math.floor( r ) 
                coresPontos[ ( 3 * i ) + 1 ] = Math.floor( g ) 
                coresPontos[ ( 3 * i ) + 2 ] = Math.floor( b )

                pontosMaterial = new THREE.PointsMaterial({
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
                    size: dm*.03,
                    //blending: THREE.AdditiveBlending,
                    transparent: true,
                    opacity: .5
                })
            } else {
                
                let min, max, ut, cor
                min = matrizes.vetores.min
                max = matrizes.vetores.max
                ut =  malhaCelulas[i].vetor.abs
                cor = parametrizarCores( min, max, ut )


                let t = cor.t
                let intervalo = 1 / 6

                if ( t >= 0 && t < 1 * intervalo ) {
                    posP1.push( malhaCelulas[i].posicionamento.x )
                    posP1.push( malhaCelulas[i].posicionamento.y )
                    posP1.push( malhaCelulas[i].posicionamento.z )
                    cP1.push( cor.r * 255 )
                    cP1.push( cor.g * 255 )
                    cP1.push( cor.b * 255 )
                }
                if ( t >= 1 * intervalo && t < 2 * intervalo ) {
                    posP2.push( malhaCelulas[i].posicionamento.x )
                    posP2.push( malhaCelulas[i].posicionamento.y )
                    posP2.push( malhaCelulas[i].posicionamento.z )
                    cP2.push( cor.r * 255 )
                    cP2.push( cor.g * 255 )
                    cP2.push( cor.b * 255 )
                }
                if ( t >= 2 * intervalo && t < 3 * intervalo ) {
                    posP3.push( malhaCelulas[i].posicionamento.x )
                    posP3.push( malhaCelulas[i].posicionamento.y )
                    posP3.push( malhaCelulas[i].posicionamento.z )
                    cP3.push( cor.r * 255 )
                    cP3.push( cor.g * 255 )
                    cP3.push( cor.b * 255 )
                    
                }
                if ( t >= 3 * intervalo && t <= 4 * intervalo ) { 
                    posP4.push( malhaCelulas[i].posicionamento.x )
                    posP4.push( malhaCelulas[i].posicionamento.y )
                    posP4.push( malhaCelulas[i].posicionamento.z )
                    cP4.push( cor.r * 255 )
                    cP4.push( cor.g * 255 )
                    cP4.push( cor.b * 255 )
                    
                }
                if ( t > 4 * intervalo && t <= 5 * intervalo ) { 
                    posP5.push( malhaCelulas[i].posicionamento.x )
                    posP5.push( malhaCelulas[i].posicionamento.y )
                    posP5.push( malhaCelulas[i].posicionamento.z )
                    cP5.push( cor.r * 255 )
                    cP5.push( cor.g * 255 )
                    cP5.push( cor.b * 255 )
                    
                }
                if ( t > 5 * intervalo && t <= 6 * intervalo ) { 
                    posP6.push( malhaCelulas[i].posicionamento.x )
                    posP6.push( malhaCelulas[i].posicionamento.y )
                    posP6.push( malhaCelulas[i].posicionamento.z )
                    cP6.push( cor.r * 255 )
                    cP6.push( cor.g * 255 )
                    cP6.push( cor.b * 255 )
                    
                }
            }
            
        }

        if ( malhaCelulas[0].vetor == null ) {
        pontosGeometria = new THREE.BufferGeometry()
        pontosGeometria.setAttribute( 'position', new THREE.BufferAttribute( posicionamentoPontos, 3 ) )
        pontosGeometria.setAttribute( 'color', new THREE.BufferAttribute( coresPontos, 3, true ) )
        pontosGeometria.setDrawRange( 0, malhaCelulas.length )
        let mesh = new THREE.Points( pontosGeometria, pontosMaterial )
        cena.add(mesh)

        } else {
            let intervalo = 1 / 6
            let pg1, pg2, pg3, pg4, pg5, pg6
            let pm1, pm2, pm3, pm4, pm5, pm6
            pg1 = new THREE.BufferGeometry()
            pg1.setAttribute( 'position', new THREE.Float32BufferAttribute( posP1, 3 ) )
            pg1.setAttribute( 'color', new THREE.Uint8BufferAttribute( cP1, 3, true ) )
            pg1.setDrawRange( 0, posP1.length )

            pg2 = new THREE.BufferGeometry()
            pg2.setAttribute( 'position', new THREE.Float32BufferAttribute( posP2, 3 ) )
            pg2.setAttribute( 'color', new THREE.Uint8BufferAttribute( cP2, 3, true ) )
            pg2.setDrawRange( 0, posP2.length )

            pg3 = new THREE.BufferGeometry()
            pg3.setAttribute( 'position', new THREE.Float32BufferAttribute( posP3, 3 ) )
            pg3.setAttribute( 'color', new THREE.Uint8BufferAttribute( cP3, 3, true ) )
            pg3.setDrawRange( 0, posP3.length )

            pg4 = new THREE.BufferGeometry()
            pg4.setAttribute( 'position', new THREE.Float32BufferAttribute( posP4, 3 ) )
            pg4.setAttribute( 'color', new THREE.Uint8BufferAttribute( cP4, 3, true ) )
            pg4.setDrawRange( 0, posP4.length )

            pg5 = new THREE.BufferGeometry()
            pg5.setAttribute( 'position', new THREE.Float32BufferAttribute( posP5, 3 ) )
            pg5.setAttribute( 'color', new THREE.Uint8BufferAttribute( cP5, 3, true ) )
            pg5.setDrawRange( 0, posP5.length )

            pg6 = new THREE.BufferGeometry()
            pg6.setAttribute( 'position', new THREE.Float32BufferAttribute( posP6, 3 ) )
            pg6.setAttribute( 'color', new THREE.Uint8BufferAttribute( cP6, 3, true ) )
            pg6.setDrawRange( 0, posP6.length )

            pm1 = new THREE.PointsMaterial({
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
                size: dm*raio,
                //blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: ( intervalo * 1 ),
                visible: v1
            })
            pm2 = new THREE.PointsMaterial({
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
                size: dm*raio,
                //blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: ( intervalo * 2 ),
                visible: v2
            })
            pm3 = new THREE.PointsMaterial({
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
                size: dm*raio,
                //blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: ( intervalo * 3 ),
                visible: v3
            })
            pm4 = new THREE.PointsMaterial({
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
                size: dm*raio,
                //blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: ( intervalo * 4 ),
                visible: v4
            }) 
            pm5 = new THREE.PointsMaterial({
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
                size: dm*raio,
                //blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: ( intervalo * 5 ),
                visible: v5
            })
            pm6 = new THREE.PointsMaterial({
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
                size: dm*raio,
                //blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: ( intervalo * 6 ),
                visible: v6
            })


            let mesh1 = new THREE.Points( pg1, pm1 )
            let mesh2 = new THREE.Points( pg2, pm2 )
            let mesh3 = new THREE.Points( pg3, pm3 )
            let mesh4 = new THREE.Points( pg4, pm4 )
            let mesh5 = new THREE.Points( pg5, pm5 )
            let mesh6 = new THREE.Points( pg6, pm6 )
            
            cena.add(mesh1)
            cena.add(mesh2)
            cena.add(mesh3)
            cena.add(mesh4)
            cena.add(mesh5)
            cena.add(mesh6)
        }
        
    
    
        
    
   // }
    
    console.log( '... Gradiente desenhado'  )
}


export default desenharGradiente
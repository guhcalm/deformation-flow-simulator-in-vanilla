import * as THREE from '../../three.module.js'

function desenharVetores( estrutura, pontos, malha ) {
    console.log( 'Desenhando vetores...'  )
    // organizando variaveis...
    let dx, dy, dz
    dx = malha.dimensoes.discretas.x
    dy = malha.dimensoes.discretas.y
    dz = malha.dimensoes.discretas.z

    let dm = ( dx >= dy ? ( dy >= dz ? dz : dy ) : ( dx ) ) * .5

    let posicionamentoVetores = new Float32Array( pontos.length * 3 * 2 )
    let coresVetores = new Uint8Array( pontos.length * 3 * 2 )

    for ( let i in pontos ) {
        let nx, ny, nz
        
        nx = pontos[i].vetor.normalizado.nx * dm 
        ny = pontos[i].vetor.normalizado.ny * dm
        nz = pontos[i].vetor.normalizado.nz * dm

        posicionamentoVetores[ ( 6 * i ) + 0 ] = pontos[i].posicionamento.x
        posicionamentoVetores[ ( 6 * i ) + 1 ] = pontos[i].posicionamento.y
        posicionamentoVetores[ ( 6 * i ) + 2 ] = pontos[i].posicionamento.z

        posicionamentoVetores[ ( 6 * i ) + 3 ] = pontos[i].posicionamento.x + nx
        posicionamentoVetores[ ( 6 * i ) + 4 ] = pontos[i].posicionamento.y + ny
        posicionamentoVetores[ ( 6 * i ) + 5 ] = pontos[i].posicionamento.z + nz
        

        coresVetores[ ( 6 * i ) + 0 ] = pontos[i].cor.r * 255
        coresVetores[ ( 6 * i ) + 1 ] = pontos[i].cor.g * 255
        coresVetores[ ( 6 * i ) + 2 ] = pontos[i].cor.b * 255

        coresVetores[ ( 6 * i ) + 3 ] = pontos[i].cor.r * 255
        coresVetores[ ( 6 * i ) + 4 ] = pontos[i].cor.g * 255
        coresVetores[ ( 6 * i ) + 5 ] = pontos[i].cor.b * 255

    }
    
    let vetoresGeometria = new THREE.BufferGeometry()
    vetoresGeometria.setAttribute( 'position', new THREE.BufferAttribute( posicionamentoVetores, 3 ) )
    vetoresGeometria.setAttribute( 'color', new THREE.BufferAttribute( coresVetores, 3, true ) )
    vetoresGeometria.setDrawRange( 0, pontos.length * 2 )

    let vetoresMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
		blending: THREE.AdditiveBlending,
		transparent: true
    })


    let mesh = new THREE.LineSegments( vetoresGeometria, vetoresMaterial )

    estrutura.add(mesh)

    console.log( '... Vetores desenhados'  )
}

export default desenharVetores
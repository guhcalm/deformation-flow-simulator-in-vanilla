import * as THREE from '../../three.module.js'

function desenharConexoes( cena, conexoes ) {
    console.log( 'Desenhando conexoes...'  )
    let index = 0
    let indexcores = 0
    let posicionamentoConexoes = new Float32Array( conexoes.length * 6 )
    let coresConexao = new Uint8Array( conexoes.length * 6 )
    let conexoesMaterial

    for ( let i in conexoes ) {
        posicionamentoConexoes[ index++ ] = conexoes[i].pontoA.pos[0]
        posicionamentoConexoes[ index++ ] = conexoes[i].pontoA.pos[1]
        posicionamentoConexoes[ index++ ] = conexoes[i].pontoA.pos[2]

        posicionamentoConexoes[ index++ ] = conexoes[i].pontoB.pos[0]
        posicionamentoConexoes[ index++ ] = conexoes[i].pontoB.pos[1]
        posicionamentoConexoes[ index++ ] = conexoes[i].pontoB.pos[2]

        if ( conexoes[i].pontoA.cor == null ) {
            let r, g, b
            r = 217
            g = 164
            b = 84
            coresConexao[ indexcores ++ ] = r
            coresConexao[ indexcores ++ ] = g
            coresConexao[ indexcores ++ ] = b

            coresConexao[ indexcores ++ ] = r
            coresConexao[ indexcores ++ ] = g
            coresConexao[ indexcores ++ ] = b

            conexoesMaterial = new THREE.LineBasicMaterial({
                color: 'rgb( 217, 164, 84 )',
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: .1
            })
        } else {
            coresConexao[ indexcores ++ ] = conexoes[i].pontoA.cor.r * 255
            coresConexao[ indexcores ++ ] = conexoes[i].pontoA.cor.g * 255
            coresConexao[ indexcores ++ ] = conexoes[i].pontoA.cor.b * 255

            coresConexao[ indexcores ++ ] = conexoes[i].pontoB.cor.r * 255
            coresConexao[ indexcores ++ ] = conexoes[i].pontoB.cor.g * 255
            coresConexao[ indexcores ++ ] = conexoes[i].pontoB.cor.b * 255

            conexoesMaterial = new THREE.LineBasicMaterial({
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: .1
            })
        }

        
    }
    let conexoesGeometria = new THREE.BufferGeometry()
    conexoesGeometria.setAttribute( 'position', new THREE.BufferAttribute( posicionamentoConexoes, 3 ) )
    conexoesGeometria.setAttribute( 'color', new THREE.BufferAttribute( coresConexao, 3, true ) )
    conexoesGeometria.setDrawRange( 0, conexoes.length*6 )
    
    let conexoesMesh = new THREE.LineSegments( conexoesGeometria, conexoesMaterial )
    cena.add(conexoesMesh)

    console.log( '... Conexoes desenhadas' )
}

export default desenharConexoes
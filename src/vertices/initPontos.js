function initPontos( malha ) {
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

    // iniciando criação de pontos...
    let pontos = []
    let index = 0
    for ( let x = 0; x <= ux ; x++ ) {
        for ( let y = 0; y <= uy ; y++ ) {
            for ( let z = 0; z <= uz ; z++ ) {

                let fx, fy, fz
                
                let r = 1
                fx = r*( x * dx )
                fy = r*( y * dy )
                fz = r*( z * dz )

                let identificador, posicionamento, conexoes
                identificador = index++
                posicionamento = { x: fx, y: fy, z: fz }
                conexoes = { identificador: [] }

                let ponto = { identificador, posicionamento, conexoes, vetor: null, cor: null }

                pontos.push( ponto )


            }
        }
    }
    // ...finalizando criação de pontos
    return pontos
}

export default initPontos
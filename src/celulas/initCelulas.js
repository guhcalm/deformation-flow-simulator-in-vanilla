function initCelulas( malha ) {
    console.log( 'Criando Celulas...' )
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

    // iniciando criação de celulas...
    let celulas = []
    let index = 0
    for ( let x = 0; x < ux ; x++ ) {
        for ( let y = 0; y < uy ; y++ ) {
            for ( let z = 0; z < uz ; z++ ) {
                let fx, fy, fz
                
                fx = ( x * dx ) + dx/2
                fy = ( y * dy ) + dy/2
                fz = ( z * dz ) + dz/2

                let identificador, posicionamento, conexoes
                identificador = index++
                posicionamento = { x: fx, y: fy, z: fz }
                conexoes = []

                let celula = { identificador, posicionamento, conexoes, vertices: null, vetores: null }

                celulas.push( celula )
            }
        }
    }
    // ...finalizando criação de celulas
    console.log( '... Celulas criadas.' )
    return celulas
}
export default initCelulas
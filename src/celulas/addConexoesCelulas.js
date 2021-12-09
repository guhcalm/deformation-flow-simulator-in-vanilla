function addConexoesCelulas( malha, pontos, celulas ) {
    console.log( "Adicionando conexões nas Celulas..." )
    // organizando variaveis...
    let dx, dy, dz
    dx = malha.dimensoes.discretas.x
    dy = malha.dimensoes.discretas.y
    dz = malha.dimensoes.discretas.z
    let maximaDistancia = Math.sqrt( dx * dx + dy * dy + dz * dz ) / 2
    // ... variaveis organizadas.

    for ( let celula of celulas ) {
        for ( let ponto of pontos ) {
            let dx, dy, dz, lo
            dx = celula.posicionamento.x - ponto.posicionamento.x
            dy = celula.posicionamento.y - ponto.posicionamento.y
            dz = celula.posicionamento.z - ponto.posicionamento.z
            lo = Math.sqrt( dx * dx + dy * dy + dz * dz )
            if ( lo <= maximaDistancia ) {
                celula.conexoes.push( ponto )
            }
        }
    }

    console.log( "... as conexoes das Celulas foram adicionadas." )
    return celulas
}
export default addConexoesCelulas


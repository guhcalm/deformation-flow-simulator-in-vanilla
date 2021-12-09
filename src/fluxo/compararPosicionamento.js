function compararPosicionamento( parametros, agente, malha, malhaCelulas ) {
    //console.log( "O agente está coletando dados da malha...", parametros, malha )
    let lx, ly, lz
    lx = malha.dimensoes.discretas.x / (parametros.refinamento.x*2)
    ly = malha.dimensoes.discretas.y / (parametros.refinamento.y*2)
    lz = malha.dimensoes.discretas.z / (parametros.refinamento.z*2)
    let maxdist = Math.sqrt( lx * lx + ly * ly + lz * lz )/2
    //console.log( maxdist, malha.dimensoes.discretas, lx, ly, lz )
    for ( let celula of malhaCelulas ) {
        
        let dx, dy, dz, d
        dx = agente.pos.x - celula.posicionamento.x
        dy = agente.pos.y - celula.posicionamento.y
        dz = agente.pos.z - celula.posicionamento.z
        d = Math.sqrt( dx * dx + dy * dy + dz * dz )
        if ( d < maxdist ) {
            let unitario =  Object.assign( {}, celula.vetor.unitario )
            agente.vetor = unitario
            agente.vetor.u *= .2
            agente.vetor.v *= .2
            agente.vetor.w *= .2
            agente.cor = celula.cor
        }
    }
    //console.log( "... o agente coletou dados da malha" )
    return agente
}

export default compararPosicionamento
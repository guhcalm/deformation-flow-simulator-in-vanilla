function verificarPosicionamentoAgente( posi, posf, cor, agente, malha ) {
    //console.log( "Comparando posição do agente com os limites da malha...")
    let dx, dy, dz
    dx = malha.dimensoes.totais.x
    dy = malha.dimensoes.totais.y
    dz = malha.dimensoes.totais.z
    if ( posf.x <= 0 || posf.x >= dx || posf.y <= 0 || posf.y >= dy || posf.z <= 0 || posf.z >= dz ) {
        //console.log( "ForaDosLimites!, resetando posição do agente..." )
        agente.pos = null
        //console.log( "... a posição do agente foi resetada." )
    } else {
        //console.log( "Atualizando o Caminho percorrido pelo agente..." )
        agente.path.push( { posi: posi, posf: posf, cor: cor } )
        //console.log( "... o Caminho percorrido pelo agente foi atualizado" )
    }

    //console.log( "... foi comparada a posição do agente com os limites da malha.")
    return agente
}

export default verificarPosicionamentoAgente
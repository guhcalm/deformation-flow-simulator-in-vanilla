import compararPosicionamento from './compararPosicionamento.js'
import verificarPosicionamentoAgente from './verificarPosicionamentoAgente.js'

function moverAgente( parametros, agente , malha, malhaCelulas ) {
    //console.log( "Movendo agente..." )
    let dx, dy, dz
    dx = malha.dimensoes.totais.x
    dy = malha.dimensoes.totais.y
    dz = malha.dimensoes.totais.z

    if ( agente.pos == null ) { 
        agente.pos = { x: Math.random() * dx, y: Math.random() * dy, z: Math.random() * dz }
    }
    // armazenando a posição inicial do agente
    let posi =  Object.assign( {}, agente.pos )
    // coletando vetores da malha | agente.vector = {}, agente.color = {}
    agente = compararPosicionamento( parametros, agente, malha, malhaCelulas )
    // movendo o agente
    agente.pos.x += agente.vetor.u
    agente.pos.y += agente.vetor.v
    agente.pos.z += agente.vetor.w
    // armazenando a posição final do agente
    let posf =  Object.assign( {}, agente.pos )
    let cor =  Object.assign( {}, agente.cor )
    // verificar se o agente saiu dos limites
    agente = verificarPosicionamentoAgente( posi, posf, cor, agente, malha )    

    //console.log( "... o agente foi movido" )
    return agente
}
export default moverAgente
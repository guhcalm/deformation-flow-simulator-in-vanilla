import initAgente from './initAgente.js'
import moverAgente from './moverAgente.js'
import desenharAgente from './desenharAgente.js'

function initAgentes( agentes, estrutura, parametros, malha, malhaCelulas , visibilidade ) {
    let dx, dy, dz, d
    dx = parametros.discretizador.x
    dy = parametros.discretizador.y
    dz = parametros.discretizador.z
    let rx, ry, rz, r
    rx = parametros.refinamento.x
    ry = parametros.refinamento.y
    rz = parametros.refinamento.z

    d = Math.sqrt( dx * dx + dy * dy + dz * dz )
    r = Math.sqrt( rx * rx + ry * ry + rz * rz )
    let n = (dx * dy * dz * r * 4) > 1000 ? 1000 : (dx * dy * dz * r * 4)

    agentes = []
    for ( let item = 0; item < n; item++ ) {
        let agente = initAgente()
        let passo = Math.floor(Math.random() * 90 + 10)
        for ( let i = 0; i <= passo ; i++) { agente = moverAgente( parametros, agente, malha, malhaCelulas ) }
        agentes.push( agente )
    }
    for ( let agente of agentes ) { agente = desenharAgente( estrutura, agente, visibilidade ) }

    console.log( 'Dados malhaCelulas' )
    return agentes
}

export default initAgentes
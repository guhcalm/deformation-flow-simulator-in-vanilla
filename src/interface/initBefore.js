import criarElemento from "./criarElemento.js"
import { ajustarMalha } from "../../main.js"
import navegarPontos from './navegarPontos.js'

function initBefore( body, navLinks, rodar ) {
    let before = criarElemento( 'div', { class: 'before' } )
    before.append( '❮' )
    before.addEventListener( 'click', event => executarBefore( event.target, navLinks, rodar ) )  
    body.append( before )
    return before
}
function executarBefore( target, navLinks, rodar ) {
    if ( rodar.y == 0 || rodar.z == 0  ) {
        ajustarMalha()
        navegarPontos( navLinks[0].a, navLinks )
    } 
}
export default initBefore
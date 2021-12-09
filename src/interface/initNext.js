import criarElemento from "./criarElemento.js"
import { 
    cfgRefinamentoGradiente, 
    cfgRefinamentoFluxo, 
    desenharMalhaCalculada, 
    calcularMalha, 
    desenharFluxo, 
    desenharMalhaDeformada 
} from "../../main.js"
import navegarPontos from './navegarPontos.js'
function initNext( body, matrizes, navLinks, rodar ) {
    let next = criarElemento( 'div', { class: 'next' } )
    next.append( '❯' )
    next.addEventListener( 'click', event => executarNext( navLinks, matrizes, rodar ) ) 
    body.append( next )
    return next
}
function executarNext( navLinks, matrizes, rodar ) {
    if ( matrizes == null ) {
        calcularMalha()
        navegarPontos( navLinks[1].a, navLinks )
    } else {
        if ( rodar.x == .002 ) {
            cfgRefinamentoGradiente()
            desenharMalhaCalculada()
            navegarPontos( navLinks[2].a, navLinks )
        } 
        if ( rodar.x == .0025  ) {
            cfgRefinamentoFluxo()
            desenharFluxo()
            navegarPontos( navLinks[3].a, navLinks )
        } 
        if ( rodar.x == .003  ) {
            desenharMalhaDeformada()
            navegarPontos( navLinks[4].a, navLinks )
        } 
    }
}
export default initNext
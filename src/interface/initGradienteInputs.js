import criarElemento from "./criarElemento.js"
import { cfgRefinamentoGradiente, desenharMalhaCalculada } from "../../main.js"
import navegarPontos from './navegarPontos.js'
function initGradienteInputs( body, parametros, navLinks ) {
    let gradiente = criarElemento( 'div', { class: 'gradiente' } )
    body.append( gradiente )

    let labels = []
    let inputs = []
    for ( let i = 1; i <= 6; i++ ) {
        let gradienteItem, gradienteLabel, gradienteInput

        gradienteItem = criarElemento( 'div', { class: 'gradiente-itens' } )
        gradienteInput = criarElemento( 'input', { 
            class: 'gradiente-input', 
            type: 'checkbox', 
            id: `v${i}`, 
            checked: `checked`
        } )
        gradienteLabel = criarElemento( 'label', { 
            for: `v${i}`,
            id: `v${i}`, 
            class: `gradiente-label v${i}` 
        } )

        gradienteItem.append( gradienteInput )
        gradienteItem.append( gradienteLabel )
        gradiente.append( gradienteItem )

        labels.push( gradienteLabel )
        inputs.push( gradienteInput )
    }

    let v1, v2, v3, v4, v5, v6
    v1 = inputs[0]
    v2 = inputs[1]
    v3 = inputs[2]
    v4 = inputs[3]
    v5 = inputs[4]
    v6 = inputs[5]

    v1.addEventListener( 'input', event => { 
        parametros.visibilidade.v1 = event.target.checked; 
        cfgRefinamentoGradiente(); 
        desenharMalhaCalculada(); 
        navegarPontos( navLinks[2].a, navLinks ) 
    } )

    v2.addEventListener( 'input', event => { 
        parametros.visibilidade.v2 = event.target.checked; 
        cfgRefinamentoGradiente(); 
        desenharMalhaCalculada(); 
        navegarPontos( navLinks[2].a, navLinks ) 
    } )

    v3.addEventListener( 'input', event => { 
        parametros.visibilidade.v3 = event.target.checked; 
        cfgRefinamentoGradiente(); 
        desenharMalhaCalculada(); 
        navegarPontos( navLinks[2].a, navLinks ) 
    } )

    v4.addEventListener( 'input', event => { 
        parametros.visibilidade.v4 = event.target.checked; 
        cfgRefinamentoGradiente(); 
        desenharMalhaCalculada(); 
        navegarPontos( navLinks[2].a, navLinks ) 
    } )

    v5.addEventListener( 'input', event => { 
        parametros.visibilidade.v5 = event.target.checked; 
        cfgRefinamentoGradiente(); 
        desenharMalhaCalculada(); 
        navegarPontos( navLinks[2].a, navLinks ) 
    } )

    v6.addEventListener( 'input', event => { 
        parametros.visibilidade.v6 = event.target.checked; 
        cfgRefinamentoGradiente(); 
        desenharMalhaCalculada(); 
        navegarPontos( navLinks[2].a, navLinks ) 
    } )
    return gradiente
}

export default initGradienteInputs
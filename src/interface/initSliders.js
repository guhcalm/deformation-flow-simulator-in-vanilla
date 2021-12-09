import criarElemento from "./criarElemento.js"
import { ajustarMalha } from "../../main.js"

function initSliders( body, parametros ) {
    let dx, dy, dz, tx, ty, tz, form, cfg
    form = criarElemento( 'div', { class: 'form' } )
    body.append( form )
    

    if ( parametros.mode == 'manual' ) {
        cfg = initSlider( form, 5 )
        cfg.addEventListener( 'input', event => { 
            parametros.cfg = event.target.value; 
            ajustarMalha() 
        } )
    } else {
        dx = initSlider( form, 10 )
        dy = initSlider( form, 10 )
        dz = initSlider( form, 10 )

        tx = initSlider( form, 4 )
        ty = initSlider( form, 4 )
        tz = initSlider( form, 4 )

        dx.addEventListener( 'input', event => { parametros.dimensoes.x = event.target.value; ajustarMalha() } )
        dy.addEventListener( 'input', event => { parametros.dimensoes.y = event.target.value; ajustarMalha() } )
        dz.addEventListener( 'input', event => { parametros.dimensoes.z = event.target.value; ajustarMalha() } )
        tx.addEventListener( 'input', event => { parametros.discretizador.x = event.target.value; ajustarMalha() } )
        ty.addEventListener( 'input', event => { parametros.discretizador.y = event.target.value; ajustarMalha() } )
        tz.addEventListener( 'input', event => { parametros.discretizador.z = event.target.value; ajustarMalha() } )
    }
    
}
function initSlider( form, range ) {
    let input, box
    box = criarElemento( 'div', { class: 'box' } )
    input = criarElemento( 'input', {
        class: 'input',
        type: 'range',
        min: '1',
        max: `${range}`,
        value: '1',
        steps: '1'
    })
    form.append( box )
    box.append( input )
    return input
}
export default initSliders
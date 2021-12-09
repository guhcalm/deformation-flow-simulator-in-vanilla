import criarElemento from "./criarElemento.js"

function initNav( body, parametros ) {
    let etapas = parametros.etapas
    let nav = criarElemento( 'nav', { class: 'nav' } )
    let navLinks = []
    let index = 0
    for ( let item of etapas ) {
        let navItem, a, span
        navItem = criarElemento( 'div', { class: `nav-item` } )
        
        if ( index == 0 ) {
            a = criarElemento( 'a', { class: `nav-link nav-link-selected`, href: `#` } )
        } else {
            a = criarElemento( 'a', { class: `nav-link`, href: `#` } )
        }
        
        span = criarElemento( 'span', { class: 'nav-label' } )
        span.append( etapas[index].titulo )

        navItem.append( a )
        navItem.append( span )
        nav.append( navItem )

        navLinks.push( { a, span } )
        index++
    }
    for ( let item of navLinks ) {
        item.a.addEventListener( 'click', event => { navegarPontos( event.target, navLinks ) } )
    }
    body.append( nav )
    return navLinks
}
export default initNav
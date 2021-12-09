function navegarPontos( target, links ) {
    for ( let link of links ) { link.a.setAttribute( 'class', `nav-link` ) }
    target.setAttribute( 'class', `nav-link nav-link-selected` )
}
export default navegarPontos
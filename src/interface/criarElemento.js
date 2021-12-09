function criarElemento( nome, atributos ) {
    const elemento = document.createElement( nome )
    const atributosAsArrays = Object.entries( atributos )
    atributosAsArrays.forEach( ([ key, valor ]) => elemento.setAttribute( key, valor ) )
    return elemento
}
export default criarElemento

function adicionarVetoresNosPontos( pontos, matrizes ) {
    console.log( 'Adicionando Vetores U aos pontos...' )
    for ( let i in pontos ) {
        pontos[i].vetor = matrizes.vetores.vetores[i].vetor
    }
    console.log( '... foram adicionandos Vetores U aos pontos.' )
    return pontos
}
export default adicionarVetoresNosPontos
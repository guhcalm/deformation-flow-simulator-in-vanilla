import parametrizarCores from '../parametrizar cores/parametrizarCores.js'

function adicionarCoresNosPontos( pontos, matrizes ) {
    console.log( 'Adicionando Cores aos pontos...' )
    for ( let i in pontos ) {
        let min, max, ut
        min = matrizes.vetores.min
        max = matrizes.vetores.max
        ut = pontos[i].vetor.abs
        pontos[i].cor = parametrizarCores( min, max, ut )
    }
    console.log( '... foram adicionandos Cores aos pontos.' )
    return pontos
}

export default adicionarCoresNosPontos
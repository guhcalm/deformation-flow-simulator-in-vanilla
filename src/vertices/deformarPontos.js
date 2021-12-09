function deformarPontos( pontos ) {
    for ( let i in pontos ) {
        let u, v, w
        
        u = pontos[i].vetor.u
        v = pontos[i].vetor.v
        w = pontos[i].vetor.w

        pontos[i].posicionamento.x += u
        pontos[i].posicionamento.y += v
        pontos[i].posicionamento.z += w
    }
    return pontos
}
export default deformarPontos
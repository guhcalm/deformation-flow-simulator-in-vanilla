function initConexoes( pontos ) {
    let conexoes = []
    for ( let a of pontos ) {
        for ( let b of pontos ) {
            for ( let i in b.conexoes.identificador ) {
                if ( a.identificador == b.conexoes.identificador[i] ) {
                    let inicio
                    let final
                    if ( a.identificador < b.identificador ) {
                        inicio = a
                        final = b
                    } else {
                        inicio = b
                        final = a
                    }

                    let pontoA, pontoB
                    pontoA = { 
                        id: inicio.identificador,
                        pos: [ inicio.posicionamento.x , inicio.posicionamento.y , inicio.posicionamento.z ],
                        cor: inicio.cor
                    }
                    pontoB = { 
                        id: final.identificador, 
                        pos: [ final.posicionamento.x , final.posicionamento.y , final.posicionamento.z ],
                        cor: final.cor
                    }
                    conexoes.push( { pontoA, pontoB, nc: `${inicio.identificador}|${final.identificador}` } )
                }
            }
        }
    }
    return conexoes
}

export default initConexoes
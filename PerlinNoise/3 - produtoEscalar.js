import { hash, gradiente } from './2 - permutar.js'

const produtoEscalar = ( coordenadas  ) => {
    // Produto Escalar
    const produtoEscalar = produto.produto( 
        coordenadas.inteira.inicial, 
        coordenadas.inteira.final, 
        coordenadas.fracionada.inicial, 
        coordenadas.fracionada.final 
    )
    return produtoEscalar
}

const produto = {
    produto: function( int0, int1, f0, f1 ) {
        return {
            ponto1: gradiente( hash( int0.x, int0.y, int0.z ), f0.x, f0.y, f0.z ),
            ponto2: gradiente( hash( int0.x, int0.y, int1.z ), f0.x, f0.y, f1.z ),

            ponto3: gradiente( hash( int0.x, int1.y, int0.z ), f0.x, f1.y, f0.z ),
            ponto4: gradiente( hash( int0.x, int1.y, int1.z ), f0.x, f1.y, f1.z ),

            ponto5: gradiente( hash( int1.x, int0.y, int0.z ), f1.x, f0.y, f0.z ),
            ponto6: gradiente( hash( int1.x, int0.y, int1.z ), f1.x, f0.y, f1.z ),

            ponto7: gradiente( hash( int1.x, int1.y, int0.z ), f1.x, f1.y, f0.z ),
            ponto8: gradiente( hash( int1.x, int1.y, int1.z ), f1.x, f1.y, f1.z )
        }
    }
}

export default produtoEscalar


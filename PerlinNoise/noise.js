import coletarCoordenadas from './1 - coletarCoordenadas.js'
import interpolar from './4 - interpolar.js'
import produtoEscalar from './3 - produtoEscalar.js'


function Noise( x , y , z ) {
    // 1 - Coletar coordenadas
    const coordenadas = coletarCoordenadas( x , y , z )

    // 2 - Permutar | 3 - Produto escalar
    const escalar = produtoEscalar( coordenadas )

    // 4 - Interpolação
    const interpolado = interpolar( coordenadas.suavizada , escalar )

    //noise
    return interpolado
}

export default Noise
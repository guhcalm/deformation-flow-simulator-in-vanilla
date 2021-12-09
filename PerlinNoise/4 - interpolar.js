const interpolar = ( suavizada, produtoEscalar ) => {
    //Interpolar em Z
    let interpolarZ = interpolarProto.interpolarZ( suavizada, produtoEscalar )
    // Interpolar em Y
    let interpolarY = interpolarProto.interpolarY( suavizada, interpolarZ )
    // Interpolar em X
    let interpolarX = interpolarProto.interpolarX( suavizada, interpolarY )
    return interpolarProto.scale(0.936 * ( interpolarX ) )
}

const interpolarProto = {
    interpolar: function( suavizada, pontoA, pontoB ) {
        let valorInterpolado = ( pontoA + suavizada * ( pontoB - pontoA ) )
        return valorInterpolado
    },
    interpolarZ: function( suave, produtoEscalar ) {
        return {
            z1: this.interpolar( suave.z, produtoEscalar.ponto1, produtoEscalar.ponto2 ),
            z2: this.interpolar( suave.z, produtoEscalar.ponto3, produtoEscalar.ponto4 ),
            z3: this.interpolar( suave.z, produtoEscalar.ponto5, produtoEscalar.ponto6 ),
            z4: this.interpolar( suave.z, produtoEscalar.ponto7, produtoEscalar.ponto8 ),
        }
    },
    interpolarY: function( suave, interpolarZ ) {
        return {
            y1: this.interpolar( suave.y, interpolarZ.z1, interpolarZ.z2 ),
            y2: this.interpolar( suave.y, interpolarZ.z3, interpolarZ.z4 )
        }
    },
    interpolarX: function( suave, interpolarY ) {
        return ( this.interpolar( suave.x, interpolarY.y1, interpolarY.y2 ))
    },
    scale: function ( n ) {
        return (1 + n) / 2
    }
}

export default interpolar
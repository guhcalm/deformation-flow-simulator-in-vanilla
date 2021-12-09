import coletarCoordenadas from "./coordenadasProto.js.js";

const i = coletarCoordenadas( 10.5, 10.5, 10.5 )

console.log(i)


/*

Noise.prototype = {
    perlinNoise: function() {
        //Coletar valor Inteiro
        let inteiro1 = this.inteiro1( this.i, this.j, this.k )
        let inteiro1Corrigido = this.inteiroCorrigido( inteiro1 )
        let inteiro2 = this.inteiro2( inteiro1 )
        let inteiro2Corrigido = this.inteiroCorrigido( inteiro2 )
        //Coletar valor Fracionado
        let fracionado1 = this.fracionado( inteiro1 )
        let fracionado2 = this.fracionado( inteiro2 )
        // Suavização de Coordenada
        let suavizada = this.suavizar( fracionado1 )
        // Produto Escalar 
        let produtoEscalar = this.produtoEscalar( inteiro1Corrigido, inteiro2Corrigido, fracionado1, fracionado2 )
        // Interpolar em Z
        let interpolarZ = this.interpolarZ( suavizada, produtoEscalar )
        // Interpolar em Y
        let interpolarY = this.interpolarY( suavizada, interpolarZ )
        // Interpolar em X
        let interpolarX = this.interpolarX( suavizada, interpolarY )
        return this.scale(0.936 * ( interpolarX ) )
    },
    inteiro1: function( x, y, z ) {
        return {
            x: Math.floor( x ),
            y: Math.floor( y ),
            z: Math.floor( z )
        }
    },
    inteiro2: function( inteiro ) {
        return {
            x: inteiro.x + 1,
            y: inteiro.y + 1,
            z: inteiro.z + 1
        }
    },
    inteiroCorrigido: function( inteiro ) {
        return {
            x: inteiro.x & 0xff,
            y: inteiro.y & 0xff,
            z: inteiro.z & 0xff
        }
    },
    fracionado: function( inteiro ) {
        return {
            x: this.i - inteiro.x,
            y: this.j - inteiro.y,
            z: this.k - inteiro.z
        }
    },
    suavizador: function( t ) {
       return ( t * t * t * ( t * ( t * 6 - 15 ) + 10 ) )
    },
    suavizar: function ( fracionado ) {
        return {
            x: this.suavizador( fracionado.x ),
            y: this.suavizador( fracionado.y ),
            z: this.suavizador( fracionado.z ),
        }
    },
    hash: function( x, y, z ) {
        let hash = perm[ x + perm[ y + perm[ z ] ] ]
        return hash
    },
    gradiente: function( hash, x , y , z ) {
        let h = hash & 15
        let u = h<8 ? x : y
        let v = h<4 ? y : h ==12 || h == 14 ? x : z
        return (( (h&1) ? -u : u ) + ( (h&2) ? -v : v ))
    },
    produtoEscalar: function( int0, int1, f0, f1 ) {
        return {
            ponto1: this.gradiente( this.hash( int0.x, int0.y, int0.z ), f0.x, f0.y, f0.z ),
            ponto2: this.gradiente( this.hash( int0.x, int0.y, int1.z ), f0.x, f0.y, f1.z ),

            ponto3: this.gradiente( this.hash( int0.x, int1.y, int0.z ), f0.x, f1.y, f0.z ),
            ponto4: this.gradiente( this.hash( int0.x, int1.y, int1.z ), f0.x, f1.y, f1.z ),

            ponto5: this.gradiente( this.hash( int1.x, int0.y, int0.z ), f1.x, f0.y, f0.z ),
            ponto6: this.gradiente( this.hash( int1.x, int0.y, int1.z ), f1.x, f0.y, f1.z ),

            ponto7: this.gradiente( this.hash( int1.x, int1.y, int0.z ), f1.x, f1.y, f0.z ),
            ponto8: this.gradiente( this.hash( int1.x, int1.y, int1.z ), f1.x, f1.y, f1.z )
        }
    },
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
 
export default Noise
*/
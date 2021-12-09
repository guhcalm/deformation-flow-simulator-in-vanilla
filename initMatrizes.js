function initMatrizes( pontos, conexoes, f, u, rigidez ) {
    console.log( conexoes )
    let numeroPontos = pontos.length
    let grausLiberdade = ( numeroPontos * 3 )
    let erro = .001
    let elementos = initElementos( conexoes )
    let matrizesIndividuaisRigidez = initMatrizesIndividuais( elementos, grausLiberdade )
    let matrizGlobalRigidez = initMatrizGlobal( matrizesIndividuaisRigidez, grausLiberdade ) 
    let vetorPeso = initVetorPeso( numeroPontos, f )
    let vetorDeformada = initVetorDeformada( grausLiberdade )
    vetorDeformada = addCondicoesDeContorno( vetorDeformada, vetorPeso, numeroPontos, u )
    let matrizes
    intermediar( matrizGlobalRigidez, vetorDeformada, vetorPeso )

    function initElementos( conexoes ) {
        let elementos = []
        for ( let conexao of conexoes ) {
            let a, b, A, E, lo, k, l, m, n
            if ( conexao.pontoB.id > conexao.pontoA.id ) { 
                a = { id: conexao.pontoA.id, pos: { x: conexao.pontoA.pos[0], y: conexao.pontoA.pos[1], z: conexao.pontoA.pos[2] } }
                b = { id: conexao.pontoB.id, pos: { x: conexao.pontoB.pos[0], y: conexao.pontoB.pos[1], z: conexao.pontoB.pos[2] } } 
            } else { 
                a = { id: conexao.pontoB.id, pos: { x: conexao.pontoB.pos[0], y: conexao.pontoB.pos[1], z: conexao.pontoB.pos[2] } }
                b = { id: conexao.pontoA.id, pos: { x: conexao.pontoA.pos[0], y: conexao.pontoA.pos[1], z: conexao.pontoA.pos[2] } }
            }
            lo = Math.sqrt( ( b.pos.x-a.pos.x )**2 + ( b.pos.y-a.pos.y )**2 + ( b.pos.z-a.pos.z )**2  )
            if ( rigidez == null ) { A = 250; E = 200*(1000) } else { A = rigidez.A; E = rigidez.E; }

            k = ( ( A * E ) / ( 2 * lo ) )
            //k = 1
            l = ( b.pos.x - a.pos.x ) / lo 
            m = ( b.pos.y - a.pos.y ) / lo
            n = ( b.pos.z - a.pos.z ) / lo
            elementos.push( { id: conexao.nc, a, b, k, l, m, n } )
        }
        return elementos
    }
    function initMatrizesIndividuais( elementos, grausLiberdade ) {
        let matrizesIndividuais = []
        let index = 0
        for ( let elemento of elementos ) {
            index++
            console.log( `A matriz do elemento será construida... %c|${ index } de ${ elementos.length }| `, 'color: white; background-color: black;' )
            let c, s, kij, a, b, k, l, m, n
            k = elemento.k
            l = elemento.l
            m = elemento.m
            n = elemento.n
            a = elemento.a
            b = elemento.b

            kij = {
                k11: k*(+l*l), k12: k*(+l*m), k13: k*(+l*n), k14: k*(-l*l), k15: k*(-l*m), k16: k*(-l*n),
                k21: k*(+m*l), k22: k*(+m*m), k23: k*(+m*n), k24: k*(-m*l), k25: k*(-m*m), k26: k*(-m*n),
                k31: k*(+n*l), k32: k*(+n*m), k33: k*(+n*n), k34: k*(-n*l), k35: k*(-n*m), k36: k*(-n*n),
                k41: k*(-l*l), k42: k*(-l*m), k43: k*(-l*n), k44: k*(+l*l), k45: k*(+l*m), k46: k*(+l*n),
                k51: k*(-m*l), k52: k*(-m*m), k53: k*(-m*n), k54: k*(+m*l), k55: k*(+m*m), k56: k*(+m*n),
                k61: k*(-n*l), k62: k*(-n*m), k63: k*(-n*n), k64: k*(+n*l), k65: k*(+n*m), k66: k*(+n*n)
            }
            let K = initMatrizdeRigidezVazia( grausLiberdade )

            let ua = (a.id * 3)
            let ub = (b.id * 3)
            let va = (a.id * 3) + 1
            let vb = (b.id * 3) + 1
            let wa = (a.id * 3) + 2
            let wb = (b.id * 3) + 2

            K[ua][ua] = kij.k11
            K[ua][va] = kij.k12
            K[ua][wa] = kij.k13
            K[ua][ub] = kij.k14
            K[ua][vb] = kij.k15
            K[ua][wb] = kij.k16

            K[va][ua] = kij.k21
            K[va][va] = kij.k22
            K[va][wa] = kij.k23
            K[va][ub] = kij.k24
            K[va][vb] = kij.k25
            K[va][wb] = kij.k26

            K[wa][ua] = kij.k31
            K[wa][va] = kij.k32
            K[wa][wa] = kij.k33
            K[wa][ub] = kij.k34
            K[wa][vb] = kij.k35
            K[wa][wb] = kij.k36

            K[ub][ua] = kij.k41
            K[ub][va] = kij.k42
            K[ub][wa] = kij.k43
            K[ub][ub] = kij.k44
            K[ub][vb] = kij.k45
            K[ub][wb] = kij.k46

            K[vb][ua] = kij.k51
            K[vb][va] = kij.k52
            K[vb][wa] = kij.k53
            K[vb][ub] = kij.k54
            K[vb][vb] = kij.k55
            K[vb][wb] = kij.k56

            K[wb][ua] = kij.k61
            K[wb][va] = kij.k62
            K[wb][wa] = kij.k63
            K[wb][ub] = kij.k64
            K[wb][vb] = kij.k65
            K[wb][wb] = kij.k66

            matrizesIndividuais.push( K )
            console.log( `.. a matriz do elemento foi construida. %c|${ index } de ${ elementos.length }| `,'color: white; background-color: black;' )
            
        }
        
        return matrizesIndividuais
    }
    function initMatrizdeRigidezVazia( grausLiberdade ) {
        let k = []
        for ( let i = 0; i < grausLiberdade; i++ ) {
            k[i] =[]
            for ( let j=0; j < grausLiberdade; j++ ) {
                k[i][j] = 0
            }
        }
        return k
    }

    function initMatrizGlobal( matrizesIndividuais, grausLiberdade ) {
        let matrizGlobal = initMatrizdeRigidezVazia( grausLiberdade )
        for ( let matrizIndividual of matrizesIndividuais ) {
            for ( let i = 0; i < grausLiberdade; i++ ) {
                for ( let j = 0; j < grausLiberdade; j++ ) {
                    matrizGlobal[i][j] += matrizIndividual[i][j]
                }
            }
        }
        return matrizGlobal
    }

    function initVetorPeso( numeroPontos, f ) {
        let vetorPeso = []
        if ( f == null ) {
            for ( let i=0; i < numeroPontos; i++ ) {
                vetorPeso[ 3 * i + 0 ] = 0
                vetorPeso[ 3 * i + 1 ] = -180000
                vetorPeso[ 3 * i + 2 ] = 0
            }
        } else {
            for ( let i=0; i < f.length; i++ ) {
                vetorPeso[ 3 * i + 0 ] = f[i].x
                vetorPeso[ 3 * i + 1 ] = f[i].y
                vetorPeso[ 3 * i + 2 ] = f[i].z
            }
        }
        return vetorPeso
    }
    function initVetorDeformada( grausLiberdade ) {
        let vetorDeformada = []
        for ( let i=0; i < grausLiberdade; i++ ) {
            vetorDeformada[i] = { valor: 1, identificado: 'indefinido' }
        }
        return vetorDeformada
    }
    function addCondicoesDeContorno( vetorDeformada, vetorPeso, numeroPontos, u ) {
        // automático
        if ( u == null ) {
            for ( let i = 0; i < 3; i++ ) {
                let index = Math.floor( Math.random() * numeroPontos )
                vetorDeformada[ 3 * index + 0 ] = { valor: 0, identificado: 'true' }
                vetorDeformada[ 3 * index + 1 ] = { valor: 0, identificado: 'true' }
                vetorDeformada[ 3 * index + 2 ] = { valor: 0, identificado: 'true' }
    
                vetorPeso[ 3 * index + 0 ] = 0
                vetorPeso[ 3 * index + 1 ] = 0
                vetorPeso[ 3 * index + 2 ] = 0
            }
        } else {
            for ( let i = 0; i < u.length; i++ ) {
                if ( u[i].u == 'indefinido' ) {
                    vetorDeformada[ 3 * i + 0 ] = { 
                        id: `${u[i].identificador}|u`, 
                        valor: 1, identificado: 'indefinido' 
                    }
                } else {
                    vetorDeformada[ 3 * i + 0 ] = { 
                        id: `${u[i].identificador}|u`, 
                        valor: u[i].u, identificado: 'true' 
                    }
                    vetorPeso[ 3 * i + 0 ] = 0
                }
                if ( u[i].v == 'indefinido' ) {
                    vetorDeformada[ 3 * i + 1 ] = { 
                        id: `${u[i].identificador}|v`, 
                        valor: 1, identificado: 'indefinido' 
                    }
                } else {
                    vetorDeformada[ 3 * i + 1 ] = { 
                        id: `${u[i].identificador}|v`, 
                        valor: u[i].v, identificado: 'true' 
                    }
                    vetorPeso[ 3 * i + 1 ] = 0
                }
                if ( u[i].w == 'indefinido' ) {
                    vetorDeformada[ 3 * i + 2 ] = { 
                        id: `${u[i].identificador}|w`, 
                        valor: 1, identificado: 'indefinido' 
                    }
                } else {
                    vetorDeformada[ 3 * i + 2 ] = { 
                        id: `${u[i].identificador}|w`, 
                        valor: u[i].w, identificado: 'true' 
                    }
                    vetorPeso[ 3 * i + 2 ] = 0
                }
                /*
                if ( u[i].identificado == 'true' ) {
                    vetorDeformada[ 3 * i + 0 ] = { 
                        id: `${u[i].identificador}|u`, 
                        valor: u[i].u, identificado: 'true' 
                    }
                    vetorDeformada[ 3 * i + 1 ] = { 
                        id: `${u[i].identificador}|v`, 
                        valor: u[i].v, identificado: 'true' 
                    }
                    vetorDeformada[ 3 * i + 2 ] = { 
                        id: `${u[i].identificador}|w`, 
                        valor: u[i].w, identificado: 'true' 
                    }
                    vetorPeso[ 3 * i + 0 ] = 0
                    vetorPeso[ 3 * i + 1 ] = 0
                    vetorPeso[ 3 * i + 2 ] = 0
                } else {
                    vetorDeformada[ 3 * i + 0 ] = { 
                        id: `${u[i].identificador}|u`, 
                        valor: 1, identificado: 'indefinido' 
                    }
                    vetorDeformada[ 3 * i + 1 ] = { 
                        id: `${u[i].identificador}|v`, 
                        valor: 1, identificado: 'indefinido' 
                    }
                    vetorDeformada[ 3 * i + 2 ] = { 
                        id: `${u[i].identificador}|w`, 
                        valor: 1, identificado: 'indefinido' 
                    }
                }*/
            }
        }
        

        return vetorDeformada
    }
    function verificarConvergencia( K, U, F ) {
        let e = 0
        for ( let i in K ) {
            if ( U[i].identificado == 'indefinido' ) {
                let T = 0
                for ( let j in K ) {
                    T += (K[i][j] * U[j].valor )
                }
                e += (T - F[i])
            }
        }
        e = Math.abs( e )
        if ( e >= erro ) {
            console.log(`erro | %c${e}`,'color: white; background-color: red;')
            calcularDeformacoes( K, U, F )

            return { e, K, U, F }
        } else {
            for ( let i in U ) {
                U[i].identificado = 'true'
            }
            console.log( `%cDEFORMAÇÃO CALCULADA COM PRECISÃO! | ${e}`, 'color: white; background-color: green;', K,U )
            
            let vetores = modulosDosVetores( U )
            matrizes = { e, K, U, F, vetores }
            return { e, K, U, F, vetores };
        }
    }
    function intermediar( K, U, F ) {
        let data = verificarConvergencia( K, U, F )
        let e = data.e
        let k = data.K
        let u = data.U
        let f = data.F
        while ( e >= erro ) {
            data = verificarConvergencia( k, u, f )
            e = data.e
            k = data.K
            u = data.U
            f = data.F
        }
    }
    function calcularDeformacoes( K, U, F ) {
        for ( let i in K ) {
            if ( U[i].identificado == 'indefinido' ) {
                let T, u
                T = 0
                for ( let j in K ) { T += (K[i][j] * U[j].valor) }
                if ( K[i][i] == 0 ) { u = 0 }
                else { u =  (1/K[i][i])*( F[i] - ( T - (K[i][i]*U[i].valor) ) ) }
                U[i].valor = u
            }
        }
    }
    function modulosDosVetores( U ) {
        console.log( 'Iniciando a interpolação de cores...' )
        console.log( 'Calculando modulos de deformação...' )
        let vetores = []
        let modulos = []
        for ( let i = 0 ; i < numeroPontos ; i++ ) {
            let u, v, w, abs
            u = U[ ( i * 3 ) + 0 ].valor
            v = U[ ( i * 3 ) + 1 ].valor
            w = U[ ( i * 3 ) + 2 ].valor
            abs = Math.sqrt( u * u + v * v + w * w )

            let nx, ny, nz
            nx = u / abs
            ny = v / abs
            nz = w / abs

            let dados
            if ( abs == 0 ) { dados = { vetor: { u, v, w, abs, normalizado: { nx: 0, ny: 0, nz: 0 } } } 
            } else { dados = { vetor: { u, v, w, abs, normalizado: { nx, ny, nz } } } }

            vetores.push( dados )
            modulos.push( abs )
        }
        let min = Math.min( ...modulos )
        let max = Math.max( ...modulos )

        console.log( '... os modulos de deformação foram calculados.' )
        console.log( '... a interpolação de cores foi concluida.' )
        return { vetores, min, max }
    }

    return matrizes
}

export default initMatrizes
function addConexoesPontos( malha, pontos, parametros ) {
    // organizando variaveis...
    let dx, dy, dz
    dx = malha.dimensoes.discretas.x
    dy = malha.dimensoes.discretas.y
    dz = malha.dimensoes.discretas.z
    let maximaDistancia = Math.sqrt( dx * dx + dy * dy + dz * dz )
    // ... variaveis organizadas.

    for ( let a of pontos ) {
        for ( let b of pontos ) {
            let lx, ly, lz, distancia
            lx = Math.abs( ( b.posicionamento.x ) - ( a.posicionamento.x ) )
            ly = Math.abs( ( b.posicionamento.y ) - ( a.posicionamento.y ) )
            lz = Math.abs( ( b.posicionamento.z ) - ( a.posicionamento.z ) )

            distancia = Math.sqrt( lx * lx + ly * ly + lz * lz )

           if ( parametros.mode ==  'manual' ) {

           } else {
                if ( distancia <= maximaDistancia && distancia > 0 ) {
                    
                    if ( lx > 0 && ly > 0 && lz > 0 ) {
                        a.conexoes.identificador.push( b.identificador )
                    }
                    if ( lx == 0 && ly <= dy && lz <= dz ) {
                        a.conexoes.identificador.push( b.identificador )
                    }
                    if ( ly == 0 && lx <= dx && lz <= dz ) {
                        a.conexoes.identificador.push( b.identificador )
                    }
                    if ( lz == 0 && lx <= dx && ly <= dy ) {
                        a.conexoes.identificador.push( b.identificador )
                    }/*
                    if ( lx == dx && ly == 0 && lz == 0 ) {
                        a.conexoes.identificador.push( b.identificador )
                    }
                    if ( ly == dy && lx == 0  && lz == 0) {
                        a.conexoes.identificador.push( b.identificador )
                    }
                    if ( lz == dz && lx == 0  && ly == 0) {
                        a.conexoes.identificador.push( b.identificador )
                    }*/
                   
                }
           }
           
        }
    }

    return pontos
}

export default addConexoesPontos



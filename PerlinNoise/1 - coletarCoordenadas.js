const coletarCoordenadas = ( x , y , z ) => {
    const inteira = coordenadasProto.inteira( x , y , z )
    const fracionada = coordenadasProto.fracionada( x , y , z )
    const suavizada = coordenadasProto.suavizada( fracionada['inicial'] )
    
    return { 
        inteira, 
        fracionada, 
        suavizada 
    }
}

// Coleta das Coordenadas INTEIRAS
const inteiraProto = {
    inteira: ( x , y , z ) => {
        const inicial = { 
            x: Math.floor( x ), 
            y: Math.floor( y ), 
            z: Math.floor( z )
        }
        const final   = { 
            x: inicial.x + 1, 
            y: inicial.y + 1, 
            z: inicial.z + 1
        }
        return { 
            inicial, 
            final
        }
    } 
}
//Coleta das Coordenadas FRACIONADAS
const fracionadaProto = {
    fracionada: ( x , y , z ) => {
        const inicial = {
            x: x - Math.floor( x ), 
            y: y - Math.floor( y ), 
            z: z - Math.floor( z )}
        const final   = { 
            x: inicial.x - 1, 
            y: inicial.y - 1, 
            z: inicial.z - 1
        } 
        return { 
            inicial,
            final
        }
    }
}
 //Coleta das Coordenadas SUAVIZADAS
const suavizadaProto = {
    suavizada:  ( fracionada ) => {
        const suavizar = ( t ) => {
            return ( t * t * t * ( t * ( t * 6 - 15 ) + 10 ) )
        }
        return {
            x: suavizar( fracionada.x ),
            y: suavizar( fracionada.y ),
            z: suavizar( fracionada.z )
        }
    }
}

//PROTOTYPE de métodos
const coordenadasProto = {
    ...inteiraProto,
    ...fracionadaProto,
    ...suavizadaProto
}

export default coletarCoordenadas
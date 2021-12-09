import * as THREE from '../../three.module.js'

function desenharAgente( cena, agente, visibilidade ) {
    //console.log( 'Desenhando agente...'  )
    let v1 = visibilidade.v1
    let v2 = visibilidade.v2
    let v3 = visibilidade.v3
    let v4 = visibilidade.v4
    let v5 = visibilidade.v5
    let v6 = visibilidade.v6
    
    let index = 0
    let posicionamentoConexoes = new Float32Array( agente.path.length * 6 )
    let coresConexoes = []

   
    for ( let i in agente.path ) {
        posicionamentoConexoes[ ( 6 * i ) + 0 ] = agente.path[i].posi.x
        posicionamentoConexoes[ ( 6 * i ) + 1 ] = agente.path[i].posi.y
        posicionamentoConexoes[ ( 6 * i ) + 2 ] = agente.path[i].posi.z

        posicionamentoConexoes[ ( 6 * i ) + 3 ] = agente.path[i].posf.x
        posicionamentoConexoes[ ( 6 * i ) + 4 ] = agente.path[i].posf.y
        posicionamentoConexoes[ ( 6 * i ) + 5 ] = agente.path[i].posf.z




        let t = agente.path[i].cor.t
        let intervalo = 1 / 6
        
        if ( t >= 0 && t < 1 * intervalo ) {
            if ( v1 == true ) {
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
        
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
            } else {
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
        
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
            }
            
        }
        if ( t >= 1 * intervalo && t < 2 * intervalo ) {
            if ( v2 == true ) {
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
        
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
            } else {
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
        
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
            }
            
        }
        if ( t >= 2 * intervalo && t < 3 * intervalo ) {
            if ( v3 == true ) {
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
        
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
            } else {
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
        
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
            }
               
        }
        if ( t >= 3 * intervalo && t <= 4 * intervalo ) { 
            if ( v4 == true ) {
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
        
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
            } else {
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
        
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
            }   
        }
        if ( t > 4 * intervalo && t <= 5 * intervalo ) { 
            if ( v5 == true ) {
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
        
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
            } else {
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
        
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
            }
            
        }
        if ( t > 5 * intervalo && t <= 6 * intervalo ) { 
            if ( v6 == true ) {
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
        
                coresConexoes.push( agente.path[i].cor.r * 255 ) 
                coresConexoes.push( agente.path[i].cor.g * 255 ) 
                coresConexoes.push( agente.path[i].cor.b * 255 ) 
            } else {
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
        
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
                coresConexoes.push( 0 ) 
            }
            
        }
    }

    let conexoesMaterial, conexoesGeometria, conexoesMesh
    conexoesGeometria = new THREE.BufferGeometry()
    conexoesGeometria.setAttribute( 'position', new THREE.Float32BufferAttribute( posicionamentoConexoes, 3 ) )
    conexoesGeometria.setAttribute( 'color', new THREE.Uint8BufferAttribute( coresConexoes, 3, true ) )
    conexoesGeometria.setDrawRange( 0, agente.path.length * 6 )
    conexoesMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: .7
    })
    conexoesMesh = new THREE.LineSegments( conexoesGeometria, conexoesMaterial )
    agente.mesh = conexoesMesh
    agente.passo = Math.floor( Math.random() * 5 )
    agente.way = 0
    cena.add( agente.mesh )

    //console.log( '... Agente desenhado' )
    
    return agente
}

export default desenharAgente
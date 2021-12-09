import * as THREE from '../../three.module.js'
function posicionarMalha( pontos, estrutura, parametros ) {
    console.log( 'Posicionando Malha' )
    let minX, maxX, minY, maxY, minZ, maxZ
    let x, y, z
    x = null
    y = null
    z = null

    x = []
    y = []
    z = []
    for ( let ponto of pontos ) {
        x.push( ponto.posicionamento.x )
        y.push( ponto.posicionamento.y )
        z.push( ponto.posicionamento.z )
    }
    minX = Math.min( ...x )
    minY = Math.min( ...y )
    minZ = Math.min( ...z )

    maxX = Math.max( ...x )
    maxY = Math.max( ...y )
    maxZ = Math.max( ...z )


    parametros.tela = { x: maxX - minX, y: maxY - minY, z: maxZ - minZ  }

    let xmed, ymed, zmed
    xmed = ( ( ( maxX - minX )/2 ) + minX )
    ymed = ( ( ( maxY - minY )/2 ) + minY )
    zmed = ( ( ( maxZ - minZ )/2 ) + minZ )

    estrutura.position.set( -xmed, -ymed, -zmed )
    let dx, dy, dz, dm

    dm = (( parametros.tela.x >= parametros.tela.y ? ( parametros.tela.y >= parametros.tela.z ? parametros.tela.z : parametros.tela.y ) : parametros.tela.x )/ 2)
    if ( dm > 2 ) {
        dx = dy = dz = dm
    } else {
        dx = dy = dz = 2
    }

    desenharLimites( (minX - dx), (maxX + dx), (minY - dy), (maxY + dy), (minZ - dz), (maxZ + dz), estrutura, parametros.tela )
}

function desenharLimites( minX, maxX, minY, maxY, minZ, maxZ, estrutura, tela ) {
    let dx, dy, dz, dm
    dm = (( tela.x >= tela.y ? ( tela.y >= tela.z ? tela.z : tela.y ) : tela.x ) / 5) 
    if ( dm > 2 ) {
        dx = dy = dz = dm
    } else {
        dx = dy = dz = 2
    }
/*
    dx = tela.x / 10
    dy = tela.y / 10
    dz = tela.z / 10
*/
    let limitesPos = [
        //4-3
        minX, minY, minZ, maxX, minY, minZ,
        //4-1
        minX, minY, minZ, minX, minY, maxZ,
        //1-2
        minX, minY, maxZ, maxX, minY, maxZ,
        //2-3
        maxX, minY, maxZ, maxX, minY, minZ,

        //8-7
        minX, maxY, minZ, maxX, maxY, minZ,
        //8-5
        minX, maxY, minZ, minX, maxY, maxZ,
        //5-6
        minX, maxY, maxZ, maxX, maxY, maxZ,
        //6-7
        maxX, maxY, maxZ, maxX, maxY, minZ,

        //7-3
        maxX, maxY, minZ, maxX, minY, minZ,
        //6-2
        maxX, maxY, maxZ, maxX, minY, maxZ,
        //5-1
        minX, maxY, maxZ, minX, minY, maxZ,
        //8-4
        minX, maxY, minZ, minX, minY, minZ
    ]
    let edgesPos = [
        //4 - 3
        minX, minY, minZ, ( minX + dx ), ( minY + 0 ), ( minZ + 0 ),
        //4 - 8
        minX, minY, minZ, ( minX + 0 ), ( minY + dy ), ( minZ + 0 ),
        //4 - 1
        minX, minY, minZ, ( minX + 0 ), ( minY + 0 ), ( minZ + dz ),

        //3 - 4
        maxX, minY, minZ, ( maxX - dx ), ( minY + 0 ), ( minZ + 0 ),
        //3 - 7
        maxX, minY, minZ, ( maxX + 0 ), ( minY + dy ), ( minZ + 0 ),
        //3 - 2
        maxX, minY, minZ, ( maxX + 0 ), ( minY + 0 ), ( minZ + dz ),

        //2 - 1
        maxX, minY, maxZ, ( maxX - dx ), ( minY + 0 ), ( maxZ + 0 ),
        //2 - 6
        maxX, minY, maxZ, ( maxX - 0 ), ( minY + dy ), ( maxZ + 0 ),
        //2 - 3
        maxX, minY, maxZ, ( maxX - 0 ), ( minY + 0 ), ( maxZ - dz ),

        //1 - 2
        minX, minY, maxZ, ( minX + dx ), ( minY + 0 ), ( maxZ + 0 ),
        //1 - 5
        minX, minY, maxZ, ( minX + 0 ), ( minY + dy ), ( maxZ + 0 ),
        //1 - 4
        minX, minY, maxZ, ( minX + 0 ), ( minY + 0 ), ( maxZ - dz ),

        //8 - 7
        minX, maxY, minZ, ( minX + dx ), ( maxY + 0 ), ( minZ + 0 ),
        //8 - 4
        minX, maxY, minZ, ( minX + 0 ), ( maxY - dy ), ( minZ + 0 ),
        //8 - 5
        minX, maxY, minZ, ( minX + 0 ), ( maxY - 0 ), ( minZ + dz ),

        //7 - 8
        maxX, maxY, minZ, ( maxX - dx ), ( maxY + 0 ), ( minZ + 0 ),
        //7 - 3
        maxX, maxY, minZ, ( maxX - 0 ), ( maxY - dy ), ( minZ + 0 ),
        //7 - 6
        maxX, maxY, minZ, ( maxX - 0 ), ( maxY - 0 ), ( minZ + dz ),
        
        //6 - 5
        maxX, maxY, maxZ, ( maxX - dx ), ( maxY + 0 ), ( maxZ + 0 ), 
        //6 - 2
        maxX, maxY, maxZ, ( maxX - 0 ), ( maxY - dy ), ( maxZ + 0 ), 
        //6 - 7
        maxX, maxY, maxZ, ( maxX - 0 ), ( maxY - 0 ), ( maxZ - dz ), 

        //5 - 6
        minX, maxY, maxZ, ( minX + dx ), ( maxY + 0 ), ( maxZ + 0 ),  
        //5 - 1
        minX, maxY, maxZ, ( minX + 0 ), ( maxY - dy ), ( maxZ + 0 ), 
        //5 - 8
        minX, maxY, maxZ, ( minX + 0 ), ( maxY + 0 ), ( maxZ - dz ), 
    ]

    let limitesGeometria = new THREE.BufferGeometry()
    limitesGeometria.setAttribute( 'position', new THREE.Float32BufferAttribute( limitesPos, 3 ) )

    let limitesMaterial = new THREE.LineBasicMaterial({
        color: 'rgb( 0, 0, 0 )',
        //vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 1,
        visible: false
    })

    let limitesMesh = new THREE.LineSegments( limitesGeometria, limitesMaterial )
    estrutura.add( limitesMesh )

    let edgesGeometria = new THREE.BufferGeometry()
    edgesGeometria.setAttribute( 'position', new THREE.Float32BufferAttribute( edgesPos, 3 ) )
    let edgesMaterial = new THREE.LineBasicMaterial({
        color: 'rgb( 255, 255, 255 )',
        //vertexColors: true,
        blending: THREE.AdditiveBlending,
        //transparent: true,
        opacity: 1,
    })

    let edgesMesh = new THREE.LineSegments( edgesGeometria, edgesMaterial )
    estrutura.add( edgesMesh )
}
export default posicionarMalha
import * as THREE from './three.module.js'

function desenharIluminar( cena, pontos ) {
    console.log( 'Desenhando luzes...' )

    for ( let i in pontos ) {
        let light = new THREE.PointLight( 0xff2200, .5 );
        light.position.set( pontos[i].posicionamento.x, pontos[i].posicionamento.y, pontos[i].posicionamento.z )

        cena.add( light )
    }
    
    console.log( '... Luzes desenhadas' )
}

export default desenharIluminar
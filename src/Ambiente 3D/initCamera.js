import * as THREE from '../../three.module.js'
import { OrbitControls } from '../../OrbitControls.js'

function initCamera( parametros ) {
    let camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 4000 )
    let cameraZ
    if ( parametros.mode == 'manual' ) {
        cameraZ = (parametros.tela.x >= parametros.tela.y 
            ? ( parametros.tela.x >= parametros.tela.z ? parametros.tela.x : (parametros.tela.z)) 
            : parametros.tela.y)
        camera.position.z = (cameraZ)* 1.2 + 5
    } else {
        cameraZ = (parametros.dimensoes.x > parametros.dimensoes.y 
            ? ( parametros.dimensoes.x > parametros.dimensoes.z ? parametros.dimensoes.x : (parametros.dimensoes.z)) 
            : parametros.dimensoes.y)
        camera.position.z = (cameraZ)* 4 + 45
    }
     
    
    let control = new OrbitControls( camera, canvas )
    control.minDistance = 10
    control.maxDistance = 1000
    console.log( '2.2 - instanciando Camera' )
    return { camera, cameraZ }
}
export default initCamera
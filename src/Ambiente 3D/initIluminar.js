import * as THREE from '../../three.module.js'
function initIluminar( cena ) {
    let light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)
         
    let backLight = new THREE.DirectionalLight(0xffffff, .2);
    backLight.position.set(-10, 20, 50);
    backLight.castShadow = true;

    let lightProbe = new THREE.LightProbe();

    const dirLight = new THREE.DirectionalLight( 'white', .2 );
    dirLight.position.set(10, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;

    const light2 = new THREE.PointLight( 0xff2200, 0.2 );
	light2.position.set( - 100, - 100, - 100 );
	cena.add( light2 )

    addShadowedLight( 1, 1, 1, 0xffffff, .1 )
    addShadowedLight( 0.5, 1, - 1, 0xffffff, .5 )


    function addShadowedLight( x, y, z, color, intensity ) {

        const directionalLight = new THREE.DirectionalLight( color, intensity );
        directionalLight.position.set( x, y, z );
        cena.add( directionalLight );
    
        directionalLight.castShadow = true;
    
        const d = 1;
        directionalLight.shadow.camera.left = - d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = - d;
    
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 4;
    
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
    
        directionalLight.shadow.bias = - 0.001;
    
    }

    cena.add(dirLight);    
    cena.add(lightProbe );    
    cena.add(backLight);
    cena.add(light);
}
export default initIluminar
import * as THREE from '../../../../libs/three.module.js'


function generatePointLight(){
    const light = new THREE.PointLight();
    light.position.set( -300, 800, 800 );
    light.strength = 1200000;
    light.color = [1,1,1,1];
    return light;
}
export {generatePointLight};
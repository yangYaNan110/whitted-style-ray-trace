import * as THREE from '../../../../../libs/three.module.js';
function mouse2World(mouseVec,scene){
    let z = 0;
    let x = (mouseVec.x) - scene.size[0]/2;
    let y = ((mouseVec.y) - scene.size[1]/2)*-1;

    return new THREE.Vector3(x,y,z);

}
export {mouse2World};
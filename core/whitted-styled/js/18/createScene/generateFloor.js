import * as THREE from '../../../../libs/three.module.js'


/**
 *地面
 *
 */
function generateFloor(){
    const geometry = new THREE.PlaneGeometry( 300, 500 );
    const material = new THREE.MeshBasicMaterial( {} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(-Math.PI/2.2);
    plane.position.set(0,-50,-100);
    plane.color = [1,1,0,1];
    plane.type = 'floor';
    plane.isRefraction =0;

    plane.updateMatrixWorld();

    const normal = new THREE.Vector3(0,1,0);
    // normal.applyMatrix4(plane.matrixWorld).normalize();
    plane.getNormal = getPlaneNormal(normal);

    return plane;
}
export {generateFloor};

function getPlaneNormal(value){
    return ()=>{
        return value;
    }
}
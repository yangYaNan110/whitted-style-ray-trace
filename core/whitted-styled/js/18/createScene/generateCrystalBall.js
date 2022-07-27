import * as THREE from '../../../../libs/three.module.js'

/**
 *玻璃球
 *
 * @returns
 */
function generateCrystalBall(){
    const geometry = new THREE.SphereGeometry( 50, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {  } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(40,20,50);
    //完全透明
    //FDFAF4
    sphere.color =[.1,0.2,0.2,0.1]
    sphere.type = 'glass';
    sphere.isRefraction =1;
    sphere.getNormal = getSphereNormal(sphere);
    sphere.updateMatrixWorld();
    return sphere
}
export {generateCrystalBall};
function getSphereNormal(sphere){
    const center = sphere.position;
    return (position)=>{
        return new THREE.Vector3( position.x-center.x, position.y -center.y,  position.z-center.z).normalize();

    }
}
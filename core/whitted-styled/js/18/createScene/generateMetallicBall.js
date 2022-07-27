import * as THREE from '../../../../libs/three.module.js'


/**
 *金属球 --不锈钢
 *
 * @returns
 */
function generateMetallicBall(){
    //128,128,126
    const geometry = new THREE.SphereGeometry( 50, 32, 32 );
    const material = new THREE.MeshBasicMaterial( { } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(-10,10,-100);
    sphere.color = [0,1,0,1.0]
    // sphere.color = [1,1,0,1.0]
    sphere.type = 'metallic';
    sphere.getNormal = getSphereNormal(sphere);
    sphere.updateMatrixWorld();
    sphere.isMetal = true;
    sphere.isRefraction =0;
    return sphere
}
export {generateMetallicBall};

function getSphereNormal(sphere){
    const center = sphere.position;
    return (position)=>{
        return new THREE.Vector3( position.x-center.x, position.y -center.y,  position.z-center.z).normalize();
    }
}
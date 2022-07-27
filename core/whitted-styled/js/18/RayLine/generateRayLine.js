import * as THREE from '../../../../libs/three.module.js'

/**
 *根据眼睛和屏幕坐标生成射线
 *
 */
function generateRayLineByEyeAndMouse(eye, worldVec) {
  const origin = new THREE.Vector3().copy(eye.position);
  const dir = new THREE.Vector3(
    worldVec.x - origin.x,
    worldVec.y - origin.y,
    worldVec.z - origin.z
  ).normalize();
  const near = eye.near || 1;
  const far = eye.far || 10000;
  const raycaster = new THREE.Raycaster(origin, dir, near, far);
  return raycaster;
}
/**
 *根据入射方向和法线生成射线
 *
 */
function generateRayLineByIncidenceDirAndNormal(
  incidenceDir,
  normal,
  pointInfo,
  eye
) {
  const origin = new THREE.Vector3().copy(pointInfo.pointInstance.point);
  const dir = new THREE.Vector3(
    normal.x * 2 - incidenceDir.x,
    normal.y * 2 - incidenceDir.y,
    normal.z * 2 - incidenceDir.z
  ).normalize();
  const near = eye.near || 1;
  const far = eye.far || 10000;
  const raycaster = new THREE.Raycaster(origin, dir, near, far);
  return raycaster;
}

function generateRayLineByOriginPointAndDir(originPoint, dir,scene){
  const near = scene.eye.near || 1;
  const far = scene.eye.far || 10000;
  const raycaster = new THREE.Raycaster(originPoint, dir, near, far);
  return raycaster;
}
export { generateRayLineByEyeAndMouse, generateRayLineByIncidenceDirAndNormal,generateRayLineByOriginPointAndDir };

//     const origin = new THREE.Vector3().copy(scene.eye.position);;
//     const dir = new THREE.Vector3(worldVec.x - origin.x, worldVec.y-origin.y , worldVec.z - origin.z).normalize();
//     const near = scene.eye.near;
//     const far = scene.eye.far;
//     const raycaster = new THREE.Raycaster(origin,dir,near,far);
//     return raycaster;

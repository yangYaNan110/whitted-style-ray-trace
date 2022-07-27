import {
  generateRayLineByEyeAndMouse,
  handleHitObjects,
} from "../../RayLine/index.js";
import * as THREE from '../../../../../libs/three.module.js';
/**
 *根据屏幕世界坐标和眼睛位置生成交点信息
 *
 * @param {屏幕世界坐标} mouseWorld
 * @param {*} scene
 * @returns
 */
function getIntersectionPointInfoByMouse(mouseWorld, scene) {
  //生成射线
  const rayLine = generateRayLineByEyeAndMouse(scene.eye, mouseWorld);
  //用射线和场景物体求交
  const pointInstance = handleHitObjects(rayLine, scene)[0];
  if (pointInstance) {
    // console.log("相交的物体....",pointInstance);
    const normal = pointInstance.object.getNormal(pointInstance.point);
    const eyePos = scene.eye.position;
    return {
      //交点实例
      pointInstance,
      //当前点的法线
      normal,
      //入射方向
      incidenceDirection: new THREE.Vector3( eyePos.x - mouseWorld.x, eyePos.y-mouseWorld.y,  eyePos.z-mouseWorld.z).normalize(),
    };
  }

  return null;
}
export { getIntersectionPointInfoByMouse };

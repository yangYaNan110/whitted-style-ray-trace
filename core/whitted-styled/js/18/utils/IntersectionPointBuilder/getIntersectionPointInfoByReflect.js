import { handleHitObjects,generateRayLineByIncidenceDirAndNormal } from "../../RayLine/index.js";
import * as THREE from '../../../../../libs/three.module.js';

/**
 *通过反射获取🔝点在场景的交点信息
 *getIntersectionPointInfoByReflect
 * @param {*} pointInfo
 * @returns
 */
function getIntersectionPointInfoByReflect(scene, pointInfo) {
  console.log(pointInfo);
  //生成射线 根据入射方向 法线生成射线
  const rayLine = generateRayLineByIncidenceDirAndNormal(pointInfo.incidenceDirection, pointInfo.normal,pointInfo,scene.eye);
  //用射线和物体求交
  const pointInstance = handleHitObjects(rayLine, scene)[0];
  if (pointInstance) {
    const normal = pointInstance.object.getNormal(pointInstance.point);
    const prePointPos = pointInfo.pointInstance.point;
    const currentPointPos = pointInstance.point;
    return {
      //交点实例
      pointInstance,
      //当前点的法线
      normal,
      //入射方向
      incidenceDirection: new THREE.Vector3(
        currentPointPos.x  - prePointPos.x,
        currentPointPos.y  - prePointPos.y,
        currentPointPos.z  - prePointPos.z,

      ).normalize(),
    };
  }

  return null;
}
export { getIntersectionPointInfoByReflect };

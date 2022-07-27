import {
  addColors,
  mouse2World,
  scaleColor,
  getColorByPhongLightModel,
  getShadowColorByPointInfo,
  isHitObject,
  getHitObject,
  reflect,
  refract,
  fresnel
} from "../utils/index.js";
import * as  THREE from '../../../../libs/three.module.js';
function whittedStyleRayTracing(mouse, scene) {
  let result = [0, 0, 0, 0];
  //计算当前点颜色 直接光照+间接光照
  let mouseWorld = mouse2World(mouse, scene);
  let rayDir = new THREE.Vector3(mouseWorld.x - scene.eye.position.x, mouseWorld.y - scene.eye.position.y, mouseWorld.z - scene.eye.position.z).normalize();
  const color = rayTracing(scene.eye.position, rayDir, scene, 0);
  return color;
}

/**
 * 
 *
 * @param {*} scene 场景
 * @param {*} intersectionPointInfoSet 交点信息
 * @param {*} result 结果
 * @param {*} mouse 鼠标位置
 */
function rayTracing(originPoint, rayDir, scene , recursionCount){
  if(recursionCount > scene.maxRecursionCount){
    return [0,0,0,0];
  }
  let reduce = Math.pow(0.7, recursionCount);
  //如果有相交对象
  if(isHitObject(originPoint, rayDir, scene)){
    //获取相交对象
    const hitObj = getHitObject(originPoint, rayDir, scene);
    const localColor = scaleColor(getColorByPhongLightModel(scene, hitObj),reduce);
    const point = hitObj.point;
    //color = 直接光颜色 + 间接光颜色
    const normal = hitObj.object.getNormal(point);
    //根据法线 和 射线方向
    const  rayDirReverse= new THREE.Vector3(rayDir.x * -1, rayDir.y * -1, rayDir.z * -1);
    const reflectDir = reflect(rayDirReverse,normal);
    if(hitObj.object.isRefraction === 1){
      //视线和法线 的夹角 
      // const eyeDirReverse = new THREE.Vector3(scene.eye.position.x - point.x, scene.eye.position.y - point.y,scene.eye.position.z - point.z).normalize(); 
      const ior = 1;
      // const k1 =fresnel(eyeDirReverse,normal,ior);
      // const k2 = 1-k1;
      const k1 = 0.3;
      const k2 = 0.7;
      //根据法线和 射线方向
      const refractionDir = refract(rayDir,normal,ior);
      // console.log("折射光线...", refractionDir);
      return addColors(addColors(localColor, scaleColor(rayTracing(point, reflectDir,scene,recursionCount+1), k1)), scaleColor(rayTracing(point, refractionDir, scene, recursionCount+1), k2));
    }else{
      return addColors(localColor, scaleColor(rayTracing(point, reflectDir,scene,recursionCount+1), 1.0));
    }
  }else{
    return scaleColor(scene.background,reduce);
  }
}
export { whittedStyleRayTracing };

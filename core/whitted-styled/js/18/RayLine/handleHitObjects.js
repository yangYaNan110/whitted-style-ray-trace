import { generateRayLineByEyeAndMouse } from "./generateRayLine.js";

/**
 * 获取相交物体
 *
 * @param {*} rayline
 * @param {*} scene
 * @returns
 */
function handleHitObjects(rayline,scene){
    let gameObjects = scene.objects;
    const intersetObjs = rayline.intersectObjects(gameObjects,false);
    return intersetObjs;
}
/**
 *判断光是否被遮挡
 *
 * @param {*} light
 * @param {*} pointInfo
 */
function objectIsShelterByLightAndPointInfo(scene,pointInfo){
    const light = scene.light;
    let eye = {position:light.position};
    let worldVec = pointInfo.pointInstance.point;
    const ray = generateRayLineByEyeAndMouse(eye, worldVec);
    const intersetObjs = handleHitObjects(ray, scene);
    
    if(intersetObjs && intersetObjs[0].object != pointInfo.pointInstance.object
        ){return true}
    const dis = pointInfo.pointInstance.point.distanceTo(eye.position);
    if(intersetObjs.length > 0){
        if(Math.abs(intersetObjs[0].distance - dis)> 0.001 ){
            return true;
        }
    }
    return false;

}
export {handleHitObjects,objectIsShelterByLightAndPointInfo};
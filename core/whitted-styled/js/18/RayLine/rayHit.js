import {  generateRayLineByOriginPointAndDir } from "./generateRayLine.js";

function isHitObject(originPoint, rayDir, scene, bool){
    let gameObjects = scene.objects;
    const rayline = generateRayLineByOriginPointAndDir(originPoint,rayDir,scene);
    const intersetObjs = rayline.intersectObjects(gameObjects,false);
    if(bool){
        if(intersetObjs.length >0){
            return intersetObjs[0];
        }else{
            return null;
        }
    }
    if(intersetObjs.length > 0){
        return true;
    }else{
        return false;
    }
}
function getHitObject(originPoint, rayDir, scene){
    return isHitObject(originPoint,rayDir,scene,true);
}
export {isHitObject,getHitObject };
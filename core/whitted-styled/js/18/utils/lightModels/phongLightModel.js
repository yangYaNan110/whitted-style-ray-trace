import { objectIsShelterByLightAndPointInfo } from '../../RayLine/handleHitObjects.js';
import {addColors, multiplyColors, scaleColor} from '../color/index.js';
import * as THREE from '../../../../../libs/three.module.js';
import { getHitObject } from '../../RayLine/rayHit.js';
import { reflect } from './physics.js';
/**
 *获取颜色 通过 冯式光照模型
 不考虑环境光- 环境光通过间接光获取
 *
 */
function getColorByPhongLightModel(scene,hitObj){
    //在阴影里
    if(isInShadow(scene,hitObj)){
        // return scaleColor(hitObj.object.color, 0.5);
        return [0,0,0,1];
    }
    console.log("不在阴影里...");

    const diffuseColor = getDiffuseColor(scene,hitObj);
    const specularColor = getSpecularColor(scene,hitObj);
    return addColors(diffuseColor,specularColor);
}
function isInShadow(scene,hitObj){
    console.log(1);
    //从灯光处 发射一条射线
    //如果 能
    let p1 = hitObj.point, p2 = scene.light.position;
    let dir = new THREE.Vector3(p1.x - p2.x, p1.y - p2.y , p1.z - p2.z).normalize();
    let _hitObj = getHitObject(scene.light.position,dir,scene );
    let dis1 = _hitObj.distance;
    let dis2 = p2.distanceTo(hitObj.point);
    if( _hitObj?.object === hitObj?.object && Math.abs(dis1 - dis2)< 0.000001){
        return false;
    }
    return true;
}
/**
 *获取漫反射颜色
 *
 */
function getDiffuseColor(scene,hitObj){
    //物体本身的颜色* 反射光颜色
    //反射光颜色 = 反射系数 * 入射光颜色 * 入射光强度/距离平方 * 入射光和法线的夹角
    let objectColor = hitObj.object.color;
    let reflectFac = 0.6;
    let incidenceColor = scene.light.color;
    let strength = scene.light.strength / Math.pow(scene.light.position.distanceTo(hitObj.point),2);
    // let strength = 1.0;
    const lightDir = new THREE.Vector3(
        scene.light.position.x - hitObj.point.x,
        scene.light.position.y - hitObj.point.y,
        scene.light.position.z - hitObj.point.z,
        ).normalize();
    const normalDir = hitObj.object.getNormal(hitObj.point);
    let cos = Math.max(0,Math.min(1, lightDir.dot(normalDir)));
    return multiplyColors(objectColor,scaleColor(scaleColor(scaleColor(incidenceColor, reflectFac), strength),cos));
    // return scaleColor(multiplyColors(objectColor, incidenceColor),cos);
}
/** 
 * 获取镜面反射颜色
 * 
*/
function getSpecularColor(scene,hitObj){
    //高光颜色 = 物体本色的颜色 * 高光颜色
    //高光颜色 = 反射系数* 入射光颜色 * 入射光强度/距离平方 * 反射光光和视线的夹角
    let objectColor = hitObj.object.color;
    let reflectFac = 0.15;
    let incidenceColor = scene.light.color;
    let strength = scene.light.strength / Math.pow(scene.light.position.distanceTo(hitObj.point),2);
    // let strength = 1.0;
    const lightDir = new THREE.Vector3(
        scene.light.position.x - hitObj.point.x,
        scene.light.position.y - hitObj.point.y,
        scene.light.position.z - hitObj.point.z,
        ).normalize();
    //获取反射方向
    const normal = hitObj.object.getNormal(hitObj.point);
    const reflectDir = reflect(lightDir, normal);
    const eyeP = scene.eye.position;
    const eyeDir = new THREE.Vector3(eyeP.x - hitObj.point.x, eyeP.y - hitObj.point.y, eyeP.z - hitObj.point.z).normalize();

    let cos = Math.pow(Math.max(0,Math.min(1, reflectDir.dot(eyeDir))), 1);
    return multiplyColors(objectColor,scaleColor(scaleColor(scaleColor(incidenceColor, reflectFac), strength),cos));
}
/**
 *冯氏光照模式 只模拟冯氏光照的漫反射 以及阴影的情况 
 *
 */
function phongLightModel(pointInfo,scene){
    

    //2:如果有交点 需要看交点是否被遮挡
    //2.1如果光被遮挡 说明在阴影中 否则计算漫反射颜色

    //1:如果没有交点 直接返回背景色
    if(!pointInfo){
        return scene.background;
    }
    // return pointInfo.pointInstance.object.color;
    //如果处于阴影中
    if(objectIsShelterByLightAndPointInfo(scene, pointInfo)){
        // return generateShadowColor(scaleColor(pointInfo.pointInstance.object.color,255),0.03/255)
        // return [255,255,0,255];
        // return [0,0,0,255]
    }
    let color = _phongLightModel(pointInfo.pointInstance, scene);
    // let color = [255,255,0,255];
    return color;

}
export {phongLightModel,getColorByPhongLightModel};






 function _phongLightModel(hitObject,scene){
    //交点
    let point = hitObject.point;
    //相交的物体
    let object = hitObject.object;
    
    //灯光
    let light = scene.light;
    let lightColor = [light.color.r,light.color.g,light.color.b,1];
    let lightPos = light.position;
    let lightDir = new THREE.Vector3(point.x - lightPos.x, point.y-lightPos.y, point.z-lightPos.z).normalize();
    let normal = object.getNormal(point);
    let cosV = lightDir.dot(normal);
    let color = multiplyColors(lightColor, object.color);
    cosV = Math.max(0,Math.min(1,cosV));
    color = scaleColor(color, cosV);
    color[3] = 255;
    return color;
}
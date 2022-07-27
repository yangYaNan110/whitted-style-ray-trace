import * as THREE from '../../../../libs/three.module.js';
import {whittedStyleRayTracing} from './whittedStyleRayTracing.js';
function whittedStyleRayTraceProcessing(scene){
    let size = scene.size;
    let width = size[0];
    let height = size[1];
    let arr = new Array(width*height);
    arr.fill([0,0,0,1.0]);
    
    for (let i = 0; i < height; i++) {
        for (let eq = 0; eq <width; eq++) {
            //生成一个光线
            let mouse = new THREE.Vector2(eq,i);
            //计算光线颜色
            const color =whittedStyleRayTracing(mouse,scene);
            const indx = i * width + eq;
            arr[indx] = color;
        }
        
    }
   
    return arr;
}
export {whittedStyleRayTraceProcessing};


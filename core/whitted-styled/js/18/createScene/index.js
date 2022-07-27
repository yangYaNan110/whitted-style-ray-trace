import * as THREE from '../../../../libs/three.module.js';
import {generateCrystalBall} from './generateCrystalBall.js';
import {generateFloor} from './generateFloor.js';
import {generateMetallicBall} from './generateMetallicBall.js';
import {generatePointLight} from './generatePointLight.js';

function createScene(config={}){
    const scene= {
        eye:{
            position:new THREE.Vector3(0,0,1200),
            near:1,
            far:10000,
        },
        objects:[
            //生成一个玻璃球
            generateCrystalBall(),
            //生成一个金属球
            generateMetallicBall(),
            //生成一个地面
            generateFloor()
        ],
        light:generatePointLight(),
        size:[config.width || 400,config.height|| 400],
        //5CABD2
        background:[92/255,171/255,210/255,1.0],
        recursionCount:0,
        maxRecursionCount:4
    }
    return scene;
}




export {createScene};
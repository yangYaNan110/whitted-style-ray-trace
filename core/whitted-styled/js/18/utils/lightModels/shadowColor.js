import {scaleColor} from '../color/index.js';

function getShadowColorByPointInfo(pointInfo){
    const fac = 0.3;
    // return [0,0,0,1]
    return scaleColor(pointInfo.pointInstance.object.color, fac);
}
export {getShadowColorByPointInfo};
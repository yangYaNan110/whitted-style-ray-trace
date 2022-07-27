function multiplyColors(){
    let result = [1,1,1,1];
    for (let i = 0; i < arguments.length; i++) {
        let color = arguments[i];
        result[0]*=color[0];
        result[1]*=color[1];
        result[2]*=color[2];
        result[3]*=color[3]; 
    }
    result[0] = Math.max(0,Math.min(1,result[0]));
    result[1] = Math.max(0,Math.min(1,result[1]));
    result[2] = Math.max(0,Math.min(1,result[2]));
    result[3] = Math.max(0,Math.min(1,result[3]));
    return result;
}
function scaleColor(color,fat){
    return [
        color[0]*fat,
        color[1]*fat,
        color[2]*fat,
        color[3]*fat
    ]
}
function addColors(){
    let result = [0,0,0,0];
    for (let i = 0; i < arguments.length; i++) {
        let color = arguments[i];
        result[0]+=color[0];
        result[1]+=color[1];
        result[2]+=color[2];
        result[3]+=color[3];

    }
    result[0] = Math.max(0,Math.min(1,result[0]));
    result[1] = Math.max(0,Math.min(1,result[1]));
    result[2] = Math.max(0,Math.min(1,result[2]));
    result[3] = Math.max(0,Math.min(1,result[3]));
    return result;
}
export {multiplyColors, scaleColor,addColors};
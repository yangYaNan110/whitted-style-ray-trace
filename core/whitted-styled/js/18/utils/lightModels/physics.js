import * as THREE from '../../../../../libs/three.module.js';
/**
 *反射
 *r = 2n(i*n)-i;
 */
function reflect(i,n){
    const cos = Math.min(1,Math.max(0, i.dot(n)));
    const res =  new THREE.Vector3(n.x*2*cos - i.x, n.y*2*cos - i.y, n.z*2*cos-i.z);
    return res;
}
/**
 *
 *
 * @param {*} i
 * @param {*} n
 * @param {number} [ior=0.8] 折射系数
 * @returns
 */
function refract(i,n,ior=0.8){
    let cosi = clamp(-1, 1,i.dot(n));
    let etai = 1, etat = ior;
     n = new THREE.Vector3().copy(n);
    if (cosi < 0) { cosi = -cosi; } 
    else { 
        let mid = etai;
        etai = etat;
        etat = mid;
        n = new THREE.Vector3(n.x*-1,n.y*-1,n.z*-1);
    }
    let eta = etai / etat;
    let k = 1 - eta * eta * (1 - cosi * cosi);
    let f = eta * cosi - Math.sqrt(k);
    return k < 0 ? new THREE.Vector3() : new THREE.Vector3(i.x*eta,i.y*eta,i.z*eta).add(new THREE.Vector3(n.x*f,n.y*f,n.z*f))
}

function fresnel(i, n,ior)
{
    let cosi = clamp(-1, 1, i.dot(n));
    let etai = 1, etat = ior;
    if (cosi > 0) { 
        let mid = etai;
        etai = etat;
        etat = mid;
    }
    // Compute sini using Snell's law
    let sint = etai / etat * Math.sqrt(Math.max(0.0, 1 - cosi * cosi));
    // Total internal reflection
    if (sint >= 1) {
        return 1;
    }
    else {
        let cost = Math.sqrt(Math.max(0.0, 1 - sint * sint));
        cosi = Math.abs(cosi);
        let Rs = ((etat * cosi) - (etai * cost)) / ((etat * cosi) + (etai * cost));
        let Rp = ((etai * cosi) - (etat * cost)) / ((etai * cosi) + (etat * cost));
        return (Rs * Rs + Rp * Rp) / 2;
    }
   
}
function clamp(a,b,c){
    let min = Math.min(a,b,c);
    let max = Math.max(a,b,c);
    let arr = [a,b,c];
   for (let i = 0; i < 3; i++) {
    if(arr[i] != min && arr[i] != max){
        return arr[i];
    }
   }
}
export {reflect, refract,fresnel};
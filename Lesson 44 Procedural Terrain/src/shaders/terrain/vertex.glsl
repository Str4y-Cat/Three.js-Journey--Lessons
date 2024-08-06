uniform float uPositionFrequency;
uniform float uStrength;
uniform float uWarpFrequency;
uniform float uWarpStrength;
uniform float uTime;

varying vec3 vPosition;
varying float vUpDot;


#include ../includes/simplexNoise2d.glsl

float getElevation(vec2 position)
{
    

    vec2 warpedPosition=position;
    warpedPosition+=vec2(uTime*0.2);
    warpedPosition += simplexNoise2d(warpedPosition*uPositionFrequency*uWarpFrequency)*uWarpStrength;

    float elevation= 0.0;
    elevation+=simplexNoise2d(warpedPosition*uPositionFrequency    )/2.0;

    elevation+=simplexNoise2d(warpedPosition*uPositionFrequency*2.0)/4.0;
    elevation+=simplexNoise2d(warpedPosition*uPositionFrequency*4.0)/8.0;
    float elevationSign= sign(elevation);
    elevation= pow(abs(elevation),2.0)*elevationSign;
    elevation*=uStrength;
    return elevation;
}

void main(){
    float elevation = getElevation(csm_Position.xz);
    csm_Position.y+= elevation;

    float shift= 0.01;

    //normals
    vec3 positionA= position.xyz+vec3(shift,0.0,0.0);
    vec3 positionB= position.xyz+vec3(0.0,0.0,-shift);

    positionA.y += getElevation(positionA.xz);
    positionB.y += getElevation(positionB.xz);

    vec3 toA= normalize(positionA-csm_Position);
    vec3 toB= normalize(positionB-csm_Position);

    csm_Normal= cross(toA,toB);

    


    //varyings
    vPosition= csm_Position;
    vPosition.xz+=uTime*0.2;

    //dot product
    vUpDot= dot(csm_Normal, vec3(0.0,1.0,0.0));
}
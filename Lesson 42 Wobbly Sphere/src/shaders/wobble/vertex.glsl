#include ../includes/simplexNoise4d.glsl

uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;

uniform float uWarpPositionFrequency;
uniform float uWarpTimeFrequency;
uniform float uWarpStrength;



attribute vec4 tangent;

varying float vWobble;

float getWobble(vec3 position){

    vec3 warpedPosition= position;
    warpedPosition+= simplexNoise4d(vec4(
        position*uWarpPositionFrequency,
        uTime*uWarpTimeFrequency
    ))*uWarpStrength;

    return simplexNoise4d(vec4(
        warpedPosition * uPositionFrequency,   //xyz
        uTime*uTimeFrequency         //w
    )) * uStrength;
}

void main(){

    vec3 biTangent= cross(normal,tangent.xyz);

    //neighbors positions
    float uShift= 0.01;
    vec3 positionA= csm_Position+ tangent.xyz*uShift; //ushift shortens the direction vector
    vec3 positionB= csm_Position+ biTangent*uShift;


    //wobble
    float wobble = getWobble(csm_Position);
    csm_Position+= wobble*normal;
    positionA += getWobble(positionA)*normal;   //get the new position for the tangent points. note that the tangent and bitanget are now positions not directions
    positionB += getWobble(positionB)*normal;

    // compute normal 
    vec3 toA= normalize(positionA- csm_Position); //convert positions to directions
    vec3 toB= normalize(positionB- csm_Position);

    csm_Normal = cross(toA,toB);

    //varyings
    vWobble=wobble/uStrength;
}
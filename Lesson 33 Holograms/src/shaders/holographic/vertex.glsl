uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vGlitch;


#include ../utils/random2D.glsl

void main()
{
    //Position
    vec4 modelPosition= modelMatrix * vec4(position,1.0);

    //Glitch 
    float glitchTime= uTime-modelPosition.y;
    float glitchStength= sin(1.0*(glitchTime));
     glitchStength+= sin(3.45*(glitchTime));
     glitchStength+= sin(8.76*(glitchTime));
     glitchStength/=3.0;

    glitchStength=smoothstep(0.3,1.0,glitchStength);
     glitchStength*=0.125;
    modelPosition.x+=(random2D(modelPosition.xz+uTime)-0.5)*2.0*glitchStength;
    modelPosition.z+=(random2D(modelPosition.zx+uTime)-0.5)*2.0*glitchStength;

    //final position
    gl_Position= projectionMatrix * viewMatrix * modelPosition;

    vec4 modelNormal= modelMatrix * vec4(normal,0.0);


    vUv=uv;
    vPosition= modelPosition.xyz;
    vNormal=normalize(modelNormal.xyz);
    vGlitch=glitchStength;
}
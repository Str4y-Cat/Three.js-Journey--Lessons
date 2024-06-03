uniform float uSize;
uniform float uTime;
attribute vec3 aRandomness;
attribute float aScale;

varying float vCameraDistance;
varying vec3 vColor;


void main()
{
    /**
    *position
    */
    vec4 modelPosition=modelMatrix * vec4(position,1.0);

    float angle= atan(modelPosition.x,modelPosition.z);
    float distanceToCenter= length(modelPosition.xz);
    float angleOffset= (1.0 / distanceToCenter)* uTime *0.2;
    angle+=angleOffset;
    modelPosition.x=cos(angle)*distanceToCenter;
    modelPosition.z=sin(angle)*distanceToCenter;

    //randomness
    modelPosition.xyz+=aRandomness.xyz;
    

    vec4 viewPosition= viewMatrix * modelPosition;
    vec4 projectionPosition=projectionMatrix * viewPosition;
    gl_Position= projectionPosition;


    



    /**
    *size
    */
    gl_PointSize=uSize*aScale;

    gl_PointSize *= ( 1.0 / - viewPosition.z );
    // gl_PointSize=uSize*aScale;

    /**
    *color
    */
    vColor=color;
    // vCameraDistance= 
}
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uFrequency;

attribute float aRandom;
attribute vec3 position;

// varying 


void main()
{
    vec4 modelPosition= modelMatrix* vec4(position,1.0);
    modelPosition.z+= sin(modelPosition.x *uFrequency)* 0.1;
    
    vec4 viewPosition= viewMatrix*modelPosition;
    vec4 projectedPosition=projectionMatrix * viewPosition;

    gl_Position= projectedPosition;
    // gl_Position= projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);

}
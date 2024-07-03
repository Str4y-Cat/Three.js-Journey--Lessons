varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    //Position
    vec4 modelPosition= modelMatrix * vec4(position,1.0);

    //final position
    gl_Position= projectionMatrix * viewMatrix * modelPosition;

    vec4 modelNormal= modelMatrix * vec4(normal,0.0);


    vUv=uv;
    vPosition= modelPosition.xyz;
    vNormal=normalize(modelNormal.xyz);

}
varying vec2 vUv;


void main()
{
    //final positions
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);

    //Varyings
    vUv=uv;
}
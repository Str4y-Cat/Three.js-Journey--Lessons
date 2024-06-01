varying vec2 vUv;

void main()
{
    // pattern 3 white gradient left to right
    // float strength=vUv.x;

    //pattern 4 white gradient down to up
    float strength= vUv.y



    gl_FragColor = vec4(vec3(strength), 1.0);


}
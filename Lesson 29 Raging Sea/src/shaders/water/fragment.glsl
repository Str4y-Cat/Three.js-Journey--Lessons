uniform vec3 uBigWavesColor1;
uniform vec3 uBigWavesColor2;



varying float vDepth;


void main()
{
    vec3 waveColor= mix(uBigWavesColor1,uBigWavesColor2,vDepth+1.0);
    // float color= step(0.5,vDepth);
    // vec3 waveColor= vec3(color);
    gl_FragColor= vec4(waveColor, 1.0);

    #include <colorspace_fragment>;
}
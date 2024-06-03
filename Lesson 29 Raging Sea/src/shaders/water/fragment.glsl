uniform vec3 uBigWavesColor1;
uniform vec3 uBigWavesColor2;
uniform float uColorOffset;
uniform float uColorMultiplier;



varying float vDepth;


void main()
{
    float mixStrength= (vDepth+uColorOffset)*uColorMultiplier;
    vec3 waveColor= mix(uBigWavesColor1,uBigWavesColor2,mixStrength);
    // float color= step(0.5,vDepth);
    // vec3 waveColor= vec3(color);
    gl_FragColor= vec4(waveColor, 1.0);

    #include <colorspace_fragment>;
}
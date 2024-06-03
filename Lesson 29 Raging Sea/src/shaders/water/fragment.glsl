uniform vec3 uBigWavesColor1;
uniform vec3 uBigWavesColor2;
uniform float uColorOffset;
uniform float uColorMultiplier;



varying float vDepth;


void main()
{
    float mixStrength= (vDepth+uColorOffset)*uColorMultiplier;
    vec3 waveColor= mix(uBigWavesColor2,uBigWavesColor1,mixStrength);
    // float color= step(0.5,vDepth);
    // vec3 waveColor= vec3(color);
    gl_FragColor= vec4(waveColor, 1.0);

    //  float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    // vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    
    // gl_FragColor = vec4(color, 1.0);
    // #include <colorspace_fragment>

    #include <colorspace_fragment>;
}
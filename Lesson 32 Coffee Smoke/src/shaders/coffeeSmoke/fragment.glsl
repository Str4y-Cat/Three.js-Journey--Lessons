uniform sampler2D uPerlinTexture;


varying vec2 vUv;



void main()
{

    //smoke
    float smoke = texture(uPerlinTexture,vUv).r;

    gl_FragColor= vec4(smoke,smoke,smoke,1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
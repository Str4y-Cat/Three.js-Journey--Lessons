uniform sampler2D uPerlinTexture;
uniform float uTime;


varying vec2 vUv;



void main()
{
    // scale and animate
    vec2 smokeUv= vUv;
    smokeUv.x*=0.5;
    smokeUv.y*=0.3;
    smokeUv.y-=(uTime*0.1);
    // smokeUv.y=mod(1,smokeUv.y);


    //smoke
    float smoke = texture(uPerlinTexture,smokeUv).r;

    //remap
    smoke= smoothstep(0.4,1.0,smoke);
    // smoke=1.0;

    smoke*=smoothstep(0.0,0.1,vUv.x);
    smoke*=smoothstep(1.0,0.9,vUv.x);
    smoke*=smoothstep(0.0,0.1,vUv.y);
    smoke*=smoothstep(1.0,0.9,vUv.y);

    gl_FragColor= vec4(0.6,0.3,0.2,smoke);
    // gl_FragColor= vec4(1.0,0.0,0.0,1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
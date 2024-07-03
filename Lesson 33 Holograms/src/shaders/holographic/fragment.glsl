uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;



void main()
{   
    //normal
    vec3 normal= normalize(vNormal);
    if(!gl_FrontFacing)
    {
        normal*=-1.0;
    }
    // vec2 uv= vUv;
    // uv= mod(uv,0.1);

//stripes
    vec3 position= vPosition;
    float stripes= mod((position.y-uTime*0.02)*20.0,1.0);
    stripes= pow(stripes,3.0);
    
    //Fresnel
    vec3 viewDirection = normalize(vPosition- cameraPosition);
    float fresnel=1.0+ dot(viewDirection,normal);
    fresnel= pow(fresnel,2.0);

    //Falloff
    float falloff= smoothstep(0.8,0.0,fresnel);
    // fresnel*=1.0-falloff;


//holographic
    float holographic= stripes * fresnel;
    holographic+=fresnel*1.25;
    holographic*=falloff;

    //Final color
    gl_FragColor= vec4(uColor,holographic);
    // gl_FragColor= vec4(1.0,1.0,1.0,falloff);
    // gl_FragColor= vec4(vNormal,1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
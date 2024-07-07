uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;
varying vec3 vPosition;
varying vec3 vNormal;

// #include ../lights/ambient.glsl
// #include ../lights/directional.glsl
#include ../lights/point.glsl


void main()
{
    //base color
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    mixStrength= smoothstep(0.0,1.0,mixStrength);
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    //lights
    vec3 viewDirection=normalize( vPosition- cameraPosition);
    vec3 normal= normalize(vNormal);
    
    vec3 light= vec3(0.0);
    //ambient light
    // light+=  ambientLight(
    //     vec3(1.0,1.0,1.0),
    //     0.01
    // );

    //directional
    //vec3 lightColor,float lightIntensity, vec3 normal, vec3 lightPosition,vec3 viewDirection,float specularPower
    // light+= directionalLight(
    //     vec3(1.0,1.0,1.0),
    //     0.1,
    //     normal,
    //     vec3(-1.0,0.5,0.0),
    //     viewDirection,
    //     30.0

    // );
    light+= pointLight(
        vec3(1.0),  //light color
        10.0,        //light intensity
        normal,    //model normals
        vec3(0,0.25,0),   //light positions
        viewDirection,
        30.0,
        vPosition,
        0.95

    );
    color*=light;

    //point light



    //final color
    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(light, 1.0);
    // gl_FragColor = vec4(normal, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
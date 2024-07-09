
uniform vec3 uSunPosition;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;


varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);
    // float alpha=0;

    //dot
    vec3 sunPosition= normalize(uSunPosition);
    float sunOrientation= dot(normal,sunPosition);

    
    //atmosphere
    float atmosphereDayMix= smoothstep(-0.5,1.0,sunOrientation);
    vec3 atmosphereColor= mix(uAtmosphereTwilightColor,uAtmosphereDayColor,atmosphereDayMix);
    color+=atmosphereColor;
    

    float edgeAlpha= dot(viewDirection,normal);
    edgeAlpha=smoothstep(0.0,0.5,edgeAlpha);
    // color=vec3(edgeAlpha);

    float dayAlpha= smoothstep(-0.5,0.0,sunOrientation);
    // color=vec3(dayAlpha);

    float alpha=dayAlpha*edgeAlpha;
    // color=vec3(alpha);

    // Final color
    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
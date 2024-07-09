uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform vec3 uSunPosition;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    //Day / night color
    vec3 dayColor = texture(uDayTexture, vUv).rgb;
    vec3 nightColor = texture(uNightTexture, vUv).rgb;
    // color= dayColor;

    //dot
    vec3 sunPosition= normalize(uSunPosition);
    float sunOrientation= dot(normal,sunPosition);
    float dayMix= sunOrientation;

    dayMix=smoothstep(-0.25,0.5,dayMix);
    color=mix(nightColor,dayColor,dayMix);
    
    //specularCloudsColor
    vec2 specularCloudsColor= texture(uSpecularCloudsTexture,vUv).rg;

    //clouds
    float cloudsMix= specularCloudsColor.g;
    cloudsMix=smoothstep(0.3,1.0,cloudsMix);
    cloudsMix*=dayMix;
    color= mix(color,vec3(1.0),cloudsMix);

    float fresnel= 1.0+dot(viewDirection,normal);
    fresnel=pow(fresnel,2.0);
    
   

    //atmosphere
    float atmosphereDayMix= smoothstep(-0.5,1.0,sunOrientation);
    vec3 atmosphereColor= mix(uAtmosphereTwilightColor,uAtmosphereDayColor,atmosphereDayMix);
    color=mix(color,atmosphereColor,fresnel*atmosphereDayMix);

     //specular
    vec3 reflection = reflect(-sunPosition,normal);
    float specular=-dot(reflection,viewDirection);
    specular=max(specular,0.0);
    specular=pow(specular,32.0);
    specular*= specularCloudsColor.r;
    vec3 specularColor=mix(vec3(1.0),atmosphereColor,fresnel);
    // color=specularColor;
    color+=specular*specularColor;


    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
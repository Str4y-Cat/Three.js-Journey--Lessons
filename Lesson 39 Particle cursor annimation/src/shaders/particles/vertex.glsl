uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;

attribute float aIntensity;
attribute float aAngle;

varying vec3 vColour;
void main()
{
    //displacement=
    vec3 newPosition= position;
    float displacementIntensity = texture(uDisplacementTexture,uv).r;
    displacementIntensity= smoothstep(0.1,0.3,displacementIntensity);
    vec3 displacement = normalize(vec3(
        cos(aAngle)*0.2,
        sin(aAngle)*0.2,
        1.0
    ));
    displacement*= displacementIntensity;
    displacement*= 3.0;
    displacement*=aIntensity;
    newPosition+=displacement;

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    //picture
    float pictureIntesity= texture(uPictureTexture,uv).r;
    // float pictureIntesity= texture(uDisplacementTexture,uv).r;

    // Point size
    gl_PointSize = 0.15 *pictureIntesity * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);


    //Varyings
    vColour= vec3(pow(pictureIntesity,3.0));
}
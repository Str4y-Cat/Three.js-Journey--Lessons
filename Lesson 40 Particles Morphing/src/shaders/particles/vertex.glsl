uniform vec2 uResolution;
uniform float uSize;
uniform float uProgress;
uniform vec3 uColor1;
uniform vec3 uColor2;

attribute vec3 aPositionTarget;
attribute float aSize;

varying vec3 vColor;

#include ../includes/simplexNoise3d.glsl
void main()
{//mix position
    float noiseOrigin= simplexNoise3d(position*0.2);
    float noiseTarget= simplexNoise3d(aPositionTarget*0.2);
    float noise = mix(noiseOrigin,noiseTarget,uProgress);
    noise = smoothstep(-1.0,1.0,noise);

    float duration = 0.4;
    float delay= (1.0- duration)*noise;
    float end= delay+duration;

    float progress=smoothstep(delay,end,uProgress);
    vec3 mixedPosition= mix(position, aPositionTarget,progress);
    // Final position
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size
    gl_PointSize = uSize * uResolution.y*aSize;
    gl_PointSize *= (1.0 / - viewPosition.z);

    //color
    vec3 color= mix(uColor1,uColor2,noise);

    // /varyings
    vColor= color;
}
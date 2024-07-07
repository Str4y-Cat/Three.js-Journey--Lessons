uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;

varying float vElevation;
varying vec3 vPosition;
varying vec3 vNormal;

#include ./includes/perlinClassic3D.glsl

float waveElevation(vec3 position)
{
// Elevation
    float elevation = sin(position.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                      sin(position.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                      uBigWavesElevation;

    for(float i = 1.0; i <= uSmallIterations; i++)
    {
        elevation -= abs(perlinClassic3D(vec3(position.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }
    return elevation;
}

void main()
{
    //base position
    float shift= 0.01;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec3 modelPositionA= modelPosition.xyz + vec3(shift,0.0,0.0);
    vec3 modelPositionB= modelPosition.xyz + vec3(0.0,0.0,-shift);

    float elevation=waveElevation(modelPosition.xyz);
    modelPosition.y += elevation;

     modelPositionA.y+=waveElevation(modelPositionA);
     modelPositionB.y+=waveElevation(modelPositionB);

     vec3 toA=normalize(modelPositionA-modelPosition.xyz);
     vec3 toB=normalize(modelPositionB-modelPosition.xyz);
    vec3 computedNormal= cross(toA,toB);
    

    //final position
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    //varyings
    vElevation = elevation;
    // vec4 modelPosition=modelMatrix*vec4(position,0.0);

    vPosition= modelPosition.xyz;
    vNormal=computedNormal;
}
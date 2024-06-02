uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uTime;
uniform float uBigWavesSpeed;

varying float vDepth;

void main()
{
    vec4 modelPosition= modelMatrix * vec4(position,1.0);

    //Elevation
    float elevation=    sin(modelPosition.x*uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                        sin(modelPosition.z*uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                        uBigWavesElevation;    

    modelPosition.y+=elevation;
    // posi

    vec4 viewPosition= viewMatrix * modelPosition;
    gl_Position= projectionMatrix *viewPosition; 

    vDepth= modelPosition.y/uBigWavesElevation;

}
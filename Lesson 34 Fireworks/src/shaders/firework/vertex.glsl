uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aTimeMultiplier;

attribute float aSize;
// varying vUv;
#include ../utils/remap.glsl

void main()
{
    float progress= uProgress* aTimeMultiplier;
    vec3 newPosition= position;
    float explodingProgress= remap(progress, 0.0,0.1,0.0,1.0);
    explodingProgress=clamp(explodingProgress,0.0,1.0);
    explodingProgress=1.0-pow(1.0-explodingProgress,3.0);
    newPosition*=explodingProgress;

    float fallingProgress= remap(progress, 0.1,1.0,0.0,1.0);
    fallingProgress=clamp(fallingProgress,0.0,1.0);
    fallingProgress=1.0-pow(1.0-fallingProgress,3.0);
    newPosition.y-=fallingProgress*0.2;


    //scaling
    
    float scaleUp= remap(progress, 0.0,0.125,0.0,1.0);
    float scaleDown= remap(progress, 0.125,1.0,1.0,0.0);
    float sizeProgress=min(scaleUp,scaleDown);
    sizeProgress=clamp(sizeProgress,0.0,1.0);

    //twinkling
    float twinklingProgress= remap(progress, 0.2,0.8,0.0,1.0);
    twinklingProgress=clamp(twinklingProgress,0.0,1.0);
    
    float sizeTwinkling = (sin(progress*30.0)*0.5)+0.5;
    sizeTwinkling= 1.0 - sizeTwinkling*twinklingProgress;

    

    //final position
    vec4 modelPosition= modelMatrix * vec4(newPosition,1.0);
    vec4 viewPosition= viewMatrix * modelPosition;
    gl_Position= projectionMatrix*viewPosition;


    //final Size
    gl_PointSize=uSize*uResolution.y * aSize*sizeProgress*sizeTwinkling;
    gl_PointSize*= 1.0/-viewPosition.z;


    if(gl_PointSize<1.0)
    {
        gl_Position=vec4(9999.0);
    }
    // vUv= uv;
}
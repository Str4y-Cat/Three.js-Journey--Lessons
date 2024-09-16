uniform float time;

attribute float randomNumber;


void main()
{


    vec3 newPosition= vec3(position.x,position.y+ sin(position.y+time)*randomNumber,position.z);

    vec4 modelPosition= modelMatrix * vec4(newPosition,1.0);
    vec4 viewPosition= viewMatrix * modelPosition;
    vec4 projectionPosition=projectionMatrix * viewPosition;
    gl_Position= projectionPosition;
    
    gl_PointSize= 4.0;

}
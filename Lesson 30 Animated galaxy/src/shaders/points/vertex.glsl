uniform float uSize;
attribute float aScale;

varying float vCameraDistance;



void main()
{
    /**
    *position
    */
    vec4 modelPosition=modelMatrix * vec4(position,1.0);
    vec4 viewPosition= viewMatrix * modelPosition;
    vec4 projectionPosition=projectionMatrix * viewPosition;
    gl_Position= projectionPosition;

    /**
    *size
    */
    gl_PointSize=uSize*aScale;

    gl_PointSize *= ( 1.0 / - viewPosition.z );
    // gl_PointSize=uSize*aScale;


    // vCameraDistance= 
}
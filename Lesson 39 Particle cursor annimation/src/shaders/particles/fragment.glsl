varying vec3 vColour;

void main()
{

    vec2 uv= gl_PointCoord;

float distanceToCenter= distance(vec2(0.5,0.5),uv);
    // float mask = 1.0-step(0.5,);

    if(distanceToCenter> 0.5){
        discard;
    }

    // gl_FragColor= vec4(vec3(distanceToCenter),1.0);
    gl_FragColor = vec4(vColour, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
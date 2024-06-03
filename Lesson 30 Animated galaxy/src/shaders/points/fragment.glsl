varying float vCameraDistance;




void main()
{
    // circle
    // float strength= step(0.5,distance(gl_PointCoord,vec2(0.5)));
    // float alpha= 1.0-strength;

    // diffuse circle
    float strength= distance(gl_PointCoord,vec2(0.5))*2.0;
    float alpha= 1.0-strength;

    vec3 myColor= vec3(0.5,0.4,0.9);
    gl_FragColor= vec4(myColor,alpha);
    #include <colorspace_fragment>
}
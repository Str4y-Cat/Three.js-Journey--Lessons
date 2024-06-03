varying float vCameraDistance;
varying vec3 vColor;




void main()
{
    // circle
    // float strength= step(0.5,distance(gl_PointCoord,vec2(0.5)));
    // float alpha= 1.0-strength;

    // diffuse circle
    // float strength= distance(gl_PointCoord,vec2(0.5))*2.0;
    // float alpha= 1.0-strength;

    // diffuse circle
    float strength= distance(gl_PointCoord,vec2(0.5))*2.0;
    // float alpha= 1.0-strength;
    // alpha= pow(alpha,10.0);

    // vec3 myColor= vec3(1.0);
    // gl_FragColor= vec4(myColor,alpha);


     strength= 1.0-strength;
    strength= pow(strength,10.0);

    //final color
    vec3 myColor= mix(vec3(0.0),vColor,strength);


    gl_FragColor= vec4(myColor,1.0);


    #include <colorspace_fragment>
}
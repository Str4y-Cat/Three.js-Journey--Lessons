

varying vec3 vColor;
void main()
{
    vec2 uv= gl_PointCoord;
    float distanceToCenter=distance(uv,vec2(0.5,0.5));
    // float mask =pow(distanceToCenter,20.0);

    float alpha= 0.05/ distanceToCenter -0.1;
    // mask = smoothstep(0.2,0.9,mask);
    // mask= 1.0-mask;


    // gl_FragColor = vec4(vColor, 1.0);
    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
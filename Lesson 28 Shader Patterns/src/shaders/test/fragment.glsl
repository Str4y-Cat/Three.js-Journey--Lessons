varying vec2 vUv;

void main()
{
    // pattern 3 horizontal gradient
    // float strength=vUv.x;

    //pattern 4 vertical gradient
    // float strength= vUv.y

    //pattern 5 vertical gradient reversed
    // float strength= 1.0-vUv.y;

   //pattern 6 vertican gradient shifted 
   float shiftValue=10.0;
    float strength= vUv.y*shiftValue;


    gl_FragColor = vec4(vec3(strength), 1.0);


}
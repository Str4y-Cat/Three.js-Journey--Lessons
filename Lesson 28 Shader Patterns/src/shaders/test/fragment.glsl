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
    //    float shiftValue=10.0;
    //     float strength= vUv.y*shiftValue;

    //pattern 7 repeated horizontal gradient
    //float strength= mod(vUv.y*10.0,1.0);

    //pattern 8 repeated horizontal gradient
    // float strength= mod(vUv.y*10.0,1.0);
    // strength= step(0.5, strength);

    // //pattern 9 repeated horizontal gradient
    // float strength= mod(vUv.y*10.0,1.0);
    // strength= step(0.8, strength);

    // //pattern 10 repeated horizontal gradient
    // float strength= mod(vUv.x*10.0,1.0);
    // strength= step(0.8, strength);

    //pattern 11 repeated horizontal gradient
    float strength= step(0.8,mod(vUv.x*10.0,1.0));
    strength+=step(0.8,mod(vUv.y*10.0,1.0));
    // strength= step(0.8, strength);

    // float strengthY= mod(vUv.y*10.0,1.0);
    // strengthY= step(0.8, strengthY);

    // strength+=strengthY;

    gl_FragColor = vec4(vec3(strength), 1.0);


}
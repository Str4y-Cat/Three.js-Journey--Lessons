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

    // //pattern 11 line grid
    // float strength= step(0.8,mod(vUv.x*10.0,1.0));
    // strength+=step(0.8,mod(vUv.y*10.0,1.0));

    // //pattern 12 d0t grid
    // float strength= step(0.8,mod(vUv.x*10.0,1.0));
    // strength*=step(0.8,mod(vUv.y*10.0,1.0));

    //pattern 13 extended dot grid
    // float strength= step(0.4,mod(vUv.x*10.0,1.0));
    // strength*=step(0.8,mod(vUv.y*10.0,1.0));

    //pattern 14 
    // float barX= step(0.4,mod(vUv.x*10.0,1.0));
    // barX*=step(0.8,mod(vUv.y*10.0,1.0));

    // float barY= step(0.4,mod(vUv.y*10.0,1.0));
    // barY*=step(0.8,mod(vUv.x*10.0,1.0));

    // float strength= barY+barX;

    // //pattern 15
    // float barX= step(0.4,mod(vUv.x*10.0-0.2,1.0));
    // barX*=step(0.8,mod(vUv.y*10.0,1.0));

    // float barY= step(0.4,mod(vUv.y*10.0-0.2,1.0));
    // barY*=step(0.8,mod(vUv.x*10.0,1.0));

    // float strength= barY+barX;

    //pattern 16
    
    // float strength = min(abs(vUv.x-0.5),abs(vUv.y-0.5));
    //   strength += ;


    //pattern 18
    // float strength = max(abs(vUv.x-0.5),abs(vUv.y-0.5));


    //pattern 19
    // float strength = step(0.2,max(abs(vUv.x-0.5),abs(vUv.y-0.5)));

    //pattern 20
    // float square1 = step(0.2,max(abs(vUv.x-0.5),abs(vUv.y-0.5)));
    // float square2 =1.0- step(0.3,max(abs(vUv.x-0.5),abs(vUv.y-0.5)));
    // float strength= square1* square2;

    // pattern 21
    // float strength = floor(vUv.y*10.0)/10.0;

    // pattern 22
    float strength = floor(vUv.y*10.0)/10.0*floor(vUv.x*10.0)/10.0;

    gl_FragColor = vec4(vec3(strength), 1.0);


}
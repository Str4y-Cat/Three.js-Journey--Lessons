#define PI 3.14159265358979323846264338327950288419


varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

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
    // float strength = floor(vUv.y*10.0)/10.0*floor(vUv.x*10.0)/10.0;

    // pattern 23
    // float strength = random(vUv);


    // // pattern 24
    // vec2 gridUv=vec2(
    //     floor(vUv.y*10.0)/10.0,
    //     floor(vUv.x*10.0)/10.0
    // );
    // float strength= random(gridUv);


    // pattern 25
    // vec2 gridUv=vec2(
    //     floor((vUv.y+vUv.x*0.5)*10.0)/10.0,
    //     floor(vUv.x*10.0)/10.0
    // );
    // float strength= random(gridUv);

    // //pattern 26
    //    float strength = length(vUv);


    //pattern 27
    // float strength= distance(vUv, vec2(0.5));

    //pattern 28
    // float strength= 1.0- distance(vUv, vec2(0.5));

     //pattern 29
    // float strength= 0.015/distance(vUv, vec2(0.5));

    // //30
    // vec2 lightUv= vec2(
    //     vUv.x,
    //     (vUv.y-0.5)*5.0+0.5)
    // ;
    // float strength= 0.015/distance(lightUv, vec2(0.5));
    
    // //pattern 31
    // vec2 lightUv1= vec2(
    //     vUv.x,
    //     (vUv.y-0.5)*5.0+0.5)
    // ;
    // vec2 lightUv2= vec2(
    //     (vUv.x-0.5)*5.0+0.5,
    //     vUv.y)
    // ;
    // float strength= 0.15/distance(lightUv1, vec2(0.5));
    //  strength*= 0.15/distance(lightUv2, vec2(0.5));
    
    
    //pattern 32

    vec2 rotatedUv= rotate(vUv, PI/4.0, vec2(0.5));

    vec2 lightUv1= vec2(
        rotatedUv.x,
        (rotatedUv.y-0.5)*5.0+0.5)
    ;
    vec2 lightUv2= vec2(
        (rotatedUv.x-0.5)*5.0+0.5,
        rotatedUv.y)
    ;
    float strength= 0.15/distance(lightUv1, vec2(0.5));
     strength*= 0.15/distance(lightUv2, vec2(0.5));
    
    
    gl_FragColor = vec4(vec3(strength), 1.0);


}


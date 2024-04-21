import * as THREE from 'three'
import { log } from 'three/examples/jsm/nodes/Nodes.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * Base
 */

//Mouse move
let mousePositionX=0;
let mousePositionY=0;
const buffer= 20;

window.addEventListener("mousemove",(e)=>
{
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;
    let countx=0
    let county=0

    if(posX<=sizes.width&&posY<=sizes.height){
        
        
            mousePositionX=posX/(sizes.width)-0.5
            mousePositionY=posY/(sizes.height)-0.5


        
        
        
        // if(countx<1){
        //     // camera.position.x += mousePositionX/10
        //     countx+= mousePositionX/10
        //     console.log(countx)

        // }
        // else{
        //     console.log("Stopping")
        // }
        // if(county<1){
        //     // camera.position.y += -mousePositionY/10
        //     countx+= -mousePositionY/10
        // }
    }
    
    
        // console.log(mousePositionX);
        // console.log(mousePositionY);



})








// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const aspectRatio=  sizes.width/sizes.height
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// const camera= new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,100)



camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;
    camera.position.x = 2*Math.sin(-mousePositionX*Math.PI*2)
    camera.position.z = 2*Math.cos(mousePositionX*Math.PI*2)
    camera.position.y = mousePositionY*3

    // camera.rotation.y= Math.PI*Math.sin(mousePositionX)
    // camera.position.x += 0.1

    camera.lookAt(mesh.position)   
    

    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
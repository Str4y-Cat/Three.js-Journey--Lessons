import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/Addons.js'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new GUI()
const debug= {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTexture= textureLoader.load("/textures/matcaps/3.png")
const matCapTexture2= textureLoader.load("/textures/matcaps/4.png")

matCapTexture.colorSpace = THREE.SRGBColorSpace
matCapTexture2.colorSpace = THREE.SRGBColorSpace

const axisHelper= new THREE.AxesHelper();
scene.add(axisHelper)

/**
 * fonts
 */
// const fontLoader= new FontLoader()
// fontLoader.load(
//     "fonts/helvetiker_regular.typeface.json",
//     (font)=>
//     {
//         const textGeometry= new TextGeometry(
//             "Hello World",
//             {
//                 font:font,
//                 size:0.5,
//                 height:0.2,
//                 curveSegments: 12,
//                 bevelEnabled:true,
//                 bevelThickness:0.03,
//                 bevelSize:0.02,
//                 bevelOffset:0,
//                 bevelSegments:3
//             }
//         )

//         textGeometry.center()

//         // const textMaterial= new THREE.MeshBasicMaterial()
//         const textMaterial= new THREE.MeshMatcapMaterial()
//         textMaterial.matcap=matCapTexture


//         // gui.add(textMaterial,"wireframe")
//         const textMesh= new THREE.Mesh(textGeometry,textMaterial)
//         scene.add(textMesh)


//     }
// )

/**
 * Object
 */

console.time("donuts")
const boxSize={
    height:1,
    width:1
}

const donutGeometry= new THREE.BoxGeometry(boxSize.width,boxSize.height,1)
const donutMaterial= new THREE.MeshMatcapMaterial({matcap: matCapTexture2})
const donutArr= []
let rowArr=[]
let column= 0
let row= 0
let rowCount=0


for (let i = 0; i <1000; i++) {
    
    const donut= new THREE.Mesh(donutGeometry, donutMaterial)


    donut.position.x= column*boxSize.width
    // donut.position.z= (Math.random()-0.5)*10
    donut.position.y= row*boxSize.height
    // donut.rotation.x= Math.random()*Math.PI
    // donut.rotation.y= Math.random()*Math.PI

    // const scale= Math.max(Math.random(),0.6)
    // donut.scale.set(scale,scale,scale)
    // donut.rotation.z= Math.random()*Math.PI



    scene.add(donut)
    rowArr.push(donut.position);
    // rowArr.push(column);


    if(column==30){
        row++
        rowCount++
        column=0
        donutArr.push(rowArr)
        rowArr=[]
    }
    else{
        column++
    }
}


console.timeEnd("donuts")
// debug.move= ()=>{
//     const timeline=gsap.timeline()
//     // for (let index = 0; index < donutArr.length; index++) {
//     //     const element = array[index];
//     //     timeline.to()
//     // }
//     timeline.to(donutArr,
//     {
//         z:2,
//         // duration:3,
//         stagger: {
//             // wrap advanced options in an object
//             each: 0.2,
//             from: 'random',
//             yoyo: true,
//             // random:true,
//             ease: 'power2.inOut',
//             repeat: -1 // Repeats immediately, not waiting for the other staggered animations to finish
//         }
//     })
//     // timeline.to(donutArr,
//     //     {
//     //         z:0,
//     //         duration:1,
//     //         stagger:0.01,
            

//     //     })
// }
// donutArr.forEach(element => {
//     window.addEventListener("mouseover",()=>{
//         gsap.to(element,{
//             z:1,
//             ease: 'power2.inOut',

//         })
//     })
// });
gui.add(debug,"move")

console.log(donutArr)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0.25
camera.position.z = 2
camera.lookAt(0,0,0)
scene.add(camera)


// gui.add(camera.rotation,'x').min(-100).max(100).step(0.01).onChange(()=>{

// })
// gui.add(camera.rotation,'y')
// gui.add(camera.rotation,'z')


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
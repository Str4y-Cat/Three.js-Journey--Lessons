import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from "lil-gui"

/***
 * Debug
 */
const gui = new GUI({
    width:300,
    title:"nice debug"
})
const debug={}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

debug.color="#3a6ea6"
debug.randomSegment=2

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debug.color, wireframe:true})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTeaks= gui.addFolder("folder")

cubeTeaks
    .add(mesh.position, "y")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("elevation")


cubeTeaks
.add(mesh,"visible")

cubeTeaks
.add(material,"wireframe")

cubeTeaks
.addColor(debug,"color").onChange((color)=>{
    material.color.set(color)
})

debug.spin=()=>{
    gsap.to(mesh.rotation,
        {
            duration:3,
            y: mesh.rotation.y + 2*Math.PI,
            ease: "circ.out",
        })
    gsap.to(mesh.position,{

        y: 1,
        ease: "power4.out",
        duration:1
    })
    gsap.to(mesh.position,{

        y: 0,
        ease: "power4.in",
        duration:1,
        delay:1
    })
}
cubeTeaks.add(debug,"spin")

cubeTeaks.add(debug,"randomSegment").min(1).max(10).step(1).onFinishChange(()=>
{
    mesh.geometry.dispose()
    mesh.geometry=new THREE.BoxGeometry(1, 1, 1, debug.randomSegment, debug.randomSegment, debug.randomSegment)
})


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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

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
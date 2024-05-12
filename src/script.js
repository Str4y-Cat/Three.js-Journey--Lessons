import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { distance } from 'three/examples/jsm/nodes/Nodes.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Particles
 */

const parameters={
    count:100000,
    color:"#ff00ff",
    particleSize:0.01,
    distance:4,
    radius:1,

}

const bpFolder=gui.addFolder("Base Particles")
bpFolder.add(parameters,"count").min(100).max(100000).step(100).name(" Count")
bpFolder.add(parameters,"distance").min(1).max(10).step(0.1).name("Distance")
bpFolder.add(parameters,"particleSize").min(0.01).max(1).step(0.01).name("Size")
bpFolder.addColor(parameters,"color").min(0.01).max(20).step(0.01).name("Radius")
bpFolder.add(parameters,"radius")

let particlesGeometry=null
let particlesMaterial= null
let particles= null



const generateGalaxy= ()=>{

    if(particlesGeometry!=null){
        particlesGeometry.dispose()
        particlesMaterial.dispose()
        scene.remove(particles)
    }

    //geometry
    particlesGeometry= new THREE.BufferGeometry()
    //buffer array
    const positions= new Float32Array(parameters.count*3)

    for (let i = 0; i < parameters.count; i++) {

        const i3= i*3
        const radius= (Math.random())*parameters.radius
        positions[i3+0]= (Math.random()-0.5)*parameters.distance//x
        positions[i3+1]= (Math.random()-0.5)*parameters.distance//y
        positions[i3+2]= (Math.random()-0.5)*parameters.distance//z
    }


    console.log(positions)
    //buffer attribute
    particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions,3)
    )

    //material
    particlesMaterial= new THREE.PointsMaterial({
        color:parameters.color,
        sizeAttenuation:true,
        size:parameters.particleSize,
        depthWrite:false,
        blending:THREE.AdditiveBlending
     })

    


    //add point mesh
    particles= new THREE.Points(
        particlesGeometry,particlesMaterial
    )
    //add to scene
    scene.add(particles)

}

generateGalaxy()
bpFolder.onFinishChange(()=>{
    
    generateGalaxy()})

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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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
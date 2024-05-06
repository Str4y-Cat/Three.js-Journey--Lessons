import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { color } from 'three/examples/jsm/nodes/Nodes.js'

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

/**
 * House
 */
// house group

const houseGroup= new THREE.Group()
scene.add(houseGroup)

//  walls
const wallParams={
    width:4,
    height:2.6,
    depth:4
}
const walls= new THREE.Mesh(
    new THREE.BoxGeometry(wallParams.width,wallParams.height,wallParams.depth),
    new THREE.MeshStandardMaterial({color:"red"})
)
walls.position.y+= wallParams.height/2
// console.log();
houseGroup.add(walls)

//roof
const roof= new THREE.Mesh(
    new THREE.ConeGeometry(2.82842712475,1.5,4),
    new THREE.MeshStandardMaterial({color:"green", wireframe:true})
    )
    roof.position.y+= wallParams.height+roof.geometry.parameters.height/2
    roof.rotation.y= Math.PI/4


    debug.coneRadius= 2.82842712475
    gui.add(debug,"coneRadius").min(1).max(5).step(0.01).onChange((radius)=>{
        roof.geometry= new THREE.ConeGeometry(radius,1.5,4)
    })
console.log((Math.sqrt(Math.pow(walls.geometry.parameters.height,2)+Math.pow(walls.geometry.parameters.depth,2)))/2)
houseGroup.add(roof)


//door
const door= new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 2.2, 20, 40),
    new THREE.MeshStandardMaterial({color:"brown"})

)

door.position.z+= wallParams.depth/2+0.001
door.position.y+= door.geometry.parameters.height/2
houseGroup.add(door)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 1.5)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
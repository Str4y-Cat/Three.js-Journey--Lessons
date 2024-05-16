import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import ThreeForceGraph from 'three-forcegraph'

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
 * Lights
 */

//ambient light
debug.color="#fff"
const ambientFolder= gui.addFolder("Ambient Light")

const ambientLight= new THREE.AmbientLight()
ambientLight.color=new THREE.Color(debug.color)
ambientLight.intensity=1

ambientFolder.add(ambientLight,"intensity").min(0).max(3).step(0.001)

ambientFolder.addColor(debug,"color").onChange((color)=>{
    ambientLight.color.set(new THREE.Color(color))
    
})
scene.add(ambientLight)

//directional light
debug.colorDirec="#fff000"
const directionalFolder= gui.addFolder("Directional Light")

const directionalLight= new THREE.DirectionalLight()
directionalLight.color=new THREE.Color(debug.colorDirec)
directionalLight.intensity=1
directionalLight.position.set(1,0.25,0)

directionalFolder.add(directionalLight,"intensity").min(0).max(3).step(0.001)

directionalFolder.addColor(debug,"colorDirec").onChange((color)=>{
    directionalLight.color.set(new THREE.Color(color))
    
})
scene.add(directionalLight)

//hemisphere light
debug.colorHemi="#fff000"
debug.colorHemiGround="#fff000"
const hemiFolder= gui.addFolder("Hemisphere Light")


const hemisphereLight= new THREE.HemisphereLight()
hemisphereLight.color=new THREE.Color(debug.colorHemi)
hemisphereLight.groundColor=new THREE.Color(debug.colorHemiGround)

hemisphereLight.intensity=1

hemiFolder.add(hemisphereLight,"intensity").min(0).max(3).step(0.001)

hemiFolder.addColor(debug,"colorHemi").onChange((color)=>{
    hemisphereLight.color.set(new THREE.Color(color))
    
})
hemiFolder.addColor(debug,"colorHemiGround").onChange((color)=>{
    hemisphereLight.groundColor.set(new THREE.Color(color))
    
})
scene.add(hemisphereLight)

//point light
debug.colorPoint="#ffffff"
const pointFolder= gui.addFolder("Point Light")

const PointLight= new THREE.PointLight()
PointLight.color=new THREE.Color(debug.colorPoint)
PointLight.intensity=1.5
PointLight.position.set(0,1,1)
PointLight.distance=10
PointLight.decay=2

pointFolder.add(PointLight,"intensity").min(0).max(3).step(0.001)

pointFolder.addColor(debug,"colorPoint").onChange((color)=>{
    PointLight.color.set(new THREE.Color(color))
    
})
scene.add(PointLight)

//point light
debug.colorRect="#ffff0fc"
const rectFolder= gui.addFolder("rect Light")

const RectAreaLight= new THREE.RectAreaLight()
RectAreaLight.color=new THREE.Color(debug.colorRect)
RectAreaLight.intensity=6
// RectAreaLight.position.set(0,1,1)
RectAreaLight.width=1
RectAreaLight.height=1

rectFolder.add(RectAreaLight,"intensity").min(0).max(3).step(0.001)
rectFolder.add(RectAreaLight.position,"x").min(-5).max(5).step(0.001)
rectFolder.add(RectAreaLight.position,"y").min(-5).max(5).step(0.001)
rectFolder.add(RectAreaLight.position,"z").min(-5).max(5).step(0.001)

rectFolder.add(RectAreaLight,"width").min(-5).max(5).step(0.001)
rectFolder.add(RectAreaLight,"height").min(-5).max(5).step(0.001)

rectFolder.addColor(debug,"colorRect").onChange((color)=>{
    RectAreaLight.color.set(new THREE.Color(color))
})

debug.centerRect = ()=>{
    RectAreaLight.lookAt(new THREE.Vector3())
}

rectFolder.add(debug,"centerRect").name("center")
scene.add(RectAreaLight)


//point light
debug.colorSpot="#fff00f"
const spotFolder= gui.addFolder("Point Light")

const SpotLight= new THREE.SpotLight()
SpotLight.color=new THREE.Color(debug.colorSpot)
SpotLight.intensity=1.5
SpotLight.distance=10
SpotLight.angle=Math.PI*0.1
SpotLight.penumbra=0.25
SpotLight.decay=1

// SpotLight.position.set(0,1,1)
// SpotLight.distance=10
// SpotLight.decay=2

spotFolder.add(SpotLight,"intensity").min(0).max(3).step(0.001)
spotFolder.add(SpotLight,"distance").min(0).max(20).step(0.001)
spotFolder.add(SpotLight,"angle").min(0*Math.PI).max(2*Math.PI).step(0.001)
spotFolder.add(SpotLight,"penumbra").min(0).max(1).step(0.001)
spotFolder.add(SpotLight,"decay").min(0).max(3).step(0.001)

spotFolder.add(SpotLight.position,"x").min(-5).max(5).step(0.001)
spotFolder.add(SpotLight.position,"y").min(-5).max(5).step(0.001)
spotFolder.add(SpotLight.position,"z").min(-5).max(5).step(0.001)


spotFolder.addColor(debug,"colorSpot").onChange((color)=>{
    SpotLight.color.set(new THREE.Color(color))
    
})
debug.centerSpot = ()=>{
    SpotLight.lookAt(new THREE.Vector3())
}

spotFolder.add(debug,"centerSpot").name("center")
scene.add(SpotLight)


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
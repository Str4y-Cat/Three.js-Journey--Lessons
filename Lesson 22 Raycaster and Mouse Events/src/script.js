import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

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
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)


/**
 * Raycaster
 */

object1.updateMatrixWorld()
object2.updateMatrixWorld()
object3.updateMatrixWorld()

const raycaster= new THREE.Raycaster()
//origin
const rayOrigin= new THREE.Vector3(-3,0,0)

//normalized direction
const rayDirection= new THREE.Vector3(10,0,)
rayDirection.normalize()
//cast ray origin and direction
raycaster.set(rayOrigin,rayDirection)
const objectsToTest=[object1,object2,object3]

const findIntersectingObjects= (objectsToTest)=>{
    return raycaster.intersectObjects(objectsToTest)
     
}

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

    //animate objects
    object1.position.y=Math.sin(elapsedTime*0.3)

    object2.position.y=Math.sin(elapsedTime*0.8)


    object3.position.y=Math.sin(elapsedTime*0.5)

    const intersectingObjects= findIntersectingObjects(objectsToTest)

    for( const objects of objectsToTest){
        objects.material.color.set("red")
    }

    for( const intersect of intersectingObjects){
        intersect.object.material.color.set("blue")
    }
    // console.log(intersectingObjects)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
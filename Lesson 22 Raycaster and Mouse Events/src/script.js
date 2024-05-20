import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//models
const gltfLoader=new GLTFLoader()
let gltfScene=null
const model= gltfLoader.load("/models/Duck/glTF-Binary/Duck.glb",(gltf)=>{
    gltfScene=gltf.scene
    gltf.scene.position.y=-1.2
    scene.add(gltf.scene)
})

//lights

const ambientLight= new THREE.AmbientLight("#ffffff",0.5)

const directionalLight= new THREE.DirectionalLight("#ffffff",2.1)
scene.add(ambientLight,directionalLight)

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

/**
 * mouse events
 * 
 */

const mouse = new THREE.Vector2(0,0)

window.addEventListener("mousemove",(e)=>{
    mouse.x= (e.clientX/sizes.width-0.5)*2
    mouse.y= -(e.clientY/sizes.height-0.5)*2

    // console.log(`x:${mouse.x} y:${mouse.y} `)

})

window.addEventListener("click",(e)=>{
    if(currentInstersect){
        console.log("click on a sphere")

        switch(currentInstersect.object){
            case object1:
                console.log("sphere 1")
                break

            case object2:
                console.log("sphere 2")
                break

            case object3:
                console.log("sphere 3")
                break
        }
    }
})


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

let currentInstersect= null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //cast a ray
    raycaster.setFromCamera(mouse,camera)


    const intersectingObjects= findIntersectingObjects(objectsToTest)


    // if(intersectingObjects.length){
    //     if(currentInstersect==null){
    //         console.log("mouse enter")
    //         intersectingObjects[0].object.material.color.set("blue")
            
    //     }
    //     currentInstersect=intersectingObjects[0]
    // }
    // else{
    //     if(currentInstersect){
            
    //     // intersect.object.material.color.set("blue")

    //     }
    //     currentInstersect=null
    // }

    if(gltfScene){
        const duckIntersect= raycaster.intersectObject(gltfScene)
        // console.log(duckIntersect)

        if(duckIntersect.length){
            gltfScene.scale.set(1.2,1.2,1,2)
            console.log("scaling")
        }
        else{
            gltfScene.scale.set(1,1,1)
        }





    }
    
    



    //animate objects

    object1.position.y=Math.sin(elapsedTime*0.3)

    object2.position.y=Math.sin(elapsedTime*0.8)


    object3.position.y=Math.sin(elapsedTime*0.5)

    
    // console.log(intersectingObjects)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
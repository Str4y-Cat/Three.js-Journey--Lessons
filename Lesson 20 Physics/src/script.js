import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import CANNON from 'cannon'
/**
 * Debug
 */
const gui = new GUI()
const debug={}
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**
 * sounds
 */

const hitSound= new Audio('/sounds/hit.mp3')
const playHitSound=(collision)=>{

    // console.log(collision.contact.getImpactVelocityAlongNormal())
    const collisionStrength=collision.contact.getImpactVelocityAlongNormal()
    if(collisionStrength>0.5){
        
        if(collisionStrength<=5){
            hitSound.volume= collisionStrength/5

        }
        if(hitSound.currentTime>0.02||hitSound.currentTime==0){
            hitSound.currentTime=0
            hitSound.play()
        }
        
    }
    
}
/**
 * physics
 */
//world
const world= new CANNON.World()
world.gravity.set(0,-9.82,0)
world.broadphase=new CANNON.SAPBroadphase(world)
world.allowSleep=true

//materials
const defaultMaterial= new CANNON.Material("default")

const defaultContactMaterial= new CANNON.ContactMaterial(
    defaultMaterial,defaultMaterial,{
        friction:0.1,
        restitution:0.7
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial=defaultContactMaterial




//floor shape
const floorShape= new CANNON.Plane()
const floorBody= new CANNON.Body()
// floorBody.mas
// floorBody.material= defaultContactMaterial
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1,0,0),Math.PI*0.5)
world.addBody(floorBody)



/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Utils
 */
const objectsToUpdate=[]
const sphereGeometry=new THREE.SphereGeometry(1,20,20)
const defaultTHREEMaterial=new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness:0.4,
            envMap:environmentMapTexture
        })
const createSphere= (radius, position) =>{
    const mesh = new THREE.Mesh(
        sphereGeometry,
        defaultTHREEMaterial

    )
    mesh.scale.set(radius,radius,radius)
    mesh.castShadow= true
    mesh.position.copy(position)
    scene.add(mesh)

    const shape= new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass:1,
        position:new CANNON.Vec3(0,3,0),
        shape:shape,
        material:defaultMaterial
    })
    body.position.copy(position)
    body.addEventListener("collide",playHitSound)

    world.addBody(body)

    
    objectsToUpdate.push({body: body, mesh: mesh})

}

createSphere(0.5,{x:0,y:3,z:0})


const updatePhysics= (arr)=>{
    for(let i=0;i<arr.length;i++){
        // console.log(`DEBUG: mesh Position ${arr[i].mesh.position} body position: ${arr[i].body.position}`)
        arr[i].mesh.position.copy(arr[i].body.position)
        arr[i].mesh.quaternion.copy(arr[i].body.quaternion)

        
    }
}

debug.createSphere=()=>{
    createSphere(
        Math.random()*0.5,
        {
            x:(Math.random()-0.5)*3,
            y:3,
            z:(Math.random()-0.5)*3,

        }
    )
}
gui.add(debug,"createSphere")


//boxes
const BoxGeometry=new THREE.BoxGeometry(1,1,1)

const createBox= ({width:width,height:height,depth:depth}, position) =>{
//create box mesh
const boxMesh= new THREE.Mesh(
    BoxGeometry,
    defaultTHREEMaterial
)
//scale according to values
boxMesh.scale.set(width, height, depth)
boxMesh.castShadow=true
boxMesh.position.copy(position)
//add to scene
scene.add(boxMesh)


//create complimentary cannon body

//create a shape

const boxShape= new CANNON.Box(new CANNON.Vec3(width/2,height/2,depth/2))
//create a body
const boxBody= new CANNON.Body({
    mass:1,
    // position:new CANNON.Vec3(0,3,0),
    shape:boxShape,
    material:defaultMaterial
})
//add to world
boxBody.position.copy(position)
boxBody.addEventListener("collide",playHitSound)
// boxBody.applyLocalForce()

world.addBody(boxBody)

//add both to objects arr
objectsToUpdate.push({body: boxBody, mesh: boxMesh})

}

// createBox()




debug.createBox=()=>{
    const boxSizes={
        width: Math.random()*0.5,
        height: Math.random()*0.5,
        depth: Math.random()*0.5
    }
    createBox(
        boxSizes,

        {
            x:(Math.random()-0.5)*3,
            y:3,
            z:(Math.random()-0.5)*3,

        }
    )
}
gui.add(debug,"createBox")

debug.reset=()=>{
    for (const object of objectsToUpdate){
        // body
        object.body.removeEventListener("collide",playHitSound)
        world.removeBody(object.body)

        // mesh
        scene.remove(object.mesh)

        
    }
    //clear array
    objectsToUpdate.splice(0, objectsToUpdate.length)
}

gui.add(debug,"reset")

//////////////////////////////////////
// const boxGeometry=new THREE.BoxGeometry(1,1,1)
// const boxMaterial=new THREE.MeshStandardMaterial({
//             metalness: 0.3,
//             roughness:0.4,
//             envMap:environmentMapTexture
//         })
// const createBox= (width,height,depth, position) =>{
//     const mesh = new THREE.Mesh(
//         boxGeometry,
//         boxMaterial

//     )
//     mesh.scale.set(width,height,depth)
//     mesh.castShadow= true
//     mesh.position.copy(position)
//     scene.add(mesh)

//     const shape= new CANNON.Box(new CANNON.Vec3(width/2,height/2,depth/2))
//     const body = new CANNON.Body({
//         mass:1,
//         position:new CANNON.Vec3(0,3,0),
//         shape:shape,
//         material:defaultMaterial
//     })
//     body.position.copy(position)
//     world.addBody(body)

    
//     objectsToUpdate.push({body: body, mesh: mesh})

// }



// debug.createBox=()=>{
//     createBox(
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         {
//             x:(Math.random()-0.5)*3,
//             y:3,
//             z:(Math.random()-0.5)*3,

//         }
//     )
// }
// gui.add(debug,"createBox")
//////////////////////////////////
/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime=0
let lastSecond=0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    let deltaTime=elapsedTime-oldElapsedTime
    oldElapsedTime=elapsedTime 
    //update physics world
    //every second counter
    let currentSecond=Math.round(elapsedTime)
    if(currentSecond!=lastSecond){


        lastSecond=currentSecond
    }
    


    world.step(
        1/60,deltaTime,3
    )

    updatePhysics(objectsToUpdate)
    //update three.js objects
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
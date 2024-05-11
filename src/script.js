import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { color, texture } from 'three/examples/jsm/nodes/Nodes.js'
import { BrightnessContrastShader } from 'three/examples/jsm/Addons.js'
import { Sphere } from 'three'
import { SphereGeometry } from 'three'

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


//fog
debug.fogColor="#262837"

const fog= new THREE.Fog(debug.fogColor, 1,8)
gui.addColor(debug,"fogColor").onChange((color)=>{fog.color.set(new THREE.Color(color))})
scene.fog=fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
//brick textures
const brickAO=textureLoader.load("/textures/bricks/ambientOcclusion.jpg")
const brickColor=textureLoader.load("/textures/bricks/color.jpg")
brickColor.colorSpace = THREE.SRGBColorSpace

const brickNormal=textureLoader.load("/textures/bricks/normal.jpg")
const brickRoughness=textureLoader.load("/textures/bricks/roughness.jpg")
// console.log(brickColor);

//door textures
const doorAO=textureLoader.load("/textures/door/ambientOcclusion.jpg")
const doorAlpha=textureLoader.load("/textures/door/alpha.jpg")
const doorHeight=textureLoader.load("/textures/door/height.jpg")
const doorMetalness=textureLoader.load("/textures/door/metalness.jpg")
const doorColor=textureLoader.load("/textures/door/color.jpg")
const doorNormal=textureLoader.load("/textures/door/normal.jpg")
const doorRoughness=textureLoader.load("/textures/door/roughness.jpg")

doorColor.colorSpace = THREE.SRGBColorSpace

//grass
const grassAO=textureLoader.load("/textures/grass/ambientOcclusion.jpg")
const grassColor=textureLoader.load("/textures/grass/color.jpg")
const grassNormal=textureLoader.load("/textures/grass/normal.jpg")
const grassRoughness=textureLoader.load("/textures/grass/roughness.jpg")

grassColor.colorSpace = THREE.SRGBColorSpace


grassColor.repeat.set(8,8)
grassAO.repeat.set(8,8)
grassNormal.repeat.set(8,8)
grassRoughness.repeat.set(8,8)

grassColor.wrapS=THREE.RepeatWrapping
grassAO.wrapS=THREE.RepeatWrapping
grassNormal.wrapS=THREE.RepeatWrapping
grassRoughness.wrapS=THREE.RepeatWrapping

grassColor.wrapT=THREE.RepeatWrapping
grassAO.wrapT=THREE.RepeatWrapping
grassNormal.wrapT=THREE.RepeatWrapping
grassRoughness.wrapT=THREE.RepeatWrapping

/**
 * House
 */
// house group

const houseGroup= new THREE.Group()
scene.add(houseGroup)

//  walls
const wallParams={
    width:4,
    height:2.5,
    depth:4
}

// walls.material.map=brickColor;
// walls.material.roughness= brickRoughness
const walls= new THREE.Mesh(
    new THREE.BoxGeometry(wallParams.width,wallParams.height,wallParams.depth),
    new THREE.MeshStandardMaterial({
        map:brickColor,
        aoMap:brickAO,
        normalMap:brickNormal,
        roughnessMap:brickRoughness
    })
)
walls.position.y+= wallParams.height/2
// console.log();
houseGroup.add(walls)

//roof
const roof= new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({
        roughness:0.7,
        color:0x000f00

    })
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
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map:doorColor,
        aoMap:doorAO,
        normalMap:doorNormal,
        alphaMap:doorAlpha,
        transparent:true,
        roughnessMap:doorRoughness,
        metalnessMap:doorMetalness,
        displacementMap:doorHeight,
        displacementScale:0.1
    })

)


door.position.z+= wallParams.depth/2+0.001
door.position.y+= door.geometry.parameters.height/2
houseGroup.add(door)


//bushes
const bushGeometry= new SphereGeometry(1,16,16)
const bushMaterial= new THREE.MeshPhysicalMaterial()

const bush1= new THREE.Mesh(bushGeometry,bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,2.2)

const bush2= new THREE.Mesh(bushGeometry,bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,0.1,2.1)

const bush3= new THREE.Mesh(bushGeometry,bushMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-0.8,0.1,2.2)
const bush4= new THREE.Mesh(bushGeometry,bushMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1,0.05,2.6)

houseGroup.add(bush1,bush2,bush3,bush4)



//graves
const graves= new THREE.Group
scene.add(graves)

const graveGeometry= new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial= new THREE.MeshStandardMaterial({color:"grey"})


for (let i = 0; i < 40; i++) {

    const angle= Math.random()*Math.PI*2
    const radius= 3+ Math.random()*6
    const x= (Math.sin(angle))*radius
    const z= (Math.cos(angle))*radius


    const grave= new THREE.Mesh(
        graveGeometry,
        graveMaterial
    );
    grave.position.set(x,0.3,z)    
    grave.rotation.z= (Math.random()-0.5)/2
    grave.rotation.y= (Math.random()-0.5)*0.04
    grave.castShadow=true

    graves.add(grave)
}
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map:grassColor,
        aoMap:grassAO,
        normalMap:grassNormal,
        roughnessMap:grassRoughness
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d6ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d6ff', 0.26)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//door point light
debug.doorPointColour="#ff7d46"
const doorPointLight = new THREE.PointLight(debug.doorPointColour, 3, 7)
gui.addColor(debug,"doorPointColour")
.onChange((color)=>{
    doorPointLight.color.set(new THREE.Color(color))
})
doorPointLight.position.z=wallParams.depth/2+1.1
doorPointLight.position.y=wallParams.height-0.3



houseGroup.add(doorPointLight)

// const lightHelp= new THREE.PointLightHelper(doorPointLight)
// scene.add(lightHelp)

const ghost1= new THREE.PointLight("#ff00ff",6,3)
const ghost2= new THREE.PointLight("#00ffff",6,3)
const ghost3= new THREE.PointLight("#ffff00",6,3)

scene.add(ghost1,ghost2,ghost3)

function moveGhost(ghost,tick, freq, amp){
    const x= Math.sin(tick*freq)*amp
    const z= Math.cos(tick*freq)*amp

    ghost.position.set(x,1,z)
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
renderer.setClearColor(new THREE.Color(debug.fogColor))

/**
 * shadows
 */
moonLight.castShadow=true
// moonLight.shadow.mapSize.width=256
// moonLight.shadow.mapSize.height=256
// moonLight.shadow.camera.far=7

doorPointLight.castShadow=true
doorPointLight.shadow.mapSize.width=256
doorPointLight.shadow.mapSize.height=256
doorPointLight.shadow.camera.far=7

ghost1.castShadow=true
ghost1.shadow.mapSize.width=256
ghost1.shadow.mapSize.height=256
ghost1.shadow.camera.far=7

ghost2.castShadow=true
ghost2.shadow.mapSize.width=256
ghost2.shadow.mapSize.height=256
ghost2.shadow.camera.far=7

ghost3.castShadow=true
ghost3.shadow.mapSize.width=256
ghost3.shadow.mapSize.height=256
ghost3.shadow.camera.far=7

walls.castShadow=true
bush1.castShadow=true
bush2.castShadow=true
bush3.castShadow=true
bush4.castShadow=true

floor.receiveShadow=true
renderer.shadowMap.enabled=true
renderer.shadowMap.type=THREE.PCFSoftShadowMap
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // moveGhost(ghost1,elapsedTime,0.2,5)
    // moveGhost(ghost2,elapsedTime,0.1,-7)
    // moveGhost(ghost3,elapsedTime,0.,9)

    const ghost1Angle=elapsedTime*0.5
    ghost1.position.x=Math.sin(ghost1Angle)*4
    ghost1.position.z=Math.cos(ghost1Angle)*4
    ghost1.position.y=Math.sin(ghost1Angle*3)

    const ghost2Angle=elapsedTime*0.32
    ghost2.position.x=Math.sin(ghost2Angle)*5
    ghost2.position.z=Math.cos(ghost2Angle)*5
    ghost2.position.y=Math.sin(ghost2Angle*4)+Math.sin(ghost2Angle*2.5)

    const ghost3Angle=elapsedTime*0.32
    ghost3.position.x=Math.sin(ghost3Angle)*(7+Math.sin(ghost2Angle*0.32))
    ghost3.position.z=Math.cos(ghost3Angle)*(7+Math.sin(ghost2Angle*0.5))
    ghost3.position.y=Math.sin(ghost3Angle*5)+Math.sin(ghost2Angle*2)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
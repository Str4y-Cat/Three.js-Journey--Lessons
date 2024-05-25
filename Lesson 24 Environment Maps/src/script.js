import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js'
/**
 * Loaders
 */

const gltfLoader=new GLTFLoader()
const cubeTextureLoader= new THREE.CubeTextureLoader()
const rgbeLoader=new RGBELoader()
const exrLoader=new EXRLoader()
const textureLoader= new THREE.TextureLoader()





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
 * Environment Map
 */
// scene.environmentIntensity=1
// scene.backgroundBlurriness=0
// scene.backgroundIntensity=0

// scene.backgroundRotation.x=1
// scene.environmentRotation.y=1

gui.add(scene,'environmentIntensity').min(0).max(10).step(0.001)
gui.add(scene,'backgroundBlurriness').min(0).max(1).step(0.001)
gui.add(scene,'backgroundIntensity').min(0).max(10).step(0.001)
gui.add(scene.backgroundRotation,'y').min(0).max(Math.PI*2).step(0.001).name('background rotation y')
gui.add(scene.environmentRotation,'y').min(0).max(Math.PI*2).step(0.001).name('environment rotation y')

// //ldr cube texture
// const environmentMap= cubeTextureLoader.load([
//     '/environmentMaps/0/px.png',
//     '/environmentMaps/0/nx.png',
//     '/environmentMaps/0/py.png',
//     '/environmentMaps/0/ny.png',
//     '/environmentMaps/0/pz.png',
//     '/environmentMaps/0/nz.png',]
// )

// scene.background=environmentMap
// scene.environment=environmentMap



// rgbeLoader.load(
//     '/environmentMaps/blender-2k.hdr',
//     (envMap)=>{
//         envMap.mapping=THREE.EquirectangularReflectionMapping
//         // scene.background=envMap
//         scene.environment=envMap
//     }
// )

// exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr',
//     (envMap)=>{
//         envMap.mapping=THREE.EquirectangularReflectionMapping
//         scene.background=envMap
//         scene.environment=envMap
//     })



// // LDR Environment 
// const environmentMap= textureLoader.load("environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg")
// environmentMap.mapping=THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace=THREE.SRGBColorSpace

// scene.background=environmentMap
// scene.environment=environmentMap
// scene.environmentIntensity=4

// ground projected skybox
// rgbeLoader.load(
//     '/environmentMaps/2/2k.hdr',
//     (envMap)=>{
//         envMap.mapping=THREE.EquirectangularReflectionMapping
//         scene.environment=envMap

//         //skybox
//         const skybox= new GroundedSkybox(envMap,15,70)
//         skybox.position.y=15
//         scene.add(skybox)
//     }
// )

/**
 * real time environment map
 * 
 */
const environmentMap= textureLoader.load("environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg")
environmentMap.mapping=THREE.EquirectangularReflectionMapping
environmentMap.colourSpace=THREE.SRGBColorSpace

scene.background=environmentMap

//cube render target
const cubeRenderTarget= new THREE.WebGLCubeRenderTarget(
    256,
    {
        type: THREE.HalfFloatType
    })

scene.environment=cubeRenderTarget.texture

//cube camera
const cubeCamera= new THREE.CubeCamera(0.1,100,cubeRenderTarget)
cubeCamera.layers.set(1)


//holydonut
const torus= new THREE.Mesh(
    new THREE.TorusGeometry(8,0.5),
    new THREE.MeshBasicMaterial(
        {
            color:new THREE.Color(10,4,2)
        }
    )
)
torus.layers.enable(1)
torus.position.y=3.5
scene.add(torus)

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({
        roughness:0.3,
        metalness:1,
        color:0xaaaaaa
    })
)
torusKnot.position.y = 4
torusKnot.position.x = -4
scene.add(torusKnot)

/**
 * Models
*/
gltfLoader.load(
    'models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf)=>{
        gltf.scene.scale.set(10,10,10)
        scene.add(gltf.scene)
    }
)


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
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
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
    // Time
    const elapsedTime = clock.getElapsedTime()

    //animate torus
    if(torus){
        torus.rotation.x=elapsedTime
        cubeCamera.update(renderer,scene)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
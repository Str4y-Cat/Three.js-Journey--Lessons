import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import fireVertex from './fireflies/vertex.glsl'
import fireFragment from './fireflies/fragment.glsl'

/**
 * Base
 */
// Debug
const debugObj=
{

}

const gui = new GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


// scene.add(cube)

/**
 * Texture
 */

const bakedTexture= textureLoader.load('baked_texture.jpg')
bakedTexture.flipY=false
bakedTexture.colorSpace=THREE.SRGBColorSpace

//pole light material
const poleLightMaterial= new THREE.MeshBasicMaterial({color:0xffffe5})

//pole light material
const portalLightMaterial= new THREE.MeshBasicMaterial({color:0xffffe5})

// Model
const bakedMaterial = new THREE.MeshBasicMaterial({map:bakedTexture})
gltfLoader.load(
    'portal_baked.glb',
    (gltf)=>
    {
        // gltf.scene.traverse((child)=>
        // {
        //     console.log(child.name)
        //     child.material= bakedMaterial
        // })
        const baked_geometry= gltf.scene.children.find(child=> child.name==="baked")
        const poleLightA= gltf.scene.children.find(child=> child.name==="poleLightA")
        const poleLightB= gltf.scene.children.find(child=>child.name==="poleLightB")
        const portalLight= gltf.scene.children.find(child=>child.name==="portalLight")
        
        baked_geometry.material=bakedMaterial
        poleLightA.material= poleLightMaterial
        poleLightB.material= poleLightMaterial
        portalLight.material= portalLightMaterial
        scene.add(gltf.scene)
        console.log(gltf.scene)
    }
)

/**
 * Fireflys
 */
const fireflysGeometry= new THREE.BufferGeometry();
const firefliesCount= 30
const positionArray= new Float32Array(firefliesCount*3)
const randomArray= new Float32Array(firefliesCount)

for(let i=0; i<firefliesCount; i++)
{
    let i3=i*3
    positionArray[i3 + 0] = (Math.random()-0.5 )* 4 
    positionArray[i3 + 1] = Math.random() *1.5
    positionArray[i3 + 2] = (Math.random()-0.5) * 4

    randomArray[i]= (Math.random()-0.5)
}

fireflysGeometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3))
fireflysGeometry.setAttribute('randomNumber',new THREE.BufferAttribute(randomArray,1))
// const fireFlysMaterial= new THREE.PointsMaterial({color:"#ffffff",size:0.1, sizeAttenuation:true})

const fireFlysMaterial= new THREE.ShaderMaterial(
    {
        vertexShader:fireVertex,
        fragmentShader:fireFragment,
        uniforms:
        {
            'time': new THREE.Uniform(0),

        }
    }
)

const fireFlies = new THREE.Points(fireflysGeometry,fireFlysMaterial)
scene.add(fireFlies)
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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

debugObj.clearColor="#16140e"

renderer.setClearColor(debugObj.clearColor)
gui.addColor(debugObj,'clearColor').onChange(()=>
    {
        renderer.setClearColor(debugObj.clearColor)
    })

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    fireFlies.material.uniforms.time.value=elapsedTime/2
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
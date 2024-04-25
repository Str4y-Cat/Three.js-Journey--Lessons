import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { color } from 'three/examples/jsm/nodes/Nodes.js'
import { RGBELoader} from 'three/examples/jsm/Addons.js'


// console.log(RGBELoader)

const gui = new GUI()
const debug={}
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//lights
// const ambientLight= new THREE.AmbientLight("ffffff",1)


// const pointLight= new THREE.PointLight("ffffff", 30)
// pointLight.position.x=2
// pointLight.position.y=3
// pointLight.position.z=4




// scene.add(ambientLight,pointLight)


/**
 * textures
 */

const loadingManager= new THREE.LoadingManager()
const textureLoader= new THREE.TextureLoader(loadingManager)

//door textures
const alphaTexture= textureLoader.load("/textures/door/alpha.jpg")
const ambientOcclusionTexture= textureLoader.load("/textures/door/ambientOcclusion.jpg")
const colorTexture= textureLoader.load("/textures/door/color.jpg")
const heightTexture= textureLoader.load("/textures/door/height.jpg")
const metalnessTexture= textureLoader.load("/textures/door/metalness.jpg")
const normalTexture= textureLoader.load("/textures/door/normal.jpg")
const roughnessTexture= textureLoader.load("/textures/door/roughness.jpg")

//env map
// const envMapTexture= textureLoader.load("/textures/environmentMap/2k.hdr")
const rgbeloader= new RGBELoader()
rgbeloader.load("/textures/environmentMap/2k.hdr",(environmentMap)=>
{
    console.log(environmentMap)
    environmentMap.mapping= THREE.EquirectangularReflectionMapping
    scene.background= environmentMap
    scene.environment= environmentMap


})


//gradients
const threeGradientTexture= textureLoader.load("/textures/gradients/3.jpg")
const fiveGradientTexture= textureLoader.load("/textures/gradients/5.jpg")

//matcaps
const matCapTexture=textureLoader.load("/textures/matcaps/1.png")

//colorspace
colorTexture.colorSpace= THREE.SRGBColorSpace
matCapTexture.colorSpace= THREE.SRGBColorSpace



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
 * mesh
 */

//mesh basic material
// const material= new THREE.MeshBasicMaterial()
// material.map=colorTexture

//mesh map cap
// const material= new THREE.MeshMatcapMaterial()
// material.matcap= matCapTexture

// //mesh lambert material
// const material = new THREE.MeshLambertMaterial()

// //mesh lambert material
// const material = new THREE.MeshPhongMaterial()
// material.shininess=100
// material.specular=new THREE.Color("ffaaff")

//mesh lambert material
// const material = new THREE.MeshToonMaterial()
// material.gradientMap=fiveGradientTexture
// fiveGradientTexture.minFilter= THREE.NearestFilter
// fiveGradientTexture.magFilter= THREE.NearestFilter
// fiveGradientTexture.generateMipmaps=false


// //mesh standard material
// const material = new THREE.MeshStandardMaterial()

// // debug.metalnessTexture= 0.45
// // debug.roughnessTexture= 0.65


// // material.metalness= 0.7
// // material.roughness= 0.2
// material.map=colorTexture
// material.aoMap=ambientOcclusionTexture
// material.displacementMap=heightTexture
// material.displacementScale=0.07
// material.metalnessMap=metalnessTexture
// material.roughnessMap=roughnessTexture
// material.normalMap=normalTexture
// material.transparent=true
// material.alphaMap= alphaTexture




// gui.add(material, "metalness").min(0).max(1).step(0.0001).name("metalness")
// gui.add(material, "roughness").min(0).max(1).step(0.0001).name("roughness")

//mesh Physical material
const material = new THREE.MeshPhysicalMaterial()

// debug.metalnessTexture= 0.45
// debug.roughnessTexture= 0.65


material.metalness= 0.7
material.roughness= 0.2
// material.map=colorTexture

// material.aoMap=ambientOcclusionTexture
// material.displacementMap=heightTexture
// material.displacementScale=0.1
// material.metalnessMap=metalnessTexture
// material.roughnessMap=roughnessTexture
// material.normalMap=normalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent=true
// material.alphaMap= alphaTexture


gui.add(material, "metalness").min(0).max(1).step(0.0001)
gui.add(material, "roughness").min(0).max(1).step(0.0001)

// clearCoat
// material.clearcoat=1
// material.clearcoatRoughness=0
// material.iridescence=1

// gui.add(material, "clearcoat").min(0).max(1).step(0.0001)
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001)


// material.sheen=1
// material.sheenRoughness=0.25
// material.sheenColor.set(1,1,1)
// gui.add(material, "sheen").min(0).max(1).step(0.0001)
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001)
// gui.addColor(material, "sheenColor")

material.iridescence=1
material.iridescenceIOR=1
material.iridescenceThicknessRange=[100,800]

// // material.sheenColor.set(1,1,1)
// gui.add(material, "iridescence").min(0).max(1).step(0.0001)
// gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, 0).min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, 1).min(1).max(1000).step(1)

//transmission
material.transmission=1
material.ior=1.5
material.thickness=0.5

gui.add(material, "transmission").min(0).max(1).step(0.0001)
gui.add(material, "ior").min(1).max(10).step(0.0001)
gui.add(material,"thickness").min(0).max(1).step(0.0001)




//geometry
const sphere= new THREE.SphereGeometry(0.5, 64, 64)
const torus= new THREE.TorusGeometry(0.3,0.2, 64,128)
const plein= new THREE.PlaneGeometry(1,1, 100, 100)

//mesh
const sphereMesh= new THREE.Mesh(sphere, material)
const torusMesh= new THREE.Mesh(torus, material)
const pleinMesh= new THREE.Mesh(plein, material)

sphereMesh.position.x=-1.5;
torusMesh.position.x=1.5

//gui
gui.add(sphereMesh.position,"x").min(-10).max(0).step(0.01).name("sphere-x")
gui.add(torusMesh.position,"x").min(0).max(10).step(0.01).name("torus-x")
gui.add(pleinMesh.position,"x").min(-2).max(2).step(0.01).name("plein-x")


scene.add(sphereMesh).add(torusMesh).add(pleinMesh)
// scene
// scene


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

    sphereMesh.rotation.x= -0.15*elapsedTime
    torusMesh.rotation.x= -0.15*elapsedTime
    pleinMesh.rotation.x= -0.15*elapsedTime

    sphereMesh.rotation.y= 0.1*elapsedTime
    torusMesh.rotation.y= 0.1*elapsedTime
    pleinMesh.rotation.y= 0.1*elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
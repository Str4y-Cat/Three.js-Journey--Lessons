import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import fragmentShader from "./shaders/water/fragment.glsl"
import vertexShader from './shaders/water/vertex.glsl'

console.log(fragmentShader)

console.log(vertexShader)

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128)

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader:vertexShader,
    fragmentShader:fragmentShader,
    uniforms:
    {
        uTime:{value:0},
        uBigWavesSpeed:{value:0.75},
        uBigWavesElevation:{value:0.2},
        uBigWavesFrequency:{value: new THREE.Vector2(4,1.5)},
        uBigWavesColor1:{value: new THREE.Color("blue")},
        uBigWavesColor2:{value: new THREE.Color("#1acce6")},
    }
})

// debug
gui.add(waterMaterial.uniforms.uBigWavesElevation,'value').min(0).max(1).step(0.001).name("Big wave Elevation")
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value,'x').min(0).max(10).step(0.001).name("Big wave freq x")
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value,'y').min(0).max(10).step(0.001).name("Big wave freq y")
gui.add(waterMaterial.uniforms.uBigWavesSpeed,'value').min(0).max(4).step(0.001).name("Big wave Speed")
gui.addColor(waterMaterial.uniforms.uBigWavesColor2,'value').name('Surface Color')
gui.addColor(waterMaterial.uniforms.uBigWavesColor1,'value').name('Depth Color')


// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

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
camera.position.set(1, 1, 1)
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

    //animate water
    waterMaterial.uniforms.uTime.value=elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'

import fireworkVertexShader from './shaders/firework/vertex.glsl'
import fireworkFragmentShader from './shaders/firework/fragment.glsl'
/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const textureLoader = new THREE.TextureLoader()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(2,window.devicePixelRatio)
}

sizes.resolution= new THREE.Vector2(sizes.width*sizes.pixelRatio,sizes.height*sizes.pixelRatio)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.resolution.set(sizes.width,sizes.height)
    sizes.pixelRatio= Math.min(2,window.devicePixelRatio)


    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1.5, 0, 6)
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
renderer.setPixelRatio(sizes.pixelRatio)

/**
 * fireworks
 */

const createFirework = (count,position,size) =>
    {
        //geometry
        const positionsArray= new Float32Array(count*3)
        for(let i=0; i<count;i++)
            {
                const i3=i*3;

                positionsArray[i3  ]=Math.random()-0.5
                positionsArray[i3+1]=Math.random()-0.5
                positionsArray[i3+2]=Math.random()-0.5
            }
    
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute("position",new THREE.BufferAttribute(positionsArray,3))
        
        // const material= new THREE.PointsMaterial({size:0.1,color:'white'})
        const material= new THREE.ShaderMaterial({
            vertexShader:fireworkVertexShader,
            fragmentShader:fireworkFragmentShader,
            uniforms:{
                uSize:new THREE.Uniform(size),
                uResolution: new THREE.Uniform(sizes.resolution),
            }
        })

        const fireworks= new THREE.Points(geometry,material)
        fireworks.position.copy(position)
        
        scene.add(fireworks)
    
    }
createFirework(
    400,
    new THREE.Vector3(),
    0.5
)


/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
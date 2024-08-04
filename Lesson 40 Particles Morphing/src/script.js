import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import GUI from 'lil-gui'
import gsap from 'gsap'
import particlesVertexShader from './shaders/particles/vertex.glsl'
import particlesFragmentShader from './shaders/particles/fragment.glsl'
// import { bufferAttribute } from 'three/src/nodes/accessors/BufferAttributeNode.js'

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Materials
    if(particles)
    {
        particles.material.uniforms.uResolution.value.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

    }

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
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 8 * 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

debugObject.clearColor = '#160920'
gui.addColor(debugObject, 'clearColor').onChange(() => { renderer.setClearColor(debugObject.clearColor) })
renderer.setClearColor(debugObject.clearColor)

/**
 * Particles
 */


//load models
let particles=null
gltfLoader.load('./models.glb',(gltf)=>
{
    particles = {}
    particles.index=0

    //positions
   const positions = gltf.scene.children.map((child)=>{
        // console.log(child)
        return child.geometry.attributes.position
    })
    particles.maxCount=0
    for(const position of positions)
    {
        if(position.count > particles.maxCount){particles.maxCount=position.count}
    }

    particles.positions=[]
    for(const position of positions)
    {
        const originalArray = position.array
        const newArray = new Float32Array(particles.maxCount*3)
        for(let i=0; i<particles.maxCount;i++)
        {
            const i3= i*3
            if(i3<originalArray.length)
            {
                newArray[i3+0]= originalArray[i3+0]
                newArray[i3+1]= originalArray[i3+1]
                newArray[i3+2]= originalArray[i3+2]
            }
            else{

                const randomIndex= Math.floor(position.count * Math.random())*3

                newArray[i3+0]=originalArray[randomIndex+0]
                newArray[i3+1]=originalArray[randomIndex+1]
                newArray[i3+2]=originalArray[randomIndex+2]
            }
        }
        particles.positions.push(new THREE.Float32BufferAttribute(newArray,3))
    }


    const sizesArr= new Float32Array(particles.maxCount)
    for(let i=0; i<sizesArr.length; i++)
    {
        sizesArr[i]=Math.random()
    }
    console.log(particles.positions)

    // console.log(particles.maxCount)
    // console.log(positions)
    // Geometry
    particles.geometry = new THREE.BufferGeometry()
    particles.geometry.setAttribute('position',particles.positions[particles.index])
    particles.geometry.setAttribute('aPositionTarget',particles.positions[3])
    particles.geometry.setAttribute('aSize',new THREE.BufferAttribute(sizesArr,1))
    // particles.geometry.setIndex(null)
    particles.color={1:"#FF00FF",2:"#FF000F"}
    // Material
    particles.material = new THREE.ShaderMaterial({
        vertexShader: particlesVertexShader,
        fragmentShader: particlesFragmentShader,
        uniforms:
        {
            uSize: new THREE.Uniform(0.4),
            uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
            uProgress: new THREE.Uniform(0),
            uColor1:new THREE.Uniform(new THREE.Color(particles.color[1])),
            uColor2:new THREE.Uniform(new THREE.Color(particles.color[2])),
        },
        blending:THREE.AdditiveBlending,
        depthWrite:false
    })



    
    // Points
    particles.points = new THREE.Points(particles.geometry, particles.material)
    particles.points.frustumCulled= false
    scene.add(particles.points)

    //methods
    particles.morph= (index)=>{
        //updaet attributes
        particles.geometry.attributes.position= particles.positions[particles.index]
        particles.geometry.attributes.aPositionTarget= particles.positions[index]

        gsap.fromTo(
            particles.material.uniforms.uProgress,
            {
                value:0
            },
            {
                value:1,
                duration:3,
                ease:"linear"
            },
        )
        particles.index=index
    }
    //tweaks
    gui.add(particles.material.uniforms.uProgress,'value').min(0).max(1).step(0.001).name('uProgress').listen()
    gui.addColor(particles.color,'1').min(0).onChange(()=>{
        particles.material.uniforms.uColor1.value=new THREE.Color(particles.color[1])
    })
    gui.addColor(particles.color,'2').min(0).onChange(()=>{
        particles.material.uniforms.uColor1.value=new THREE.Color(particles.color[2])
    })
    particles.morph0=()=>{particles.morph(0)}
    particles.morph1=()=>{particles.morph(1)}
    particles.morph2=()=>{particles.morph(2)}
    particles.morph3=()=>{particles.morph(3)}
    gui.add(particles,'morph0').name('uProgress')
    gui.add(particles,'morph1').name('uProgress')
    gui.add(particles,'morph2').name('uProgress')
    gui.add(particles,'morph3').name('uProgress')

})

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render normal scene
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
// import { random } from 'gsap'

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor').onChange((color)=>{
        material.color.set(new THREE.Color(color))
    })


   



/**
 * textures
 */
const textureLoader= new THREE.TextureLoader()
const toonTexture= textureLoader.load('/textures/gradients/3.jpg')
toonTexture.minFilter= THREE.NearestFilter
toonTexture.magFilter= THREE.NearestFilter
toonTexture.generateMipmaps=false
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * objects
 */
//material
const material=new THREE.MeshToonMaterial({
    color:parameters.materialColor,
    gradientMap:toonTexture
})

//meshes
const objectDistance=4
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1,0.4,16,60),
    material
)

const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1,2,32),
    material
)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8,0.35,100,16),
    material
)
mesh1.position.y=-objectDistance*0
mesh2.position.y=-objectDistance*1
mesh3.position.y=-objectDistance*2

mesh1.position.x=2
mesh2.position.x=-2
mesh3.position.x=2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes=[mesh1,mesh2,mesh3]

/**
 * particles
 */

//particle geometry
const particleParams={
    count:100,
    size:0.1,
    colorClose:"#ffffff",
    colorFar:"#ffffff",
    xSpread:3,
    ySpread:15,
    zSpread:-3,
}

const particleFolder= gui.addFolder("Particles")

    particleFolder.add(particleParams,"count").min(100).max(10000).step(100)
    particleFolder.add(particleParams,"size").min(0.001).max(1).step(0.001)
    particleFolder.addColor(particleParams, 'colorClose')
    
    particleFolder.addColor(particleParams, 'colorFar')
    particleFolder.add(particleParams,"xSpread").min(1).max(20).step(1)
    particleFolder.add(particleParams,"ySpread").min(15).max(40).step(1)
    particleFolder.add(particleParams,"zSpread").min(-20).max(0).step(1)


    let particleGeometry=null
    let particleMaterial=null
    let particles=null

const createParticles=()=>{
    if(particles!=null){
        particleGeometry.dispose()
        particleMaterial.dispose()
        scene.remove(particles)
    }
     particleGeometry= new THREE.BufferGeometry()
    
    //create position attribute and color array
    const particlePositions= new Float32Array(particleParams.count*3)
    const particleColors= new Float32Array(particleParams.count*3)
    
    
    const colorClose= new THREE.Color(particleParams.colorClose)
    const colorFar= new THREE.Color(particleParams.colorFar)
    for (let i = 0; i < particleParams.count; i++) {
        const i3= i*3
        
        particlePositions[i3+0]=(Math.random()-0.5)*particleParams.xSpread
        particlePositions[i3+1]=objectDistance*0.5-(Math.random())*objectDistance*sectionMeshes.length
        const zRandom=(Math.random()-0.5)
        particlePositions[i3+2]=zRandom*particleParams.zSpread
    
        const color= colorClose.clone()
        color.lerp(colorFar,(zRandom+0.5))
        // console.log()
    
        particleColors[i3+0]=color.r
        particleColors[i3+1]=color.g
        particleColors[i3+2]=color.b
    }
    
    particleGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(particleColors,3)
    )
    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions,3)
    )
    //particle material
     particleMaterial= new THREE.PointsMaterial({
        vertexColors:true,
        size:particleParams.size,
    })
    //pointmesh
     particles= new THREE.Points(
        particleGeometry,
        particleMaterial
    )
    //add to scene
    scene.add(particles)
}

createParticles()

particleFolder.onFinishChange(()=>createParticles())


/**
 * lights
 */
const directionalLight= new THREE.DirectionalLight('#ffffff',3)
directionalLight.position.set(1,1,0)
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
const cameraGroup= new THREE.Group
scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
/**
 * scroll
 */

let scrollY=window.scrollY/sizes.height*objectDistance

let currentSection=0
window.addEventListener("scroll",()=>{
    scrollY=window.scrollY
    
    const newSection= Math.round(scrollY/sizes.height)
    if(currentSection!=newSection){
        console.log("new section")
        currentSection=newSection
        rotate(currentSection)
    }
})

const rotate= (x)=>{
    console.log(`DEBUG: firing ${x}`)
    // console.log(`DEBUG: sectionMeshes ${x} `)
    // console.log(sectionMeshes[x])


    
    gsap.to(sectionMeshes[x].rotation,({
        y: "+=6",
        x: "+=3",
        z: "+=1",

        duration:3,
        ease:"power2.inOut",
    }))
    console.log("rotated")

}

// rotate(0)

/**
 * parralax
 */

let cursor= {
    x:0,
    y:0
}
window.addEventListener("mousemove",(e)=>{
    cursor.x=e.clientX/sizes.width-0.5;
    cursor.y=e.clientY/sizes.height-0.5;

    // console.log(cursor)
})


// let sizes.height
/**
 * Animate
 */
const clock = new THREE.Clock()
let prevTime=0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime= elapsedTime-prevTime
    prevTime=elapsedTime
    
    for(const mesh of sectionMeshes){
        mesh.rotation.x+=deltaTime*0.1
        mesh.rotation.y+=deltaTime*0.12
    }

    //animate camera
     camera.position.y=-scrollY/sizes.height*objectDistance

    const parallaxX=-(cursor.x )*0.5
    const parallaxY=(cursor.y)*0.5
    cameraGroup.position.x+=(parallaxX-cameraGroup.position.x)*5*deltaTime
    // console.log(parallaxX-camera.position.x);
    cameraGroup.position.y+=(parallaxY-cameraGroup.position.y)*5*deltaTime
   

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
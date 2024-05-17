import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
group.position.y= 1
group.rotation.z=1
scene.add(group)

const cube1= new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:"green"})
)

group.add(cube1)

const cube2= new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:"red"})
)
cube2.position.x=2;
group.add(cube2)

const cube3= new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:"blue"})
)

cube3.position.x=-2;

group.add(cube3)

// position
// mesh.position.set(0.5,-1, -1)

// // scale
// mesh.scale.set(1,0.5, 2)
// // rotation
// mesh.rotateX(1)
// mesh.rotateY(0.7)








/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
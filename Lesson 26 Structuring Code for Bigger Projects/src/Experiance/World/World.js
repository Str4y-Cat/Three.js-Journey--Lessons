import * as THREE from "three"

import Experience from "../Experiance";

export default class World
{
    constructor()
    {
    this.experience= new Experience()
    this.scene=this.experience.scene
        
        //test mesh
        const testMesh= new THREE.Mesh(
            new THREE.BoxGeometry(0.2,0.2,0.2),
            new THREE.MeshStandardMaterial()
        )
        console.log(testMesh)
        this.scene.add(testMesh)
    }
}
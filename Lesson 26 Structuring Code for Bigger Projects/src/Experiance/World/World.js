import * as THREE from "three"

import Experience from "../Experiance";
import Environment from "./Environment";

export default class World
{
    constructor()
    {
    this.experience= new Experience()
    this.scene=this.experience.scene
    this.resources= this.experience.resources
        
        //test mesh
        const testMesh= new THREE.Mesh(
            new THREE.BoxGeometry(0.2,0.2,0.2),
            new THREE.MeshStandardMaterial()
        )
        console.log(testMesh)
        this.scene.add(testMesh)

        this.resources.on("ready",()=>
            {
                console.log('resourcse are ready')
                
                this.environment=new Environment()

            })

        //Setup
    }
}
import * as THREE from 'three'

import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'

//convert to singleton
let instance = null

export default class Experience{
    constructor(canvas){
        if(instance)
            {return instance}
        instance=this

        console.log('experiance online')

        //global access 
        window.experience=this

        //options
        this.canvas=canvas

        //setUp
        this.sizes=new Sizes()
        this.time= new Time()
        this.scene= new THREE.Scene()
        this.camera= new Camera()

        //sizes resize event
        this.sizes.on('resize',()=>{
            this.resize()
        })

        //Time tick event
        this.time.on('tick',()=>
            {
                this.update()
            })
    }

    resize(){
        console.log("resizing")
        this.camera.resize()
    }

    update(){
        // console.log('update the experiance')
        this.camera.update()
    }
}
import { log } from "three/examples/jsm/nodes/Nodes.js";
import Robot from "./robot";

 export default class FlyingRobot extends Robot{
    constructor(name,legs){
        super(name,legs)
    }

    sayHi()
    {
        console.log(`hello my name is ${this.name} i am a flying robot`)
    }

    takeOff(){
        console.log(`have a good flight`)
    }
}
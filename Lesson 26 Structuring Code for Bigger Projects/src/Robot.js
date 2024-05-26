export default class Robot{

    constructor(name,legs){
        this.name=name
        this.legs=legs

        console.log(`I am ${this.name}. Thank you for creating me`)
    }

    sayHi(){
        console.log(`hello! My name is ${this.name}`)
    }

}
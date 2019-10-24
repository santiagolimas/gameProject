import GameContext from "./GameContext"
import CatWarlockSprite from "./assets/cat2_base.png"
import Engine from "./Engine";
import GameOverScene from "./GameOverScene"

class CatWarlock{
    private vidaTotal = 1000;
    private vidaRestante = 1000;
    private coordX = 1000;
    private coordY = 0;
    private width = 50;
    private height = 50;
    private frame = 0;
    private stance = 0;
    private sprite = new Image();
    private counter = 0;
    private idleFrames = [[20,150],[20,275],[83,275],[147,275],[210,275],[275,275],[340,275]];
    position = [this.coordX,this.coordY];
    measurementsCat = [this.width,this.height];
    private barColor = "green"

    constructor(coordX, coordY){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        this.vidaTotal = 1000;
        this.vidaRestante = 1000;
        this.coordX = coordX;
        this.coordY = coordY;
        this.frame = 0;
        this.stance = 0;
        this.sprite.src = CatWarlockSprite;

        
    }

    public update(){
        if(this.counter == 30){
            this.frame++;
            if(this.frame > 6){
                this.frame = 0;
            }
            this.counter = 0;
            }
        this.counter++;
        this.position[0] = this.coordX;
        this.position[1] = this.coordY;

    }

    public render(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        context.save();
        context.beginPath();
        context.drawImage(this.sprite,this.idleFrames[this.frame][0],this.idleFrames[this.frame][1],20, 35,this.coordX,this.coordY, 50, 50)
        context.closePath();
        context.restore();


        // context.save();
        // context.beginPath();
        // context.fillStyle = this.barColor;
        // context.fillRect(this.coordX, height / 2 - 45, 50, 10)
        // context.closePath();
        // context.restore();
    }

    public getCatWarlockCoordinates = () => {
        return this.position;
    };

    public getMeasurementsCatWarlock = () => {
        return this.measurementsCat;
    };

    public getHealth = () =>{
        return this.vidaRestante;
    }

}

export default CatWarlock;
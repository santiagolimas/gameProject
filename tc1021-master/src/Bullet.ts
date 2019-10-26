import GameContext from "./GameContext"
import BulletSprite from "./assets/bulllet/energy_effect_base.png"
import Engine from "./Engine";
import GameOverScene from "./GameOverScene"

class Bullet{

    
    private coordX = 1000;
    private coordY = 0;
    private width = 50;
    private height = 50;
    private frame = 0;
    private stance = 0;
    private sprite = new Image();
    private counter = 0;
    private idleFrames = [[2,98],[35,98],[66,98],[99,98],[133,98],[165,98],[205,98]];
    position = [this.coordX,this.coordY];
    measurementsBullet = [this.width,this.height];

    constructor(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
  
        this.coordX = 70;
        this.coordY = height/2 - 25;
        this.frame = 0;
        this.stance = 0;
        this.sprite.src = BulletSprite;

        
    }

    public update(){
        if(this.counter == 10){
            this.frame++;
            if(this.frame > 3){
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
        context.drawImage(this.sprite,this.idleFrames[this.frame][0],this.idleFrames[this.frame][1],28, 33,this.coordX,this.coordY, 50, 50)
        context.closePath();
        context.restore();


        // context.save();
        // context.beginPath();
        // context.fillStyle = this.barColor;
        // context.fillRect(this.coordX, height / 2 - 45, 50, 10)
        // context.closePath();
        // context.restore();
    }

    public getBulletCoordinates = () => {
        return this.position;
    };

    public getMeasurementsBullet = () => {
        return this.measurementsBullet;
    };

     



}

export default Bullet;
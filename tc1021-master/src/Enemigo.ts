import GameContext from "./GameContext"
import EnemigoWalk from "./assets/mon2_sprite_base.png"
import Engine from "./Engine";
import GameOverScene from "./GameOverScene"

class Enemigo{
    private vidaTotal = 1000;
    private vidaRestante = 1000;
    private coordX = 1000;
    private coordY = 0;
    private widthEnemy = 50;
    private heightEnemy = 50;
    private frame = 0;
    private sprite = new Image();
    private counter = 0;
    private walkingframes = [20,90,150,210]
    private attackingframes = [];
    private dyingframes = [[20,210],[80,210],[140,210],[200,210],[266,210],[337,210],[400,210]];
    private HealthCounter = 0;
    private stance = 0;
    private status = true;

    position = [this.coordX,this.coordY];
    measurementsEnemy = [this.widthEnemy,this.heightEnemy];
    
    public collisionEnemigo(){
        this.vidaRestante -= 200;
        if(this.vidaRestante <= 0){
            this.stance = 2;
            this.frame = 0;
            this.counter = 0;
        }
        else{
            this.HealthCounter = 1;
        }
    }

    constructor(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        this.vidaTotal = 1000;
        this.vidaRestante = 1000;

        this.coordX = width + 50;
        this.coordY = (height / 2) - 25;
        this.frame = 0;
        this.stance = 0;
        this.status = true;
        this.sprite.src = EnemigoWalk;

        
    }

    public update(){
        if(this.HealthCounter > 0){
            this.HealthCounter++;
        }
        if(this.HealthCounter > 60){
            this.HealthCounter = 0;
        }
        if(this.stance == 0){
            if(this.counter == 30){
                this.frame++;
                if(this.frame > 3){
                    this.frame = 0;
                }
                this.counter = 0;
                }
            this.counter++;
            this.coordX -= .5;
        }
        else if(this.stance == 2){
            if(this.counter == 7){
                this.frame++;
                this.counter = 0;
            }
            if(this.frame == 6){
                this.status = false;
            }
            this.counter++;
        }
        this.position[0] = this.coordX;
        this.position[1] = this.coordY;

    }

    public getStatus(){
        return this.status;
    }

    public render(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width

        if(this.HealthCounter > 0){
            context.save();
            context.beginPath();
            context.fillStyle = "DarkRed";
            context.fillRect(this.coordX,this.coordY - 5,this.widthEnemy,5);
            context.closePath();
            context.restore();
            context.save();
            context.beginPath();
            context.fillStyle = "green";
            context.fillRect(this.coordX,this.coordY - 5,this.widthEnemy * (this.vidaRestante/this.vidaTotal),5);
            context.closePath();
            context.restore();
        }

        if(this.stance == 0){
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.walkingframes[this.frame], 23,30, 40,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        else if(this.stance == 2){
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.dyingframes[this.frame][0],this.dyingframes[this.frame][1],40, 45,0,0, 50, 50)
            context.closePath();
            context.restore();
        }

        // context.save();
        // context.beginPath();
        // context.fillStyle = this.barColor;
        // context.fillRect(this.coordX, height / 2 - 45, 50, 10)
        // context.closePath();
        // context.restore();
    }

    public getEnemyCoordinates = () => {
        return this.position;
    };

    public getMeasurementsEnemy = () => {
        return this.measurementsEnemy;
    };

    public getHealth = () =>{
        return this.vidaRestante;
    }

}

export default Enemigo;
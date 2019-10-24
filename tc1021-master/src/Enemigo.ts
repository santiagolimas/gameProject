import GameContext from "./GameContext"
import EnemigoWalk from "./assets/mon2_sprite_base.png"

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


    position = [this.coordX,this.coordY];
    measurementsEnemy = [this.widthEnemy,this.heightEnemy];



    private barColor = "green"

    constructor(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        this.vidaTotal = 1000;
        this.vidaRestante = 1000;

        this.coordX = width + 50;
        this.coordY = (height / 2) - 25;
        this.frame = 0;
        this.sprite.src = EnemigoWalk;

        
    }

    public update(){
        if(this.counter == 30){
            this.frame++;
            if(this.frame > 3){
                this.frame = 0;
            }
            this.counter = 0;
            }
        this.counter++;
        this.coordX -= .5;
        this.position[0] = this.coordX;
        this.position[1] = this.coordY;

    }

    public render(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        context.save();
        context.beginPath();
        context.translate(this.coordX + 50,height/2 - 25);
        context.scale(-1,1);
        context.drawImage(this.sprite,this.walkingframes[this.frame], 70,20, 70,0,0, 50, 50)
        context.closePath();
        context.restore();


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
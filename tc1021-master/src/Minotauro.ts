import GameContext from "./GameContext"
// @ts-ignore
import MinotaurSheet from "./assets/minotaur.png"
import Engine from "./Engine";
import GameOverScene from "./GameOverScene"

class Minotauro{
    //atributos
    private vidaTotal = 1000;
    private vidaRestante = 1000;
    private coordX = 1000;
    private coordY = 0;
    //propiedades
    private widthEnemy = 50;
    private heightEnemy = 50;
    measurementsEnemy = [this.widthEnemy,this.heightEnemy];
    //animaciones
    private frame = 0;
    private sprite = new Image();
    private counter = 0;
    private stance = 0;
    private wakeup = 0;
    private walkingframes = [[30,216],[125,216],[220,216],[316,216],[411,216]]
    private waitingframe = [[30,790],[125,790],[220,790]];
    private attackingframes = [[2,306,58,50],[2,306,63,61],[2,306,62,62],[107,306,64,50],[204,306,55,50],[315,306,55,50],[411,306,55,50],[507,306,55,50],[603,306,55,50],[699,306,55,50],[795,306,55,50]];
    private dyingframes = [[30,886],[124,886],[225,886],[321,886],[417,886],[513,886]];
    //gameplay
    private HealthCounter = 0;
    private status = true;
    position = [this.coordX,this.coordY];
    
    public collisionEnemigo(){
        if(this.vidaRestante > 0){
            this.vidaRestante -= 100;
            if(this.vidaRestante <= 0){
                this.stance = 2;
                this.frame = 0;
                this.counter = 0;
            }
            else{
                this.HealthCounter = 1;
            }
        }  
    }

    public collisionTorre(){
        if(this.stance != 1){
            this.stance = 1;
            this.frame = 0;
            this.counter = 0;
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
        this.sprite.src = MinotaurSheet;

        
    }

    public walk(number){
        this.stance = 4;
        this.frame = 0;
        this.counter = 0;
        this.wakeup = number;
    }

    public update(){
        if(this.HealthCounter > 0){
            this.HealthCounter++;
        }
        if(this.HealthCounter > 60){
            this.HealthCounter = 0;
        }
        if(this.wakeup > 0){
            this.wakeup--;
            if(this.wakeup == 0){
                this.stance = 0;
                this.frame = 0;
                this.counter = 0;
            }
        }
        if(this.stance == 0){
            if(this.counter == 30){
                this.frame++;
                if(this.frame > 4){
                    this.frame = 0;
                }
                this.counter = 0;
                }
            this.counter++;
            this.coordX -= .5;
        }
        else if(this.stance == 1){
            if(this.counter == 7 && this.frame < 10){
                this.frame++;
                this.counter = 0;
            }
            else if(this.counter == 7 && this.frame == 10){
                this.frame = 0;
                this.counter = 0;
            }
            this.counter++;
        }
        else if(this.stance == 2){
            if(this.counter == 7){
                this.frame++;
                this.counter = 0;
            }
            if(this.frame == 5){
                this.status = false;
            }
            this.counter++;
        }
        else if(this.stance == 4){
            if(this.counter == 20 && this.frame < 2){
                this.frame++;
                this.counter = 0;
            }
            if(this.counter == 20 && this.frame == 2){
                this.frame = 0;
                this.counter = 0;
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
            context.drawImage(this.sprite,this.walkingframes[this.frame][0],this.walkingframes[this.frame][1],51,40,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        else if(this.stance == 1){
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.attackingframes[this.frame][0],this.attackingframes[this.frame][1],this.attackingframes[this.frame][2],this.attackingframes[this.frame][3],0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        else if(this.stance == 2){
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.dyingframes[this.frame][0],this.dyingframes[this.frame][1],52,45,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        else if(this.stance == 4){
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.waitingframe[this.frame][0],this.waitingframe[this.frame][1],51,41,0,0, 50, 50)
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

export default Minotauro;
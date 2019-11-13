import GameContext from "./GameContext"
// @ts-ignore
import SnakeSheet from "./assets/snakeSpritesheet.png"
import Engine from "./Engine";
import GameOverScene from "./GameOverScene"

class Snake{
    //atributos
    private vidaTotal = 150;
    private vidaRestante = 150;
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
    private walkingframes = [[298,84],[264,84],[231,84],[264,84],[200,84],[170,84],[140,84],[106,84],[74,84],[42,84],[11,84]]
    private waitingframe = [[203,56],[170,56],[140,56],[106,56]];
    private attackingframes = [[298,115],[267,115],[234,115],[200,115],[170,115],[136,115],[106,115],[75,115],[42,115],[8,115]];
    private dyingframes = [[298,147],[266,147],[235,147],[203,147],[172,147],[140,147],[105,147],[73,147],[40,147],[6,147]];
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
        if(this.stance != 1 && this.stance != 2){
            this.stance = 1;
            this.frame = 0;
            this.counter = 0;
        }
    }

    constructor(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        this.vidaTotal = 300;
        this.vidaRestante = 300;

        this.coordX = width;
        this.coordY = (height / 2) - 25;
        this.frame = 0;
        this.stance = 0;
        this.status = true;
        this.sprite.src = SnakeSheet;

        
    }

    public walk(number){
        if(this.stance != 2){
            this.stance = 4;
            this.frame = 0;
            this.counter = 0;
            this.wakeup = number;
        }
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
            if(this.counter == 15){
                this.frame++;
                if(this.frame > 10){
                    this.frame = 0;
                }
                this.counter = 0;
                }
            this.counter++;
            this.coordX -= 3;
        }
        else if(this.stance == 1){
            if(this.counter == 7 && this.frame < 9){
                this.frame++;
                this.counter = 0;
            }
            else if(this.counter == 7 && this.frame == 9){
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
            if(this.frame == 9){
                this.status = false;
            }
            this.counter++;
        }
        else if(this.stance == 4){
            if(this.counter == 20 && this.frame < 3){
                this.frame++;
                this.counter = 0;
            }
            if(this.counter == 20 && this.frame == 3){
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
            context.drawImage(this.sprite,this.walkingframes[this.frame][0],this.walkingframes[this.frame][1],16,15,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        else if(this.stance == 1){
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.attackingframes[this.frame][0],this.attackingframes[this.frame][1],20,17,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        else if(this.stance == 2){
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.dyingframes[this.frame][0],this.dyingframes[this.frame][1],18,18,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        else if(this.stance == 4){
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.waitingframe[this.frame][0],this.waitingframe[this.frame][1],16,15,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
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

export default Snake;
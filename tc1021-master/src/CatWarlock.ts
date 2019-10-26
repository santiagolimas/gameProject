import GameContext from "./GameContext"
import CatWarlockSprite from "./assets/cat2_base.png"
import Engine from "./Engine";
import GameOverScene from "./GameOverScene"
import Bullet from "./Bullet"
import Enemigo from "./Enemigo"
import ignition from "./assets/flame.ogg"

class CatWarlock{
    
    private ignition = new Audio(ignition)
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
    private stanceChange = 0;
    private idleFrames = [[20,150],[20,275],[83,275],[147,275],[210,275],[275,275],[340,275]];
    private chargingFrames = [[20,23],[80,23],[145,23],[205,23],[275,23],[335,23],[400,23],[465,23],[530,23],[595,23],[660,23],[725,23],[785,23]];
    position = [this.coordX,this.coordY];
    measurementsCat = [this.width,this.height];
    private barColor = "green" 

    private bullets = [];
    private statusBullets = [];



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

    public update(arrayEnemies: Enemigo[], statusEnemies: boolean[]){
        if(this.stance == 0){
            if(this.stanceChange <= 60){
                this.stanceChange++;
            }
            else{
                this.stanceChange = 0;
                this.stance = 1;
                this.frame = 0;
                this.counter = 0;
            }
        }
        else if(this.stance == 1){
            if(this.stanceChange <= 91){
                this.stanceChange++;
            }
            else{
                this.stanceChange = 0;
                this.stance = 0;
                this.frame = 0;
                this.counter = 0;
            }
        }
        if(this.stance == 0){
            if(this.counter == 15){
                this.frame++;
                if(this.frame > 6){
                    this.frame = 0;
                }
                this.counter = 0;
                }
            this.counter++;
        }
        else if(this.stance == 1){

            if(this.counter == 7){
                this.frame++;
                if(this.frame > 12){
                    this.frame = 0;
                }
                else if(this.frame == 12){
                    this.ignition.play();
                    this.bullets.push(new Bullet(this.coordX+this.width,this.coordY));
                    this.statusBullets.push(true);
                }
                this.counter = 0;
                }
            this.counter++;
        }
            for(let i = 0; i < this.bullets.length; i++){
                if(this.statusBullets){
                    this.statusBullets[i] = this.bullets[i].getStatus();
                    if(this.statusBullets)
                        this.bullets[i].update();

                }
                for(let j = 0; j < arrayEnemies.length; j++){
                

                //RECT2
                let [enemyX, enemyY] = arrayEnemies[j].getEnemyCoordinates();
                let [enemyWidth, enemyHeight] = arrayEnemies[j].getMeasurementsEnemy();

                let [bulletX, bulletY] = this.bullets[i].getBulletCoordinates();
                let [bulletWidth,bulletHeight] = this.bullets[i].getMeasurementsBullet();

                // TODO Bullet
                //Izq
                let leftA = bulletX;
                //Derecho
                let rightA = bulletX + bulletWidth;
                //Top
                let topA = bulletY;
                //Bottom
                let bottomA = bulletY + bulletHeight;

                // TODO Enemy
                //Izq
                let leftB = enemyX;
                //Derecho
                let rightB = enemyX + enemyWidth;
                //Top
                let topB = enemyY;
                //Bottom
                let bottomB = enemyY + enemyHeight;

                //A.Left < B.Right
                //A.Right > B.Left
                //A.Top > B.Bottom
                //A.Bottom < B.Top

                if(leftA < rightB && rightA > leftB &&
                    topA < bottomB && bottomA > topB && statusEnemies[j] && this.statusBullets[i]){
                        this.bullets[i].collisionBullet();
                        arrayEnemies[j].collisionEnemigo();
                        console.log("Collision occured" + " " + i + " " + j)
                        break;
            
                }


                }
            }
        this.position[0] = this.coordX;
        this.position[1] = this.coordY;

    }

    public render(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        context.save();
        context.beginPath();
        if(this.stance == 0 )
            context.drawImage(this.sprite,this.idleFrames[this.frame][0],this.idleFrames[this.frame][1],20, 35,this.coordX,this.coordY, 50, 50);
        else if(this.stance == 1)
            context.drawImage(this.sprite,this.chargingFrames[this.frame][0],this.chargingFrames[this.frame][1],30, 35,this.coordX,this.coordY, 50, 50);
        
        for(let i = 0; i < this.bullets.length; i++){
            if(this.statusBullets[i])
                this.bullets[i].render();
        }

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
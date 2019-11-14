// @ts-ignore
import CatWarlockSprite from "./assets/cat2_base.png"
// @ts-ignore
import ignition from "./assets/flame.ogg"
import GameContext from "./GameContext"
import Bullet from "./Bullet"
import Enemigo from "./Zombie"


class CatWarlock{
    //assets
    private ignition = new Audio(ignition)
    private sprite = new Image();
    //atributos
    private vidaTotal = 1000;
    private vidaRestante = 1000;
    private coordX = 1000;
    private coordY = 0;
    private width = 50;
    private height = 50;
    //animacion
    private frame = 0;
    private stance = 0;
    private counter = 0;
    private status = false;
    private stanceChange = 0;
    private idleFrames = [[20,150],[22,275],[86,275],[149,275],[215,275],[278,275],[344,275]];
    private chargingFrames = [[18,23],[83,23],[145,23],[211,23],[276,23],[339,23],[403,23],[469,23],[534,23],[597,23],[662,23],[725,23],[790,23]];
    //gameplay
    private position = [this.coordX,this.coordY];
    private measurementsCat = [this.width,this.height];
    private HealthCounter = false;
    private bullets = [];
    private statusBullets = [];

    public collisionTorre(tipo){
        //depende del tipo de enemigo con el que pelea
        switch(tipo){
            case 1: //zombie
                this.vidaRestante -= 3;
                break;
            case 2: //minotauro
                this.vidaRestante -= 10;
                break;
            case 3: //snake
                this.vidaRestante--;
                break;

        }
        //si muere con este ataque lo indica
        if(this.vidaRestante <= 0){
            this.status = false;
        }
        //si empieza a mostrar la salud
        else{
            this.HealthCounter = true;;
        }
    }

    //regresa si esta viva o muerta la torre
    public getStatus(){
        return this.status;
    }


    constructor(coordX, coordY){
        //se inicializa la vida en 1000
        this.vidaTotal = 1000;
        this.vidaRestante = 1000;
        //se inicializa en las coordenadas indicadas
        this.coordX = coordX;
        this.coordY = coordY;
        //empieza en la animacion de idle
        this.frame = 0;
        this.stance = 0;
        //carga los assets
        this.sprite.src = CatWarlockSprite;
        //se considera viva
        this.status = true;
    }


    public update(arrayEnemies: Enemigo[], statusEnemies: boolean[]){
        //si esta idle
        if(this.stance == 0){
            //si aun le faltan frames para empezar a cargar la bola de fuego espera para hacerlo
            if(this.stanceChange <= 49){
                this.stanceChange++;
            }
            //si tiene que empezar a cargar
            else{
                //cambia a modalidad de carga la bola de fuego
                this.stanceChange = 0;
                this.stance = 1;
                this.frame = 0;
                this.counter = 0;
            }
        }
        //si esta cargando la bola de fuego
        else if(this.stance == 1){
            //checa si aun tiene que cargar la bola de fuego
            if(this.stanceChange <= 91){
                //si aun tiene que cargar espera
                this.stanceChange++;
            }
            //si ya esta lista
            else{
                //cambia a modalidad idle
                this.stanceChange = 0;
                this.stance = 0;
                this.frame = 0;
                this.counter = 0;
            }
        }
        //si esta en modalidad idle
        if(this.stance == 0){
            //cada 7 frames avanza a la siguiente parte de la animacion
            if(this.counter == 7){
                this.frame++;
                if(this.frame > 6){
                    this.frame = 0;
                }
                this.counter = 0;
                }
            this.counter++;
        }
        //si esta en modalidad cargar la bola de fuego
        else if(this.stance == 1){

            if(this.counter == 7){
                this.frame++;
                if(this.frame > 12){
                    this.frame = 0;
                }
                //si esta en la parte de la animacion donde lanza la bola de fuego
                else if(this.frame == 8){
                    //hace sonar la bola de fuego
                    this.ignition.play();
                    //crea una nueva bola de fuego (aprximadamente de la manos del personaje)
                    this.bullets.push(new Bullet(this.coordX+this.width - 30,this.coordY));
                    this.statusBullets.push(true);
                }
                this.counter = 0;
                }
            this.counter++;
        }
            //para cada bala
            for(let i = 0; i < this.bullets.length; i++){
                //si la bala aun no hay explotado
                if(this.statusBullets){
                    //primero checas ia la bala se considera viva
                    this.statusBullets[i] = this.bullets[i].getStatus();
                    //si la bala esta viva avanza
                    if(this.statusBullets)
                        this.bullets[i].update();

                }
                //por cada enemigo
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
                    topA < bottomB && bottomA > topB && statusEnemies[j] 
                    && this.statusBullets[i] && arrayEnemies[j].getHealth() > 0 && leftB < GameContext.context.canvas.width){
                        //si la bala y el enemigo colisionan y el enemigo no esta muerto ni en proceso de morir ambos colisionan
                        this.bullets[i].collisionBullet();
                        arrayEnemies[j].collisionEnemigo();
                        break;
            
                }


                }
            }
        this.position[0] = this.coordX;
        this.position[1] = this.coordY;

    }

    public render(){
        //constantes del canvas
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        //dibuja a la torre
        context.save();
        context.beginPath();
        //si esta idle
        if(this.stance == 0 )
            context.drawImage(this.sprite,this.idleFrames[this.frame][0],this.idleFrames[this.frame][1],30, 35,this.coordX,this.coordY, 50, 50);
        //si esta cargando la bala
        else if(this.stance == 1)
            context.drawImage(this.sprite,this.chargingFrames[this.frame][0],this.chargingFrames[this.frame][1],30, 35,this.coordX,this.coordY, 50, 50);
        //si las balas estan vivas las dibuja
        for(let i = 0; i < this.bullets.length; i++){
            if(this.statusBullets[i])
                this.bullets[i].render();
        }

        context.closePath();
        context.restore();

         //si la bandera de que ha tomado daño esta activa, dibuja la vida
        if(this.HealthCounter == true){
            //un rectangulo rojo que indica la vida total
            context.save();
            context.beginPath();
            context.fillStyle = "DarkRed";
            context.fillRect(this.coordX,this.coordY - 5,this.width,5);
            context.closePath();
            context.restore();
            //un rectangulo verde que indica la vida que le queda
            context.save();
            context.beginPath();
            context.fillStyle = "green";
            context.fillRect(this.coordX,this.coordY - 5,this.width * (this.vidaRestante/this.vidaTotal),5);
            context.closePath();
            context.restore();
        }
    }

    //regresa las coordenadas
    public getCatWarlockCoordinates = () => {
        return this.position;
    };

    //regresa sus medidas
    public getMeasurementsCatWarlock = () => {
        return this.measurementsCat;
    };

    //regresa su vida
    public getHealth = () =>{
        return this.vidaRestante;
    }

}

export default CatWarlock;
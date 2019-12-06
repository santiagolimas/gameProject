import GameContext from "./GameContext"
// @ts-ignore
import MinotaurSheet from "./assets/minotaur.png"
class Minotauro{
    //atributos
    private vidaTotal = 1000;
    private vidaRestante = 1000;
    private coordX = 1000;
    private coordY = 0;
    //animacion
    private widthEnemy = 50;
    private heightEnemy = 50;
    private frame = 0;
    private sprite = new Image();
    private counter = 0;
    private walkingframes = [[30,216],[125,216],[220,216],[316,216],[411,216]]
    private waitingframe = [[30,790],[125,790],[220,790]];
    private attackingframes = [[2,306,58,50],[2,306,63,61],[2,306,62,62],[107,306,64,50],[204,306,55,50],[315,306,55,50],[411,306,55,50],[507,306,55,50],[603,306,55,50],[699,306,55,50],[795,306,55,50]];
    private dyingframes = [[30,886],[124,886],[225,886],[321,886],[417,886],[513,886]];
    measurementsEnemy = [this.widthEnemy,this.heightEnemy];
    //gameplay
    private HealthCounter = 0;
    private stance = 0;
    private status = true;
    private wakeup = 0;
    private firstPath = true;
    private pos = 0;
    position = [this.coordX,this.coordY];
    
    public collisionEnemigo(){
        //si aun sigue matematicamente vivo
        if(this.vidaRestante > 0){
            //toma daño
            this.vidaRestante -= 100;
            //si ese daño lo mato
            if(this.vidaRestante <= 0){
                //empieza la animacion de muerte
                this.stance = 2;
                this.frame = 0;
                this.counter = 0;
            }
            //si sigue vivo despliega la vida por 60 frames
            else{
                this.HealthCounter = 60;
            }
        }  
    }

    public collisionTorre(){
        //si topa con una torre y no la esta atacando y no esta muerto
        if(this.stance != 1 && this.stance != 2){
            //empieza la animacion de ataque
            this.stance = 1;
            this.frame = 0;
            this.counter = 0;
        }
    }

    constructor(y: number){
        //constantes del canvas
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        //se inicializa con 1000 puntos de vida
        this.vidaTotal = 1000;
        this.vidaRestante = 1000;
        //se inicializa en donde va a hacer spawn
        this.coordX = width;
        this.coordY = y;
        //su primera animacion es caminar
        this.frame = 0;
        this.stance = 0;
        //se considera vivo
        this.status = true;
        //carga sus sprites
        this.sprite.src = MinotaurSheet;
    }

    public walk(number){
        //si no esta muerto
        if(this.stance != 2){
            //empieza a esperar por la cantidad de frames indicada
            this.stance = 4;
            this.frame = 0;
            this.counter = 0;
            this.wakeup = number;
        }
    }

    public update(){
        //resta un frame que debe desplegar la vida
        if(this.HealthCounter > 0){
            this.HealthCounter--;
        }
        //si esta esperando
        if(this.wakeup > 0){
            this.wakeup--;
            //si ya termino de esperar empieza la animacion de caminar
            if(this.wakeup == 0){
                this.stance = 0;
                this.frame = 0;
                this.counter = 0;
            }
        }
        //si esta caminando
        if(this.stance == 0){
            //cada 15 frames pasa a la siguiente parte de la animacion
            if(this.counter == 15){
                this.frame++;
                if(this.frame > 4){
                    this.frame = 0;
                }
                this.counter = 0;
                }
            this.counter++;
            //avanza de .5 en .5 pixeles
            this.coordX -= .5;
        }
        //si esta atacando
        else if(this.stance == 1){
            //cada 7 frames pasa a la siguiente parte de la animacion
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
        //si esta muriendo
        else if(this.stance == 2){
            //cada 7 frames avanza a la siguiente parte de la animacion
            if(this.counter == 7){
                this.frame++;
                this.counter = 0;
            }
            //si acabo la animacion
            if(this.frame == 5){
                //se empieza a considerar muerto
                this.status = false;
            }
            this.counter++;
        }
        //si esta esperando
        else if(this.stance == 4){
            //cada 20 frames avanza a la siguiente parte de la animacion
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

    //regresa si se cree vivo o muerto
    public getStatus(){
        return this.status;
    }

    public render(){
        //constantes del canvas
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        //si la cantidad de frames que debe de mostrar la salud es existente
        if(this.HealthCounter > 0){
            //dibuja una barra roja que representa toda la vida que se puede tener
            context.save();
            context.beginPath();
            context.fillStyle = "DarkRed";
            context.fillRect(this.coordX,this.coordY - 5,this.widthEnemy,5);
            context.closePath();
            context.restore();
            //sobreescribe una barra verde que representa la vida que le queda
            context.save();
            context.beginPath();
            context.fillStyle = "green";
            context.fillRect(this.coordX,this.coordY - 5,this.widthEnemy * (this.vidaRestante/this.vidaTotal),5);
            context.closePath();
            context.restore();
        }
        //si esta caminando
        if(this.stance == 0){
            //dibuja la animacion de caminar
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,this.coordY);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.walkingframes[this.frame][0],this.walkingframes[this.frame][1],51,40,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        //si esta atacando
        else if(this.stance == 1){
            //dibuja la animacion de atacar
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,this.coordY);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.attackingframes[this.frame][0],this.attackingframes[this.frame][1],this.attackingframes[this.frame][2],this.attackingframes[this.frame][3],0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        //si esta muriendo
        else if(this.stance == 2){
            //dibuja la animacion de morir
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,this.coordY);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.dyingframes[this.frame][0],this.dyingframes[this.frame][1],52, 45,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        //si esta esperando
        else if(this.stance == 4){
            //dibuja la animacion de esperar
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,this.coordY);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.waitingframe[this.frame][0],this.waitingframe[this.frame][1],51,41,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
    }

    


    //regresa su posicion
    public getEnemyCoordinates = () => {
        return this.position;
    };

    //regresa su tamaño
    public getMeasurementsEnemy = () => {
        return this.measurementsEnemy;
    };

    //regresa cuanta vida aun tiene
    public getHealth = () =>{
        return this.vidaRestante;
    }

}

export default Minotauro;
import GameContext from "./GameContext"
// @ts-ignore
import SnakeSheet from "./assets/snakeSpritesheet.png"
class Snake{
    //atributos
    private vidaTotal = 300;
    private vidaRestante = 300;
    private coordX = 1000;
    private coordY = 0;
    //animacion
    private widthEnemy = 50;
    private heightEnemy = 50;
    private frame = 0;
    private sprite = new Image();
    private counter = 0;
    private walkingframes = [[298,84],[264,84],[231,84],[264,84],[200,84],[170,84],[140,84],[106,84],[74,84],[42,84],[11,84]]
    private waitingframe = [[203,56],[170,56],[140,56],[106,56]];
    private attackingframes = [[298,115],[267,115],[234,115],[200,115],[170,115],[136,115],[106,115],[75,115],[42,115],[8,115]];
    private dyingframes = [[298,147],[266,147],[235,147],[203,147],[172,147],[140,147],[105,147],[73,147],[40,147],[6,147]];
    measurementsEnemy = [this.widthEnemy,this.heightEnemy];
    //gameplay
    private HealthCounter = 0;
    private stance = 0;
    private status = true;
    private wakeup = 0;
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

    constructor(){
        //constantes del canvas
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        //se inicializa con 300 puntos de vida
        this.vidaTotal = 300;
        this.vidaRestante = 300;
        //se inicializa en donde va a hacer spawn
        this.coordX = width;
        this.coordY = (height / 2) - 25;
        //su primera animacion es caminar
        this.frame = 0;
        this.stance = 0;
        //se considera vivo
        this.status = true;
        //carga sus sprites
        this.sprite.src = SnakeSheet;
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
                if(this.frame > 10){
                    this.frame = 0;
                }
                this.counter = 0;
                }
            this.counter++;
            //avanza de 3 en 3 pixeles
            this.coordX -= 3;
        }
        //si esta atacando
        else if(this.stance == 1){
            //cada 7 frames pasa a la siguiente parte de la animacion
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
        //si esta muriendo
        else if(this.stance == 2){
            //cada 7 frames avanza a la siguiente parte de la animacion
            if(this.counter == 7){
                this.frame++;
                this.counter = 0;
            }
            //si acabo la animacion
            if(this.frame == 9){
                //se empieza a considerar muerto
                this.status = false;
            }
            this.counter++;
        }
        //si esta esperando
        else if(this.stance == 4){
            //cada 20 frames avanza a la siguiente parte de la animacion
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
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.walkingframes[this.frame][0],this.walkingframes[this.frame][1],15, 15,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        //si esta atacando
        else if(this.stance == 1){
            //dibuja la animacion de atacar
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.attackingframes[this.frame][0],this.attackingframes[this.frame][1],20, 17,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        //si esta muriendo
        else if(this.stance == 2){
            //dibuja la animacion de morir
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.dyingframes[this.frame][0],this.dyingframes[this.frame][1],18, 18,0,0, 50, 50)
            context.closePath();
            context.restore();
        }
        //si esta esperando
        else if(this.stance == 4){
            //dibuja la animacion de esperar
            context.save();
            context.beginPath();
            context.translate(this.coordX + 50,height/2 - 25);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.waitingframe[this.frame][0],this.waitingframe[this.frame][1],16,15,0,0, 50, 50)
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

export default Snake;
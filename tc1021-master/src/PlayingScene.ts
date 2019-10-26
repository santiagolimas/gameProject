import Scene from "./Scene"
import Engine from "./Engine"
import MainMenuScene from "./MainMenuScene"
import GameContext from "./GameContext"
import Enemigo from "./Enemigo"
import selection from "./assets/Menu Selection Click.wav"
import CatWarlock from "./CatWarlock"
import Bullet from "./Bullet"

class PlayingScene extends Scene {

    //Button characteristics
    private widthButton = 150;
    private heightButton = 80;
    private positionButton = [50,20];
    private buttonColor = "gray"

    private buttonPressed = false
    //Enemy characteristics

    private paused = false
    private direccion = 1;
    private coordX = 0;
    private enemigos = [new Enemigo()];
    private ticks = 0;
    private catWarlock = new CatWarlock(0,0);
    private bullet = new Bullet();

    private currentOption: number = 0
    private options = ["Reanudar juego","Reiniciar juego","Menú principal","Ajustes"]
    private selectionSound = new Audio(selection);


     //todo Variables para botones de interfaz de pausa
     private widthCanvas = GameContext.context.canvas.width;
     private heightCanvas = GameContext.context.canvas.height;


    //  context.fillRect(width/2 - 200, height/2 - 200 + i * 110 - 55, 400, 70);
    private mousePressed = false

     private widthButton1 = 400;
     private heightButton1 = 70;
     private positionButton1 = [this.widthCanvas/2 - 200, this.heightCanvas/2 - 255];

     private widthButton2 = 400;
     private heightButton2 = 70;
     private positionButton2 = [this.widthCanvas/2 - 200, this.heightCanvas/2 + (1*110) - 255];
     
     private widthButton3 = 400;
     private heightButton3 = 70;
     private positionButton3 = [this.widthCanvas/2 - 200, this.heightCanvas/2 + (2*110) - 255];

     private widthButton4 = 400;
     private heightButton4 = 70;
     private positionButton4 = [this.widthCanvas/2 - 200, this.heightCanvas/2 + (3*110) - 255];


    public render = () => {

          
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        context.save();
        context.beginPath();
        context.fillStyle = "black";
        context.fillRect(0, height/2 - 26, width,1)
        context.fillRect(0, height/2 + 26, width,1)
        context.closePath();
        context.restore();


    
        //Button
        let [x, y] = this.positionButton;
        context.save();
        context.beginPath();
        context.fillStyle = this.buttonColor;
        context.fillRect(x, y, this.widthButton, this.heightButton);
        context.closePath();
        context.restore();



        for(let x = 0; x < this.enemigos.length; x++){
            this.enemigos[x].render();
        }

        


        this.catWarlock.render();
        this.bullet.render();

       

        // TODO: EMPIEZA INTERFAZ DE PAUSA
        if(this.paused){

        context.save()
        context.beginPath()
        context.globalAlpha = .5
        context.fillStyle = "black"
        context.fillRect(0,0,width,height);
        context.closePath()
        context.restore()
        
        context.save()
        context.beginPath()
        context.textAlign = "center"
        context.fillStyle = "white"
        context.font = "40px sans-serif"
        context.strokeStyle = "grey"
        context.lineWidth = 1.8;

        for(let i = 0;  i < this.options.length ; i++){

            context.save();
            context.fillStyle = "black";
            context.beginPath();
            context.fillRect(width/2 - 200, height/2 - 200 + i * 110 - 55, 400, 70);
            context.closePath();
            context.restore();
            context.fillText(this.options[i], width / 2, height / 2 - 200 + i * 110);

            if(i === this.currentOption){
                context.strokeText(this.options[i], width / 2, height / 2 - 200 + i * 110);
                
            }
        }

        context.closePath()
        context.restore()

        }
        // TODO TERMINA INTERFAZ DE PAUSA


        
        
    }

    public update = () => {
        const context = GameContext.context;
        const width = context.canvas.width;
        this.catWarlock.update();
        this.bullet.update();

        if(!this.paused){
            let rand = Math.ceil(Math.random()*600) + 200;
            if(this.ticks == rand || this.ticks > 600){
                this.enemigos.push(new Enemigo());
                this.ticks = 0;
            }
            this.ticks++;

            for(let x = 0; x < this.enemigos.length; x++){
                this.enemigos[x].update();
            }

            if(this.direccion == 1){
                if(this.coordX + 10 > width - 50){
                    this.direccion = -1;
                    this.coordX += (width -this.coordX - 50);
                }
                else{
                    this.coordX += 10;
                }
            }
            if(this.direccion == -1){
                if(this.coordX - 10 < 0){
                    this.direccion = 1;
                    this.coordX -= 0;
                }
                else{
                    this.coordX -= 10;
                }
            }
        }

        
    }

    public enter = () => {
        const context = GameContext.context;
        const width = context.canvas.width;
        const height = context.canvas.height;
        this.catWarlock = new CatWarlock(0,height/2 - 25);
        this.bullet = new Bullet();
    }

    public keyUpHandler = (event: KeyboardEvent) => {
        const { key } = event;
    }
    
    public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {
        const { key } = event;
        if(event.key == "p" || event.key == "P"){
            if(this.paused){
                this.paused = false;
            }
            else{
                this.paused = true;
            }
        }

        // if(event.key =="a"){
        //     this.enemigos.push(new Enemigo());
        // }

         if(event.key === "Escape"){
            engine.setCurrentScene(new MainMenuScene());
         }

         if(this.paused){
            switch(event.key){
                case "ArrowUp":
                    this.selectionSound.play();
                    this.currentOption = (this.currentOption - 1 + this.options.length) % this.options.length;
                    break;
                case "ArrowDown":
                    this.selectionSound.play();
                    this.currentOption = (this.currentOption + 1) % this.options.length;
                    break;
                case "Enter":
                    switch(this.currentOption){
                        case 0:
                            this.paused = false;
                            break;
                        case 1:
                                engine.setCurrentScene(new PlayingScene());
                            break;
                        case 2:
                                engine.setCurrentScene(new MainMenuScene());
                        break;
                    }
                    break;
            }
         }
        
    }

    public handleMouseMoveEventEnemigo = (offsetX,offsetY) => {
        const context = GameContext.context;
       

        for(let x = 0; x < this.enemigos.length; x++){
            
            let [enemyX,enemyY] = this.enemigos[x].getEnemyCoordinates();
            let [enemyWidth,enemyHeight] = this.enemigos[x].getMeasurementsEnemy();

            if(offsetX >= enemyX && ( offsetX <= (enemyX + enemyWidth) )
            && offsetY >= enemyY && ( offsetY <= (enemyY+ enemyHeight) ) 
            ){
                context.save()
                context.beginPath()
                context.fillRect(enemyX, enemyY + enemyHeight, this.enemigos[x].getHealth(), 10);
                context.closePath();
                context.restore();
            }



        }
           
        }

    public mouseMoveHandler = (event) => {
   
    if (this.paused){ 
        if(event.offsetX >= this.positionButton1[0] && ( event.offsetX <= (this.positionButton1[0] + this.widthButton1) )
              && event.offsetY >= this.positionButton1[1] && ( event.offsetY <= (this.positionButton1[1] + this.heightButton1) ) 
        ){
                    this.currentOption = 0;
                    console.log("MOVIENDOME EN B1")

        } else if(event.offsetX >= this.positionButton2[0] && ( event.offsetX <= (this.positionButton2[0] + this.widthButton2) )
            && event.offsetY >= this.positionButton2[1] && ( event.offsetY <= (this.positionButton2[1] + this.heightButton2) ) 
            ){
                     this.currentOption = 1;
                     console.log("MOVIENDOME EN B2")

        }  else if(event.offsetX >= this.positionButton3[0] && ( event.offsetX <= (this.positionButton3[0] + this.widthButton3) )
        && event.offsetY >= this.positionButton3[1] && ( event.offsetY <= (this.positionButton3[1] + this.heightButton3) ) 
        ){
              this.currentOption = 2;
              console.log("MOVIENDOME EN B3")

        } else if(event.offsetX >= this.positionButton4[0] && ( event.offsetX <= (this.positionButton4[0] + this.widthButton4) )
      && event.offsetY >= this.positionButton4[1] && ( event.offsetY <= (this.positionButton4[1] + this.heightButton4) ) 
      ){
               this.currentOption = 3;
               console.log("MOVIENDOME EN B4")
    }  
            
    }

    }

    public  mouseUpHandler = (event: MouseEvent) => {
        this.mousePressed = false;
    }

    public mouseDownHandler = (event: MouseEvent,engine: Engine) => {


        if(this.paused){

        if(event.offsetX >= this.positionButton1[0] && ( event.offsetX <= (this.positionButton1[0] + this.widthButton1) )
            && event.offsetY >= this.positionButton1[1] && ( event.offsetY <= (this.positionButton1[1] + this.heightButton1) ) 
            ){
                this.paused = false;
        } 
        else if(event.offsetX >= this.positionButton2[0] && ( event.offsetX <= (this.positionButton2[0] + this.widthButton2) )
        && event.offsetY >= this.positionButton2[1] && ( event.offsetY <= (this.positionButton2[1] + this.heightButton2) ) 
        ){
            engine.setCurrentScene(new PlayingScene())


         } else if(event.offsetX >= this.positionButton3[0] && ( event.offsetX <= (this.positionButton3[0] + this.widthButton3) )
         && event.offsetY >= this.positionButton3[1] && ( event.offsetY <= (this.positionButton3[1] + this.heightButton3) ) 
         ){
            engine.setCurrentScene(new MainMenuScene())

          } else if(event.offsetX >= this.positionButton4[0] && ( event.offsetX <= (this.positionButton4[0] + this.widthButton4) )
          && event.offsetY >= this.positionButton4[1] && ( event.offsetY <= (this.positionButton4[1] + this.heightButton4) ) 
          ){
                // engine.setCurrentScene(new PlayingScene())

           } else{
            this.mousePressed = false;
           }



        }
    }

  




}

export default PlayingScene;
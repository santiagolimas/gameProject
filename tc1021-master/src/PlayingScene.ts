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
    private bullet = new Bullet(0,0);

    private currentOption: number = 0
    private options = ["Reanudar juego","Reiniciar juego","Menú principal","Ajustes"]
    private selectionSound = new Audio(selection);

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
        this.bullet = new Bullet(70,height/2-22);
    }

    public keyUpHandler = (event: KeyboardEvent) => {
        const { key } = event;
    }
    
    public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {
        const { key } = event;
        if(event.key == "p"){
            if(this.paused){
                this.paused = false;
            }
            else{
                this.paused = true;
            }
        }

        if(event.key =="a"){
            this.enemigos.push(new Enemigo());
        }

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

    // public handleMouseUpEventButton = () => {
    //     this.buttonPressed = false
    // }
    
    // public handleMouseDownEventButton = () => {
    //     this.buttonPressed = true
    //     console.log("Valor de pressed es : " + this.buttonPressed)     
    // }
  
    // public handleMouseMoveEventButton = (offsetX,offsetY) => {

    // if(offsetX >= this.positionButton[0] && ( offsetX <= (this.positionButton[0] + this.widthButton) )
    //   && offsetY >= this.positionButton[1] && ( offsetY <= (this.positionButton[1] + this.heightButton) ) 
    //   ){

    //     console.log("El mouse se esta moviendo dentro del boton")

    //     if(this.buttonPressed){
    //         this.buttonColor = "yellow"
    //         console.log("cambio de color")
            
    //     }

    //   }
       
    // }


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

     public mouseMoveHandler = (event: MouseEvent) => {}
    public  mouseUpHandler = (event: MouseEvent) => {}
    public mouseDownHandler = (event: MouseEvent,engine: Engine) => {}

    // public mouseDownListener = (event: MouseEvent) => {
    //     this.handleMouseDownEventButton()
    // }
    
    // public mouseMoveListener = (event: MouseEvent) => {
    //     this.handleMouseMoveEventButton(event.offsetX,event.offsetY)    
    //     this.handleMouseMoveEventEnemigo(event.offsetX,event.offsetY)    

    // }
    
    // public mouseUpListener  = (event: MouseEvent) => {
    //     this.handleMouseUpEventButton()
    // }





}

export default PlayingScene;
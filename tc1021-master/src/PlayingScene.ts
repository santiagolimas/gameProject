import Scene from "./Scene"
import Engine from "./Engine"
import MainMenuScene from "./MainMenuScene"
import GameContext from "./GameContext"
import Enemigo from "./Enemigo"

class PlayingScene extends Scene {

    private paused = false
    private direccion = 1;
    private coordX = 0;
    private enemigos = [new Enemigo()];
    private ticks = 0;

    private currentOption: number = 0
    private options = ["Reanudar juego","Reiniciar juego","Menú principal","Ajustes"]

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
        context.save();
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(this.coordX, height/2 - 25, 50,50)
        context.closePath();
        context.restore();

        for(let x = 0; x < this.enemigos.length; x++){
            this.enemigos[x].render();
        }



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
        if(!this.paused){
            let rand = Math.ceil(Math.random()*800) + 200;
            if(this.ticks == rand){
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
        
    }


}

export default PlayingScene;
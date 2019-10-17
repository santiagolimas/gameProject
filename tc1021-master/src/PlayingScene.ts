import Scene from "./Scene"
import Engine from "./Engine"
import MainMenuScene from "./MainMenuScene"
import GameContext from "./GameContext"

class PlayingScene extends Scene {

    private paused = false
    private direccion = 1;
    private coordX = 0;

    private currentOption: number = 0
    private options = ["Reanudar juego","Reiniciar juego","Menú principal","Ajustes"]

    public render = () => {

          
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        context.save();
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(this.coordX, height/2 - 25, 50,50)
        context.closePath();
        context.restore();


        if(this.paused){

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

        if(this.paused){
            this.paused = false;
        }
        else{
            this.paused = true;
        }

         if(event.key === "Escape"){
            engine.setCurrentScene(new MainMenuScene());
         }
        
    }


}

export default PlayingScene;
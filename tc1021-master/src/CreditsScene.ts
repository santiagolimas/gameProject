import Scene from "./Scene"
import GameContext from "./GameContext"
import Engine from "./Engine"
import PlayingScene from "./PlayingScene"
import MainMenuScene from "./MainMenuScene"
import creditsBackground from "./assets/BG/creditsBg.png

class CreditsScene extends Scene {

    private currentOption: number = 0
    private options = ["Menu selection click, credits to NenadSimic","Catching fire, credits to themightyglider",
                        "Cat fighter, credits to dogchicken", "Skull monster, credits to dogchiken"]
    private mousePressed = false;
    private buttons = [[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2-160]
                      ,[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2+60]]

    private background = new Image();

    public enter = () => {}
    public render = () => {
        //constantes del canvas
        const context = GameContext.context;
        const width = context.canvas.width
        const height = context.canvas.height

        this.background.src = creditsBackground;

        //background
         context.save();
         context.beginPath();
         context.drawImage(this.background,0,0,width,height)
         context.closePath();
         context.restore();

        context.save()
        context.font = "50px sans-serif"
        context.fillStyle = "black"
        context.textAlign = "center"
        context.lineWidth = 1.8;
        context.fillText("Presione \"enter\" para regresar al Menú Principal",width/2,55);
        context.restore()

        context.save();
        for(let i = 0;  i < this.options.length ; i++){
            context.fillStyle = "black";
            context.textAlign = "center";
            context.font = "40px sans-serif"
            context.strokeStyle = "grey"
            context.lineWidth = 1.8;
            context.fillText(this.options[i], width / 2, height / 2 + i * 110 - 100);
        }
        context.restore()

    }

    
    public update = (engine: Engine) => {}
    public keyUpHandler = (event: KeyboardEvent) => {}
    public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {

        const key = event.key

       if(key == "Enter"){
           engine.setCurrentScene( new MainMenuScene());
       }


    }

    public mouseMoveHandler = (event: MouseEvent) => {
    }

    public  mouseUpHandler = (event: MouseEvent) => {
        this.mousePressed = false;
    }

    public mouseDownHandler = (event: MouseEvent,engine: Engine) => {
    }




}

export default CreditsScene;
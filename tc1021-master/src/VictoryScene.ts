import Scene from "./Scene"
import GameContext from "./GameContext"
import Engine from "./Engine"
import PlayingScene from "./PlayingScene"
import MainMenuScene from "./MainMenuScene"


class VictoryScene extends Scene {

    private currentOption: number = 0
    private options = ["Reiniciar","Menú Principal"]
    private mousePressed = false;
    private buttons = [[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2-60]
                      ,[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2+150]]

    public enter = () => {}
    public render = () => {
        const context = GameContext.context;
        const width = context.canvas.width
        const height = context.canvas.height

        context.save()
        context.font = "60px sans-serif"
        context.fillStyle = "black"
        context.textAlign = "center"
        context.lineWidth = 1.8;
        context.fillText("¡HAS GANADO!   ¡FELICIDADES!",width/2,55);
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
            context.fillRect(width/2 - 200, height/2 - 60 + i * 220 - 100, 400, 100 );
            context.closePath();
            context.restore();
            context.fillText(this.options[i], width / 2, height / 2 + i * 220 - 100);

            if(i === this.currentOption){
                context.strokeText(this.options[i], width / 2, height / 2 + i * 220 - 100);
                
            }
        }

        context.closePath()
        context.restore()

    }

    
    public update = (engine: Engine) => {}
    public keyUpHandler = (event: KeyboardEvent) => {}
    public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {

        const key = event.key

        switch(key){
            case "ArrowUp":
                this.currentOption = (this.currentOption - 1 + this.options.length) % this.options.length;
                break;
            case "ArrowDown":
                this.currentOption = (this.currentOption + 1) % this.options.length;
                break;
            case "Enter":
                if(this.currentOption === 0){
            engine.setCurrentScene(new PlayingScene());
                }
                
                break;
        }


    }

    public mouseMoveHandler = (event: MouseEvent) => {
        if(event.offsetX >= this.buttons[0][0] && ( event.offsetX <= (this.buttons[0][0] + 400) )
        && event.offsetY >= this.buttons[0][1] && ( event.offsetY <= (this.buttons[0][1] + 100) ) 
        ){
            this.currentOption = 0;
         }
        else if(event.offsetX >= this.buttons[1][0] && ( event.offsetX <= (this.buttons[1][0] + 400) )
        && event.offsetY >= this.buttons[1][1] && ( event.offsetY <= (this.buttons[1][1] + 100) )){
            this.currentOption = 1;
        }
    }

    public  mouseUpHandler = (event: MouseEvent) => {
        this.mousePressed = false;
    }

    public mouseDownHandler = (event: MouseEvent,engine: Engine) => {
        if(event.offsetX >= this.buttons[0][0] && ( event.offsetX <= (this.buttons[0][0] + 400) )
        && event.offsetY >= this.buttons[0][1] && ( event.offsetY <= (this.buttons[0][1] + 100) )
        ){
            engine.setCurrentScene(new PlayingScene())
         }
        else if(event.offsetX >= this.buttons[1][0] && ( event.offsetX <= (this.buttons[1][0] + 400) )
        && event.offsetY >= this.buttons[1][1] && ( event.offsetY <= (this.buttons[1][1] + 100) )){
            engine.setCurrentScene(new MainMenuScene())
        }
        else{
             this.mousePressed = true;
         }
    }




}

export default VictoryScene;
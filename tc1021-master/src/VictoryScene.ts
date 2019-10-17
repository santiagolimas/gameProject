import Scene from "./Scene"
import GameContext from "./GameContext"
import Engine from "./Engine"
import PlayingScene from "./PlayingScene"


class VictoryScene extends Scene {

    private currentOption: number = 0
    private options = ["Reiniciar","Menú Principal"]

    public enter = () => {}
    public render = () => {
        const context = GameContext.context;
        const width = context.canvas.width
        const height = context.canvas.height

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

    
    public update = () => {}
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



}

export default VictoryScene;
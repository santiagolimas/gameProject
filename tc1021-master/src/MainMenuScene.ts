import Scene from "./Scene"
import GameContext from "./GameContext"
import Engine from "./Engine"
import PlayingScene from "./PlayingScene"
import VictoryScene from "./VictoryScene"
import GameOverScene from "./GameOverScene"
// @ts-ignore
import selection from "./assets/Menu Selection Click.wav"
import CreditsScene from "./CreditsScene"

class MainMenuScene extends Scene {

    private currentOption: number = 0
    private options = ["Comenzar juego","Créditos"]
    private selectionSound = new Audio(selection);

    private widthCanvas = GameContext.context.canvas.width;
    private heightCanvas = GameContext.context.canvas.height;
    private inButton = false;

    private widthButton1 = 400;
    private heightButton1 = 100;
    private positionButton1 = [this.widthCanvas/2 - 200, this.heightCanvas/2 - 60 - 100];
    private transition = false;

    private widthButton2 = 400;
    private heightButton2 = 100;
    private positionButton2 = [this.widthCanvas/2 - 200, this.heightCanvas/2 - 60 + 200 - 100];

    private mousePressed = false
    private playSound = false

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

    public update = (engine: Engine) => {}
    
    public keyUpHandler = (event: KeyboardEvent) => {}

    public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {

        const key = event.key

        switch(key){
            case "ArrowUp":
                this.selectionSound.play();
                this.currentOption = (this.currentOption - 1 + this.options.length) % this.options.length;
                break;
            case "ArrowDown":
                this.selectionSound.play();
                this.currentOption = (this.currentOption + 1) % this.options.length;
                break;
            case "Enter":
                if(this.currentOption === 0){
                    engine.setCurrentScene(new PlayingScene());
                }
                if(this.currentOption === 1){
                    engine.setCurrentScene(new CreditsScene());
                }
                
                break;
        }


    }

    

    public mouseMoveHandler = (event) => {
   
    if(event.offsetX >= this.positionButton1[0] && ( event.offsetX <= (this.positionButton1[0] + this.widthButton1) )
      && event.offsetY >= this.positionButton1[1] && ( event.offsetY <= (this.positionButton1[1] + this.heightButton1) ) 
      ){
            this.currentOption = 0;
            
            if(!this.playSound){
                this.selectionSound.play()
            }

            this.playSound = true;

       } else if(event.offsetX >= this.positionButton2[0] && ( event.offsetX <= (this.positionButton2[0] + this.widthButton2) )
       && event.offsetY >= this.positionButton2[1] && ( event.offsetY <= (this.positionButton2[1] + this.heightButton2) ) 
       ){
             this.currentOption = 1;

             if(!this.playSound){
                this.selectionSound.play()
            }

            this.playSound = true;

        }else{
            this.playSound = false
        }
    
      
    }

    
    public mouseUpHandler = (event) => {
        this.mousePressed = false;
    }

    public mouseDownHandler = (event,engine: Engine) => {
        if(event.offsetX >= this.positionButton1[0] && ( event.offsetX <= (this.positionButton1[0] + this.widthButton1) )
        && event.offsetY >= this.positionButton1[1] && ( event.offsetY <= (this.positionButton1[1] + this.heightButton1) ) 
        ){
              engine.setCurrentScene(new PlayingScene())
         }else if(event.offsetX >= this.positionButton2[0] && ( event.offsetX <= (this.positionButton2[0] + this.widthButton2) )
         && event.offsetY >= this.positionButton2[1] && ( event.offsetY <= (this.positionButton2[1] + this.heightButton2) )
         ){

            engine.setCurrentScene(new CreditsScene());
         }else{
             this.mousePressed = false;
         }
    }



  
    
    


}

export default MainMenuScene;
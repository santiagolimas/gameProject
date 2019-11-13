import Scene from "./Scene"
import GameContext from "./GameContext"
import Engine from "./Engine"
import PlayingScene from "./PlayingScene"
import MainMenuScene from "./MainMenuScene"
// @ts-ignore
import selection from "./assets/Menu Selection Click.wav"
// @ts-ignore
import cat from "./assets/cat2_base.png"


class VictoryScene extends Scene {

    private sprite = new Image();
    private frames= [[275,153],[340,153],[405,153]]
    private dance = 0;
    private direction = 1;
    private counter = 0;
    private currentOption: number = 0
    private options = ["Reiniciar","Menú Principal"]
    private mousePressed = false;
    private buttons = [[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2-160]
                      ,[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2+60]]
    private playSound = false
    private selectionSound = new Audio(selection);

    public enter = () => {
        this.sprite.src = cat;
    }
    public render = () => {
        const context = GameContext.context;
        const width = context.canvas.width
        const height = context.canvas.height

        context.save();
        context.beginPath();
        if(this.direction == 0)
        context.drawImage(this.sprite,this.frames[this.dance][0],this.frames[this.dance][1],25,30,width/4 - 200, height/2 - 100,200,200);
        if(this.direction == 1){
            context.translate(width/4 ,height/2 -100);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.frames[this.dance][0],this.frames[this.dance][1],25,30,0,0,200,200);
        }
        context.closePath();
        context.restore();

        context.save();
        context.beginPath();
        if(this.direction == 0){
            context.translate(width-(width/4) + 200 ,height/2 -100);
            context.scale(-1,1);
            context.drawImage(this.sprite,this.frames[this.dance][0],this.frames[this.dance][1],25,30,0,0,200,200);
        }
        if(this.direction == 1){
            context.drawImage(this.sprite,this.frames[this.dance][0],this.frames[this.dance][1],25,30,3*(width/4), height/2 - 100,200,200);
        }
        context.closePath();
        context.restore();

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

    
    public update = (engine: Engine) => {
        if(this.counter == 5){
            if(this.dance == 2){
                if(this.direction == 1)
                    this.direction = 0;
                else
                    this.direction = 1;
                this.dance = 0;
            }
            else{
                this.dance++;
            }
            this.counter = 0;
        }
        this.counter++;

    }
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

            if(!this.playSound){
                this.selectionSound.play()
            }

            this.playSound = true;

         }
        else if(event.offsetX >= this.buttons[1][0] && ( event.offsetX <= (this.buttons[1][0] + 400) )
        && event.offsetY >= this.buttons[1][1] && ( event.offsetY <= (this.buttons[1][1] + 100) )){
            this.currentOption = 1;

            if(!this.playSound){
                this.selectionSound.play()
            }

            this.playSound = true;
        }else{
            this.playSound = false
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
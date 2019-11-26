import Scene from "./Scene"
import GameContext from "./GameContext"
import Engine from "./Engine"
import PlayingScene from "./PlayingScene"
import MainMenuScene from "./MainMenuScene"
// @ts-ignore
import Skull from "./assets/mon2_sprite_base.png"
// @ts-ignore
import selection from "./assets/Menu Selection Click.wav"

import backgroundGameOverMusic from "./assets/The Dark Amulet.mp3"
import gameOverBackground from "./assets/BG/gameOver2.png"


class GameOverScene extends Scene {

    private sprite = new Image();
    private currentOption: number = 0
    private options = ["Reiniciar","Menú Principal"]
    private frames= [[343,343],[405,343]]//20,26
    private laugh1 = 0;
    private laugh2 = 1;
    private counter = 0;
    private mousePressed = false;
    private buttons = [[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2-160]
                      ,[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2+60]]
    private selectionSound = new Audio(selection);
    private playSound = false

    private backgroundSound = new Audio(backgroundGameOverMusic);
    private background = new Image()

    public enter = () => {
        this.sprite.src = Skull;
    }
    public render = () => {
        const context = GameContext.context;
        const width = context.canvas.width
        const height = context.canvas.height

        this.backgroundSound.play();

        this.background.src = gameOverBackground;
        context.save();
        context.beginPath();
        context.drawImage(this.background,0,0,width,height)
        context.closePath();
        context.restore();

        context.save();
        context.beginPath();
        context.drawImage(this.sprite,this.frames[this.laugh1][0],this.frames[this.laugh1][1],20,25,width/4 - 200, height/2 - 100,200,200);
        context.closePath();
        context.restore();

        context.save();
        context.beginPath();
        context.translate(width-(width/4) + 200 ,height/2 -100);
        context.scale(-1,1);
        context.drawImage(this.sprite,this.frames[this.laugh2][0],this.frames[this.laugh2][1],20,25,0,0,200,200);
        context.closePath();
        context.restore();

        context.save()
        context.font = "55px sans-serif"
        context.fillStyle = "black"
        context.textAlign = "center"
        context.lineWidth = 1.8;
        context.fillText("HAS PERDIDO...  ¡INTENTALO DE NUEVO!",width/2,55);
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
            if(this.laugh1 == 1){
                this.laugh1 = this.laugh2;
                this.laugh2++;
            }
            else{
                this.laugh2 = this.laugh1;
                this.laugh1++;
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
                    this.backgroundSound.pause();
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
            this.backgroundSound.pause();
            engine.setCurrentScene(new PlayingScene())
         }
        else if(event.offsetX >= this.buttons[1][0] && ( event.offsetX <= (this.buttons[1][0] + 400) )
        && event.offsetY >= this.buttons[1][1] && ( event.offsetY <= (this.buttons[1][1] + 100) )){
            this.backgroundSound.pause();
            engine.setCurrentScene(new MainMenuScene())
        }
        else{
             this.mousePressed = true;
         }
    }



}

export default GameOverScene;
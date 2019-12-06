import Scene from "./Scene"
import GameContext from "./GameContext"
import Engine from "./Engine"
import PlayingScene from "./PlayingScene"
import MainMenuScene from "./MainMenuScene"
// @ts-ignore
import creditsBackground from "./assets/BG/menuBackground.png"
// @ts-ignore
import backgroundCreditsMusic from "./assets/Caketown 1.mp3"


class CreditsScene extends Scene {

    private currentOption: number = 0
    private options = ["Sprites:",
                        "Catching fire, credits to themightyglider",
                        "Cat fighter, credits to dogchicken", 
                        "Skull monster, credits to dogchiken",
                        "Animated Snake, credits to Calciumtrice",
                        "Minotaur,, credits to Elthen",
                        "Background Images:",
                        "Forest backgrounds, credtis to Tamara Ramsay",
                        "Blood stained wall, credits to plemuzic",
                        "Backgrounds for battle, credits to Nidhoggn",
                        "Music:",
                        "Menu selection click, credits to NenadSimic",
                        "Awesomeness, credits to mrpoly",
                        "The Last Encounter (Digitalized Version), credits to Matthew Pablo",
                        "Caketown, credits to Matthew Pablo",
                        "The Dark Amulet, credits to Matthew Pablo",
                        "Awake10_megaWall, credist to cynicmusic"
                    ]
                        
    private mousePressed = false;

    private buttons = [[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2-160]
                      ,[GameContext.context.canvas.width/2 -200,GameContext.context.canvas.height/2+60]]

    private background = new Image();
    private backgroundSound = new Audio(backgroundCreditsMusic);

    public enter = () => {}
    public render = () => {

        this.backgroundSound.play();
        //constantes del canvas
        const context = GameContext.context;
        const width = context.canvas.width
        const height = context.canvas.height

        //background
        this.background.src = creditsBackground;
         context.save();
         context.beginPath();
         context.drawImage(this.background,0,0,width,height)
         context.closePath();
         context.restore();

        context.save()
        context.font = "45px sans-serif"
        context.fillStyle = "black"
        context.textAlign = "center"
        context.lineWidth = 1.8;
        context.fillText("Presione \"enter\" para regresar al Menú Principal",width/2,55);
        context.restore()

        context.save();
        for(let i = 0;  i < this.options.length ; i++){
            context.fillStyle = "black";
            context.textAlign = "center";
            context.font = "30px sans-serif"
            context.strokeStyle = "grey"
            context.lineWidth = 1.8;
            context.fillText(this.options[i], width / 2, height / 2 + i * 26 - 195);
        }
        context.restore()

    }

    
    public update = (engine: Engine) => {}
    public keyUpHandler = (event: KeyboardEvent) => {}
    public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {

        const key = event.key

       if(key == "Enter"){
        this.backgroundSound.pause();
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
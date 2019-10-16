import Scene from "./Scene"
import Engine from "./Engine"
import MainMenuScene from "./MainMenuScene"

class PlayingScene extends Scene {

    public render = () => {
    }

    public update = () => {
    }

    public enter = () => {
    }

    public keyUpHandler = (event: KeyboardEvent) => {
        const { key } = event;
    }
    
    public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {
        const { key } = event;

         if(event.key === "Escape"){
        engine.setCurrentScene(new MainMenuScene());

         }
        
    }


}

export default PlayingScene;
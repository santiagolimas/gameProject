import GameContext from "./GameContext";
import Time from "./Time";
import Scene from "./Scene"
import PlayingScene from "./PlayingScene";
import VictoryScene from "./VictoryScene";
import MainMenuScene from "./MainMenuScene";
import GameOverScene from "./GameOverScene"


class Engine {
  private currentScene: Scene = null;

  // Iniciar el motor del juego.
  // private character: Character = null;
  public setCurrentScene = (scene: Scene) => {
    this.currentScene = scene;
    this.currentScene.enter()
  }

  public start = () => {
    this.init();
    requestAnimationFrame(this.tick);
  };


  public keydownHandler = (event: KeyboardEvent) => {
    // const { key } = event;
    // this.character.keydownHandler(key);
    this.currentScene.keyDownHandler(event, this);
  };

  public keyupHandler = (event: KeyboardEvent) => {
    this.currentScene.keyUpHandler(event);
    // const { key } = event;
    // this.character.keyupHandler(key);
  };

  public mouseDownListener = (event: MouseEvent) => {
    this.currentScene.mouseDownHandler(event);
  } 

  public mouseUpListener = (event: MouseEvent) => {
    this.currentScene.mouseUpHandler(event);
  }

  public mouseMoveListener = (event: MouseEvent) => {
    // this.currentScene.mouseMoveHandler(event,this)
    this.currentScene.mouseMoveHandler(event,this);
  }







  // Limpiar pantalla y dibujar fondo.
  private clearScreen = () => {
    const context = GameContext.context;
    const canvas = context.canvas;
    const width = canvas.width;
    const height = canvas.height;

    context.save();
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.closePath();
    context.restore();
  };

  public init = () => {
    // this.character = new Character();
    this.currentScene = new MainMenuScene();
    this.currentScene.enter();
  };

  // Método que se ejecuta en cada frame del juego.
  public tick = () => {
    this.clearScreen();
    Time.update();

    // this.character.update();
    // this.character.render();
    this.currentScene.render();
    this.currentScene.update();
    requestAnimationFrame(this.tick);
  };
}

export default Engine;
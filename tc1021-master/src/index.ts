import Engine from "./Engine";
import GameContext from "./GameContext";
import PlayingScene from "./PlayingScene";
import MainMenuScene from "./MainMenuScene";

const canvas = document.getElementById("game-area") as HTMLCanvasElement;
const context = canvas.getContext("2d");

GameContext.context = context;

const engine = new Engine();
const playingscene = new PlayingScene();
const menuscene = new MainMenuScene();

engine.start();

canvas.addEventListener("keydown", engine.keydownHandler);
canvas.addEventListener("keyup", engine.keyupHandler);
canvas.addEventListener("mousedown", engine.mouseDownListener)
canvas.addEventListener("mousemove", engine.mouseMoveListener)
canvas.addEventListener("mouseup", engine.mouseUpListener)

// canvas.addEventListener("mousedown", menuscene.mouseDownListener)
// canvas.addEventListener("mousemove", menuscene.mouseMoveListener)
// canvas.addEventListener("mouseup", menuscene.mouseUpListener)
import Engine from "./Engine";
import GameContext from "./GameContext";
import PlayingScene from "./PlayingScene";

const canvas = document.getElementById("game-area") as HTMLCanvasElement;
const context = canvas.getContext("2d");

GameContext.context = context;

const engine = new Engine();
const playingscene = new PlayingScene();

engine.start();

canvas.addEventListener("keydown", engine.keydownHandler);
canvas.addEventListener("keyup", engine.keyupHandler);


canvas.addEventListener("mousedown", playingscene.mouseDownListener)
canvas.addEventListener("mousemove",playingscene.mouseMoveListener)
canvas.addEventListener("mouseup", playingscene.mouseUpListener)
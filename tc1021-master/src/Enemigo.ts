import GameContext from "./GameContext"

class Enemigo{
    private vidaTotal = 1000;
    private vidaRestante = 1000;
    private coordX = 1000;

    constructor(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        this.vidaTotal = 1000;
        this.vidaRestante = 1000;
        this.coordX = width + 50;
    }

    public update(){
        this.coordX -= .5;
    }

    public render(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        context.save();
        context.beginPath();
        context.fillRect(this.coordX, height / 2 -25, 50, 50)
        context.closePath();
        context.restore();
    }

}

export default Enemigo;
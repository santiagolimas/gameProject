import GameContext from "./GameContext"

class Enemigo{
    private vidaTotal = 1000;
    private vidaRestante = 1000;
    private coordX = 1000;
    private coordY = 0;
    private widthEnemy = 80;
    private heightEnemy = 80;

    position = [this.coordX,this.coordY];
    measurementsEnemy = [this.widthEnemy,this.heightEnemy];



    private barColor = "green"

    constructor(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        this.vidaTotal = 1000;
        this.vidaRestante = 1000;

        this.coordX = width + 50;
        this.coordY = height / 2 - 25;
        
    }

    public update(){
        this.coordX -= .5;
        this.position[0] = this.coordX;
        this.position[1] = this.coordY;

    }

    public render(){
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        context.save();
        context.beginPath();
        context.fillRect(this.coordX, this.coordY, this.widthEnemy, this.heightEnemy)
        context.closePath();
        context.restore();


        // context.save();
        // context.beginPath();
        // context.fillStyle = this.barColor;
        // context.fillRect(this.coordX, height / 2 - 45, 50, 10)
        // context.closePath();
        // context.restore();
    }

    public getEnemyCoordinates = () => {
        return this.position;
    };

    public getMeasurementsEnemy = () => {
        return this.measurementsEnemy;
    };

}

export default Enemigo;
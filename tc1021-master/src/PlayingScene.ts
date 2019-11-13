import Scene from "./Scene"
import Engine from "./Engine"
import MainMenuScene from "./MainMenuScene"
import GameContext from "./GameContext"
import Enemigo from "./Enemigo"
// @ts-ignore
import selection from "./assets/Menu Selection Click.wav"
import CatWarlock from "./CatWarlock"
import Bullet from "./Bullet"
import VictoryScene from "./VictoryScene"
// @ts-ignore
import CatWarlockSprite from "./assets/cat2_base.png"
import GameOverScene from "./GameOverScene"
import CreditsScene from "./CreditsScene"
import Minotauro from "./Minotauro"
import Snake from "./Snake"

class PlayingScene extends Scene {

    //Button characteristics
    private widthButton = 150;
    private heightButton = 80;
    private positionButton = [50,20];
    private buttonColor = "gray"
    private deadEnemies = 0;
    private constructionTimer = 0;
    private previewAsset = [[20,150]];
    private catWarlocksprite = new Image();
    private constructing = false;
    private mouseX = 0;
    private mouseY = 0;
    private enemigosFaltantes = 5;

    private buttonPressed = false
    //Enemy characteristics

    private paused = false
    private direccion = 1;
    private coordX = 0;
    //private enemigos = [new Enemigo(),new Enemigo(),new Enemigo(),new Enemigo(),new Enemigo()];
    //private enemigos = [new Minotauro(),new Minotauro(),new Minotauro(),new Minotauro(),new Minotauro()];
    private enemigos = [new Snake(),new Snake(),new Snake(),new Snake(),new Snake()];
    private statusenemigos = [false,false,false,false,false]
    private torres: CatWarlock[] = [];
    private statustorres = [];
    private ticks = 0;
    private catWarlock = new CatWarlock(0,0);

    private currentOption: number = 0
    private options = ["Reanudar juego","Reiniciar juego","Menú principal","Créditos"]
    private selectionSound = new Audio(selection);
    private playSound = false


     //todo Variables para botones de interfaz de pausa
     private widthCanvas = GameContext.context.canvas.width;
     private heightCanvas = GameContext.context.canvas.height;

     

    //  context.fillRect(width/2 - 200, height/2 - 200 + i * 110 - 55, 400, 70);
    private mousePressed = false

     private widthButton1 = 400;
     private heightButton1 = 70;
     private positionButton1 = [this.widthCanvas/2 - 200, this.heightCanvas/2 - 255];

     private widthButton2 = 400;
     private heightButton2 = 70;
     private positionButton2 = [this.widthCanvas/2 - 200, this.heightCanvas/2 + (1*110) - 255];
     
     private widthButton3 = 400;
     private heightButton3 = 70;
     private positionButton3 = [this.widthCanvas/2 - 200, this.heightCanvas/2 + (2*110) - 255];

     private widthButton4 = 400;
     private heightButton4 = 70;
     private positionButton4 = [this.widthCanvas/2 - 200, this.heightCanvas/2 + (3*110) - 255];


    public render = () => {

          
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        context.save();
        context.beginPath();
        context.fillStyle = "black";
        context.fillRect(0, height/2 - 26, width,1)
        context.fillRect(0, height/2 + 26, width,1)
        context.closePath();
        context.restore();

        context.save()
        context.font = "40px sans-serif"
        context.fillStyle = "black"
        context.textAlign = "center"
        context.lineWidth = 1.8;
        context.fillText("Enemigos faltantes: " + (this.enemigosFaltantes - this.deadEnemies),width/2 + 200,100);
        context.restore()

    
        //Button
        let [x, y] = this.positionButton;
        context.save();
        context.beginPath();
        context.fillStyle = this.buttonColor;
        context.fillRect(x, y, this.widthButton, this.heightButton);
        context.closePath();
        context.restore();
        context.save();
        context.beginPath();
        context.drawImage(this.catWarlocksprite,this.previewAsset[0][0],this.previewAsset[0][1],20,35,x + this.widthButton/2 - 20, this.heightButton/2 - 17,40,75);
        context.closePath();
        context.restore();
        context.save();
        context.beginPath();
        context.fillStyle = "black";
        context.globalAlpha = .8;
        context.fillRect(x,y,this.widthButton, this.heightButton*(this.constructionTimer/240));
        context.closePath();
        context.restore();
        if(this.mouseY >= height/2 -25 && ( this.mouseY <= height/2 + 25 ) && this.constructing){
            context.save();
            context.beginPath();
            context.globalAlpha = .5;
            if(!this.statustorres[Math.floor(this.mouseX/50)]){
            context.drawImage(this.catWarlocksprite,this.previewAsset[0][0],this.previewAsset[0][1],30,35,50*(Math.floor((this.mouseX)/50)) ,height/2-25,50,50);
            }
            context.closePath();
            context.restore();
        }



        for(let x = 0; x < this.enemigos.length; x++){
            if(this.statusenemigos[x]== true)
                this.enemigos[x].render();
        }

        for(let x = 0; x < 24; x++){
            if(this.statustorres[x]){
                this.torres[x].render();
            }
        }

       

        // TODO: EMPIEZA INTERFAZ DE PAUSA
        if(this.paused){

        context.save()
        context.beginPath()
        context.globalAlpha = .5
        context.fillStyle = "black"
        context.fillRect(0,0,width,height);
        context.closePath()
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
            context.fillRect(width/2 - 200, height/2 - 200 + i * 110 - 55, 400, 70);
            context.closePath();
            context.restore();
            context.fillText(this.options[i], width / 2, height / 2 - 200 + i * 110);

            if(i === this.currentOption){
                context.strokeText(this.options[i], width / 2, height / 2 - 200 + i * 110);
                
            }
        }

        context.closePath()
        context.restore()

        }
        // TODO TERMINA INTERFAZ DE PAUSA


        
        
    }

    public update = (engine: Engine) => {
        const context = GameContext.context;
        const width = context.canvas.width;
        if(this.deadEnemies == 5){
            engine.setCurrentScene(new VictoryScene())
        }

        if(!this.paused){
            let rand = Math.ceil(Math.random()*600) + 200;
            if(this.ticks == rand || this.ticks > 600){
                let y = -1;
                for(let x = 0; x < 5;x++){
                    if(this.statusenemigos[x] == false && y == -1){
                        y = x;
                    }
                }
                if(y != -1){
                    this.statusenemigos[y] = true;
                    this.enemigos[y] = new Snake();
                }
                this.ticks = 0;
            }
            this.ticks++;
            if(this.constructionTimer>0){
                this.constructionTimer--;
            }

            for(let x = 0; x < this.enemigos.length; x++){
                if(this.statusenemigos[x] == true){
                    this.statusenemigos[x] = this.enemigos[x].getStatus();
                    if(this.statusenemigos[x] ==true){
                        this.enemigos[x].update();
                        if(this.enemigos[x].getEnemyCoordinates()[0] <= 0){
                            engine.setCurrentScene(new GameOverScene());
                        }
                    }
                    else{
                        this.deadEnemies++;
                    }
                }
            }

            for(let x = 0; x < 24; x++){
                if(this.statustorres[x]){
                    this.torres[x].update(this.enemigos,this.statusenemigos);
                }
            }

            if(this.direccion == 1){
                if(this.coordX + 10 > width - 50){
                    this.direccion = -1;
                    this.coordX += (width -this.coordX - 50);
                }
                else{
                    this.coordX += 10;
                }
            }
            if(this.direccion == -1){
                if(this.coordX - 10 < 0){
                    this.direccion = 1;
                    this.coordX -= 0;
                }
                else{
                    this.coordX -= 10;
                }
            }
        }


           // //TODO: Colision entre enemigos y torres
        for(let i = 0; i < this.torres.length;i++){
            for(let j = 0; j < this.enemigos.length; j++){
                
                let [torreX, torreY] = this.torres[i].getCatWarlockCoordinates();
                let [torreWidth, torreHeight] = this.torres[i].getMeasurementsCatWarlock();

                let [enemyX, enemyY] = this.enemigos[j].getEnemyCoordinates();
                let [enemyWidth,enemyHeight] = this.enemigos[j].getMeasurementsEnemy();

                // TODO Torre
                //Izq
                let leftA = torreX;
                //Derecho
                let rightA = torreX + torreWidth;
                //Top
                let topA = torreY;
                //Bottom
                let bottomA = torreY + torreHeight;

                // TODO Enemy
                //Izq
                let leftB = enemyX;
                //Derecho
                let rightB = enemyX + enemyWidth;
                //Top
                let topB = enemyY;
                //Bottom
                let bottomB = enemyY + enemyHeight;


                if(leftA < rightB && rightA > leftB &&
                    topA < bottomB && bottomA > topB && this.statustorres[i] && this.statusenemigos[j]){
                      
                        console.log("collision occurred")
                        this.torres[i].collisionTorre();
                        this.enemigos[j].collisionTorre();
                        if(this.torres[i].getStatus() == false){
                            this.enemigos[j].walk(0);
                        }
                        this.statustorres[i] = this.torres[i].getStatus();
                        if(this.statustorres[i] == false){
                            for(let x = 0; x < this.enemigos.length; x++){
                                let [enemyX, enemyY] = this.enemigos[x].getEnemyCoordinates();
                                let [enemyWidth,enemyHeight] = this.enemigos[x].getMeasurementsEnemy();
                                // TODO Enemy
                                //Izq
                                let leftB = enemyX;
                                //Derecho
                                let rightB = enemyX + enemyWidth;
                                //Top
                                let topB = enemyY;
                                //Bottom
                                let bottomB = enemyY + enemyHeight;
                                if(leftA < rightB && rightA > leftB &&
                                    topA < bottomB && bottomA > topB&& this.statusenemigos[x]){
                                        this.enemigos[x].walk(x*100 + 1)
                                    }
                            }
                        }

                }
            }
        }

        
    }

    public enter = () => {
        const context = GameContext.context;
        const width = context.canvas.width;
        const height = context.canvas.height;
        this.catWarlock = new CatWarlock(0,height/2 - 25);
        this.catWarlocksprite.src = CatWarlockSprite;
        for(let x = 0; x < 24; x++){
            this.torres.push(new CatWarlock(x*50,0));
            this.statustorres.push(false);
        }
    }

    public keyUpHandler = (event: KeyboardEvent) => {
        const { key } = event;
    }
    
    public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {
        const { key } = event;
        if(event.key == "p" || event.key == "P"){
            if(this.paused){
                this.paused = false;
            }
            else{
                this.paused = true;
            }
        }
         if(this.paused){
            switch(event.key){
                case "ArrowUp":
                    this.selectionSound.play();
                    this.currentOption = (this.currentOption - 1 + this.options.length) % this.options.length;
                    break;
                case "ArrowDown":
                    this.selectionSound.play();
                    this.currentOption = (this.currentOption + 1) % this.options.length;
                    break;
                case "Enter":
                    switch(this.currentOption){
                        case 0:
                            this.paused = false;
                            break;
                        case 1:
                                engine.setCurrentScene(new PlayingScene());
                            break;
                        case 2:
                                engine.setCurrentScene(new MainMenuScene());
                        break;
                    }
                    break;
            }
         }
        
    }

    public mouseMoveHandler = (event) => {
        
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
    
    if (this.paused){ 
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

        }  else if(event.offsetX >= this.positionButton3[0] && ( event.offsetX <= (this.positionButton3[0] + this.widthButton3) )
        && event.offsetY >= this.positionButton3[1] && ( event.offsetY <= (this.positionButton3[1] + this.heightButton3) ) 
        ){
              this.currentOption = 2;

              if(!this.playSound){
                this.selectionSound.play()
            }

            this.playSound = true;

        } else if(event.offsetX >= this.positionButton4[0] && ( event.offsetX <= (this.positionButton4[0] + this.widthButton4) )
      && event.offsetY >= this.positionButton4[1] && ( event.offsetY <= (this.positionButton4[1] + this.heightButton4) ) 
      ){
               this.currentOption = 3;

               if(!this.playSound){
                this.selectionSound.play()
            }

            this.playSound = true;
    }else{
        this.playSound = false
    }  
            
    }

    }

    public  mouseUpHandler = (event: MouseEvent) => {
        
        this.mousePressed = false;
    }

    public mouseDownHandler = (event: MouseEvent,engine: Engine) => {

        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width

        if(event.offsetX >= this.positionButton[0] && ( event.offsetX <= (this.positionButton[0] + this.widthButton) )
        && event.offsetY >= this.positionButton[1] && ( event.offsetY <= (this.positionButton[1] + this.heightButton) ) && !this.constructing && this.constructionTimer == 0){
            this.constructing = true;
            this.buttonColor = "red";
        }

        else if(event.offsetX >= this.positionButton[0] && ( event.offsetX <= (this.positionButton[0] + this.widthButton) )
        && event.offsetY >= this.positionButton[1] && ( event.offsetY <= (this.positionButton[1] + this.heightButton) ) && this.constructing && this.constructionTimer == 0){
            this.constructing = false;
            this.buttonColor = "gray";
        }
        
        if(this.mouseY >= height/2 -25 && ( this.mouseY <= height/2 + 25 ) && this.constructing){
                if(!this.statustorres[Math.floor(this.mouseX/50)]){
                    this.statustorres[Math.floor(this.mouseX/50)] = true;
                    console.log(Math.floor(this.mouseX/50))
                    this.torres[Math.floor(this.mouseX/50)] = new CatWarlock(Math.floor(this.mouseX/50) * 50, height/2 - 25);
                    this.constructing = false;
                    this.constructionTimer = 240;
                    this.buttonColor = "gray";
                }
        }

        if(this.paused){

        if(event.offsetX >= this.positionButton1[0] && ( event.offsetX <= (this.positionButton1[0] + this.widthButton1) )
            && event.offsetY >= this.positionButton1[1] && ( event.offsetY <= (this.positionButton1[1] + this.heightButton1) ) 
            ){
                this.paused = false;
        } 
        else if(event.offsetX >= this.positionButton2[0] && ( event.offsetX <= (this.positionButton2[0] + this.widthButton2) )
        && event.offsetY >= this.positionButton2[1] && ( event.offsetY <= (this.positionButton2[1] + this.heightButton2) ) 
        ){
            engine.setCurrentScene(new PlayingScene())


         } else if(event.offsetX >= this.positionButton3[0] && ( event.offsetX <= (this.positionButton3[0] + this.widthButton3) )
         && event.offsetY >= this.positionButton3[1] && ( event.offsetY <= (this.positionButton3[1] + this.heightButton3) ) 
         ){
            engine.setCurrentScene(new MainMenuScene())

          } else if(event.offsetX >= this.positionButton4[0] && ( event.offsetX <= (this.positionButton4[0] + this.widthButton4) )
          && event.offsetY >= this.positionButton4[1] && ( event.offsetY <= (this.positionButton4[1] + this.heightButton4) ) 
          ){
            engine.setCurrentScene(new CreditsScene());

           } else{
            this.mousePressed = false;
           }



        }
    }

  




}

export default PlayingScene;
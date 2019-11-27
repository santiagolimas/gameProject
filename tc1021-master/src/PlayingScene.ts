import Scene from "./Scene"
import Engine from "./Engine"
import MainMenuScene from "./MainMenuScene"
import GameContext from "./GameContext"
import Zombie from "./Zombie"
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
import backgroundMenuMusic from "./assets/The Last Encounter (Digitalized Version).mp3"

// @ts-ignore
import background1 from "./assets/BG/battleback1.png"
// @ts-ignore
import background2 from "./assets/BG/battleback2.png"
// @ts-ignore
import background3 from "./assets/BG/battleback3.png"
// @ts-ignore
import background4 from "./assets/BG/battleback4.png"
// @ts-ignore
import background5 from "./assets/BG/battleback5.png"
// @ts-ignore
import background6 from "./assets/BG/battleback6.png"
// @ts-ignore
import background7 from "./assets/BG/battleback7.png"
// @ts-ignore
import background8 from "./assets/BG/battleback8.png"
// @ts-ignore
import background9 from "./assets/BG/battleback9.png"
// @ts-ignore
import background10 from "./assets/BG/battleback10.png"

class PlayingScene extends Scene {

    //Background music
    private backgroundMusic = new Audio(backgroundMenuMusic);

    //Button characteristics
    private widthButton = 150;
    private heightButton = 80;
    private positionButton = [50,20];
    private buttonColor = "gray"
    //gameplay
    private deadEnemies = 0;
    private enemigosFaltantes = 20;
    private constructionTimer = 0;
    private previewAsset = [[20,150]];
    private constructing = false;
    private mouseX = 0;
    private mouseY = 0;
    private paused = false
    private direccion = 1;
    private ticks = 0;
    //enemigos
    private enemigos = [new Zombie(),new Zombie(),new Zombie(),new Zombie(),new Zombie()];
    private statusenemigos = [false,false,false,false,false];
    private tipoenemigo =[0,0,0,0,0];
    //torres
    private torres: CatWarlock[] = [];
    private statustorres = [];
    //assets
    private selectionSound = new Audio(selection);
    private playSound = false
    private background = new Image();
    private catWarlocksprite = new Image();
     //todo Variables para botones de interfaz de pausa
     private currentOption: number = 0
     private options = ["Reanudar juego","Reiniciar juego","Menú principal","Créditos"]
     private widthCanvas = GameContext.context.canvas.width;
     private heightCanvas = GameContext.context.canvas.height;
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
        //constantes del canvas
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        //background music

        //background image
        context.save();
        context.beginPath();
        context.drawImage(this.background,0,0,width,height)
        context.closePath();
        context.restore();
        //lineas delimitadoras del path
        if(this.constructing){

            //primer path
            context.save();
            context.beginPath();
            context.fillStyle = "black";
            context.fillRect(0, height/2 - 26, width,1)
            context.fillRect(0, height/2 + 26, width,1)
            context.closePath();
            context.restore();

            //segundo path
            context.save();
            context.beginPath();
            context.fillStyle = "black";
            context.fillRect(0, height/2 + 52, width,1)
            context.fillRect(0, height/2 + 104, width,1)
            context.closePath();
            context.restore();
        }


        //texto del progreso en el nivel
        context.save()
        context.font = "55px bold sans-serif"
        context.fillStyle = "black"
        context.textAlign = "center"
        context.lineWidth = 1.8;
        context.fillText("Enemigos faltantes: " + (this.enemigosFaltantes - this.deadEnemies),width/2 + 200,100);
        context.restore()

        //Boton para crear torre
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

        //el cooldown del boton creador de gatos
        context.beginPath();
        context.fillStyle = "black";
        context.globalAlpha = .8;
        context.fillRect(x,y,this.widthButton, this.heightButton*(this.constructionTimer/240));
        context.closePath();
        context.restore();

        //si esta dentro del path 1
        if(this.mouseY >= height/2 - 25 && ( this.mouseY <= height/2 + 25 ) && this.constructing){
            context.save();
            context.beginPath();
            context.globalAlpha = .5;
            //si no hay una torre, visualiza la torre
            if(!this.statustorres[Math.floor(this.mouseX/50)]){
                context.drawImage(this.catWarlocksprite,this.previewAsset[0][0],this.previewAsset[0][1],30,35,50*(Math.floor((this.mouseX)/50)) ,height/2-25,50,50);
            }
            context.closePath();
            context.restore();
        }

        //si esta dentro del path 2
        if(this.mouseY >= height/2 + 53 && ( this.mouseY <= height/2 + 103 ) && this.constructing){
            context.save();
            context.beginPath();
            context.globalAlpha = .5;
            //si no hay una torre, visualiza la torre
            if(!this.statustorres[Math.floor(this.mouseX/50)]){
                context.drawImage(this.catWarlocksprite,this.previewAsset[0][0],this.previewAsset[0][1],30,35,50*(Math.floor((this.mouseX)/50)) ,height/2+53,50,50);
            }
            context.closePath();
            context.restore();
        }


        //dibuja a los enemigos vivos
        for(let x = 0; x < this.enemigos.length; x++){
            if(this.statusenemigos[x]== true){

          
            this.enemigos[x].render();
            
         
        }
        //dibuja las torres vivas
        for(let x = 0; x < 24; x++){
            if(this.statustorres[x]){
                this.torres[x].render();
            }
        }

        //EMPIEZA INTERFAZ DE PAUSA
        if(this.paused){
        this.backgroundMusic.pause()

        //el efecto de la pausa
        context.save()
        context.beginPath()
        context.globalAlpha = .5
        context.fillStyle = "black"
        context.fillRect(0,0,width,height);
        context.closePath()
        context.restore()
        //define como se va a ver el texto
        context.save()
        context.beginPath()
        context.textAlign = "center"
        context.fillStyle = "white"
        context.font = "40px sans-serif"
        context.strokeStyle = "grey"
        context.lineWidth = 1.8;
        //ciclo que dibuja el texto
        for(let i = 0;  i < this.options.length ; i++){
            //dibuja los botones
            context.save();
            context.fillStyle = "black";
            context.beginPath();
            context.fillRect(width/2 - 200, height/2 - 200 + i * 110 - 55, 400, 70);
            context.closePath();
            context.restore();
            //escribe el texto sobre el boton
            context.fillText(this.options[i], width / 2, height / 2 - 200 + i * 110);
            //si es la selecionada lo indica
            if(i === this.currentOption){
                context.strokeText(this.options[i], width / 2, height / 2 - 200 + i * 110);
                
            }
        }
        context.closePath()
        context.restore()
        }
        //TERMINA INTERFAZ DE PAUSA
    }

    public update = (engine: Engine) => {
        //constantes
        const context = GameContext.context;
        const width = context.canvas.width;
       
        //solo trabaja si no esta pausado el juego
        if(!this.paused){
            this.backgroundMusic.play()

            //si se cumplio el objetivo pasa a la siguiente escena
            if(this.deadEnemies == this.enemigosFaltantes){
                this.backgroundMusic.pause()
                engine.setCurrentScene(new VictoryScene())
            }

            //genera los enemigos en un intervalo aleatorio entre 200 y 800 ticks
            let rand = Math.ceil(Math.random()*600) + 200;
            //si es en el intervalo aleatorio o supero el parametro superior genera un enemigo
            if(this.ticks == rand || this.ticks > 800){
                let y = -1;
                //este ciclo checa donde puede generar un enemigo debido a que puede haber maximo 5 en pantalla
                for(let x = 0; x < 5;x++){
                    if(this.statusenemigos[x] == false && y == -1){
                        y = x;
                    }
                }
                //si hay minimo 1 enemigo disponible entra a esta condicion
                if(y != -1){
                    //indica que ahora existe un enemigo
                    this.statusenemigos[y] = true;
                    //randomiza el tipo de enemigo
                    let tipo = Math.ceil(Math.random()*3);
                    this.tipoenemigo[y] = tipo;
                    switch(tipo){
                        case 1:
                            this.enemigos[y] = new Zombie();
                            break;
                        case 2:
                            this.enemigos[y] = new Minotauro();
                            break;
                        case 3:
                            this.enemigos[y] = new Snake();
                            break;
                    }
                }

                this.ticks = 0;
            }
            this.ticks++;
            //altera el cooldown de construir una torre
            if(this.constructionTimer>0){
                this.constructionTimer--;
            }
            for(let x = 0; x < this.enemigos.length; x++){
                //primero checa si el juego cree que un enemigo esta vivo
                if(this.statusenemigos[x] == true){
                    //verifica si el enemigo cree que esta vivo
                    this.statusenemigos[x] = this.enemigos[x].getStatus();
                    //si ambos estan de acuerdo significa que el enemigo sigue vivo
                    if(this.statusenemigos[x] ==true){
                        this.enemigos[x].update();
                        //si cruzo el lado izquierdo el jugador pierde
                        if(this.enemigos[x].getEnemyCoordinates()[0] <= 0){
                            this.backgroundMusic.pause()
                            engine.setCurrentScene(new GameOverScene());
                        }
                    }
                    //si el enemigo se cree muerto es porque murio en el ultimo update
                    else{
                        this.deadEnemies++;
                    }
                }
            }
            //hace un update de todas las torres
            for(let x = 0; x < 24; x++){
                if(this.statustorres[x]){
                    this.torres[x].update(this.enemigos,this.statusenemigos);
                }
            }
           //Colision entre enemigos y torres
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
                        //indica a la torre contra que enemigo esta colisionando
                        this.torres[i].collisionTorre(this.tipoenemigo[j]);
                        //avisa al enemigo que ataque
                        this.enemigos[j].collisionTorre();
                        //si la torre murio indica al enemigo que camine
                        if(this.torres[i].getStatus() == false){
                            this.enemigos[j].walk(1);
                        }
                        //checa si el enemigo esta atacando a una torre viva
                        this.statustorres[i] = this.torres[i].getStatus();
                        //si el enemigo esta atacando una torre muerta
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
                                        //indica a los enemigos que se desfazen
                                        this.enemigos[x].walk(x*100 + 1)
                                    }
                            }
                        }

                    }
                }
            }
        }
        
    }

    public enter = () => {
        //declaracion de constantes
        const context = GameContext.context;
        const width = context.canvas.width;
        const height = context.canvas.height;
        //inicializa el sprite del boton creador
        this.catWarlocksprite.src = CatWarlockSprite;
        //inicializa los arreglos de las torres
        for(let x = 0; x < 24; x++){
            this.torres.push(new CatWarlock(x*50,0));
            this.statustorres.push(false);
        }
        //selecciona un background aleatoriamente
        let bg = Math.ceil(Math.random()*10);
        switch(bg){
            case 1:
                this.background.src = background1;
                break;
            case 2:
                this.background.src = background2;
                break;
            case 3:
                this.background.src = background3;
                break;
            case 4:
                this.background.src = background4;
                break;
            case 5:
                this.background.src = background5;
                break;
            case 6:
                this.background.src = background6;
                break;
            case 7:
                this.background.src = background7;
                break;
            case 8:
                this.background.src = background8;
                break;
            case 9:
                this.background.src = background9;
                break;
            case 10:
                this.background.src = background10;
                break;
        }
    }

    public keyUpHandler = (event: KeyboardEvent) => {
        const { key } = event;
    }
    
    public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {
        const { key } = event;
        //si se presiona la p se pausa el juego
        if(event.key == "p" || event.key == "P"){

            if(this.paused){
                this.paused = false;
            }
            else{
                this.paused = true;
            }
        }
        //si el juego esta pausado interactua con el menu de pausa
         if(this.paused){

            switch(event.key){
                //preseleciona otro boton
                case "ArrowUp":
                    this.selectionSound.play();
                    this.currentOption = (this.currentOption - 1 + this.options.length) % this.options.length;
                    break;
                case "ArrowDown":
                    this.selectionSound.play();
                    this.currentOption = (this.currentOption + 1) % this.options.length;
                    break;
                //confirma la selecion
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
        //indicaglobalmente la posicion del mouse
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
    //si esta pausado interactua con el menu de pausa
        if (this.paused){ 

        //checa si ya estabas dentro de un boton, si no hace el sonido cada que entre a un boton
        if(event.offsetX >= this.positionButton1[0] && ( event.offsetX <= (this.positionButton1[0] + this.widthButton1) )
              && event.offsetY >= this.positionButton1[1] && ( event.offsetY <= (this.positionButton1[1] + this.heightButton1) ) 
        ){
                    this.currentOption = 0;

                    if(!this.playSound){
                        this.selectionSound.play()
                    }
        
                    this.playSound = true;

        }
        else if(event.offsetX >= this.positionButton2[0] && ( event.offsetX <= (this.positionButton2[0] + this.widthButton2) )
            && event.offsetY >= this.positionButton2[1] && ( event.offsetY <= (this.positionButton2[1] + this.heightButton2) ) 
            ){
                     this.currentOption = 1;

                     if(!this.playSound){
                        this.selectionSound.play()
                    }
        
                    this.playSound = true;

        }
        else if(event.offsetX >= this.positionButton3[0] && ( event.offsetX <= (this.positionButton3[0] + this.widthButton3) )
        && event.offsetY >= this.positionButton3[1] && ( event.offsetY <= (this.positionButton3[1] + this.heightButton3) ) 
        ){
              this.currentOption = 2;

              if(!this.playSound){
                this.selectionSound.play()
            }

            this.playSound = true;

        }
        else if(event.offsetX >= this.positionButton4[0] && ( event.offsetX <= (this.positionButton4[0] + this.widthButton4) )
        && event.offsetY >= this.positionButton4[1] && ( event.offsetY <= (this.positionButton4[1] + this.heightButton4) ) 
        ){
               this.currentOption = 3;

               if(!this.playSound){
                this.selectionSound.play()
            }
            this.playSound = true;
        }
        else{
            this.playSound = false
            }
        }
    }

    public  mouseUpHandler = (event: MouseEvent) => {
        //indica si se esta presionando el mouse
        this.mousePressed = false;
    }

    public mouseDownHandler = (event: MouseEvent,engine: Engine) => {
        //valores constantes del canvas
        const context = GameContext.context;
        const height = context.canvas.height;
        const width = context.canvas.width
        //si se presiona el boton constructor y no se estaba construyendo ya
        if(event.offsetX >= this.positionButton[0] && ( event.offsetX <= (this.positionButton[0] + this.widthButton) )
        && event.offsetY >= this.positionButton[1] && ( event.offsetY <= (this.positionButton[1] + this.heightButton) ) && !this.constructing && this.constructionTimer == 0){
            //indica al juego que se va a construir e indica que el boton lo refleje
            this.constructing = true;
            this.buttonColor = "red";
        }
        //si se presiona el boton y ya se estaba construyendo
        else if(event.offsetX >= this.positionButton[0] && ( event.offsetX <= (this.positionButton[0] + this.widthButton) )
        && event.offsetY >= this.positionButton[1] && ( event.offsetY <= (this.positionButton[1] + this.heightButton) ) && this.constructing && this.constructionTimer == 0){
            //indica al juege que se va a dejar de construir e indica que el boton lo refleje
            this.constructing = false;
            this.buttonColor = "gray";
        }
        //checa si esta en el path 1
        if(this.mouseY >= height/2 -25 && ( this.mouseY <= height/2 + 25 ) && this.constructing){
                //si no habia una torre en la posicion seleccionada
                if(!this.statustorres[Math.floor(this.mouseX/50)]){
                    //construye la torre
                    this.statustorres[Math.floor(this.mouseX/50)] = true;
                    this.torres[Math.floor(this.mouseX/50)] = new CatWarlock(Math.floor(this.mouseX/50) * 50, height/2 - 25);
                    //indica al juego que deje de construir, que el boton lo indique y entre en cooldown
                    this.constructing = false;
                    this.constructionTimer = 240;
                    this.buttonColor = "gray";
                }
        }

         //checa si esta en el path 2
        if(this.mouseY >= height/2 + 53 && ( this.mouseY <= height/2 + 104 ) && this.constructing){
            //si no habia una torre en la posicion seleccionada
            if(!this.statustorres[Math.floor(this.mouseX/50)]){
                //construye la torre
                this.statustorres[Math.floor(this.mouseX/50)] = true;
                this.torres[Math.floor(this.mouseX/50)] = new CatWarlock(Math.floor(this.mouseX/50) * 50, height/2 + 53);
                //indica al juego que deje de construir, que el boton lo indique y entre en cooldown
                this.constructing = false;
                this.constructionTimer = 240;
                this.buttonColor = "gray";
            }
        }

        //Si el juego esta en pausa
        if(this.paused){
            //interactua con los botones del menu de pausa
            if(event.offsetX >= this.positionButton1[0] && ( event.offsetX <= (this.positionButton1[0] + this.widthButton1) )
            && event.offsetY >= this.positionButton1[1] && ( event.offsetY <= (this.positionButton1[1] + this.heightButton1) ) 
            ){
                this.paused = false;
            } 
            else if(event.offsetX >= this.positionButton2[0] && ( event.offsetX <= (this.positionButton2[0] + this.widthButton2) )
            && event.offsetY >= this.positionButton2[1] && ( event.offsetY <= (this.positionButton2[1] + this.heightButton2) ) 
            ){
                this.backgroundMusic.pause()
                engine.setCurrentScene(new PlayingScene())
            }
            else if(event.offsetX >= this.positionButton3[0] && ( event.offsetX <= (this.positionButton3[0] + this.widthButton3) )
            && event.offsetY >= this.positionButton3[1] && ( event.offsetY <= (this.positionButton3[1] + this.heightButton3) ) 
            ){
                this.backgroundMusic.pause()
                engine.setCurrentScene(new MainMenuScene())
            }
            else if(event.offsetX >= this.positionButton4[0] && ( event.offsetX <= (this.positionButton4[0] + this.widthButton4) )
            && event.offsetY >= this.positionButton4[1] && ( event.offsetY <= (this.positionButton4[1] + this.heightButton4) ) 
            ){
                this.backgroundMusic.pause()
                engine.setCurrentScene(new CreditsScene());
           }
           else{
            this.mousePressed = false;
           }
        }
    }
}
export default PlayingScene;
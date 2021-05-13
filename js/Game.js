import { position, holeSize } from "./gamedata.js";
import { ENEMIES, ENEMIES_ORDER, GAME_LOOP_DELAY } from "./constants.js";

class Game {

    constructor (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.assets;
        this.gameloop;

        this.alreadyHavePoint = false;
        this.points = 0;
        this.holeContent = new Array(7);
    }

    start () {
        this.render();
        this.addInteracions();
        this.startUpdate();
    }

    render () {
        this.ctx.drawImage(this.assets.img["background"], 0, 0);
        this.raffle();
        this.setPoints(this.points);
    }

    startUpdate () {
        this.gameloop = setInterval(() => this.update(), GAME_LOOP_DELAY);
    }

    update () {
        this.alreadyHavePoint = false;
        this.holeContent = new Array(7);
        this.clear();
        this.render();
    }

    stopUpdate () {
        clearInterval(this.gameloop);
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addInteracions () {
        this.canvas.addEventListener("click", event => this.clickInteract.bind(this)(event));
    }

    clickInteract (event) {
        if (this.alreadyHavePoint)
            return;
        const click = {
            x: event.clientX, 
            y: event.clientY
        };
        for (let i = 0; i < position.hole.length; i ++) {
            if (click.x >= position.hole[i].x && click.x <= position.hole[i].x + holeSize.width && 
               click.y >= position.hole[i].y && click.y <= position.hole[i].y + holeSize.height) {
                switch (this.holeContent[i]) {
                    case ENEMIES.MOLE: {
                        this.points --;
                        this.alreadyHavePoint = true;
                        this.assets.audio["incorrect"].play();
                        break;
                    };
                    case ENEMIES.LIZARD: {
                        this.points ++;
                        this.alreadyHavePoint = true;
                        this.assets.audio["correct"].play();
                        break;
                    };
                };
            }
        };
    }

    raffle () {
        const holeId = Math.floor(Math.random() * position.hole.length);
        const enemie = ENEMIES_ORDER[Math.floor(Math.random() * ENEMIES_ORDER.length)];
        this.holeContent[holeId] = enemie;
        this.ctx.drawImage(this.assets.img[enemie], position[enemie][holeId].x, position[enemie][holeId].y);
    }

    setPoints (points) {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Pontos: " + String(points), 5, 20);
    }

    setAssets (assets) {
        this.assets = assets;
    }
};

export default Game;

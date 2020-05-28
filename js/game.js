var position = {
    hole: [
        {x: 13, y: 51},
        {x: 223, y: 90},
        {x: 432, y: 20},
        {x: 62, y: 200},
        {x: 432, y: 200},
        {x: 22, y: 320},
        {x: 316, y: 308}
    ],
    mole: [],
    lizard: []
};

var currentHoleContent = new Array(7);

var holeSize = {
    width: 186,
    height: 67
};

for (let i = 0, l = position.hole.length; i < l; i++) {
    position.mole[i] = {
        x: position.hole[i].x + 49,
        y: position.hole[i].y - 43
    };

    position.lizard[i] = {
        x: position.hole[i].x + 30,
        y: position.hole[i].y - 23
    };
};

var enemies = ["mole", "lizard"],
    alreadyHavePoint = false;

var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d");

var imgs = {};
var imageLoader = (images, callback) => {

    var total = images.length,
        current = 0;

    for (let i = 0; i < total; i ++) {
        var img = new Image();
        img.src = images[i].src;
        img.addEventListener("load", () => {
            if (++current == total)
                callback();
        });

        imgs[images[i].key] = img;
    };
};
var points = 0;
var game = {};

game.loop = () => {
    alreadyHavePoint = false;
    currentHoleContent = [null, null, null, null, null, null, null];
    clearCanvas();
    game.render();
};

game.render = () => {
    ctx.drawImage(imgs.background, 0, 0);
    raffle();
    setPoints(points);
};

var clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

var setPoints = (number) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Pontos: " + String(number), 5, 20);
};

var raffle = () => {
    var hole_id = Math.floor(Math.random() * position.hole.length),
        enemie = enemies[Math.floor(Math.random() * enemies.length)];

    currentHoleContent[hole_id] = enemie;

    ctx.drawImage(imgs[enemie], position[enemie][hole_id].x, position[enemie][hole_id].y);
};

var clickInteract = (event) => {

    // Se já tiver pego o ponto do inimigo atual
    if (alreadyHavePoint)
        return;
    
    var click = {
        x: event.clientX, 
        y: event.clientY
    };
    
    for (let i = 0, l = position.hole.length; i < l; i ++) {
        if (click.x >= position.hole[i].x && click.x <= position.hole[i].x + holeSize.width && 
           click.y >= position.hole[i].y && click.y <= position.hole[i].y + holeSize.height) {

            switch (currentHoleContent[i]) {
                case "mole": {
                    points --;
                    alreadyHavePoint = true;
                    document.querySelector("#incorrect").play();
                    break;
                };

                case "lizard": {
                    points ++;
                    alreadyHavePoint = true;
                    document.querySelector("#correct").play();
                    break;
                };
            };
        }
    };
};

canvas.addEventListener("click", clickInteract);

imageLoader([
    {key: "background", src: "img/ground.png"},
    {key: "mole", src: "img/mole.png"},
    {key: "lizard", src: "img/lizard.png"}
], () => {
    game.render();
    game.update = setInterval(() => game.loop(), 1200);
});

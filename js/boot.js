import Game from "./Game.js";
import AssetsLoader from "./AssetsLoader.js";
import { ENEMIES } from "./constants.js";

async function init() {
    const assets = await AssetsLoader.load([
        {type: "image", key: "background", src: "img/ground.png"},
        {type: "image", key: ENEMIES.MOLE, src: "img/mole.png"},
        {type: "image", key: ENEMIES.LIZARD, src: "img/lizard.png"},
        {type: "audio", key: "correct", src: "sound/correct.wav"},
        {type: "audio", key: "incorrect", src: "sound/incorrect.wav"}
    ]);
    const game = new Game(document.querySelector("canvas"));
    game.setAssets(assets);
    game.start();
};

document.addEventListener("DOMContentLoaded", init);
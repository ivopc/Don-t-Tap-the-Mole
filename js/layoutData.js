import { ENEMIES } from "./constants.js";

const position = {
    hole: [
        {x: 13, y: 51},
        {x: 223, y: 90},
        {x: 432, y: 20},
        {x: 62, y: 200},
        {x: 432, y: 200},
        {x: 22, y: 320},
        {x: 316, y: 308}
    ],
    [ENEMIES.MOLE]: [],
    [ENEMIES.LIZARD]: []
};
for (let i = 0; i < position.hole.length; i ++) {
    position[ENEMIES.MOLE][i] = {
        x: position.hole[i].x + 49,
        y: position.hole[i].y - 43
    };
    position[ENEMIES.LIZARD][i] = {
        x: position.hole[i].x + 30,
        y: position.hole[i].y - 23
    };
};

const holeSize = {
    width: 186,
    height: 67
};

const pointsStyle = {
    font: "20px Arial",
    color: "white",
    position: {
        x: 5,
        y: 20
    }
};

export { position, holeSize, pointsStyle };
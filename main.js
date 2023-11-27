"use strict";

function createPlayer(name, sign) {
    let Player = (() => {
        const _name = name;
        const _sign = sign;

        const getName = () => {
            return _name;
        }
        return {
            getName,
        }
    })();
    return Player;
};

const playerA = createPlayer("Richard", "X");
const playerB = createPlayer("Geena", "O");
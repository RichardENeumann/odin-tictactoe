"use strict";

const gameBoard = (() => {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    const insertMove = (player, x, y) => {
        if (board[x][y] == null) {
            board[x][y] = player;
        } else {
            console.log("Field already set.");
        }
    }
    const checkVictory = () => {
        // Check if rows are complete
        // Row 1
        board[0][0] === board[0][1] && 
        board[0][0] === board[0][2] &&
        board[0][0] != null
        // Row 2
        board[1][0] === board[1][1] && 
        board[1][0] === board[1][2] &&
        board[1][0] != null
        // Row 3
        board[2][0] === board[2][1] && 
        board[2][0] === board[2][2] &&
        board[2][0] != null
        // Check if columns are complete
        // Column 1
        board[0][0] === board[1][0] && 
        board[0][0] === board[2][0] &&
        board[0][0] != null
        // Column 2
        board[0][1] === board[1][1] && 
        board[0][1] === board[2][1] &&
        board[0][1] != null
        // Column 3
        board[0][2] === board[1][2] && 
        board[0][2] === board[2][2] &&
        board[0][2] != null
        // Check diagonally 1
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2] &&
        board[0][0] != null
        // Check diagonally 2
        board[2][0] === board[1][1] &&
        board[2][0] === board[0][2] &&
        board[2][0] != null
    }
    return {
        board,
        insertMove,
        checkVictory,
    };
})();

function createPlayer(name, sign) {
    const Player = (() => {
        const _name = name;
        const _sign = sign;

        const getName = () => {
            return _name;
        }
        const makeMove = (x,y) => {
            if (x >= 0 && x <= 2 && y >= 0 && y <= 2) {
                gameBoard.insertMove(getName(), x, y);
            } else {
                console.log("Move error.");
            }
        }
        return {
            getName,
            makeMove,
        }
    })();
    return Player;
};

const playerA = createPlayer("Richard", "X");
const playerB = createPlayer("Geena", "O");
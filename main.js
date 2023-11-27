"use strict";

const gameMaster = (() => {
    const playerA = createPlayer("Richard", "X");
    const playerB = createPlayer("Geena", "O");

    let _turnsTotal;
    let _whoseTurn;
    
    const _nextTurn = () => {
        _whoseTurn = (_whoseTurn == playerA.getSign()) ? playerB.getSign() : playerA.getSign();
    }
    const _render = () => {
        console.clear();
        gameBoard.getBoard().forEach(row => {
            console.log(row);
        });
    }
    const newGame = () => {
        gameBoard.resetBoard();
        _turnsTotal = 9;
        _whoseTurn = playerA.getSign();
        _render();
    }
    const getTurnsTotal = () => {
        return _turnsTotal;
    }
    const activePlayer = () => {
        let aP = (_whoseTurn == playerA.getSign()) ? playerA.getName() : playerB.getName();
        return aP;
    }
    const makeMove = (x,y) => {
        if (gameBoard.enterMove(_whoseTurn, x, y)) {
            if (!gameBoard.checkVictory()) {
                _turnsTotal--;
                _nextTurn();
                _render();
            }    
        } else alert("Already taken.");
    }
    return {
        getTurnsTotal,
        newGame,
        activePlayer,
        makeMove,
    }
})();

const gameBoard = (() => {
    let _board;

    const resetBoard = () => {
        _board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    }
    const getBoard = () => {
        return _board;
    }
    const enterMove = (sign, x, y) => {
        if (_board[x][y] == null) {
            _board[x][y] = sign;
            return true;
        } else return false;
    }
    const checkVictory = () => {
        return false;
    }
    return {
        getBoard,
        resetBoard,
        enterMove,
        checkVictory,
    };
})();

function createPlayer(name, sign) {
    const Player = (() => {
        const _name = name;
        const _sign = sign;
        
        const getSign = () => {
            return _sign;
        }
        const getName = () => {
            return _name;
        }
        return {
            getSign,
            getName,
        }
    })();
    return Player;
};

function playGame() {
    gameMaster.newGame();
    while (gameMaster.getTurnsTotal() > 0) {
        let x = prompt("Hey, " + gameMaster.activePlayer() + "! Enter x:");
        let y = prompt("Hey, " + gameMaster.activePlayer() + "! Enter y:");
        if (+x >= 0 && +x <= 2 && +y >= 0 && +y <= 2) {
            gameMaster.makeMove(x,y);
        } else alert("Error!");
    }
}

playGame();


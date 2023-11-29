"use strict";

const gameMaster = (() => {
    const playerA = createPlayer("Richard", "X");
    const playerB = createPlayer("Geena", "O");

    let _turnsTotal;
    let _whoseTurn;
    let _winner = "";
    
    const _render = () => {
        let b = gameBoard.getBoard();
        console.clear();
        console.log(b[0], b[1], b[2]);
        console.log(b[3], b[4], b[5]);
        console.log(b[6], b[7], b[8]);
    }
    const _newGame = () => {
        gameBoard.resetBoard();
        _turnsTotal = 9;
        _whoseTurn = playerA;
        _render();
    }
    const _makeMove = (x) => {
        if (gameBoard.enterMove(_whoseTurn.getSign(), x)) {
            if (!gameBoard.checkVictory(x)) {
                _turnsTotal--;
                _nextTurn();
            } else {
                _winner = _whoseTurn;
            }
            _render();
        } else alert("Already taken.");
    }
    const _nextTurn = () => {
        _whoseTurn = (_whoseTurn == playerA) ? playerB : playerA;
    }
    const playGame = () => {
        _newGame();

        while (_turnsTotal > 0 && _winner == "") {
            let x = prompt("Hey, " + _whoseTurn.getName() + "! Enter field number (0-8):");
            if (+x >= 0 && +x <= 8) {
                _makeMove(x);
            } else alert("Wrong input!");
        }

        if (_winner != "") {
            console.log(_whoseTurn.getName() + ", you won!");
        } else {
            console.log("It's a tie!");
        }
    }
    return {
        playGame,
    }
})();

const gameBoard = (() => {
    let _board;

    const resetBoard = () => {
        _board = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    }
    const getBoard = () => {
        return _board;
    }
    const enterMove = (sign, x) => {
        if (_board[x] == ".") {
            _board[x] = sign;
            return true;
        } else {
            return false;
        }
    }
    const checkVictory = (x) => {
        switch (+x) {
            case 0: 
                if ((_board[0] == _board[1] && _board[0] == _board[2]) ||
                    (_board[0] == _board[3] && _board[0] == _board[6]) ||
                    (_board[0] == _board[4] && _board[0] == _board[8])) {
                        return true;
                    }
                break;
            case 1: 
                if ((_board[1] == _board[4] && _board[1] == _board[7]) ||
                    (_board[1] == _board[0] && _board[1] == _board[2])) {
                        return true;
                    }
                break;
            case 2: 
                if ((_board[2] == _board[1] && _board[2] == _board[0]) ||
                    (_board[2] == _board[5] && _board[2] == _board[8])) {
                        return true;
                    }
                break;
            case 3:
                if ((_board[3] == _board[4] && _board[3] == _board[5]) ||
                    (_board[3] == _board[0] && _board[3] == _board[6])) {
                        return true;
                    }
                break;        
            case 4:
                if ((_board[4] == _board[3] && _board[4] == _board[5]) ||
                    (_board[4] == _board[1] && _board[4] == _board[7]) ||
                    (_board[4] == _board[6] && _board[4] == _board[2]) ||
                    (_board[4] == _board[0] && _board[4] == _board[8])) {
                        return true;
                    }
                break;
            case 5:
                if ((_board[5] == _board[4] && _board[5] == _board[3]) ||
                    (_board[5] == _board[2] && _board[5] == _board[8])) {
                        return true;
                    }
                break;    
            case 6:
                if ((_board[6] == _board[7] && _board[6] == _board[8]) ||
                    (_board[6] == _board[3] && _board[6] == _board[0]) ||
                    (_board[6] == _board[4] && _board[6] == _board[2])) {
                        return true;
                    }
                break;        
            case 7:
                if ((_board[7] == _board[6] && _board[7] == _board[8]) ||
                    (_board[7] == _board[4] && _board[7] == _board[1])) {
                        return true;
                    }
                break;        
            case 8:
                if ((_board[8] == _board[7] && _board[8] == _board[6]) ||
                    (_board[8] == _board[5] && _board[8] == _board[2]) ||
                    (_board[8] == _board[4] && _board[8] == _board[0])) {
                        return true;
                    }
                break;
        }
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

gameMaster.playGame();


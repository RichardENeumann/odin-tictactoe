"use strict";

const gameMaster = (() => {
    let _turnsTotal;
    let _whoseTurn;
    let _winner;
    let _playerA;
    let _playerB;
    
    const _render = () => {
        let b = gameBoard.getBoard();
        console.clear();
        console.log(b[0], b[1], b[2]);
        console.log(b[3], b[4], b[5]);
        console.log(b[6], b[7], b[8]);
    }
    const _newGame = () => {
        _createPlayers();
        gameBoard.resetBoard();
        _turnsTotal = 9;
        _whoseTurn = _playerA;
        _winner = "";
        _render();
    }
    const _createPlayers = () => {
        _playerA = createPlayer("Richard", "X");
        _playerB = createPlayer("Geena", "O");
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
        } else {
            alert("Already taken.");
        }
    }

    const _nextTurn = () => _whoseTurn = (_whoseTurn == _playerA) ? _playerB : _playerA;

    const playGame = () => {
        _newGame();

        while (_turnsTotal > 0 && _winner == "") {
            let x = prompt("Hey, " + _whoseTurn.getName() + "! Enter number (0-8):");
            
            if (x >= 0 && x <= 8) {
                _makeMove(x); 
            } else {
                alert("Wrong input!");
            }
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

    const resetBoard = () => { _board = [".", ".", ".", ".", ".", ".", ".", ".", "."]; };

    const getBoard = () => _board;
    
    const enterMove = (sign, x) => {
        if (_board[x] == ".") {
            _board[x] = sign;
            return true;
        } else return false;
    }
    const checkVictory = (x) => {
        switch (+x) {
            case 0: 
                if ((_board[0] == _board[1] && _board[0] == _board[2]) ||
                    (_board[0] == _board[3] && _board[0] == _board[6]) ||
                    (_board[0] == _board[4] && _board[0] == _board[8])) return true;
                break;
            case 1: 
                if ((_board[1] == _board[4] && _board[1] == _board[7]) ||
                    (_board[1] == _board[0] && _board[1] == _board[2])) return true;
                break;
            case 2: 
            // diagonal check missing!!!
                if ((_board[2] == _board[1] && _board[2] == _board[0]) ||
                    (_board[2] == _board[5] && _board[2] == _board[8])) return true;
                break;
            case 3:
                if ((_board[3] == _board[4] && _board[3] == _board[5]) ||
                    (_board[3] == _board[0] && _board[3] == _board[6])) return true;
                break;        
            case 4:
                if ((_board[4] == _board[3] && _board[4] == _board[5]) ||
                    (_board[4] == _board[1] && _board[4] == _board[7]) ||
                    (_board[4] == _board[6] && _board[4] == _board[2]) ||
                    (_board[4] == _board[0] && _board[4] == _board[8])) return true;
                break;
            case 5:
                if ((_board[5] == _board[4] && _board[5] == _board[3]) ||
                    (_board[5] == _board[2] && _board[5] == _board[8])) return true;
                break;    
            case 6:
                if ((_board[6] == _board[7] && _board[6] == _board[8]) ||
                    (_board[6] == _board[3] && _board[6] == _board[0]) ||
                    (_board[6] == _board[4] && _board[6] == _board[2])) return true;
                break;        
            case 7:
                if ((_board[7] == _board[6] && _board[7] == _board[8]) ||
                    (_board[7] == _board[4] && _board[7] == _board[1])) return true;

                break;        
            case 8:
                if ((_board[8] == _board[7] && _board[8] == _board[6]) ||
                    (_board[8] == _board[5] && _board[8] == _board[2]) ||
                    (_board[8] == _board[4] && _board[8] == _board[0])) return true;
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
        
        const getSign = () => _sign;

        const getName = () => _name;

        return {
            getSign,
            getName,
        }
    })();
    return Player;
};

console.log("To start game, type:    gameMaster.playGame();");
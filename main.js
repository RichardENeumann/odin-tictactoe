"use strict";

const gameMaster = (() => {
    const playerA = createPlayer("Richard", "X");
    const playerB = createPlayer("Geena", "O");

    let _turnsTotal;
    let _whoseTurn;
    let _winner = "";
    
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
            if (!gameBoard.checkVictory(_whoseTurn, x, y)) {
                _turnsTotal--;
                _nextTurn();
                _render();
            } 
        } else alert("Already taken.");
    }
    const setWinner = (player) => {
        _winner = player;
    }
    const getWinner = () => {
        return _winner;
    }
    return {
        getTurnsTotal,
        newGame,
        activePlayer,
        makeMove,
        setWinner,
        getWinner,
    }
})();

const gameBoard = (() => {
    let _board;

    const resetBoard = () => {
        _board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
    const getBoard = () => {
        return _board;
    }
    const enterMove = (sign, x, y) => {
        if (_board[x][y] == "") {
            _board[x][y] = sign;
            return true;
        } else return false;
    }
    const checkVictory = (whoseTurn, x, y) => {
        let board = getBoard();
        switch (+x) {
            case 0:
                switch (+y) {
                    case 0:
                        if ((board[0][0] == board[0][1] && board[0][0] == board[0][2] && board[0][0] == whoseTurn) ||
                            (board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] == whoseTurn) ||
                            (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] == whoseTurn)) {
                            gameMaster.setWinner(whoseTurn);
                            return true;
                        }
                        break;
                    case 1:
                        if ((board[0][1] == board[1][1] && board[0][1] == board[2][1] && board[0][1] == whoseTurn) ||
                            (board[0][1] == board[0][0] && board[0][1] == board[0][2] && board[0][1] == whoseTurn)) {
                            gameMaster.setWinner(whoseTurn);
                            return true;
                        }    
                        break;
                    case 2:
                        if ((board[0][2] == board[0][1] && board[0][2] == board[0][0] && board[0][2] == whoseTurn) ||
                            (board[0][2] == board[1][2] && board[0][2] == board[2][2] && board[0][2] == whoseTurn) ||
                            (board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] == whoseTurn)) {
                            gameMaster.setWinner(whoseTurn);
                            return true;
                        } 
                        break; 
                    default:
                        return false;
                        break;     
                }
                break;
            case 1:
                switch (+y) {
                    case 0:
                        if ((board[1][0] == board[1][1] && board[1][0] == board[1][2] && board[1][0] == whoseTurn) ||
                            (board[1][0] == board[0][0] && board[1][0] == board[2][0] && board[1][0] == whoseTurn)) {
                            gameMaster.setWinner(whoseTurn);
                            return true;
                        }
                        break;
                    case 1:
                        if ((board[1][1] == board[0][1] && board[1][1] == board[2][1] && board[1][1] == whoseTurn) ||
                            (board[1][1] == board[1][0] && board[1][1] == board[1][2] && board[1][1] == whoseTurn) ||
                            (board[1][1] == board[0][0] && board[1][1] == board[2][2] && board[1][1] == whoseTurn) ||
                            (board[1][1] == board[0][2] && board[1][1] == board[2][0] && board[1][1] == whoseTurn)) {
                            gameMaster.setWinner(whoseTurn);
                            return true;
                        }    
                        break;
                    case 2:
                        if ((board[1][2] == board[0][2] && board[1][2] == board[2][2] && board[1][2] == whoseTurn) ||
                            (board[1][2] == board[1][1] && board[1][2] == board[1][0] && board[1][2] == whoseTurn)) {
                            gameMaster.setWinner(whoseTurn);
                            return true;
                        } 
                        break; 
                    default:
                        return false;
                        break;          
                }
                break;  
            case 2:      
                switch (+y) {
                    case 0:
                        if ((board[2][0] == board[2][1] && board[2][0] == board[2][2] && board[2][0] == whoseTurn) ||
                            (board[2][0] == board[1][0] && board[2][0] == board[0][0] && board[2][0] == whoseTurn) ||
                            (board[2][0] == board[1][1] && board[2][0] == board[0][2] && board[2][0] == whoseTurn)) {
                            gameMaster.setWinner(whoseTurn);
                            return true;
                        }
                        break;
                    case 1:
                        if ((board[2][1] == board[1][1] && board[2][1] == board[0][1] && board[2][1] == whoseTurn) ||
                            (board[2][1] == board[2][0] && board[2][1] == board[2][2] && board[2][1] == whoseTurn)) {
                            gameMaster.setWinner(whoseTurn);
                            return true;
                        }    
                        break;
                    case 2:
                        if ((board[2][2] == board[2][1] && board[2][2] == board[2][0] && board[2][2] == whoseTurn) ||
                            (board[2][2] == board[1][2] && board[2][2] == board[0][2] && board[2][2] == whoseTurn) ||
                            (board[2][2] == board[1][1] && board[2][2] == board[0][0] && board[2][2] == whoseTurn)) {
                            gameMaster.setWinner(whoseTurn);
                            return true;
                        } 
                        break;  
                    default:
                        return false;
                        break;         
                }
                break;  
            default:
                return false;
                break;      
        }
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
    while (gameMaster.getTurnsTotal() > 0 && gameMaster.getWinner() == "") {
        let x = prompt("Hey, " + gameMaster.activePlayer() + "! Enter x:");
        let y = prompt("Hey, " + gameMaster.activePlayer() + "! Enter y:");
        if (+x >= 0 && +x <= 2 && +y >= 0 && +y <= 2) {
            gameMaster.makeMove(x,y);
        } else alert("Error!");
    }
    console.log("You won!" + gameMaster.getWinner());
}

playGame();


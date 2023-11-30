"use strict";

// Player factory
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

// Game board module
const gameBoard = (() => {
    let _board;

    // Set initial state
    const resetBoard = () => { _board = ["", "", "", "", "", "", "", "", ""]; };

    const getBoard = () => _board;
    
    // Save player input in board array if the spot is not already taken
    const enterMove = (sign, x) => {
        if (_board[x] == "") {
            _board[x] = sign;
            return true;
        } else {
            return false;
        }
    }

    // Check if victory condition is given, taking input into account
    // move to gameMaster???
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
                if ((_board[2] == _board[1] && _board[2] == _board[0]) ||
                    (_board[2] == _board[4] && _board[2] == _board[6]) ||
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
        resetBoard,
        getBoard,
        enterMove,
        checkVictory,
    };
})();

// Game logic module
const gameMaster = (() => {
    // Initialize game state variables
    let _turnsTotal;
    let _whoseTurn;
    let _winner;
    let _playerA;
    let _playerB;

    // Initialize the display state
    //    
    // Grab DOM elements for rendering
    const _DOMplayerA = document.getElementById("playerA");
    const _DOMplayerB = document.getElementById("playerB");
    const _DOMbtStartGame = document.getElementById("btStartGame");
    const _DOMwinner = document.getElementsByTagName("aside")[0];
    // Grab all 9 div fields for rendering
    const _DOMboardFields = Array.from(document.getElementsByTagName("main")[0].children);
    // Add event listeners to all fields 
    _DOMboardFields.forEach((field, index) => {
        field.addEventListener("click", function() { _makeMove(index) });
    });
       
    const _render = () => {
        // Mark active player
        if (_whoseTurn === _playerA) {
            _DOMplayerA.classList.add("activePlayer");
            _DOMplayerB.classList.remove("activePlayer");
        } else {
            _DOMplayerB.classList.add("activePlayer");
            _DOMplayerA.classList.remove("activePlayer");
        }
        // Render board according to state of array
        let b = gameBoard.getBoard();
        _DOMboardFields.forEach((field, index) => {
            field.innerText = b[index];
            // Enable/disable hover effect on fields if already taken
            if (b[index] != "") {
                field.classList.add("fieldDisabled");
            } else {
                field.classList.remove("fieldDisabled");
            }
        });
    }
    
    // Take names and signs from input fields later...
    const _createPlayers = () => {
        _playerA = createPlayer("Richard", "X");
        _playerB = createPlayer("Geena", "O");
    }

    // If possible, enter input into array, then check for winning conditions
    const _makeMove = (x) => {
        if (gameBoard.enterMove(_whoseTurn.getSign(), x)) {
            if (!gameBoard.checkVictory(x)) {
                _turnsTotal--;
                _nextTurn();
            } else {
                _winner = _whoseTurn;
            }
            _render();
        }
    }

    const _nextTurn = () => _whoseTurn = (_whoseTurn == _playerA) ? _playerB : _playerA;

    const resetGameState = () => {
        _createPlayers();
        gameBoard.resetBoard();
        _turnsTotal = 9;
        _whoseTurn = _playerA;
        _winner = "";
        _render();
    }

    return {
        resetGameState,
    }
})();
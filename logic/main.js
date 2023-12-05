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

    // Threedimensional array presents possible winning combos for each field to reduce number of checks per move
    // First dimension array index corresponds to makemove(x) 
    // Third dimension arrays are ordered as to check direct neighbours first to further reduce redundant checking
    const _winningCombinations = [
        [ [0, 1, 2], [0, 3, 6], [0, 4, 8] ],
        [ [1, 0, 2], [1, 4, 7] ],
        [ [2, 1, 0], [2, 5, 8], [2, 4, 6] ],
        [ [3, 4, 5], [3, 0, 6] ],
        [ [4, 3, 5], [4, 1, 7], [4, 2, 6,], [4, 0, 8] ],
        [ [5, 2, 8], [5, 4, 3] ],
        [ [6, 7, 8], [6, 3, 0], [6, 4, 2] ],
        [ [7, 6, 8], [7, 4, 1] ],
        [ [8, 7, 6], [8, 5, 2], [8, 4, 0] ],
    ];

    // Check winning conditions surrounding entered field
    const checkVictory = (x) => {
        // Iterate through all listed possible winning combinations and return when successful
        for (let i = 0; i < _winningCombinations[x].length; i++) {
            if (_winningCombinations[x][i].every(combo => _board[combo] === _board[x])) {
                return true;
            }
        }    
        return false;
    }

    // Reset board to initial state
    const resetBoard = () => { _board = ["", "", "", "", "", "", "", "", ""]; };

    const getBoard = () => _board;
    
    // Save player input in board array if the spot is not already taken
    const enterMove = (sign, x) => {
        if (_board[x] === "") {
            _board[x] = sign;
            return true;
        } else {
            return false;
        }
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
    let _gameOver;
    let _whoseTurn;
    let _winner;
    let _playerA;
    let _playerB;

    // Initialize the display state
    //    
    // Grab DOM elements for rendering
    const _DOMplayerA = document.getElementById("playerA");
    const _DOMplayerB = document.getElementById("playerB");
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
    
    // Grab user input, verify and create player objects accordingly
    const _createPlayers = () => {
        _playerA = createPlayer("Richard", "X");
        _playerB = createPlayer("Geena", "O");
    }

    // Try entering the clicked field into the _board array and check for winning conditions
    const _makeMove = (x) => {
        if (!_gameOver && _gameOver != undefined) {
            // Is the field you want to click already occupied?
            if (gameBoard.enterMove(_whoseTurn.getSign(), x)) {
                // If that didn't complete a winning combo, keep on playing
                if (!gameBoard.checkVictory(x)) {
                    _turnsTotal--;
                    // If all 9 fields have been filled, end in a draw
                    if (_turnsTotal === 0) {
                        _gameOver = true;
                        _DOMwinner.innerText = "It's a draw!";
                        _DOMwinner.style.visibility = "visible";
                    // or continue playing
                    } else {
                        _nextTurn();
                    }
                // If it did complete a winning combo, end the game
                } else {
                    _gameOver = true;
                    _winner = _whoseTurn;
                    // Display winning player
                    _DOMwinner.innerText = _winner.getName() + " won!";
                    _DOMwinner.style.visibility = "visible";
                }
                // If you successfully clicked on an empty field, do
                _render();
            }
        } 
    }

    // Set the next player up to play
    const _nextTurn = () => _whoseTurn = (_whoseTurn === _playerA) ? _playerB : _playerA;

    // Reset for fresh game state
    const resetGameState = () => {
        _createPlayers();
        gameBoard.resetBoard();
        _turnsTotal = 9;
        _gameOver = false;
        _whoseTurn = _playerA;
        _winner = undefined;
        _DOMwinner.style.visibility = "hidden";
        _render();
    }

    return {
        resetGameState,
    }
})();
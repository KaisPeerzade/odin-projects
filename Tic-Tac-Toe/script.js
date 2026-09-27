```javascript
// =========================
// PLAYER FACTORY
// =========================

const Player = (name, mark) => {

    const getName = () => name;

    const getMark = () => mark;

    return {
        getName,
        getMark
    };
};


// =========================
// GAMEBOARD
// =========================

const Gameboard = (() => {

    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMark = (index, mark) => {

        if (board[index] === "") {
            board[index] = mark;
            return true;
        }

        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {
        getBoard,
        placeMark,
        resetBoard
    };

})();


// =========================
// GAME CONTROLLER
// =========================

const GameController = (() => {

    let player1;
    let player2;

    let currentPlayer;
    let gameOver = false;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];


    const startGame = (name1, name2) => {

        player1 = Player(name1 || "Player 1", "X");
        player2 = Player(name2 || "Player 2", "O");

        currentPlayer = player1;
        gameOver = false;

        Gameboard.resetBoard();

        DisplayController.render();
        DisplayController.updateStatus(
            currentPlayer.getName() + "'s turn (X)"
        );
    };


    const playRound = (index) => {

        if (gameOver) {
            return;
        }

        const mark = currentPlayer.getMark();

        const moveSuccessful = Gameboard.placeMark(index, mark);

        // Do nothing if square is already occupied
        if (!moveSuccessful) {
            return;
        }

        DisplayController.render();

        // Check for winner
        if (checkWinner()) {

            gameOver = true;

            DisplayController.updateStatus(
                currentPlayer.getName() + " wins!"
            );

            return;
        }

        // Check for tie
        if (checkTie()) {

            gameOver = true;

            DisplayController.updateStatus(
                "It's a tie!"
            );

            return;
        }

        // Change player
        switchPlayer();

        DisplayController.updateStatus(
            currentPlayer.getName() +
            "'s turn (" +
            currentPlayer.getMark() +
            ")"
        );
    };


    const switchPlayer = () => {

        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    };


    const checkWinner = () => {

        const board = Gameboard.getBoard();

        return winningCombinations.some(combination => {

            const [a, b, c] = combination;

            return (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]
            );
        });
    };


    const checkTie = () => {

        const board = Gameboard.getBoard();

        return board.every(position => position !== "");
    };


    const restartGame = () => {

        if (!player1 || !player2) {
            return;
        }

        Gameboard.resetBoard();

        currentPlayer = player1;
        gameOver = false;

        DisplayController.render();

        DisplayController.updateStatus(
            currentPlayer.getName() +
            "'s turn (X)"
        );
    };


    return {
        startGame,
        playRound,
        restartGame
    };

})();


// =========================
// DISPLAY CONTROLLER
// =========================

const DisplayController = (() => {

    const gameboardElement =
        document.querySelector("#gameboard");

    const statusElement =
        document.querySelector("#status");


    const render = () => {

        gameboardElement.innerHTML = "";

        const board = Gameboard.getBoard();

        board.forEach((mark, index) => {

            const cell = document.createElement("button");

            cell.classList.add("cell");

            cell.textContent = mark;

            cell.addEventListener("click", () => {

                GameController.playRound(index);

            });

            gameboardElement.appendChild(cell);
        });
    };


    const updateStatus = (message) => {

        statusElement.textContent = message;

    };


    return {
        render,
        updateStatus
    };

})();


// =========================
// BUTTONS
// =========================

const startButton =
    document.querySelector("#start-btn");

const restartButton =
    document.querySelector("#restart-btn");

const player1Input =
    document.querySelector("#player1");

const player2Input =
    document.querySelector("#player2");


startButton.addEventListener("click", () => {

    const name1 = player1Input.value.trim();
    const name2 = player2Input.value.trim();

    GameController.startGame(name1, name2);

});


restartButton.addEventListener("click", () => {

    GameController.restartGame();

});
```

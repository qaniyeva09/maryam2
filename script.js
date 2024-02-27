document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("game-board");
    const restartBtn = document.getElementById("restart-btn");
    const numRows = 8;
    const numCols = 8;
    const colors = ["red", "green", "blue", "yellow", "orange", "purple"];
    let selectedTile = null;

    // Function to generate random candy color
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Function to create a candy tile
    function createTile() {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.backgroundColor = getRandomColor();
        tile.addEventListener("click", () => selectTile(tile));
        return tile;
    }

    // Function to initialize the game board
    function initializeBoard() {
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const tile = createTile();
                tile.dataset.row = row;
                tile.dataset.col = col;
                board.appendChild(tile);
            }
        }
    }

    // Function to select a tile
    function selectTile(tile) {
        if (selectedTile === null) {
            selectedTile = tile;
            tile.style.border = "2px solid #ff0000"; // Highlight selected tile
        } else {
            const selectedRow = parseInt(selectedTile.dataset.row);
            const selectedCol = parseInt(selectedTile.dataset.col);
            const currentRow = parseInt(tile.dataset.row);
            const currentCol = parseInt(tile.dataset.col);
            
            if (Math.abs(selectedRow - currentRow) + Math.abs(selectedCol - currentCol) === 1) {
                // Swap tiles
                const tempColor = tile.style.backgroundColor;
                tile.style.backgroundColor = selectedTile.style.backgroundColor;
                selectedTile.style.backgroundColor = tempColor;

                // Check for matches
                checkMatches(selectedTile);
                checkMatches(tile);

                // Clear selection
                selectedTile.style.border = "";
                selectedTile = null;
            } else {
                // Deselect tiles
                selectedTile.style.border = "";
                selectedTile = tile;
                tile.style.border = "2px solid #ff0000"; // Highlight selected tile
            }
        }
    }

    // Function to check for matches
    function checkMatches(tile) {
        const row = parseInt(tile.dataset.row);
        const col = parseInt(tile.dataset.col);
        const color = tile.style.backgroundColor;

        const horizontalMatches = countMatches(row, col, 1, 0, color) + countMatches(row, col, -1, 0, color) + 1;
        const verticalMatches = countMatches(row, col, 0, 1, color) + countMatches(row, col, 0, -1, color) + 1;

        if (horizontalMatches >= 3) {
            removeMatches(row, col, 1, 0, color);
        }

        if (verticalMatches >= 3) {
            removeMatches(row, col, 0, 1, color);
        }
    }

    // Function to count matches in a direction
    function countMatches(row, col, dRow, dCol, color) {
        let count = 0;
        let newRow = row + dRow;
        let newCol = col + dCol;

        while (isValidTile(newRow, newCol) && board.children[newRow * numCols + newCol].style.backgroundColor === color) {
            count++;
            newRow += dRow;
            newCol += dCol;
        }

        return count;
    }

    // Function to remove matching tiles
    function removeMatches(row, col, dRow, dCol, color) {
        let newRow = row + dRow;
        let newCol = col + dCol;

        while (isValidTile(newRow, newCol) && board.children[newRow * numCols + newCol].style.backgroundColor === color) {
            board.children[newRow * numCols + newCol].style.backgroundColor = "";
            newRow += dRow;
            newCol += dCol;
        }
    }

    // Function to check if tile coordinates are valid
    function isValidTile(row, col) {
        return row >= 0 && row < numRows && col >= 0 && col < numCols;
    }

    // Function to restart the game
    function restartGame() {
        board.innerHTML = "";
        initializeBoard();
        selectedTile = null;
    }

    // Initialize the game
    function init() {
        initializeBoard();

        // Add event listener to restart button
        restartBtn.addEventListener("click", restartGame);
    }

    init();
});

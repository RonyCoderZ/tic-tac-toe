let l = ["", "", "", "", "", "", "", "", ""];
let counter = 0;
let initial = true;
let gameOver = false;
const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', restartGame);
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

const cells = document.querySelectorAll('.cell');

cells.forEach((cell, index) => {
    cell.id = index; // Ensure each cell has an ID (0 to 8)
    cell.addEventListener('click', (e) => {
        const id = e.target.id;
        squareOrCircle(id);
    });
});

function squareOrCircle(id) {
    if (gameOver || l[id] !== "") return; // prevent playing after win or re-clicking

    let i = document.getElementById(id);
    const img = document.createElement('img');
    img.style.width = '80%'; // Make it 80% of the cell's width
    img.style.height = '80%'; // Make it 80% of the cell's height
    img.style.display = 'block'; // Ensures it behaves as a block element
    img.style.margin='auto';

    if (initial) {
        initial = false;
        img.src = 'cool_cross.png';
        img.alt = 'X';
        l[id] = "X";
    } else {
        initial = true;
        img.src = 'cool_circle.png';
        img.alt = 'O';
        l[id] = "O";
    }

    i.innerHTML = '';
    i.appendChild(img);
    counter++;

    const currentPlayer = l[id];
    if (counter >= 5 && checkWin(currentPlayer)) {
        gameOver = true;

        const combo = getCombo(currentPlayer);
        for (const j of combo) {
            const ele = document.getElementById(j);
            ele.classList.add("glow-win");
        }

        const msg = document.getElementById("message");
        msg.textContent = `${currentPlayer} wins!`;
    } else if (counter === 9) {
        gameOver = true;
        const msg = document.getElementById("message");
        msg.textContent = "It's a draw!";
    }
}

function checkWin(player) {
    return winningCombos.some(combo =>
        combo.every(index => l[index] === player)
    );
}

function getCombo(player) {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (l[a] === player && l[b] === player && l[c] === player) {
            return combo;
        }
    }
    return null;
}

function restartGame() {
    l = ["", "", "", "", "", "", "", "", ""];
    counter = 0;
    initial = true;
    gameOver = false;

    const msg = document.getElementById("message");
    msg.textContent = "";

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('glow-win');
        cell.style.transform = '';
        cell.style.transition = '';
    });
}



// while (true) {
//   let p1 = prompt("Player X: Enter box number (1-9)");
//   if (l[p1 - 1] !== "") {
//     console.log("Box already taken!");
//     continue;
//   }
//   l[p1 - 1] = "X";
//   c++;
//   if (c >= 5 && checkWin("X")) {
//     console.log("Player 1 Wins with X!");
//     break;
//   }

//   if (c === 9) {
//     console.log("Draw!");
//     break;
//   }

//   let p2 = prompt("Player O: Enter box number (1-9)");
//   if (l[p2 - 1] !== "") {
//     console.log("Box already taken!");
//     continue;
//   }
//   l[p2 - 1] = "O";
//   c++;
//   if (c >= 6 && checkWin("O")) {
//     console.log("Player 2 Wins with O!");
//     break;
//   }
// }
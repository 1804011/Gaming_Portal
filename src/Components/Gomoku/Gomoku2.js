import Heap from "../../DataStructures/Heap";

function fiveInRow() {
    const size = arguments.length;
    if (size < 5) return 0;
    let mul = 1;
    for (let i = 0; i < 5; i++) {
        mul *= arguments[i];
    }
    if (mul === 243) return 1;
    else if (mul === 32) return -1;
    for (let i = 5; i < size; i++) {
        mul *= arguments[i];
        mul /= arguments[i - 5];
        if (mul === 243) return 1;
        else if (mul === 32) return -1;
    }
    return 0;

}
function fourInRow5() {
    const size = arguments.length;
    if (size < 5) return 0;
    let count = 0, mul = 1;
    for (let i = 0; i < 5; i++) {
        mul *= arguments[i];
    }
    if (mul === 81) count++;
    else if (mul === 16) count--;
    for (let i = 5; i < size; i++) {
        mul *= arguments[i];
        mul /= arguments[i - 5];
        if (mul === 81) count++;
        else if (mul === 16) count--;
    }

    return count;
}
function threeInRow() {
    const size = arguments.length;
    if (size < 5) return 0;
    let count = 0, mul = 1;
    for (let i = 0; i < 5; i++) {
        mul *= arguments[i];
    }
    if (mul === 27 && arguments[0] === 1 && arguments[4] === 1)
        count++;
    else if (mul === 8 && arguments[0] === 1 && arguments[4] === 1)
        count--;
    for (let i = 5; i < size; i++) {
        mul *= arguments[i];
        mul /= arguments[i - 5];
        if (mul === 27 && arguments[i - 4] === 1 && arguments[i] === 1)
            count++;
        else if (mul === 8 && arguments[i - 4] === 1 && arguments[i] === 1)
            count--;
    }
    return count;
}
function twoInRow() {
    const size = arguments.length;
    if (size < 5) return 0;
    let count = 0, mul = 1;
    for (let i = 0; i < 5; i++) {
        mul *= arguments[i];
    }
    if (mul === 9 && arguments[0] === 1 && arguments[4] === 1 && arguments[3] === 1)
        count++;
    else if (mul === 9 && arguments[0] === 1 && arguments[1] === 1 && arguments[4] === 1)
        count++;
    else if (mul === 4 && arguments[0] === 1 && arguments[4] === 1 && arguments[3] === 1)
        count--;
    else if (mul === 4 && arguments[0] === 1 && arguments[1] === 1 && arguments[4] === 1)
        count--;
    for (let i = 5; i < size; i++) {
        mul *= arguments[i];
        mul /= arguments[i - 5];
        if (mul === 9 && arguments[i - 4] === 1 && arguments[i] === 1 && arguments[i - 1] === 1)
            count++;
        else if (mul === 9 && arguments[i - 4] === 1 && arguments[i - 3] === 1 && arguments[i] === 1)
            count++;
        else if (mul === 4 && arguments[i - 4] === 1 && arguments[i] === 1 && arguments[i - 1] === 1)
            count--;
        else if (mul === 4 && arguments[i - 4] === 1 && arguments[i - 3] === 1 && arguments[i] === 1)
            count--;

    }
    return count;

}
function nonFourInRow() {
    const size = arguments.length;
    if (size < 6) return 0;
    let count = 0, mul = 1;
    for (let i = 0; i < 6; i++) {
        mul *= arguments[i];
    }
    if (mul === 81 && arguments[0] === 1 && arguments[5] === 1)
        count++;
    else if (mul === 16 && arguments[0] === 1 && arguments[5] === 1)
        count--;
    for (let i = 6; i < size; i++) {
        mul *= arguments[i]; mul /= arguments[i - 6];
        if (mul === 81 && arguments[i - 5] === 1 && arguments[i] === 1)
            count++;
        else if (mul === 16 && arguments[i - 5] === 1 && arguments[i] === 1)
            count--;
    }
    return count;

}
function fourInRow6() {
    const size = arguments.length;
    if (size < 6) return 0;
    let count = 0, mul = 1;
    for (let i = 0; i < 6; i++) {
        mul *= arguments[i];
    }
    if (mul === 162 && (arguments[0] * arguments[5] === 2))
        count++;
    else if (mul === 48 && (arguments[0] * arguments[5] === 3))
        count--;
    for (let i = 6; i < size; i++) {
        mul *= arguments[i]; mul /= arguments[i - 6];
        if (mul === 162 && (arguments[i - 5] * arguments[i] === 2))
            count++;
        else if (mul === 48 && (arguments[i - 5] * arguments[i] === 3))
            count--;
    }
    return count;

}
function brokenThree() {
    const size = arguments.length;
    if (size < 6) return 0;
    let count = 0, mul = 1;
    for (let i = 0; i < 6; i++) {
        mul *= arguments[i];
    }
    if (mul === 27 && (arguments[0] === 1 && arguments[5] === 1) && (arguments[2] === 1 || arguments[3] === 1))
        count++;
    else if (mul === 8 && (arguments[0] === 1 && arguments[5] === 1) && (arguments[2] === 1 || arguments[3] === 1))
        count--;
    for (let i = 6; i < size; i++) {
        mul *= arguments[i]; mul /= arguments[i - 6];
        if (mul === 27 && (arguments[i - 5] === 1 && arguments[i] === 1) && (arguments[i - 2] === 1 || arguments[i - 3] === 1))
            count++;
        else if (mul === 8 && (arguments[i - 5] === 1 && arguments[i] === 1) && (arguments[i - 2] === 1 || arguments[i - 3] === 1))
            count--;
    }
    return count;


}
function totalUtilies() {
    let total = fiveInRow(...arguments);
    if (total !== 0) return total * 100000000;
    total += nonFourInRow(...arguments) * 20000000;
    total += fourInRow5(...arguments) * 1000000;
    total += fourInRow6(...arguments) * 1000000;
    total += threeInRow(...arguments) * 20000;
    total += brokenThree(...arguments) * 1000;
    total += twoInRow(...arguments) * 20;
    return total;



}
function valid(i, j) {
    return (i >= 0 && j >= 0 && i < 15 && j < 15);
}







class Gomoku2 {
    constructor(position = "") {
        this.boardState = [];
        this.count = 0;
        this.row = [];
        this.col = [];
        this.diagonal1 = {};
        this.diagonal2 = {};
        this.parent1 = [];
        this.parent2 = [];
        this.utility = 0;
        this.special = [];
        for (let i = 0; i < 15; i++) {
            let arr = [];
            for (let j = 0; j < 15; j++) {
                const idx = 15 * i + j;
                const char = parseInt(position[idx]);
                const val = isNaN(char) ? 1 : char;
                arr.push(val);
                this.count += (val === 1);
                if (i === 0 || j === 0) {
                    this.parent1.push(15 * i + j)
                }
                else {
                    this.parent1.push(this.parent1[15 * (i - 1) + j - 1])
                }
                if (i === 0 || j === 14) {
                    this.parent2.push(idx);
                }
                else {
                    this.parent2.push(this.parent2[15 * (i - 1) + j + 1]);
                }

            }
            this.boardState.push(arr);
        }
        //all rows & column utility
        for (let i = 0; i < 15; i++) {
            let arr1 = []; let arr2 = [];
            for (let j = 0; j < 15; j++) {
                arr1.push(this.boardState[i][j]);
                arr2.push(this.boardState[j][i]);
            }
            this.row.push(totalUtilies(...arr1));
            this.col.push(totalUtilies(...arr2));
            //diagonal_1 utility
            let arr3 = [], arr4 = [], arr5 = [], arr6 = [];
            for (let j = 0; j < 15 - i; j++) {
                arr3.push(this.boardState[i + j][j]);
                arr4.push(this.boardState[j][i + j]);
                arr6.push(this.boardState[i + j][14 - j])
            }
            this.diagonal1[i] = totalUtilies(...arr4);
            this.diagonal1[15 * i] = totalUtilies(...arr3);
            this.diagonal2[i * 15 + 14] = totalUtilies(...arr6);
            for (let j = 0; j < i + 1; j++) {
                arr5.push(this.boardState[j][i - j])
            }
            this.diagonal2[i] = totalUtilies(...arr5);
        }
        //calculate utility by summing up;
        const inf = 100000000;
        this.row.forEach(e => {
            if (e === inf) { this.utility = inf; return; }
            else if (e === -inf) { this.utility = -inf; return; }
            else this.utility += e
        })
        this.col.forEach(e => {
            if (e === inf) { this.utility = inf; return; }
            else if (e === -inf) { this.utility = -inf; return; }
            else this.utility += e
        })

        for (const e in this.diagonal1) {
            if (this.diagonal1[e] === inf) { this.utility = inf; return; }
            else if (this.diagonal1[e] === -inf) { this.utility = -inf; return; }
            else this.utility += this.diagonal1[e]
        }
        for (const e in this.diagonal2) {
            if (this.diagonal2[e] === inf) { this.utility = inf; return; }
            else if (this.diagonal2[e] === -inf) { this.utility = -inf; return; }
            else this.utility += this.diagonal2[e]
        }

        this.utility += this.turn();





    }

    turn() { return 1 - (this.count % 2) }
    isDraw() { return this.count === 0 }
    toBoardString() {
        return this.boardState.toString().split(',').join('');
    }
    valid(r, c) { return (r >= 0 && c >= 0 && r < 15 && c < 15) }
    isWin() {
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let mul1 = 1, mul2 = 1, mul3 = 1, mul4 = 1;
                let arr1 = [], arr2 = [], arr3 = [], arr4 = [];
                for (let k = 0; k < 5; k++) {
                    if (this.valid(i, j + k)) {
                        mul1 *= this.boardState[i][j + k];
                        arr1.push(15 * i + j + k)
                    }
                    if (this.valid(i + k, j)) {
                        mul2 *= this.boardState[i + k][j];
                        arr2.push(15 * (i + k) + j)
                    }
                    if (this.valid(i + k, j + k)) {
                        mul3 *= this.boardState[i + k][j + k];
                        arr3.push(15 * (i + k) + j + k)
                    }
                    if (this.valid(i + k, j - k)) {
                        mul4 *= this.boardState[i + k][j - k];
                        arr4.push(15 * (i + k) + j - k)

                    }
                }

                if (mul1 === 243) {
                    this.special = [...arr1];
                    return 1;
                }
                if (mul2 === 243) {
                    this.special = [...arr2];
                    return 1;
                }
                if (mul3 === 243) {
                    this.special = [...arr3];
                    return 1;
                }
                if (mul4 === 243) {
                    this.special = [...arr4];
                    return 1;
                }
                if (mul1 === 32) {
                    this.special = [...arr1];
                    return 2;
                }
                if (mul2 === 32) {
                    this.special = [...arr2];
                    return 2;
                }
                if (mul3 === 32) {
                    this.special = [...arr3];
                    return 2;
                }
                if (mul4 === 32) {
                    this.special = [...arr4];
                    return 2;
                }
            }
        }
        return 0;
    }
    move(i, j) {
        if (this.boardState[i][j] !== 1) return null;
        this.boardState[i][j] = (this.turn() === 0 ? 3 : 2);
        this.count--;
        return this.toBoardString();
    }
    getMove(i, j) {
        if (this.boardState[i][j] !== 1) return null;
        const char = (this.turn() === 0 ? 3 : 2);
        const idx = 15 * i + j;
        const str = this.toBoardString();
        return str.substring(0, idx) + char + str.substring(idx + 1);
    }
    getUtlity(i, j) {
        if (this.boardState[i][j] !== 1) return null;
        const idx = 15 * i + j;
        let newUtility = this.utility;
        newUtility -= this.row[i]; newUtility -= this.col[j];
        newUtility -= this.diagonal1[this.parent1[idx]];
        newUtility -= this.diagonal2[this.parent2[idx]];
        let arr1 = [], arr2 = [], arr3 = [], arr4 = [];
        for (let k = 0; k < 15; k++) {
            if (k === j)
                arr1.push(this.turn() === 0 ? 3 : 2);
            else arr1.push(this.boardState[i][k]);
            if (k === i) arr2.push(this.turn() === 0 ? 3 : 2);
            else arr2.push(this.boardState[k][j]);
        }
        const x1 = parseInt(this.parent1[idx] / 15);
        const y1 = parseInt(this.parent1[idx] % 15);
        const x2 = parseInt(this.parent2[idx] / 15);
        const y2 = parseInt(this.parent2[idx] % 15);
        for (let k = 0; k < 15 - x1 - y1; k++) {
            if (x1 + k === i && y1 + k === j)
                arr3.push(this.turn() === 0 ? 3 : 2)
            else arr3.push(this.boardState[x1 + k][y1 + k])
        }
        let size = 0;
        if (x2 === 0) size = y2 + 1;
        else size = 15 - x2;
        for (let k = 0; k < size; k++) {
            if (x2 + k === i && y2 - k === j)
                arr4.push(this.turn() === 0 ? 3 : 2)
            else arr4.push(this.boardState[x2 + k][y2 - k])
        }
        const inf = 100000000;
        const a1 = totalUtilies(...arr1);
        const a2 = totalUtilies(...arr2);
        const a3 = totalUtilies(...arr3);
        const a4 = totalUtilies(...arr4);
        if (a1 === inf || a2 === inf || a3 === inf || a4 === inf) {
            return inf;
        }
        if (a1 === -inf || a2 === -inf || a3 === -inf || a4 === -inf) {
            return -inf;
        }

        newUtility += a1 + a2 + a3 + a4;

        return newUtility + (this.turn() === 0 ? 1 : -1);
    }
}
function minimax(board, depth, isMaximise, alpha = -100000000, beta = 100000000) {
    const gomoku = new Gomoku2(board);
    if (gomoku.isWin() || gomoku.isDraw() || depth === 0) return gomoku.utility;
    if (isMaximise) {
        const queue = new Heap();
        let size = 0;
        let mx = -100000000;
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (gomoku.boardState[i][j] === 1) {
                    queue.push({ i, j, utility: gomoku.getUtlity(i, j) })
                }
            }
        }
        while (queue.length > 0) {
            const { i, j } = queue.pop();
            const way = minimax(gomoku.getMove(i, j), depth - 1, 1 - isMaximise, alpha, beta);
            mx = Math.max(way, mx);
            alpha = Math.max(alpha, mx);
            if (beta <= alpha)
                break;
            size++;


        }
        return mx;
    }
    else {
        let mn = 100000000; let size = 0;
        const queue = new Heap((a, b) => b.utility - a.utility);
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (gomoku.boardState[i][j] === 1) {
                    queue.push({ i, j, utility: gomoku.getUtlity(i, j) })
                }
            }
        }
        while (queue.length > 0) {
            const { i, j } = queue.pop();
            const way = minimax(gomoku.getMove(i, j), depth - 1, 1 - isMaximise, alpha, beta)
            mn = Math.min(mn, way);
            beta = Math.min(beta, mn);
            if (beta <= alpha) break;


        }
        return mn;

    }

}
export function bestMoves(board, depth, isMaximise) {
    const gomoku = new Gomoku2(board);
    if (isMaximise) {

        const queue = new Heap();
        let mx = -100000000;
        let best = [];
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (gomoku.boardState[i][j] === 1) {
                    queue.push({ i, j, utility: gomoku.getUtlity(i, j) })
                }
            }
        }
        while (queue.length > 0) {
            const { i, j } = queue.pop();
            const way = minimax(gomoku.getMove(i, j), depth - 1, 1 - isMaximise)
            if (way > mx) {
                mx = way;
                best = [];
                best.push({ i, j });
            }
            else if (way === mx)
                best.push({ i, j })
        }
        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }
    else {

    }
}
export default Gomoku2;
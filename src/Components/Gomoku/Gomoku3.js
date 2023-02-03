const { result } = require("lodash");

class Gomoku3 {
    constructor(position = "") {
        this.boardState = [];
        this.fiveInRow = 0;
        this.fourInRow1 = [];
        this.fourInRow2 = [];
        this.threeInRow = 0;
        this.brokenThree = 0;
        this.twoInRow = 0;
        this.count = 0;
        this.utility = 0;
        this.twoMarks = [];
        this.singleMarks = [];
        this.refutableThreat = [];
        for (let i = 0; i < 15; i++) {
            let arr = [];
            for (let j = 0; j < 15; j++) {
                let char = parseInt(position[15 * i + j]);
                if (isNaN(char)) char = 1;

                arr.push(char);
                this.count += (char === 1);
            }
            this.boardState.push(arr);
        }
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (this.valid(i, j + 4)) {
                    let arr = [], mul = 1, idx = null;
                    for (let k = 0; k < 5; k++) {
                        arr.push(this.boardState[i][j + k]);
                        mul *= this.boardState[i][j + k];
                        if (this.boardState[i][j + k] === 1)
                            idx = k;

                    }
                    if (mul === 243) { this.fiveInRow = 1; this.utility = 1000; return }
                    else if (mul === 32) { this.fiveInRow = 2; this.utility = -1000; return }
                    else if (mul === 81) { this.fourInRow1.push({ i, j: j + idx }) }
                    else if (mul === 16) { this.fourInRow2.push({ i, j: j + idx }) }
                    else if (arr[0] === 1 && arr[4] === 1) {
                        this.threeInRow += (mul === 27);
                        this.threeInRow -= (mul === 8);
                        this.twoInRow += (mul === 9 && arr[2] === 3)
                        this.twoInRow -= (mul === 4 && arr[2] === 2)
                    }
                    else if (arr[0] === 1) {
                        this.twoInRow += (mul === 27 && arr[3] === 1);
                        this.twoInRow -= (mul === 8 && arr[3] === 1);
                    }
                    else if (arr[4] === 1) {
                        this.twoInRow += (mul === 27 && arr[1] === 1);
                        this.twoInRow -= (mul === 8 && arr[1] === 1);

                    }
                    if ((mul === 9 || mul === 4) && arr[2] === 1) {
                        if (arr[1] === 1)
                            this.twoMarks.push({ i, j: j + 1 })
                        if (arr[3] === 1)
                            this.twoMarks.push({ i, j: j + 3 })

                    }
                    else if ((mul === 3 || mul === 2) && arr[2] === mul) {
                        this.singleMarks.push({ i, j: j + 1 })
                        this.singleMarks.push({ i, j: j + 3 })
                    }
                    else if (mul === 27 || mul === 8) {
                        for (let p = 0; p < 5; p++) {
                            if (arr[p] === 1)
                                this.refutableThreat.push({ i, j: j + p })
                        }
                    }
                }
                if (this.valid(i + 4, j)) {
                    let arr = [], mul = 1, idx = null;
                    for (let k = 0; k < 5; k++) {
                        arr.push(this.boardState[i + k][j]);
                        mul *= this.boardState[i + k][j];
                        if (this.boardState[i + k][j] === 1)
                            idx = k;

                    }
                    if (mul === 243) { this.fiveInRow = 1; this.utility = 1000; return }
                    else if (mul === 32) { this.fiveInRow = 2; this.utility = -1000; return }
                    else if (mul === 81) { this.fourInRow1.push({ i: i + idx, j }) }
                    else if (mul === 16) { this.fourInRow2.push({ i: i + idx, j }) }
                    else if (arr[0] === 1 && arr[4] === 1) {
                        this.threeInRow += (mul === 27);
                        this.threeInRow -= (mul === 8);
                        this.twoInRow += (mul === 9 && arr[2] === 3)
                        this.twoInRow -= (mul === 4 && arr[2] === 2)
                    }
                    else if (arr[0] === 1) {
                        this.twoInRow += (mul === 27 && arr[3] === 1);
                        this.twoInRow -= (mul === 8 && arr[3] === 1);
                    }
                    else if (arr[4] === 1) {
                        this.twoInRow += (mul === 27 && arr[1] === 1);
                        this.twoInRow -= (mul === 8 && arr[1] === 1);

                    }
                    if ((mul === 9 || mul === 4) && arr[2] === 1) {
                        if (arr[1] === 1)
                            this.twoMarks.push({ i: i + 1, j })
                        if (arr[3] === 1)
                            this.twoMarks.push({ i: i + 3, j })

                    }
                    else if ((mul === 3 || mul === 2) && arr[2] === mul) {
                        this.singleMarks.push({ i: i + 1, j })
                        this.singleMarks.push({ i: i + 3, j })
                    }
                    else if (mul === 27 || mul === 8) {
                        for (let p = 0; p < 5; p++) {
                            if (arr[p] === 1)
                                this.refutableThreat.push({ i: i + p, j })
                        }
                    }
                }
                if (this.valid(i + 4, j - 4)) {
                    let arr = [], mul = 1, idx = null;
                    for (let k = 0; k < 5; k++) {
                        arr.push(this.boardState[i + k][j - k]);
                        mul *= this.boardState[i + k][j - k];
                        if (this.boardState[i + k][j - k] === 1)
                            idx = k;

                    }
                    if (mul === 243) { this.fiveInRow = 1; this.utility = 1000; return }
                    else if (mul === 32) { this.fiveInRow = 2; this.utility = -1000; return }
                    else if (mul === 81) { this.fourInRow1.push({ i: i + idx, j: j - idx }) }
                    else if (mul === 16) { this.fourInRow2.push({ i: i + idx, j: j - idx }) }
                    else if (arr[0] === 1 && arr[4] === 1) {
                        this.threeInRow += (mul === 27);
                        this.threeInRow -= (mul === 8);
                        this.twoInRow += (mul === 9 && arr[2] === 3)
                        this.twoInRow -= (mul === 4 && arr[2] === 2)
                    }
                    else if (arr[0] === 1) {
                        this.twoInRow += (mul === 27 && arr[3] === 1);
                        this.twoInRow -= (mul === 8 && arr[3] === 1);
                    }
                    else if (arr[4] === 1) {
                        this.twoInRow += (mul === 27 && arr[1] === 1);
                        this.twoInRow -= (mul === 8 && arr[1] === 1);

                    }
                    if ((mul === 9 || mul === 4) && arr[2] === 1) {
                        if (arr[1] === 1)
                            this.twoMarks.push({ i: i + 1, j: j - 1 })
                        if (arr[3] === 1)
                            this.twoMarks.push({ i: i + 3, j: j - 3 })

                    }
                    else if ((mul === 3 || mul === 2) && arr[2] === mul) {
                        this.singleMarks.push({ i: i + 1, j: j - 1 })
                        this.singleMarks.push({ i: i + 3, j: j - 3 })
                    }
                    else if (mul === 27 || mul === 8) {
                        for (let p = 0; p < 5; p++) {
                            if (arr[p] === 1)
                                this.refutableThreat.push({ i: i + p, j: j - p })
                        }
                    }
                }
                if (this.valid(i + 4, j + 4)) {
                    let arr = [], mul = 1, idx = null;
                    for (let k = 0; k < 5; k++) {
                        arr.push(this.boardState[i + k][j + k]);
                        mul *= this.boardState[i + k][j + k];
                        if (this.boardState[i + k][j + k] === 1)
                            idx = k;

                    }
                    if (mul === 243) { this.fiveInRow = 1; this.utility = 1000; return }
                    else if (mul === 32) { this.fiveInRow = 2; this.utility = -1000; return }
                    else if (mul === 81) { this.fourInRow1.push({ i: i + idx, j: j + idx }) }
                    else if (mul === 16) { this.fourInRow2.push({ i: i + idx, j: j + idx }) }
                    else if (arr[0] === 1 && arr[4] === 1) {
                        this.threeInRow += (mul === 27);
                        this.threeInRow -= (mul === 8);
                        this.twoInRow += (mul === 9 && arr[2] === 3)
                        this.twoInRow -= (mul === 4 && arr[2] === 2)
                    }
                    else if (arr[0] === 1) {
                        this.twoInRow += (mul === 27 && arr[3] === 1);
                        this.twoInRow -= (mul === 8 && arr[3] === 1);
                    }
                    else if (arr[4] === 1) {
                        this.twoInRow += (mul === 27 && arr[1] === 1);
                        this.twoInRow -= (mul === 8 && arr[1] === 1);

                    }
                    if ((mul === 9 || mul === 4) && arr[2] === 1) {
                        if (arr[1] === 1)
                            this.twoMarks.push({ i: i + 1, j: j + 1 })
                        if (arr[3] === 1)
                            this.twoMarks.push({ i: i + 3, j: j + 3 })

                    }
                    else if ((mul === 3 || mul === 2) && arr[2] === mul) {
                        this.singleMarks.push({ i: i + 1, j: j + 1 })
                        this.singleMarks.push({ i: i + 1, j: j + 3 })
                    }
                    else if (mul === 27 || mul === 8) {
                        for (let p = 0; p < 5; p++) {
                            if (arr[p] === 1)
                                this.refutableThreat.push({ i: i + p, j: j + p })
                        }
                    }
                }
            }

        }
    }
    turn() {
        return 1 - (this.count % 2);
    }
    valid(r, c) { return r >= 0 && c >= 0 && r < 15 && c < 15; }

    isDraw() {
        return this.fiveInRow === 0 && this.count === 0;
    }
    toBoardString() {
        return this.boardState.toString().split(',').join('');
    }
    evaluate() {
        if (this.fiveInRow) return this.utility;
        const arr1 = [...new Set(this.fourInRow1)];
        const arr2 = [...new Set(this.fourInRow2)];
        if (this.turn() === 0 && arr1.length > 0) {
            return 950;
        }
        else if (this.turn() === 1 && arr2.length > 0) {
            return -950;
        }
        else if (arr1.length > 1) {
            return 950;
        }
        else if (arr2.length > 1) {
            return -950;
        }
        else {
            this.utility = this.turn();
            this.utility += (arr1.length - arr2.length) * 400;
            if (this.threeInRow > 10) this.threeInRow = 10;
            else if (this.threeInRow < -10) this.threeInRow = -10;
            this.utility += this.threeInRow * 30;
            if (this.brokenThree > 8) this.brokenThree = 8;
            else if (this.brokenThree < -8) this.brokenThree = -8;
            this.utility += this.brokenThree * 20;
            if (this.twoInRow > 10) this.twoInRow = 10;
            else if (this.twoInRow < -10) this.twoInRow = -10;
            this.utility += this.twoInRow * 5;
            return this.utility;

        }

    }
    moves() {
        if (this.count === 225) {
            return [{ i: 7, j: 7 }, { i: 7, j: 6 }, { i: 7, j: 8 }]
        }
        const defendingThreat = [];
        const nonRefutableThreat = [];
        let result = 0;

        if (this.turn() === 0 && this.fourInRow1.length > 0)
            return [this.fourInRow1[0]]
        else if (this.turn() === 0 && this.fourInRow2.length > 0)
            return [this.fourInRow2[0]]
        else if (this.turn() === 1 && this.fourInRow2.length > 0)
            return [this.fourInRow2[0]]
        else if (this.turn() === 1 && this.fourInRow1.length > 0)
            return [this.fourInRow1[0]]
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (this.valid(i, j + 5)) {
                    let mul = 1, arr = [], idx = null;
                    for (let k = 0; k < 6; k++) {
                        mul *= this.boardState[i][j + k];
                        arr.push(this.boardState[i][j + k]);
                        if (arr[k] === 1 && k < 5)
                            idx = k;
                    }
                    if (arr[0] === 1 && arr[5] === 1 && (mul === 27 || mul === 8)) {
                        nonRefutableThreat.push({ i, j: j + idx });
                        defendingThreat.push({ i, j });
                        defendingThreat.push({ i, j: j + 5 });
                        defendingThreat.push({ i, j: j + idx });
                        result = mul;
                        break;

                    }

                }
                if (this.valid(i + 5, j)) {
                    let mul = 1, arr = [], idx = null;
                    for (let k = 0; k < 6; k++) {
                        mul *= this.boardState[i + k][j];
                        arr.push(this.boardState[i + k][j]);
                        if (arr[k] === 1 && k < 5)
                            idx = k;
                    }
                    if (arr[0] === 1 && arr[5] === 1 && (mul === 27 || mul === 8)) {
                        nonRefutableThreat.push({ i: i + idx, j });
                        defendingThreat.push({ i, j });
                        defendingThreat.push({ i: i + 5, j });
                        defendingThreat.push({ i: i + idx, j });
                        result = mul;
                        break;

                    }
                }
                if (this.valid(i + 5, j - 5)) {
                    let mul = 1, arr = [], idx = null;
                    for (let k = 0; k < 6; k++) {
                        mul *= this.boardState[i + k][j - k];
                        arr.push(this.boardState[i + k][j - k]);
                        if (arr[k] === 1 && k < 5)
                            idx = k;
                    }
                    if (arr[0] === 1 && arr[5] === 1 && (mul === 27 || mul === 8)) {
                        nonRefutableThreat.push({ i: i + idx, j: j - idx });
                        defendingThreat.push({ i, j });
                        defendingThreat.push({ i: i + 5, j: j - 5 });
                        defendingThreat.push({ i: i + idx, j: j - idx });
                        result = mul;
                        break;

                    }
                }
                if (this.valid(i + 5, j + 5)) {
                    let mul = 1, arr = [], idx = null;
                    for (let k = 0; k < 6; k++) {
                        mul *= this.boardState[i + k][j + k];
                        arr.push(this.boardState[i + k][j + k]);
                        if (arr[k] === 1 && k < 5)
                            idx = k;
                    }
                    if (arr[0] === 1 && arr[5] === 1 && (mul === 27 || mul === 8)) {
                        nonRefutableThreat.push({ i: i + idx, j: j + idx });
                        defendingThreat.push({ i, j });
                        defendingThreat.push({ i: i + 5, j: j + 5 });
                        defendingThreat.push({ i: i + idx, j: j + idx });
                        result = mul;
                        break;

                    }
                }
            }
            if (result > 0) break;
        }
        if (this.turn() === 0 && result === 27)
            return nonRefutableThreat;
        else if (this.turn() === 0 && result === 8)
            return defendingThreat;
        else if (this.turn() === 1 && result === 8)
            return nonRefutableThreat;
        else if (this.turn() === 1 && result === 27)
            return defendingThreat;
        this.refutableThreat = [...new Set(this.refutableThreat)];


        let newArr = [...new Set([...this.twoMarks, ...this.singleMarks])].slice(0, 15);
        return [...new Set([...this.refutableThreat, ...newArr])]
    }
    getMove(i, j) {
        if (this.boardState[i][j] !== 1) return this.toBoardString();
        const char = (this.turn() === 0 ? 3 : 2);
        const idx = 15 * i + j;
        const str = this.toBoardString();
        return str.substring(0, idx) + char + str.substring(idx + 1);
    }
}

// export default Gomoku3;
const alphaBeta = (board, depth, isMaximise, alpha = -1000, beta = 1000) => {
    const gomoku = new Gomoku3(board);
    const profit = gomoku.evaluate();
    const allMoves = gomoku.moves();
    const size = allMoves.length;
    if (Math.abs(gomoku.utility) === 1000 || gomoku.count === 0 || depth === 0)
        return gomoku.utility;
    if (isMaximise) {
        let mx = -1000;
        for (let k = 0; k < size; k++) {
            const { i, j } = allMoves[k];
            const result = alphaBeta(gomoku.getMove(i, j), depth - 1, 1 - isMaximise, alpha, beta);
            mx = Math.max(mx, result);
            alpha = Math.max(mx, alpha);
            if (beta <= alpha)
                break;
        }
        return profit;

    }
    else {
        let mn = 1000;
        for (let k = 0; k < size; k++) {
            const { i, j } = allMoves[k];
            if (gomoku.boardState[i][j] !== 1) continue;
            const result = alphaBeta(gomoku.getMove(i, j), depth - 1, 1 - isMaximise, alpha, beta);
            mn = Math.min(mn, result);
            beta = Math.min(beta, mn);
            if (beta <= alpha) break;

        }
        return mn;
    }


}
const optimalMove = (board, depth, isMaximise, alpha = -1000, beta = 1000) => {
    const gomoku = new Gomoku3(board);
    const allMoves = gomoku.moves();
    let bestMoves = [];
    const size = allMoves.length;
    if (isMaximise) {
        let mx = -1000;
        for (let k = 0; k < size; k++) {
            const { i, j } = allMoves[k];
            const result = alphaBeta(gomoku.getMove(i, j), depth - 1, 1 - isMaximise, alpha, beta)
            if (mx < result) {
                bestMoves = [];
                bestMoves.push({ i, j });
                mx = result;
            }
            else if (mx === result) {
                bestMoves.push({ i, j });
            }
            alpha = Math.max(alpha, mx);
            if (beta <= alpha) break;
        }
    }
    else {
        let mn = 1000;
        for (let k = 0; k < size; k++) {
            const { i, j } = allMoves[k];
            const result = alphaBeta(gomoku.getMove(i, j), depth - 1, 1 - isMaximise, alpha, beta)
            if (result < mn) {
                bestMoves = [];
                bestMoves.push({ i, j });
                mn = result;
            }
            else if (result === mn) bestMoves.push({ i, j })
            beta = Math.min(beta, mn);
            if (beta <= alpha) break;

        }

    }
    return bestMoves[Math.floor(Math.random() * bestMoves.length)]
}
export { optimalMove };
export default Gomoku3;
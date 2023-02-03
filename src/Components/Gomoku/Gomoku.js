class Gomoku {
    constructor(position = "") {
        this.boardState = [];
        this.count = 0;
        this.special = [];
        this.fiveInRow = 0;
        this.nonFourInRow = 0;
        this.fourInRow = 0;
        this.threeInRow = 0;
        this.brokenThree = 0;
        this.twoInRow = 0;
        this.singleMark = 0;
        this.totalCount = 0;
        this.allMoves = [];
        for (let i = 0; i < 15; i++) {
            let arr = [];
            for (let j = 0; j < 15; j++) {
                let char = parseInt(position[15 * i + j]);
                if (isNaN(char))
                    char = 1;
                else char = parseInt(position[15 * i + j]);
                if (char === 1) this.count++;
                if (char === 3) this.singleMark++;
                if (char === 2) this.singleMark--;
                arr.push(char);

            }
            this.boardState.push(arr);


        }


    }
    toBoardString() {
        return this.boardState.toString().split(',').join('');
    }
    turn() {
        return 1 - (this.count % 2)
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
    isDraw() {
        if (this.isWin()) return 0;
        return this.count === 0;
    }
    move(i, j) {
        if (this.isWin() || this.isDraw()) return null;
        if (this.boardState[i][j] !== 1) return null;
        const val = (this.turn() === 0 ? 3 : 2);
        this.boardState[i][j] = val;
        this.count--;
        if (val === 3) this.singleMark++;
        if (val === 2) this.singleMark--;
        return this.toBoardString();


    }
    func5(arr) {
        if (!Array.isArray(arr)) return;
        if (arr.length < 5) return;
        let mul1 = 1, mul2 = 1;
        for (let i = 0; i < 5; i++) {
            mul1 *= arr[i];
        }
        for (let i = 1; i < 4; i++) mul2 *= arr[i];
        if (mul1 === 243) this.fiveInRow++;
        else if (mul1 === 32) this.fiveInRow--;
        else if (mul1 === 81) this.fourInRow++;
        else if (mul1 === 16) this.fourInRow--;
        else if (mul1 === mul2 && mul1 === 27) this.threeInRow++;
        else if (mul1 === mul2 && mul1 === 8) this.threeInRow--;
        else if (mul1 === mul2 && mul1 === 9 && arr[2] === 3) this.twoInRow++;
        else if (mul1 === mul2 && mul1 === 4 && arr[2] === 2) this.twoInRow--;
    }
    func6(arr) {
        if (!Array.isArray(arr) || arr.length < 6) return;
        let mul1 = 1, mul2 = 1;
        for (let i = 0; i < 6; i++) mul1 *= arr[i];
        for (let i = 1; i < 5; i++) mul2 *= arr[i];
        if (mul1 === mul2 && mul1 === 81) this.nonFourInRow++;
        else if (mul1 === mul2 && mul1 === 16) this.nonFourInRow--;
        else if (mul1 === 162) this.fourInRow++;
        else if (mul1 === 48) this.fourInRow--;
        else if (mul1 === mul2 && mul1 === 27) this.brokenThree++;
        else if (mul1 === mul2 && mul1 === 8) this.brokenThree--;

    }
    evaluate() {
        let weight = 0;
        if (this.isWin() === 1) return 10000000;
        else if (this.isWin() === 2) return -10000000;
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let arr1 = [];
                let arr2 = [], arr3 = [], arr4 = [];
                for (let k = 0; k < 5; k++) {
                    if (this.valid(i, j + k))
                        arr1.push(this.boardState[i][j + k]);
                    if (this.valid(i + k, j))
                        arr2.push(this.boardState[i + k][j]);
                    if (this.valid(i + k, j + k))
                        arr3.push(this.boardState[i + k][j + k]);
                    if (this.valid(i + k, j - k))
                        arr4.push(this.boardState[i + k][j - k]);
                }
                this.func5(arr1); this.func5(arr2); this.func5(arr3); this.func5(arr4)
                let a1 = [], a2 = [], a3 = [], a4 = [];
                for (let k = 0; k < 6; k++) {
                    if (this.valid(i, j + k))
                        a1.push(this.boardState[i][j + k]);
                    if (this.valid(i + k, j))
                        a2.push(this.boardState[i + k][j]);
                    if (this.valid(i + k, j + k))
                        a3.push(this.boardState[i + k][j + k]);
                    if (this.valid(i + k, j - k))
                        a4.push(this.boardState[i + k][j - k]);
                }
                this.func6(a1); this.func6(a2); this.func6(a3); this.func6(a4)
            }
        }
        return 10000000 * this.fiveInRow +
            200000 * this.nonFourInRow +
            10000 * this.fourInRow +
            2000 * this.threeInRow +
            500 * this.brokenThree +
            10 * this.twoInRow +
            this.singleMark



    }
    moves(reverse = false) {
        this.allMoves = [];
        const dr = [0, 0, 0, 0, -2, -1, 1, 2, -1, -2, -1, -2, 1, 2, 1, 2]
        const dc = [-2, -1, 1, 2, 0, 0, 0, 0, -1, -2, 1, 2, -1, -2, 1, 2]
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (this.boardState[i][j] > 1) continue;
                let mul = 1;
                dr.forEach((x, idx) => {
                    const u = x;
                    const v = dc[idx];
                    if (this.valid(i + u, j + v))
                        mul *= this.boardState[i + u][j + v];

                })
                if (mul > 1)
                    this.allMoves.push({ i, j })
            }
        }

        const profit = {}

        this.allMoves.forEach(({ i, j }) => {
            const board = new Gomoku(this.toBoardString());
            board.move(i, j);
            profit[15 * i + j] = board.evaluate();
        })
        // console.log(profit);
        this.allMoves.sort((a, b) => {
            return profit[15 * b.i + b.j] - profit[15 * a.i + a.j]
        })
        return this.allMoves;





    }


}
const alphaBeta = (board, depth, isMaximise, alpha = -Infinity, beta = Infinity) => {
    const gomoku = new Gomoku(board);
    if (gomoku.isWin() || gomoku.isDraw() || depth === 0) return gomoku.evaluate();
    if (isMaximise) {
        let mx = -Infinity;
        let allMoves = gomoku.moves();

        for (let k = 0; k < allMoves.length; k++) {
            const { i, j } = allMoves[k];
            const newGomoku = new Gomoku(board);
            newGomoku.move(i, j);
            const way = alphaBeta(newGomoku.toBoardString(), depth - 1, 1 - isMaximise, alpha, beta)
            mx = Math.max(mx, way);
            alpha = Math.max(alpha, mx);
            if (beta <= alpha) { break; }
        }
        return mx;
    }
    else {
        let mn = Infinity;
        const allMoves = gomoku.moves().reverse();
        const size = allMoves.length;
        for (let k = 0; k < size; k++) {
            const { i, j } = allMoves[k];
            const newGomoku = new Gomoku(board);
            let way = alphaBeta(newGomoku.move(i, j), depth - 1, 1 - isMaximise, alpha, beta)
            mn = Math.min(mn, way);
            beta = Math.min(mn, beta);
            if (beta <= alpha) { break; }
        }
        return mn;
    }
}
export const bestMoves = (board, depth, isMaximise, alpha = -Infinity, beta = Infinity) => {
    let bestMoves = [];
    let allMoves = new Gomoku(board).moves();
    if (isMaximise) {
        let mx = -Infinity;
        if (allMoves.length === 0) {
            allMoves = [
                { i: 6, j: 6 },
                { i: 6, j: 7 },
                { i: 6, j: 8 },
                { i: 7, j: 6 },
                { i: 7, j: 7 },
                { i: 7, j: 8 },
                { i: 8, j: 6 },
                { i: 8, j: 7 },
                { i: 8, j: 8 },
            ]
        }
        let size = allMoves.length;
        for (let k = 0; k < size; k++) {
            const { i, j } = allMoves[k];

            let way = alphaBeta(new Gomoku(board).move(i, j), depth - 1, 1 - isMaximise);
            if (way > mx) {
                bestMoves = []
                mx = way;
                bestMoves.push({ i, j, mx });
            }
            else if (way === mx)
                bestMoves.push({ i, j, mx });
            alpha = Math.max(alpha, mx);
            if (beta <= alpha) break;

        }




    }
    else {
        let mn = Infinity;
        allMoves = allMoves.reverse();
        const size = allMoves.length;
        for (let k = 0; k < size; k++) {
            const { i, j } = allMoves[k];
            const way = alphaBeta(new Gomoku(board).move(i, j), depth - 1, 1 - isMaximise)
            if (way < mn) {
                bestMoves = [];
                mn = way;
                bestMoves.push({ i, j, mn });
            }
            else if (way === mn)
                bestMoves.push({ i, j, mn });
        }

    }
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];




}
export default Gomoku;

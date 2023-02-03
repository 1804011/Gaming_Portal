class Gomoku {
    constructor(position = "111111111") {
        if (position?.length > 49) { position = position.substring(0, 49); }
        this.boardSize = parseInt(Math.sqrt(position?.length))
        this.boardState = position?.split('').map((val) => parseInt(val));
        this.row = [];
        this.col = [];
        this.diagonal = [1, 1];
        for (let i = 0; i < this.boardSize; i++) {
            this.row.push(1);
            this.col.push(1);
        }
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                let idx = i * this.boardSize + j;
                this.row[i] *= this.boardState[idx];
                this.col[j] *= this.boardState[idx];
                if (i === j)
                    this.diagonal[0] *= this.boardState[idx]
                if (i + j === this.boardSize - 1)
                    this.diagonal[1] *= this.boardState[idx]
            }
        }

    }
    toBoardString() {
        return this.boardState?.join('')
    }
    turn() {
        let count = 0;
        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            if (this.boardState[i] == 1)
                count++;
        }
        if (this.boardSize % 2 == 1) {
            return count % 2;
        }
        else {
            return 1 - (count % 2);
        }
    }
    isWin() {
        const first = parseInt(Math.pow(3, this.boardSize))
        const second = parseInt(Math.pow(2, this.boardSize))
        if (this.row.includes(first) || this.col.includes(first) || this.diagonal.includes(first)) {
            return 1;
        }
        if (this.row.includes(second) || this.col.includes(second) || this.diagonal.includes(second)) {
            return 2;
        }
        return 0;
    }
    isDraw() {
        if (this.isWin()) return 0;
        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            if (this.boardState[i] === 1)
                return 0;
        }
        return 1;
    }
    move(i, j) {
        const idx = this.boardSize * i + j;
        if (this.boardState[idx] !== 1) return null;
        let char = 1;
        if (this.turn() === 1) { char = 3; }
        else { char = 2; }
        this.boardState[idx] = char;
        this.row[i] *= char;
        this.col[j] *= char;
        if (i === j)
            this.diagonal[0] *= char;
        if (i + j === this.boardSize - 1)
            this.diagonal[1] *= char;
        return this.toBoardString();
    }
}
export default Gomoku
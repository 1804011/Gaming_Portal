class Gomoku5x5 {
    constructor(position) {
        this.boardState = [];
        this.threeInRow = 0;
        this.brokenThree = 0;
        this.twoInRow = 0;
        this.single = 0;

        this.col = [1, 1, 1, 1, 1];
        this.row = [1, 1, 1, 1, 1];
        this.diagonal = [1, 1];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let val = parseInt(position[5 * i + j]);
                this.row[i] *= val;
                this.col[j] *= val;
                if (i === j)
                    this.diagonal[0] *= val;
                if (i + j === 4)
                    this.diagonal[1] *= val;
            }
        }


    }
    isWin() {
        const first = 243;
        const second = 32;
        if (this.row.includes(first) ||
            this.col.includes(first) ||
            this.diagonal.includes(first)) { return 1; }
        if (this.row.includes(second) ||
            this.col.includes(second) ||
            this.diagonal.includes(second)) { return 2; }
        return 0;

    }
    evaluate() {
        if (this.isWin() === 1) return 40320;
        else if (this.isWin() === 2) return -40320;
        for (let i = 0; i < 5; i++) {
            if (this.row[i] === 27 &&
                this.boardState[i][0] === 1 &&
                this.boardState[i][4] === 1)
                this.threeInRow++;
            if (this.row[i] === 8 &&
                this.boardState[i][0] === 1 &&
                this.boardState[i][4] === 1)
                this.threeInRow--;
            if (this.row[i] === 27 &&
                this.boardState[i][1] === 3 &&
                this.boardState[i][2] === 3 &&
                this.boardState[i][4] === 3)
                this.brokenThree++;
            if (this.row[i] === 27 &&
                this.boardState[i][1] === 3 &&
                this.boardState[i][3] === 3 &&
                this.boardState[i][4] === 3)
                this.brokenThree++;
            if (this.row[i] === 8 &&
                this.boardState[i][1] === 2 &&
                this.boardState[i][2] === 2 &&
                this.boardState[i][4] === 2)
                this.brokenThree--;
            if (this.row[i] === 8 &&
                this.boardState[i][1] === 2 &&
                this.boardState[i][3] === 2 &&
                this.boardState[i][4] === 2)
                this.brokenThree--;


        }




    }

}
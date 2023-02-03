function suggestedMove5() {
    if (arguments.length < 5) return {};
    let mul = 1, oneIdx = [];
    const refutableThreat = [];
    const twoMarksThreat = [];
    const singleMarkThreat = [];
    //calculation of mul
    for (let i = 0; i < 5; i++) {
        mul *= arguments[i];
        if (arguments[i] === 1)
            oneIdx.push(i);
    }
    if (mul % 6 === 0 || mul === 1) return {};
    else if (mul === 81 || mul === 16) return {
        winOrDefendingThreat: oneIdx[0],
    }
    if (mul === 27 || mul === 8) {
        refutableThreat.push(...oneIdx);
    }
    if (arguments[1] === arguments[2] && mul === arguments[1] * arguments[2]) {
        twoMarksThreat.push(3);
    }
    else if (arguments[2] === arguments[3] && mul === arguments[3] * arguments[2]) {
        twoMarksThreat.push(1);
    }

    if (mul === arguments[2]) {
        singleMarkThreat.push(...[1, 3])
    }
    return {
        refutableThreat, twoMarksThreat, singleMarkThreat
    }

}
function suggestedMove6() {
    let mul = 1, idx = null;
    if (arguments[0] > 1 || arguments[5] > 1) return {};
    for (let i = 1; i <= 4; i++) {
        mul *= arguments[i];
        if (arguments[i] === 1)
            idx = i;
    }
    if (mul === 27 || mul === 8) {
        return idx;
    }
    return null;
}
const valid = (r, c) => r >= 0 && c >= 0 && r < 15 && c < 15;
function suggestedMove(board) {
    const moves = [];
    let defendThreat = [];
    let refThreat = [];
    let twoThreats = [];
    let singleThreats = [];

    // for all rows find best move
    for (let i = 0; i < 15; i++) {
        let arr = [];
        for (let j = 0; j < 15; j++) {
            if (j < 5)
                arr.push(parseInt(board[15 * i + j]));
            else {

                arr.push(parseInt(board[15 * i + j]))
                arr.shift();
            }
            const { winOrDefendingThreat, refutableThreat, twoMarksThreat, singleMarkThreat } = suggestedMove5(...arr)
            if (winOrDefendingThreat >= 0) { return [{ i, j: j - 4 + winOrDefendingThreat }] }
            refutableThreat?.forEach((e, idx) => { refThreat.push({ i, j: j - 4 + e }) })
            twoMarksThreat?.forEach((e, idx) => { twoThreats.push({ i, j: j - 4 + e }) })
            singleMarkThreat?.forEach((e, idx) => { singleThreats.push({ i, j: j - 4 + e }) })
        }




    }




}


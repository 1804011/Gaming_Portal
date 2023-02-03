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
function singleCount() {
    let count = 0;
    const size = arguments.length;
    for (let i = 0; i < size; i++) {
        if (arguments[i] === 3) count++;
        else if (arguments[i] === 2) count--;
    }
    return count;
}
function totalUtilies() {
    let total = fiveInRow(...arguments);
    if (total !== 0) return total * 1000000;
    total += nonFourInRow(...arguments) * 200000;
    total += fourInRow6(...arguments) * 20000;
    total += threeInRow(...arguments) * 2000;
    total += brokenThree(...arguments) * 500;
    total += twoInRow(...arguments) * 10;
    return total;



}


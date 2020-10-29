const fs = require('fs');

let preDS = JSON.parse(fs.readFileSync('baskets.json'));
let ds = [];

let i = 0;
preDS.forEach(line => {
    ++i;
    ds.push(line[i]);
});

const supp = function(A) {
    let cnt = 0;
    ds.forEach(line => {
        if (existsSubArr(line, A)) {
            cnt++;
        }
    });

    return cnt / ds.length;
}

const conf = function(A, B) {
    let suppA = supp(A);
    if (suppA === 0) {
        return 0;
    }

    return supp(A.concat(B)) / suppA;
}

const lift = function(A, B) {
    let suppB = supp(B);
    if (suppB === 0) {
        return 0;
    }

    return conf(A, B) / suppB;
}

const conv = function(A, B) {
    let confAB = conf(A, B);
    if (confAB === 1) {
        return 0;
    }

    return (1 - supp(B)) / (1 - confAB);
}

const existsSubArr = function(A, B) {
    // A - main array
    // B - sub array
    if (B.length > A.length || !B) {
        return 0;
    }

    let isExists = true;
    B.forEach(elemB => {
        if (A.indexOf(elemB) === -1) {
            isExists = false;
            return -1;
        }
    });

    return isExists;
}

module.exports = { supp, conf, lift, conv };
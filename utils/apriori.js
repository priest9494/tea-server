const fs = require('fs');

// Baskets array
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

const existsSubArr = function(A, B) {
    // A - main array
    // B - sub array
    if (B.length > A.length) {
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

const getUniqCandidates = function(arr) {
    let res = [];
    let ans = [];

    arr.forEach(elem => {
        res = res.concat(elem);
    })

    res = [...(new Set(res))];

    res.forEach(elem => {
        ans.push(new Array(elem));
    })

    return ans;
}

function getCombinations(arr, n) {
    var i, j, k, elem, l = arr.length, childperm, ret = [];
    if (n == 1){
        for (i = 0; i < arr.length; i++) {
            for (j = 0; j < arr[i].length; j++) {
                ret.push([arr[i][j]]);
            }
        }
        return ret;
    }
    else {
        for (i = 0; i < l; i++) {
            elem = arr.shift();
            for (j = 0; j < elem.length; j++) {
                childperm = getCombinations(arr.slice(), n-1);
                for (k = 0; k < childperm.length; k++) {
                    ret.push([elem[j]].concat(childperm[k]));
                }
            }
        }
        return ret;
    }
}

const getCandidates = function(threshold) {
    // Результирующий массив кандидатов
    let result = [];
    // Формируем массив уникальных кандидатов
    let uniqCandidates = getUniqCandidates(ds);
    // Массив прошедших кандидатов прошлого шага
    let prevCandidates = [];

    let haveNewCandidate = false;
    // Выбираем подходящих по supp кандидатов
    uniqCandidates.forEach(candidate => {
        if(supp(candidate) > threshold) {
            result.push(candidate);
            prevCandidates.push(candidate);
            haveNewCandidate = true;
        }
    });

    let stepNum = 1;
    while(haveNewCandidate) {
        haveNewCandidate = false;
        ++stepNum;
        // Получаем все сочетания по stepNum
        let tmp = getCombinations(getUniqCandidates(prevCandidates), stepNum);
        prevCandidates = [];
        // Выбираем подходящих по supp кандидатов
        tmp.forEach(candidate => {
            if(supp(candidate) > threshold) {
                result.push(candidate);
                prevCandidates.push(candidate);
                haveNewCandidate = true;
            }
        });
    }

    return result;
}

module.exports = getCandidates;
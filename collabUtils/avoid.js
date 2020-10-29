const fs = require('fs');
const formulas = require('./aprioriFormulas');

const removeAvoided = function(list, avoidList) {
    if(avoidList.length === 0) {
        return list;
    }

    list = list.filter(x => !avoidList.includes(x));

    let result = [];
    avoidList.forEach(avoid => {
        list.forEach(candidate => {
            if (formulas.conf(new Array(candidate), new Array(avoid)) < 0.5) {
                result.push(candidate);
            }
        })
    });

    return result;
}

module.exports = removeAvoided;

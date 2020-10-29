const getCandidates = require('../collabUtils/apriori');
const getRecommend = require('../collabUtils/recommendation');
const removeAvoided = require('../collabUtils/avoid');
const getFullInfo = require('../getFullInfo');

const candidates = getCandidates('0.2');

const recommend = function(basket, avoidList) {
    let recommendList = [];

    basket.forEach(tea => {
        recommendList = recommendList.concat(getRecommend(candidates, new Array(tea), avoidList));
    });

    console.log('basket: ');
    console.log(basket);

    recommendList = selectSignificant(recommendList);
    console.log('significant:');
    console.log(recommendList);

    recommendList = removeAvoided(recommendList, avoidList);
    console.log('avoided:');
    console.log(recommendList);

    recommendList = removeSelectedItems(recommendList, basket);
    console.log('w/o selected:');
    console.log(recommendList);

    let teaList = getFullInfo([...(new Set(recommendList))]);

    return teaList;
}

const selectSignificant = function(list) {
    let significant = [];

    for (let i = 0; i < list.length; ++i) {
        if(significant.indexOf(list[i].candidate) === -1) {
            significant.push(list[i].candidate);
        }
    }

    return significant;
}

const removeSelectedItems = function(list, basket) {
    if (basket) {
        return list.filter(x => !basket.includes(x));
    }
    return list;
}

module.exports = recommend;
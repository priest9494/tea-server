const getRecommend = require('../utils/content/recommend');
const getFullInfo = require('../getFullInfo');

const recommend = function(basket, avoidList) {
    let recommendList = getRecommend(basket);
    let avoidRecommends = getRecommend(avoidList);

    console.log('after find candidates:');
    console.log(recommendList);

    recommendList = removeDoubles(recommendList);
    avoidRecommends = removeDoubles(avoidRecommends);

    console.log('after rm doubles:');
    console.log(recommendList);

    recommendList = getArrayFromMeasureObjectArray(recommendList);
    avoidRecommends = getArrayFromMeasureObjectArray(avoidRecommends);
    avoidRecommends.splice(3);

    console.log('after arraying:');
    console.log(recommendList);

    recommendList = recommendList.filter(x => !avoidRecommends.includes(x));

    console.log('after set diffs:');
    console.log(recommendList);

    recommendList = removeSelf(recommendList, basket, avoidList);

    console.log('after remove self:');
    console.log(recommendList);

    recommendList.splice(5);

    console.log('after splice:');
    console.log(recommendList);

    return getFullInfo(recommendList);
}

const removeDoubles = function(list) {
    let res = [];
    let incs = [];

    list.forEach(element => {
        if (!incs.includes(element.name)) {
            incs.push(element.name);
            res.push(element);
        }
    });

    return res;
}

const getArrayFromMeasureObjectArray = function(arrayOfObjects) {
    let res = [];
    arrayOfObjects.forEach(obj => {
        res.push(obj.name);
    })

    return res;
}

const removeSelf = function(recommendList, basket, avoidList) {
    let res = [];
    recommendList.forEach(recommend => {
        if (!basket.includes(recommend) && !avoidList.includes(recommend)) {
            res.push(recommend);
        }
    });

    return res;
}

module.exports = recommend;
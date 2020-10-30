const getRecommend = require('../utils/content/recommend');

const recommend = function(basket, avoidList) {
    let recommendList = getRecommend(['Мэнку', 'Тенчун']);
    let avoidRecommends = getRecommend(['ДаЛи']);


    recommendList = removeDoubles(recommendList);
    console.log(recommendList);

    return [];
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

    return incs;
}

recommend();

module.exports = recommend;
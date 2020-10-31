const collab = require('./collabService');
const content = require('./contentService');

const getRecommend = function(basket, avoidList) {
    let recommends = collab(basket, avoidList);
    
    if (recommends.length === 0) {
        recommends = content(basket, avoidList);
    }

    return recommends;
}

module.exports = getRecommend;
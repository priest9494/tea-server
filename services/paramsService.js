const findByParams = require('../utils/params/findByParams');
const findByParamsWithMeasures = require('../utils/params/findByParamsWithMeasures');
const getFullInfo = require('../getFullInfo');

const recommend = function(color, priceRange, weightRange, leafRange, inaccurate) {

    let res = findByParams(color, priceRange, weightRange, leafRange);

    if (inaccurate === false) {
        return res;
    }

    if (res.length === 0) {
        res = findByParamsWithMeasures(color, priceRange, weightRange, leafRange);
        res.splice(5);
        return getFullInfo(res);
    }

    return res;
}

module.exports = recommend;
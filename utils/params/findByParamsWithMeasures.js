const fs = require('fs');

const MAX_WEIGHT = 130;
const MIN_WEIGHT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 1900;

const MIN_LEAFSIZE = 1;
const MAX_LEAFSIZE = 3;

const findByParamsWithMeasures = function(color, priceRange, weightRange, leafRange) {
    let teaList = JSON.parse(fs.readFileSync('tea.json'));

    let avgPrice = Math.round( (priceRange[0] + priceRange[1]) / 2 );
    let avgWeight = Math.round( (weightRange[0] + weightRange[1]) / 2);
    let avgLeaf = Math.round( (leafRange[0] + leafRange[1]) / 2);

    let paramsObj = {
        price: avgPrice,
        weight: avgWeight,
        leafSize: avgLeaf
    }

    let measures = [];
    teaList.children.forEach(teaColor => { 
        teaColor.children.forEach(tea => {
            measures.push({
                name: tea.name,
                euclid: euclid(tea.props, paramsObj)
            }) 
        });
    });

    measures.sort( (a, b) => a.euclid > b.euclid ? 1 : -1);

    let res = [];
    measures.forEach(measure => {
        res.push(measure.name);
    })

    return res;
}

const euclid = function(tea, paramsObj) {
    let normalPrice1 = (tea.price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE);
    let normalPrice2 = (paramsObj.price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE);

    let normalWeight1 = (tea.weight - MIN_WEIGHT) / (MAX_WEIGHT - MIN_WEIGHT);
    let normalWeight2 = (paramsObj.weight - MIN_WEIGHT) / (MAX_WEIGHT - MIN_WEIGHT);

    let normalLeafSize1 = (tea.leafSize - MIN_LEAFSIZE) / (MAX_LEAFSIZE - MIN_LEAFSIZE);
    let normalLeafSize2 = (paramsObj.leafSize - MIN_LEAFSIZE) / (MAX_LEAFSIZE - MIN_LEAFSIZE);

    return Math.sqrt( Math.pow(Math.abs(normalPrice1 - normalPrice2), 2) + Math.pow(Math.abs(normalWeight1 - normalWeight2), 2) + Math.pow(Math.abs(normalLeafSize1 - normalLeafSize2), 2) )
}

module.exports = findByParamsWithMeasures;
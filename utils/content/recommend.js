const fs = require('fs');

const getRecommend = function(basket) {
    if (basket.length === 0) {
        return [];
    }

    let measures = JSON.parse(fs.readFileSync('measures.json'));

    let candidates = [];
    measures.forEach(pair => {

        if (basket.includes(pair.first)) {
            let measure = (1 - pair.euclid / 2) + (1 - pair.diffs / 6) + (1 - pair.treeProx / 5);

            candidates.push({
                name: pair.second,
                measure: measure
            });
        }

        if (basket.includes(pair.second)) {
            let measure = (1 - pair.euclid / 2) + (1 - pair.diffs / 6) + (1 - pair.treeProx / 5);
            
            candidates.push({
                name: pair.first,
                measure: measure
            })
        }
    });

    candidates.sort( (a, b) => a.measure < b.measure ? 1 : -1 );
    
    return candidates;
}

module.exports = getRecommend;
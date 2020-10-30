const fs = require('fs');

const getRecommend = function(basket) {
    let measures = JSON.parse(fs.readFileSync('measures.json'));

    let euqlidCandidates = [];
    let diffsCandidates = [];
    let treeCandidates = [];
    let candidates = [];

    measures.forEach(pair => {
        let measure = pair.euclid / 2 + (1 - pair.diffs / 6) + (1 - pair.treeProx / 5);

        if (basket.includes(pair.first)) {
            candidates.push({
                name: pair.second,
                measure: measure
            });
        }

        if (basket.includes(pair.second)) {
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
const fs = require('fs');
const formulas = require('./aprioriFormulas');

const getRecommendations = function(candidates, item) {
    let candidateList = [];

    candidates.forEach(candidate => {
        let lift_ = formulas.lift(candidate, item);

        if(lift_ > 1) {
            candidate.forEach(tea => {
                candidateList.push({
                    candidate: tea,
                    lift: lift_
                })
            })
        }
    })
    
    candidateList.sort((a, b) => a.lift < b.lift ? 1 : -1);

    return candidateList;
}

module.exports = getRecommendations;
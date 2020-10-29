const fs = require('fs');

// На входе уникальный список названий чаев, на выходе - список чаев в array of json с полной информацией
const getFullInfo = function(teaList) {
    let result = [];

    let teas = JSON.parse(fs.readFileSync('tea.json'));

    teas.children.forEach(teaColor => {
        teaColor.children.forEach(tea => {
            if (teaList.includes(tea.name)) {
                result.push(tea.props);
            }
        })
    });

    return result;
}

module.exports = getFullInfo;
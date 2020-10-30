const fs = require('fs');

const findByParams = function(color, priceRange, weightRange, leafRange) {
    let res = [];
    let teaList = JSON.parse(fs.readFileSync('tea.json'));

    teaList.children.forEach(element => {
        if (element.name === color) {
            element.children.forEach(tea => {
                res.push(tea.props);
            })

            return -1;
        }
    });

    res = res.filter( item => {
        if (item.price >= priceRange[0] && item.price <= priceRange[1] && item.weight >= weightRange[0] && item.weight <= weightRange[1] && item.leafSize >= leafRange[0] && item.leafSize <= leafRange[1]) {
            return item;
        }
    });

    return res;
}

module.exports = findByParams;
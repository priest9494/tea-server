const fs = require('fs');

let collabService = {};

collabService.getRecommends = function(basket, unsub) {
    data = fs.readFileSync('groups.json');
    let groups = JSON.parse(data);
    let recommend = {};
    basket = [...(new Set(basket))];

   // console.log('\n\nbasket:');
    //console.log(basket);
    basket.forEach(teaFromBasket => {
        let i = 0;
        groups.forEach(group => {
            ++i;
            group[i].forEach(teaFromGroup => {
                if (teaFromBasket === teaFromGroup) {
                    group[i] = removeDoubles(group[i], basket);
                    if (!recommend.hasOwnProperty(teaFromBasket)) {
                        recommend[teaFromBasket] = getMarkedArray(group[i], i);
                    } else {
                        recommend[teaFromBasket] = recommend[teaFromBasket].concat(getMarkedArray(group[i], i));
                    }
                }
            })
        })
    });

   // console.log('recommended with doubles markered:');
   // console.log(recommend);

    let recommendList = getRecommendList(recommend);
    //console.log('recommend list:');

    for(let i = 0; i < recommendList.length; ++i) {
        if (basket.indexOf(recommendList[i].name) != -1) {
            recommendList.splice(i, 1);
        }
    }
    //console.log(recommendList);

    //console.log('recommended teas:');
    //console.log(getTeaList(recommendList));

    return getTeaList(recommendList);
}

const getTeaList = function(recommendList) {
    let uniqTeas = {}
    recommendList.forEach(item => {
        if (!uniqTeas.hasOwnProperty(item.name)) {
            uniqTeas[item.name] = item.marker;
        }
    })

    let teaRecList = [];

    data = fs.readFileSync('tea.json');
    let teaList = JSON.parse(data);
    teaList.children.forEach(elem => {
        elem.children.forEach(tea => {
            let teaObject = {};
            for(key in uniqTeas) {
                if (key === tea.props.name) {
                    teaObject = tea.props;
                    teaObject.group = uniqTeas[key];
                    teaRecList.push(teaObject);
                }
            }
        })
    })
    return teaRecList; 
}


const getRecommendList = function(recommend) {
    let recommendMeasures = [];

    data = fs.readFileSync('measures.json');
    let measures = JSON.parse(data);

    measures.forEach(item => {
        for(let key in recommend) {
            if (item.first === key) {
                recommend[key].forEach(teaFromGroup => {
                    if (teaFromGroup.item != key) {
                        if (teaFromGroup.item === item.second) {
                            recommendMeasures.push({
                                'name': item.second,
                                'euclid': item.euclid,
                                'marker': teaFromGroup.marker
                            })
                        }
                    }
                })
            }
            if (item.first === key) {
                recommend[key].forEach(teaFromGroup => {
                    if (teaFromGroup.item != key) {
                        if (teaFromGroup.item === item.first) {
                            recommendMeasures.push({
                                'name': item.first,
                                'euclid': item.euclid,
                                'mark': key.marker
                            })
                        }
                    }
                })
            }
        }
    })

    recommendMeasures.sort((a, b) => a.euclid < b.euclid ? 1 : -1);

    return recommendMeasures;
}

const getMarkedArray = function(arr, mark) {
    let markedArr = [];
    arr.forEach(elem => {
        markedArr.push({item: elem, marker: mark});
    })

    return markedArr;
}

const removeDoubles = function(group, basket) {
    for(let i = 0; i < group.length; ++i) {
        basket.forEach(teaFromBasket => {
            if (group[i] === teaFromBasket) {
                group.splice(i, 1);
            }
        })
    }
    return group;
}

collabService.addGroup = function(basket) {
    
}

module.exports = collabService;
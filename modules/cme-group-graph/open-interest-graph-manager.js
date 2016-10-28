"use strict";

var getCoordinates = function(dataArr, propName){
    var coordinates = [];
    dataArr.forEach(function(item, i, dataArr){
        coordinates.push(item[propName]);
    });
    return coordinates;
};

var getTrace = function(dataArr, color, name){
    return {
        x: getCoordinates(dataArr, 'openInterest'),
        y: getCoordinates(dataArr, 'strike'),
        name: name,
        orientation: 'h',
        type: 'bar',
        marker: {
            color: color,
            width: 1
        }
    };
};

var convertDataToOpenInterestGraph = function(dataArr1, dataArr2, colorData1, colorData2, nameData1, nameData2){
    var traceData1 = getTrace(dataArr1, colorData1, nameData1);
    var traceData2 = getTrace(dataArr2, colorData2, nameData2);

    var data = [traceData1, traceData2];
    var layout = {
        title: 'OPEN INTEREST',
        barmode: 'stack'
    };

    return {data: data, layout: layout}
};

module.exports = convertDataToOpenInterestGraph;

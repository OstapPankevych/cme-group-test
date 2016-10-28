function OpenInterestManager(strikeCellIndex, openInterestCellIndex){

    var getIndex = function(arr, item){
        return arr.indexOf(item);
    };

    var getData = function(table, monthIndex, optionTypeIndex){
        var res = [];
        for (var i = 0; i < table.table.rows.length; i++){
            var row = table.table.rows[i];
            if (row.optionTypeId == optionTypeIndex && row.monthId == monthIndex){
                res.push({strike: row.data[strikeCellIndex],
                    openInterest: row.data[openInterestCellIndex].replace('+', '').replace('-', '')});
            }
        }

        return res;
    };

    this.getOpenInterest = function(table, month, optionType){
        var monthIndex = getIndex(table.months, month);
        var optionTypeIndex = getIndex(table.optionTypes, optionType);

        return getData(table, monthIndex, optionTypeIndex);
    }
}

module.exports = OpenInterestManager;

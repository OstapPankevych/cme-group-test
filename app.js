"use strict";




var startApp = function() {


    var cmeGroup = require('./modules/cme-group');
    var cmeGroupGraph = require('./modules/cme-group-graph');
    var strikeCell = 0, bonusCell = 5, volumeCell = 9, openInterestCell = 10;
    var openInterestManager = new cmeGroup.OpenInterestManager(strikeCell, openInterestCell);
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        monthColPos = 0, optionTypeColumnPos = 1, monthWordCharCount = 5,
        tableColumnCount = 14, columnsAtNumber = [0], tableName = "STRIKE OPEN RANGE";

    var parser = new cmeGroup.BulletinTableParser(months, monthColPos, optionTypeColumnPos, monthWordCharCount,
        tableColumnCount, columnsAtNumber, tableName);



    const ipcMain = require('electron').ipcMain;
    ipcMain.on('get-draw-data', function(event, arg) {
        parser.parseTable("D:/Forex/Section39_Euro_FX_And_Cme$Index_Options.txt", function(error, res){
        //parser.parseTable("D:/Forex/test.txt", function(error, res){
            var res1 = openInterestManager.getOpenInterest(res, "OCT16", "EURO FX CALL");
            var res2 = openInterestManager.getOpenInterest(res, "OCT16", "EURO FX PUT");
            var data = cmeGroupGraph.convertDataToOpenInterestGraph(res1, res2, 'rgba(255,153,51,0.6)',
                'rgba(55,128,191,0.6)', "CALL", "PUT");

            event.sender.send('get-draw-data-reply', data);
        });
    });

    ipcMain.on('synchronous-message', function(event, arg) {
        console.log(arg);  // prints "ping"
        event.returnValue = 'pong';
    });
};
module.exports = startApp;




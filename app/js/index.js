const ipcRenderer = require('electron').ipcRenderer;
//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

ipcRenderer.on('get-draw-data-reply', function(event, arg) {
    // draw graph
    //Plotly.plot(document.getElementById('graph'), data.data, data.layout);
    console.log('data received');
    console.log(arg);
    Plotly.newPlot('graph', arg.data, arg.layout);
});
ipcRenderer.send('get-draw-data');
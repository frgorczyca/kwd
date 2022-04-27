const express = require("express");
const fs = require("fs");
const gpio = require("onoff").Gpio;

const config = require('./config.json')

let normallyOpen = new gpio(27, 'in', "both", { debounceTimeout: 10});
// Not used currently, can be used for detecting errors
let normallyClosed = new gpio(22, 'in');

normallyOpen.watch(function(err, value) {
    if(err) {
	    fs.writeFileSync(config.statusFilePath, config.errorValue)
    } else if (value == 1) {
	    fs.writeFileSync(config.statusFilePath, config.occupiedValue)
    } else {
	    fs.writeFileSync(config.statusFilePath, config.emptyValue)
    }
})

let app = express();
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'));

// Manually set the state to be Occupied
app.get("/occupy", function (_, res) {
    fs.writeFileSync(config.statusFilePath, JSON.stringify({ "status": config.occupiedValue, "timeStamp": Date.now()}))
        
    res.sendStatus(200);
})

// Manually set the state to be Empty
app.get("/empty", function (_, res) {
    fs.writeFileSync(config.statusFilePath, JSON.stringify({ "status": config.emptyValue, "timeStamp": Date.now()}))

    res.sendStatus(200);
})

// Get office status in JSON format
app.get("/office_status", function (_, res) {
    fs.readFile(config.statusFilePath, "utf8", (err, content) => {
        if (err) {
            res.send(err);
        }
        res.send(JSON.parse(content));
    })
})

app.get('/', function (_, res) {
    fs.readFile(config.statusFilePath, "utf8", (err, content) => {
        if (err) {
            res.send(err);
        }
        let data = JSON.parse(content)

        res.render('index', { status: data.status, lastChanged: new Date(data.timeStamp).toLocaleString("pl-PL"), config: config})
    })
})

app.listen(80);

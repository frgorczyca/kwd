const express = require("express");
const fs = require("fs");
const gpio = require("onoff").Gpio;

const config = require('./config.json')

let nc = new gpio(17, 'in', "both", { debounceTimeout: 10});
let no = new gpio(27, 'in');

let app = express();

nc.watch(function(err, value) {
    if(err) {
	    fs.writeFileSync(config.statusFilePath, config.errorValue)
    } else if (value == 1) {
	    fs.writeFileSync(config.statusFilePath, config.occupiedValue)
    } else {
	    fs.writeFileSync(config.statusFilePath, config.emptyValue)
    }
})

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'));

app.get("/occupy", function (_, res) {
    fs.writeFileSync(config.statusFilePath, JSON.stringify({ "status": config.occupiedValue, "timeStamp": Date.now()}))

    res.send("ok")
})

app.get("/empty", function (_, res) {
    fs.writeFileSync(config.statusFilePath, JSON.stringify({ "status": config.emptyValue, "timeStamp": Date.now()}))

    res.send("ok")
})

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

        res.render('occupied', { status: data.status, lastChanged: new Date(data.timeStamp).toLocaleString("pl-PL")})
    })
})

app.listen(80);

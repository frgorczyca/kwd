const express = require("express");
const fs = require("fs");
const gpio = require("onoff").Gpio;

let nc = new gpio(17, 'in', "both", { debounceTimeout: 10});
let no = new gpio(27, 'in');

let app = express();

const errorValue = "Error";
const occupiedValue = "Occupied";
const emptyValue = "Empty";

const statusFilePath = "office_status.txt";

nc.watch(function(err, value) {
    if(err) {
	fs.writeFileSync(statusFilePath, errorValue)
    } else if (value == 1) {
	fs.writeFileSync(statusFilePath, occupiedValue)
    } else {
	fs.writeFileSync(statusFilePath, emptyValue)
    }
})

app.use(express.json());

app.get("/office_status", function (req, res) {
    fs.readFile(statusFilePath, "utf8", (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    })
})

app.get('/', function (req, res) {
    console.log(nc.readSync(), no.readSync());
    res.send("Default response");
})

app.listen(80);

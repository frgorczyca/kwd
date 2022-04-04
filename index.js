const express = require("express");
const fs = require("fs");

let app = express();

app.use(express.json());

app.get("/office_status", function (req, res) {
    fs.readFile("office_status.txt", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        }
        res.send(data)
    })
})

app.get('/', function (req, res) {
    res.send("Default response");
})

app.listen(3000);
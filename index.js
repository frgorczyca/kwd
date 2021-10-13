const express = require("express");
const sqlite = require('sqlite3').verbose();

let app = express();
let db = new sqlite.Database("../database/office_status_db", (err) => {
    if(err) {
        console.error(err.message);
    }

    console.log("Connected to database");
})

app.use(express.json());

app.get("/biuro_status", function (req, res) {
    db.each("SELECT * FROM OfficeStatus limit 1", (err, row) => {
        res.send(row)
    })
})

app.get('/', function (req, res) {
    res.send("Default response");
})

app.listen(5000);
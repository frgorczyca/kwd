const express = require("express");

let app = express();

app.use(express.json());

app.get("/biuro_status", function (req, res) {
    res.send("This is an automated reposne");
})

app.get('/', function (req, res) {
    res.send("Default response")
})

app.listen(5000);
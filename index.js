var express = require("express");
var app = express();
var port = process.env.PORT || 3600;
var server = app.listen(port);

app.use(express.static("public"));
console.log("Server bereit...");

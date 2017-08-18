var express = require("express");
var body = require("body-parser");
var method = require("method-override");
var exphbs = require("express-handlebars");
var path = require("path");
var app = express();
var db = require("./models");

var router = require(path.join(__dirname, "controllers", "db8_controller.js"));

var port = process.env.PORT || 7000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(method("_method"));

app.use(body.json()); // support json encoded bodies
app.use(body.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join('public')));

app.use("/", router);

db.sequelize.sync().then(function(){
	app.listen(port, function(error){
		if (error){
			return console.log(error);
		}

		console.log("server is listening on http://localhost:%s", port);
	});
});




var express = require('express');
var app = express();
var projectApp = express();

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

projectApp.use(bodyParser.urlencoded({extended: true}));
projectApp.use(bodyParser.json());

/*
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: 'this is the secret', // proc.env.SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
*/

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
projectApp.use(express.static(__dirname + '/public'));

// require("./test/app.js")(app);
require("./assignment/app.js")(app);
// require("./project/app.js")(projectApp);

var port = process.env.PORT || 3000;

app.listen(port);
// projectApp.listen(port);
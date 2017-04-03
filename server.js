var express = require('express');
var app = express();

// install, load, and configure body parser module
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
// app.use(session({
//     secret: process.env.SESSION_SECRET, // proc.env.SESSION_SECRET
//     resave: true,
//     saveUninitialized: true
// }));

app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require("./test/app.js")(app);
require("./assignment/app.js")(app);
require("./project/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);
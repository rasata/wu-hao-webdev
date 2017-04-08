/**
 * Created by wuhao on 2017-03-08.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610');

// GET /static/style.css etc.
app.use(express.static(__dirname + '/public'));

var CourseSchema = new mongoose.Schema({
    title: String,
    seats: {type: Number, default: 25},
    start: {type: Date, default: Date.now}
}, {collection: "course"});

var Course = mongoose.model("Course", CourseSchema);

app.get("/rest/course", function (req, res) {
    Course.find(function (err, data) {
        res.json(data);
    });
});

app.get("/rest/course/:id", function (req, res) {
    Course.find({_id: req.params.id},
        function (err, data) {
            res.json(data);
        });
});

app.delete("/rest/course/:id", function (req, res) {
    Course.remove({_id: req.params.id},
        function (err, result) {
            Course.find(function (err, data) {
                res.json(data);
            });
        });
});

app.post("/rest/course", function (req, res) {
    var course = req.body;
    Course.create(course, function (err, result) {
        Course.find(function (err, data) {
            res.json(data);
        });
    });
});

app.listen(3000);
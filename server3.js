/**
 * Created by wuhao on 2017-03-07.
 */
var express = require('express')
var app = express()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610');

var CourseSchema = new mongoose.Schema({
    title: String,
    seats: Number,
    starts: {type: Date, default: Date.now}
}, {collection: "course"});

var Course = mongoose.model("Course", CourseSchema);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// find course
function findAll(callback) {
    Course.find(callback);
}

function findByTitle(title, callback) {
    Course.find({title: title}, callback);
}

// findByTitle("Course 1", renderCourses);
findAll(renderCourses);

function renderCourses(err, resultSet) {
    // console.log(err);
    // console.log(resultSet);

    for (var r in resultSet) {
        var title = resultSet[r].title;
        var seats = resultSet[r].seats;
        console.log(title + ' ' +  seats);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// create course
function createCourse(course) {
    Course.create(course, function (err, results) {
        console.log(err);
        console.log(results);
    });
}

var courses = [
    {title: "Course 1", seats: 11},
    {title: "Course 2", seats: 22},
    {title: "Course 3", seats: 33},
    {title: "Course 4", seats: 44}
];


// for (var c in courses) {
//     createCourse(courses[c]);
//     console.log(courses[c])
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// course rest api
app.get('/rest/course', function (req, res) {
    findAll(function(results) {
        res.json(results);
    });
    res.send('hello world');
});

app.listen(3000);
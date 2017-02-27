/**
 * Created by wuhao on 2017-02-19.
 */
var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public2'));

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/getSomeJson', function (req, res) {
    res.send({message: "Hello World"});
})

app.get('/getJsonArray', function (req, res) {
    var array = [{title: "Java"}, {title:"C#"}];
    res.send(array);
})

app.get("/rest/course/", function(req, res) {
    var courses = [
        {title: "Java 101", seats: 23, start: new Date()},
        {title: "C# 101", seats: 34, start: new Date(2015,9,4)},
        {title: "Java 101", seats: 45, start: new Date(2016,1,15)}
    ];

    res.send(courses);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
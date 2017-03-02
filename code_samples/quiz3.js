1. hello world
app.get('/api/hello', sayHello);

function sayHello(req, res) {
    console.log('Say Hello');
    res.send('<h1>Say Hello</h1>');
}

app.get('/api/json', function (req, res) {
    var course = {
        title: 'Java 101',
        seats: 23,
        start: new Date()
    };
    res.json(course);
});

----------------------------------------------------------------------------------------
2. Retrieving a Json array
Server
var courses = [
    {title: 'Java 101', seats: 12, start: new Date()},
    {title: 'C# 101', seats: 12, start: new Date()},
    {title: 'ASP.NET 101', seats: 12, start: new Date()},
    {title: 'Node.js 101', seats: 12, start: new Date()},
    {title: 'AngularJS 101', seats: 12, start: new Date()},
];

app.get('/api/course', function (req, res) {
    res.json(courses);
});


Client, AngularJS
$http.get("/api/course")
    .success(function(response){
        $scope.courses = response;
    });

<tr ng-repeat="course in courses">
    <td></td>
    <td></td>
    <td></td>
</tr>

----------------------------------------------------------------------------------------
3. Rendering w/ server data
Client
$scope.courses = {};
$http.get("/api/course")
    .success(function(response){
        $scope.courses = response;
    });

$scope.selectCourse = function() {
    alert("Selected Course: " + $scope.selectedCourse.title);
    var index = $scope.courses.indexOf($scope.selectedCourse);
    alert("Index: " + index);
}

----------------------------------------------------------------------------------------
4. Passing Path Parameters to REST Web API
Server
var courses = [
    {title: 'Java 101', seats: 12, start: new Date()},
    {title: 'C# 101', seats: 12, start: new Date()},
    {title: 'ASP.NET 101', seats: 12, start: new Date()},
    {title: 'Node.js 101', seats: 12, start: new Date()},
    {title: 'AngularJS 101', seats: 12, start: new Date()},
];
app.get('/api/course/:id', function (req, res) {
    var index = req.params.id;
    console.log(index);
    res.json(courses[index]);
});

Client
$scope.courses = {};
$http.get("/api/course")
    .success(function(response){
        $scope.courses = response;
    });

$scope.selectCourse = function() {
    var index = $scope.courses.indexOf($scope.selectedCourse);
    $http.get("/api/course/"+index)
        .success(function(response){
            $scope.fetchedCourse = response;
        });
}

----------------------------------------------------------------------------------------
5. Adding content using POST
Post new course
Client
<tr>
    <td><input class="form-control" ng-model="course.title" type="text"/></td>
    <td><input class="form-control" ng-model="course.seats" type="number"/></td>
    <td><input class="form-control" ng-model="course.start" type="date"/></td>
    <td>
        <button ng-click="add(course)"
                class="btn btn-success pull-right btn-block">
            <span class="glyphicon glyphicon-plus"></span>
        </button>
    </td>
</tr>

$scope.add = function(course) {
    $http.post("/api/course", course)
        .success(function(response){
            $scope.courses = response;
        });
}

Server
...
var bodyParser = require('body-parser');
var multer     = require('multer');
...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.post('/api/course', function (req, res) {
    var newCourse = req.body;
    console.log(newCourse);
    courses.push(newCourse);
    res.json(courses);
});


Retrieving Courses from Server on Page Load
Client
$scope.courses = {};
$http.get("/api/course")
    .success(function(response){
        $scope.courses = response;
    });

----------------------------------------------------------------------------------------
6. Deleting Using REST Web APIs
DELETE a Single Course
Client
<tr ng-repeat="course in courses">
    <td>{{course.title}}</td>
    <td>{{course.seats}}</td>
    <td>{{course.start | date}}</td>
    <td>
        <button ng-click="delete(course)" class="btn btn-danger pull-right">
            <span class="glyphicon glyphicon-remove"></span>
        </button>
    </td>
</tr>

$scope.delete = function(course) {
    var index = $scope.courses.indexOf(course);
    $http.delete("/api/course/"+index)
        .success(function(response){
            $scope.courses = response;
        });
}

Server
var courses = [
    {title: 'Java 101', seats: 12, start: new Date()},
    {title: 'C# 101', seats: 12, start: new Date()},
    {title: 'ASP.NET 101', seats: 12, start: new Date()},
    {title: 'Node.js 101', seats: 12, start: new Date()},
    {title: 'AngularJS 101', seats: 12, start: new Date()},
];
app.delete('/api/course/:id', function (req, res) {
    var index = req.params.id;
    courses.splice(index, 1);
    res.json(courses);
});


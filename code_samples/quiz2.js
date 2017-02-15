<!-- ng-app -->
<html lang="en" ng-app="HelloWorldApp">
...
</html>

<!-- ng-model -->
<input ng-model="title" class="form-control"/>
<h3>Title: {{title}}</h3>

<!-- ng-route -->
<a href="#/home"  class="btn btn-primary">Home</a>
<a href="#/profile" class="btn btn-success">Profile</a>
<a href="#/admin"   class="btn btn-danger">Admin</a>

<div ng-view>
</div>

(function(){
  angular
    .module("WhiteBoardApp", ["ngRoute"])
    .config(function($routeProvider){
      $routeProvider
        .when("/", {
          templateUrl: "home.html"
        })
        .when("/profile", {
          templateUrl: "profile.html"
        })
        .when("/admin", {
          templateUrl: "admin.html"
        })
        .otherwise({
          redirectTo: "/"
        });
    });
})();



<!-- ng-route location -->
<nav ng-controller="NavController">
  <a href="#/home"  class="btn" ng-class="{'btn-primary' : $location.url() == '/'}">Home</a>
  <a href="#/profile" class="btn" ng-class="{'btn-primary' : $location.url() == '/profile'}">Profile</a>
  <a href="#/admin"   class="btn" ng-class="{'btn-primary' : $location.url() == '/admin'}">Admin</a>
  <br/>
  {{$location.url()}}
</nav>

(function(){
  angular
    .module("WhiteBoardApp", ["ngRoute"])
    .controller("NavController", function($scope, $location){
      $scope.$location = $location;
    });
    ...
})();

<!-- ng-route controller -->

(function(){
  angular
    .module("WhiteBoardApp")
    .config(function($routeProvider){
      $routeProvider
        .when("/", {
          templateUrl: "home/home.view.html",
          controller: "HomeController"
        })
        .when("/profile", {
          templateUrl: "profile/profile.view.html",
          controller: "ProfileController"
        })
        .when("/admin", {
          templateUrl: "admin/admin.view.html",
          controller: "AdminController"
        })
        .otherwise({
          redirectTo: "/"
        });
    });
})();

<!-- ng-repeat 1-->
<ul>
    <li ng-repeat="courseName in controller.courseNames">
        {{courseName}}
    </li>
</ul>

function Example1Controller() {
    var vm = this;
    vm.courseNames = ["Course 1", "Course 2", "Course 3"];
}

<!-- ng-repeat 2-->
<tr ng-repeat="course in controller.courses">
    <td></td>
    <td></td>
    <td></td>
</tr>

function Example2Controller() {
  var vm = this;
  vm.courses = [
    {title: "Java 101",  seats: 12, start: new Date()},
    {title: "C# 101",    seats: 23, start: new Date(2015,8,5)},
    {title: "Node.js",   seats: 32, start: new Date(2015,9,7)},
    {title: "AngularJS", seats: 21, start: new Date(2016,0,15)}
  ];
}



<!--  -->
<html>
    <head>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet"/>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-route.js"></script>
        <script src="app.js"></script>
        <script src="config.js"></script>
        <script src="navController.js"></script>
        <script src="profile.js"></script>
        <script src="userController.js"></script>
        <script src="userService.js"></script>
    </head>
    <body>
        <div class="container">
            <br/>
            <ul class="nav nav-tabs">
                <li class="active"><a href="#/courses">Courses</a></li>
                <li><a href="#/users">Users</a></li>
                <li><a href="#/videos">Videos</a></li>
            </ul>
        </div>
        <div ng-view>
        </div>
    </body>
</html>


<!DOCTYPE html>
<html lang="en" ng-app="WhiteBoardApp">
<head>
    <meta charset="UTF-8">
    <link href="/css/bootstrap.min.css" rel="stylesheet"/>
    <script src="/js/angular.min.js"></script>
    <script src="/js/angular-route.min.js"></script>
    <script src="app.js"></script>
    <script src="config.js"></script>
    <script src="MainController.js"></script>
    <script src="CourseController.js"></script>
    <script src="CourseEditController.js"></script>
    <script src="CourseService.js"></script>
    <title>Ng Route</title>
</head>
<body ng-controller="MainController">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div ng-include="'header.html'"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <div ng-include="'sidebar.html'"></div>
            </div>
            <div class="col-sm-10" ng-view>
            </div>
        </div>
    </div>
</body>
</html>
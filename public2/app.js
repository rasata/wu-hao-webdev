/**
 * Created by wuhao on 2017-02-19.
 */
(function () {
    angular
        .module("WhiteBoardApp", ["ngRoute"])
        .controller("CourseController", courseController);

    function courseController($scope, $http) {
        $http.get("/rest/course")
            .success(function(response){
                $scope.courses = response;
            });

        $scope.hello = "Hello from course controller";
    }
})();
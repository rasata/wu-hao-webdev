/**
 * Created by wuhao on 2017-03-08.
 */

(function () {
    angular
        .module("WhiteBoardApp")
        .controller("CourseController", CourseController);

    function CourseController($scope, CourseService) {
        $scope.selectCourse = selectCourse;
        $scope.deleteCourse = deleteCourse;

        function createCourse(course) {
            CourseService.createCourse(course,
            function (courses) {
                $scope.courses = courses;
            });
        }

        function deleteCourse(id) {
            CourseService.removeCourseById(id,
            function (courses) {
                $scope.courses = courses;
            });
        }

        function selectCourse(id) {
            CourseService.findCourseById(id,
            function (course) {
                $scope.course = course[0];
            });
        }

        CourseService.findAllCourses(function (response) {
            $scope.courses = response;
        });
    }
})();
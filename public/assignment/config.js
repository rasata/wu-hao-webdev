/**
 * Created by wuhao on 2017-02-10.
 */
(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "user/login.view.client.html"
                // controller: "LoginController",
                // controllerAs: "model"
            })
            .when("/", {
                templateUrl: "user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "user/register.view.client.html"
            })
            .when("/user/:uid", {
                templateUrl: "user/profile.view.client.html"
            })
            .when("/user/:uid/website", {
                templateUrl: "website/website-list.view.client.html"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "website/website-new.view.client.html"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "website/website-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "page/page-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "page/page-new.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "page/page-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "widget/widget-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "widget/widget-chooser.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "widget/widget-edit.view.client.html"
            })
            .otherwise({
                templateUrl: "user/login.view.client.html"
            });

        // $locationProvider.html5Mode(true);
    }
})();
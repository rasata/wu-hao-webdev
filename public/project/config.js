/**
 * Created by wuhao on 2017-03-24.
 */
(function(){
    angular
        .module("AutonomousWriters")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                // controller: "HomeController",
                // controllerAs: "models"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                // controller: "HomeController",
                // controllerAs: "models"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/reader/:uid", {
                templateUrl: "views/user/templates/reader-profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/writer/:uid", {
                templateUrl: "views/user/templates/writer-profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/admin/:uid", {
                templateUrl: "views/user/templates/admin-profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/shelf", {
                templateUrl: "views/user/templates/bookshelf.view.client.html",
                controller: "BookshelfController",
                controllerAs:"model"
            })
            /*
            .when("/user/:uid/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "models"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "models"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "models"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "models"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "models"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "models"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "models"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "models"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "models"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "models"
            })
            */
            .otherwise({
                templateUrl: "views/home/home.view.client.html",
                // controller: "HomeController",
                // controllerAs: "model"
            });

        // $locationProvider.html5Mode(true);
    }
})();
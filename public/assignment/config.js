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
                templateUrl: "user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "loginModel"
            })
            .when("/", {
                templateUrl: "user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "loginModel"
            })
            .when("/register", {
                templateUrl: "user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "registerModel"
            })

            .when("/user/:uid", {
                templateUrl: "user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "profileModel"
            })
            .when("/user/:uid/website", {
                templateUrl: "website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "websiteListModel"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "newWebsiteModel"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "editWebsiteModel"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "pageListModel"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "newPageModel"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "editPageModel"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "widgetListModel"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "widget/widget-choose.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "newWidgetModel"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "editWidgetModel"
            })
            .otherwise({
                templateUrl: "user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "loginModel"
            });

        // $locationProvider.html5Mode(true);
    }
})();
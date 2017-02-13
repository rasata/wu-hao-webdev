/**
 * Created by wuhao on 2017-02-11.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($location, PageService) {
        var vm = this;

        // event handlers
        // vm.login = login;

        function init() {
        }
        init();
    }

    function NewPageController($location, PageService) {
        var vm = this;

        // event handlers
        // vm.login = login;

        function init() {
        }
        init();
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        // /user/:uid/website/:wid/page/:pid
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        // event handlers
        // vm.login = login;

        function init() {
        }
        init();
    }
})();
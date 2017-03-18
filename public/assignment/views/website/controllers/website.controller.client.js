/**
 * Created by wuhao on 2017-02-11.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        // /user/:uid/website
        vm.userId = $routeParams["uid"];

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function (websites) {
                // console.log(websites);
                vm.websites = websites;
            });
        }

        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams["uid"];

        // event handler
        vm.createWebsite = createWebsite;

        function init() {
            // event handlers
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function (websites) {
                // console.log(websites);
                vm.websites = websites;
            });
        }

        init();

        function createWebsite(website) {
            var promise = WebsiteService.createWebsite(vm.userId, website);
            promise.success(function (newSite) {
                $location.url("/user/" + vm.userId + "/website");
            });

            promise.error(function (res, statusCode) {
                vm.error = "Cannot create site.";
            });
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        // /user/:uid/website/:wid

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        // event handler
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            var sitesPromise = WebsiteService.findWebsitesByUser(vm.userId);
            sitesPromise.success(function (websites) {
                vm.websites = websites;
            });

            var sitePromise = WebsiteService.findWebsiteById(vm.websiteId);
            sitePromise.success(function (website) {
                vm.website = website;
            });
        }

        init();

        function deleteWebsite() {
            var deletePromise = WebsiteService.deleteWebsite(vm.websiteId);
            deletePromise.success(function () {
                $location.url("/user/" + vm.userId + "/website");
            });

            deletePromise.error(function (errorBody, errorCode) {
                vm.error = errorCode + " Failed Deleting the website. " + errorBody;
            });
        }

        function updateWebsite() {
            var updatePromise = WebsiteService.updateWebsite(vm.websiteId, vm.website);
            updatePromise.success(function () {
                $location.url("/user/" + vm.userId + "/website");
            });

            updatePromise.error(function (errorBody, errorCode) {
                vm.error = errorCode + " Failed Updating the website. " + errorBody;
            });
        }
    }
})();
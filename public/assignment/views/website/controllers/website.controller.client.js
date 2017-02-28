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
                console.log(websites);
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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite(website) {
            var newSite = WebsiteService.createWebsite(vm.userId, website);
            if (newSite == null) {
                vm.error = "Cannot create site.";
            } else {
                $location.url("/user/"+vm.userId+"/website");
            }
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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite() {
            var flag = WebsiteService.deleteWebsite(vm.websiteId);
            if(flag) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Failed Deleting the website.";
            }
        }

        function updateWebsite() {
            var newWebsite = WebsiteService.updateWebsite(vm.websiteId, vm.website);
            if (newWebsite) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Failed to update the website.";
            }
        }
    }
})();
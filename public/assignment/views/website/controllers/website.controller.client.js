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
            // event handlers
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            // event handlers
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.createWebsite = createWebsite;
        }
        init();

        function createWebsite(website) {
            // console.log(vm.userId);
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

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);

            // event handler
            vm.deleteWebsite = deleteWebsite;
            vm.updateWebsite = updateWebsite;
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
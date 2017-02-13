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
        vm.createWebsite = createWebsite;

        function init() {
            // event handlers
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website");
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.deleteWebsite = deleteWebsite;

        function init() {
            // event handlers
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite() {
            console.log("removing website: " + vm.websiteId);
            // var temp = WebsiteService.findWebsiteById(vm.websiteId);
            // console.log(temp);
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        }
    }
})();
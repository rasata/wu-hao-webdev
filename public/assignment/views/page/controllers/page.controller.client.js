/**
 * Created by wuhao on 2017-02-11.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, $location, PageService) {
        var vm = this;
        // /user/:uid/website/:wid/page
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        // /user/:uid/website/:wid/page/new
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        // event handlers
        vm.createPage = createPage;

        function init() {
        }
        init();

        function createPage(page) {
            var newPage = PageService.createPage(vm.websiteId, page);
            if (newPage != null) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Cannot create page.";
            }
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        // /user/:uid/website/:wid/page/:pid
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        // event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
        
        function updatePage(page) {
            var newPage = PageService.updatePage(vm.pageId, page);
            if(newPage === null) {
                vm.error = "Update page failed.";
            } else {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
        }
        
        function deletePage() {
            var flag = PageService.deletePage(vm.pageId);
            if(flag) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Delete page failed.";
            }
        }
    }
})();
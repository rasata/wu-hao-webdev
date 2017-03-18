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
            // pages
            var pagesPromise = PageService.findPageByWebsiteId(vm.websiteId);
            pagesPromise
                .success(function (pages) {
                    if (pages == null || pages.length == 0) {
                        vm.error = "Could not find related pages.";
                    } else {
                        vm.pages = pages;
                    }
                })
                .error(function (errorBody, errorCode) {
                    vm.error = "Finding pages failed. " + errorBody + " " + errorCode;
                });
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
            var createPagePromise = PageService.createPage(vm.websiteId, page);
            createPagePromise.success(function () {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            });

            createPagePromise.error(function (errBody, errCode) {
                vm.error = "Creating page failed. " + errBody + " " + errCode;
            });
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
            // pages
            var pagesPromise = PageService.findPageByWebsiteId(vm.websiteId);
            pagesPromise.success(function (pages) {
                if (pages == null || pages.length == 0) {
                    vm.error = "Could not find related pages.";
                } else {
                    vm.pages = pages;
                }
            });

            pagesPromise.error(function (errorBody, errorCode) {
                vm.error = "Finding pages failed. " + errorBody + " " + errorCode;
            });

            // page
            var pagePromise = PageService.findPageById(vm.pageId);
            pagePromise.success(function (page) {
                if (page === null) {
                    vm.error = "Could not find requested page.";
                } else {
                    vm.page = page;
                }
            });

            pagesPromise.error(function (errorBody, errorCode) {
                vm.error = "Finding page failed. " + errorBody + " " + errorCode;
            });
        }

        init();

        function updatePage(page) {
            var updatePagePromise = PageService.updatePage(vm.pageId, page);
            updatePagePromise.success(function (updatedPage) {
                if (updatedPage == null) {
                    vm.error = "Update page failed."
                } else {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }
            });

            updatePagePromise.error(function (errBody, errCode) {
                vm.error = "Updating page failed. " + errBody + " " + errCode;
            });
        }

        function deletePage() {
            var deletePagePromise = PageService.deletePage(vm.pageId);
            deletePagePromise.success(function () {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            });

            deletePagePromise.error(function (errBody, errCode) {
                vm.error = "Delete page failed. " + errBody + ' ' + errCode;
            });
        }
    }
})();
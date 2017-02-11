/**
 * Created by wuhao on 2017-02-11.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($location, WebsiteService) {
        var vm = this;

        // event handlers
        // vm.login = login;

        function init() {
        }
        init();
    }

    function NewWebsiteController($location, WebsiteService) {
        var vm = this;

        // event handlers
        // vm.login = login;

        function init() {
        }
        init();
    }

    function EditWebsiteController($location, WebsiteService) {
        var vm = this;

        // event handlers
        // vm.login = login;

        function init() {
        }
        init();
    }
})();
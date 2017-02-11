/**
 * Created by wuhao on 2017-02-11.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($location, WidgetService) {
        var vm = this;

        // event handlers
        // vm.login = login;

        function init() {
        }
        init();
    }

    function NewWidgetController($location, WidgetService) {
        var vm = this;

        // event handlers
        // vm.login = login;

        function init() {
        }
        init();
    }

    function EditWidgetController($location, WidgetService) {
        var vm = this;

        // event handlers
        // vm.login = login;

        function init() {
        }
        init();
    }
})();
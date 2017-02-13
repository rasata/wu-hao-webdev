/**
 * Created by wuhao on 2017-02-11.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams, $location, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        // var vm = this;
        // vm.userId = $routeParams.uid;
        // vm.websiteId = $routeParams.wid;
        // vm.pageId = $routeParams.pid;
        // vm.widgets = WidgetService.findAllWidgets(vm.pageId);

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            console.log("I'm here: " + widgetUrl);
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
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
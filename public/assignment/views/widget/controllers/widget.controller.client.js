/**
 * Created by wuhao on 2017-02-11.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($sce, $routeParams, $location, WidgetService) {
        var vm = this;
        // /user/:uid/website/:wid/page/:pid/widget
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        // Event handlers
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.reorderWidget = reorderWidget;

        function init() {
            var widgetsPromise = WidgetService.findWidgetsByPageId(vm.pageId);
            widgetsPromise.success(function (newWidgets) {
                vm.widgets = newWidgets;
            });

            // $("#widget-list")
            //     .sortable({axis: 'y'});
        }

        init();

        function reorderWidget(index1, index2) {
            var promise = WidgetService.reorderWidget(vm.pageId, index1, index2);

            promise.success(function (newWidget) {
            });

            promise.error(function (errBody, errCode) {
                vm.error = "Failed reordering widget. " + errCode + ' ' + errBody;
            });
        }

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-' + widgetType.toLowerCase() + '.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;

        // /user/:uid/website/:wid/page/:pid/widget/new
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        function init() {
            // event handlers
            var widgetsPromise = WidgetService.findWidgetsByPageId(vm.pageId);
            widgetsPromise.success(function (newWidgets) {
                vm.widgets = newWidgets;
            });
        }

        init();

        function createWidget(widget) {
            // TODO: createWidget not being used right now.
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise.success(function (newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
            });

            promise.error(function (errBody, errCode) {
                vm.error = "Failed creating widget. " + errCode + ' ' + errBody;
            });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;

        // /user/:uid/website/:wid/page/:pid/widget/:wgid
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        // event handlers
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.searchFlickr = searchFlickr;

        function init() {
            var wsPromise = WidgetService.findWidgetsByPageId(vm.pageId);
            wsPromise.success(function (newWidgets) {
                vm.widgets = newWidgets;
            });

            var wPromise = WidgetService.findWidgetById(vm.widgetId);
            wPromise.success(function (newWidget) {
                vm.widget = newWidget;
            });
        }

        init();

        function searchFlickr() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId
                + "/widget/" + vm.widgetId + "/flickr");
        }

        function updateWidget(widget) {
            var widgetPromise = WidgetService.updateWidget(vm.widgetId, widget);
            widgetPromise.success(function (newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            });

            widgetPromise.error(function () {
                vm.error = "Update Widget Failed.";
            });
        }

        function deleteWidget() {
            var widgetPromise = WidgetService.deleteWidget(vm.widgetId);
            widgetPromise.success(function () {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            });

            widgetPromise.error(function () {
                vm.error = "Delete Widget Failed.";
            });
        }
    }
    
    // function FlickerController($routeParams) {
    // };
})();
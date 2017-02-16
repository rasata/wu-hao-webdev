/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular
        .module("WebAppMaker")
        // .service("WidgetService", WidgetService);
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        // Service Method
        // this.createWebsite = createWidget;
        // this.findWidgetsByPageId = findWidgetsByPageId;
        // this.findWidgetById = findWidgetById;
        // this.updateWidget = updateWidget;
        // this.deleteWidget = deleteWidget;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        // createWidget(pageId, widget) - adds the widget parameter instance to the local widgets array.
        // The new widget's pageId is set to the pageId parameter
        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        // findWidgetsByPageId(pageId) -
        // retrieves the widgets in local widgets array whose pageId matches the parameter pageId
        function findWidgetsByPageId(pageId) {
            var ret = [];
            for(var w in widgets) {
                if (widgets[w].pageId == pageId) {
                    ret.push(angular.copy(widgets[w]));
                }
            }

            return ret;
        }

        // findWidgetById(widgetId) -
        // retrieves the widget in local widgets array whose _id matches the widgetId parameter
        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        // { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        // updateWidget(widgetId, widget) -
        // updates the widget in local widgets array whose _id matches the widgetId parameter
        function updateWidget(widgetId, widget) {
            if (widget === null) {
                return widget;
            }

            for (var i = 0; i < widgets.length; ++i) {
                if (widgets[i]._id == widgetId) {
                    widgets[i] = angular.copy(widget);
                    return widgets[i];
                }
            }
            return null
        }

        // deleteWidget(widgetId) -
        // removes the widget from local widgets array whose _id matches the widgetId parameter
        function deleteWidget(widgetId) {
            for (var i = 0; i < widgets.length; ++i) {
                if (widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
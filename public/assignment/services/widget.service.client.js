/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular
        .module("WebAppMaker")
        // .service("WidgetService", WidgetService);
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        // this.createWebsite = createWidget;
        // this.findWidgetsByPageId = findWidgetsByPageId;
        // this.findWidgetById = findWidgetById;
        // this.updateWidget = updateWidget;
        // this.deleteWidget = deleteWidget;

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "123", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "123", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "123", "text": "<p>Lorem ipsum</p>"},
            { "_id": "000", "widgetType": "IMAGE", "pageId": "123", "width": "50%",
                "url": "http://thecatapi.com/api/images/get?format=src&type=gif"}
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
                    ret.push(widgets[w]);
                }
            }
            console.log("Hi mom!");
            console.log(ret);
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

        // updateWidget(widgetId, widget) -
        // updates the widget in local widgets array whose _id matches the widgetId parameter
        function updateWidget(widgetId, widget) {
            for (var i = 0; i < widgets.length; ++i) {
                if (widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                    return;
                }
            }
        }

        // deleteWidget(widgetId) -
        // removes the widget from local widgets array whose _id matches the widgetId parameter
        function deleteWidget(widgetId) {
            for (var i = 0; i < widgets.length; ++i) {
                if (widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                    return;
                }
            }
        }
    }
})();
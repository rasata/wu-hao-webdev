/**
 * Created by wuhao on 2017-02-10.
 */
/**
 * Created by wuhao on 2017-02-11.
 */
/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular.module("WebAppMaker").factory("WidgetService", WidgetService);

    function WidgetService() {
        widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

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
            return ret;
        }

        // findWidgetById(widgetId) -
        // retrieves the widget in local widgets array whose _id matches the widgetId parameter
        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    return widgets[w];
                }
            }
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
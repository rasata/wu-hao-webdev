/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "reorderWidget": reorderWidget,
            "updateFlickrWidget": updateFlickrWidget
        };
        return api;
        
        function reorderWidget(pageId, index1, index2) {
            // /api/page/:pageId/widget?initial=index1&final=index2
            return $http.put("/api/page/" + pageId + "/widget?start=" + index1 + "&end=" + index2);
        }
        
        // createWidget(pageId, widget) - adds the widget parameter instance to the local widgets array.
        // The new widget's pageId is set to the pageId parameter
        function createWidget(pageId, widget) {
            // /api/page/:pageId/widget
            return $http.post("/api/page/" + pageId +"/widget", widget);
        }

        // findWidgetsByPageId(pageId) -
        // retrieves the widgets in local widgets array whose pageId matches the parameter pageId
        function findWidgetsByPageId(pageId) {
            // /api/page/:pageId/widget
            return $http.get("/api/page/" + pageId + "/widget");
        }

        // findWidgetById(widgetId) -
        // retrieves the widget in local widgets array whose _id matches the widgetId parameter
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        // { "_id": "123", "type": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        // updateWidget(widgetId, widget) -
        // updates the widget in local widgets array whose _id matches the widgetId parameter
        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId, widget);
        }

        // TODO: update widget for Flickr url, take care of index
        function updateFlickrWidget(websiteId, pageId, widgetId, urlObj) {
            var newWidget = urlObj;
            newWidget.websiteId = websiteId;
            newWidget.type = "IMAGE";
            newWidget.pageId = pageId;

            return $http.put("/api/widget/"+widgetId+"/flickr", newWidget);
        }

        // deleteWidget(widgetId) -
        // removes the widget from local widgets array whose _id matches the widgetId parameter
        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }

        // TODO: upload selected photo to the server side
    }
})();
module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget?", reorderWidget);

    var widgets = [
        { "_id": "123", "index": 0, "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "index": 1, "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "index": 2, "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "index": 3, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "index": 4, "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "index": 5, "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "index": 6, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function reorderWidget(req, res) {
        // /api/page/:pageId/widget
        // TODO: is this really working? why go to list and back will forget the index change?
        var pageId = req.params.pageId;
        var index1 = req.query.initial;
        var index2 = req.query.final;

        console.log("Hi mom, im in reorderWidget widgetserver");
        console.log(index1);
        console.log(index2);

        var index1Widget = widgets.find(function (w) {
            return w.index == index1;
        });

        var index2Widget = widgets.find(function (w) {
            return w.index == index2;
        });

        // swap indexes
        index1Widget.index = index2;
        index2Widget.index = index1;

        console.log(index1Widget);
        console.log(index2Widget);

        // res.status(500).send("Could not find the matching widget index.");
        res.sendStatus(200);
    }

    function createWidget(req, res) {
        // /api/page/:pageId/widget
        var pageId = req.params.pageId;
        var newWidget = req.body;

        newWidget.pageId = pageId;
        newWidget._id = (new Date()).getTime();
        widgets.push(newWidget);
        res.send(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        // /api/page/:pageId/widget
        var pageId = req.params.pageId;

        var ret = [];
        for(var w in widgets) {
            if (widgets[w].pageId == pageId) {
                ret.push(widgets[w]);
            }
        }
        res.json(ret);
    }

    function findWidgetById(req, res) {
        // /api/widget/:widgetId
        var widgetId = req.params.widgetId;

        var widget = widgets.find(function (w) {
            return w._id == widgetId;
        });

        res.send(widget);
    }

    function updateWidget(req, res) {
        // /api/widget/:widgetId
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        if (newWidget === null) {
            res.status(500).send("Given new widget is empty");
        }
        //
        for (var i = 0; i < widgets.length; ++i) {
            if (widgets[i]._id == widgetId) {
                widgets[i] = newWidget;
                res.send(widgets[i]);
                return;
            }
        }
        res.status(500).send("Could not find the matching widget.");
    }

    function deleteWidget(req, res) {
        // /api/widget/:widgetId
        var widgetId = req.params.widgetId;

        for (var i = 0; i < widgets.length; ++i) {
            if (widgets[i]._id == widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(500).send("Could not find the matching widget.");
    }
};
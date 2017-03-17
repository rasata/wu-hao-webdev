module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget?", reorderWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/widget/:widgetId/flickr", updateFlickrWidget);

    var widgets = [
        {"_id": "123", "index": 0, "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "index": 1, "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "index": 2, "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "index": 3, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "index": 4, "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "index": 5, "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "index": 6, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var widget = widgets.find(function (w) {
            return w._id == widgetId;
        });

        widget.url = "../uploads/" + filename;
        widget.width = width;
        res.redirect(req.headers.referer + "#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
    }

    function reorderWidget(req, res) {
        // /api/page/:pageId/widget
        var pageId = req.params.pageId;
        var initialIndex = req.query.initial;
        var finalIndex = req.query.final;

        // set moved widget to the new position
        var movedWidget = widgets.find(function (w) {
            return w.index == initialIndex;
        });
        movedWidget.index = finalIndex;

        // find all widget in this page except moved widget
        var widgetsInPage = [];
        for (var w in widgets) {
            if (widgets[w].pageId == pageId && widgets[w]._id != movedWidget._id) {
                widgetsInPage.push(widgets[w]);
            }
        }
        widgetsInPage.sort(compareIndex);

        if (initialIndex < finalIndex) {
            // the widget moved down
            // anyone initialIndex < x <= finalIndex needs to decrease 1
            for(var i = 0; i < widgetsInPage.length; ++i) {
                if (widgetsInPage[i].index <= initialIndex) {
                    continue
                } else if (widgetsInPage[i].index <= finalIndex) {
                    widgetsInPage[i].index--;
                } else if (widgetsInPage[i].index > finalIndex) {
                    break;
                }
            }
        } else if (initialIndex > finalIndex) {
            // the widget moved up
            // anyone finalIndex <= x < initialIndex needs to increase 1
            for(var i = 0; i < widgetsInPage.length; ++i) {
                if (widgetsInPage[i].index < finalIndex) {
                    continue
                } else if (widgetsInPage[i].index <= initialIndex) {
                    widgetsInPage[i].index++;
                } else if (widgetsInPage[i].index > initialIndex) {
                    break;
                }
            }
        }

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

// a compare function for sorting array by index
    function compareIndex(a, b) {
        if (a.index < b.index)
            return -1;
        if (a.index > b.index)
            return 1;
        return 0;
    }

    function findAllWidgetsForPage(req, res) {
        // /api/page/:pageId/widget
        var pageId = req.params.pageId;

        var ret = [];
        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                ret.push(widgets[w]);
            }
        }

        ret.sort(compareIndex);
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

        for (var i = 0; i < widgets.length; ++i) {
            if (widgets[i]._id == widgetId) {
                widgets[i] = newWidget;
                res.send(widgets[i]);
                return;
            }
        }
        res.status(500).send("Could not find the matching widget.");
    }

    function updateFlickrWidget(req, res) {
        // /api/widget/:widgetId/flickr
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        if (newWidget === null) {
            res.status(500).send("Given new widget is empty");
        }

        for (var i = 0; i < widgets.length; ++i) {
            if (widgets[i]._id == widgetId) {
                widgets[i].url = newWidget.url;
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
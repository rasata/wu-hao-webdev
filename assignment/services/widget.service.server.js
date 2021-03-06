module.exports = function (app, model) {
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

        // widget.url = "../uploads/" + filename;
        // widget.width = width;
        // var widget = widgets.find(function (w) {
        //     w._id == widgetId;
        // });
        var newWidget = new Object();
        newWidget.type = "IMAGE";
        newWidget.url = "../uploads/" + filename;
        newWidget.width = width;
        newWidget._page = pageId;

        model.WidgetModel.findWidgetById(widgetId).then(
            function (oldWidget) {
                if (oldWidget === undefined) {
                    // this is a new widget
                    model.WidgetModel.createWidget(pageId, newWidget)
                        .then(
                            function (widget) {
                                res.json(widget);
                            },
                            function (error) {
                                res.status(500).send(error);
                            }
                        )
                } else {
                    model.WidgetModel.updateWidget(widgetId, newWidget)
                        .then(
                            function (widget) {
                                res.sendStatus(200);
                            },
                            function (error) {
                                res.status(500).send(error);
                            }
                        );
                }
            }
        );

        res.redirect(req.headers.referer + "#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
    }

    function reorderWidget(req, res) {
        // /api/page/:pageId/widget
        var pageId = req.params.pageId;
        var startIndex = parseInt(req.query.start);
        var endIndex = parseInt(req.query.end);

        // if (models.WidgetModel.reorderWidget(pageId, startIndex, endIndex)) {
        //     res.sendStatus(200);
        // } else {
        //     res.sendStatus(500);
        // }
        model.WidgetModel.reorderWidget(pageId, startIndex, endIndex)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

// a compare function for sorting array by index
//     function compareIndex(a, b) {
//         if (a.index < b.index)
//             return -1;
//         if (a.index > b.index)
//             return 1;
//         return 0;
//     }


    function createWidget(req, res) {
        // /api/page/:pageId/widget
        var pageId = req.params.pageId;
        var newWidget = req.body;

        model.WidgetModel.findAllWidgetsForPage(pageId).then(
            function (widgetsInPage) {
                model.WidgetModel.createWidget(pageId, newWidget, widgetsInPage)
                    .then(
                        function (widget) {
                            res.json(widget);
                        },
                        function (error) {
                            res.status(500).send(error);
                        }
                    )
            },
            function (err) {
                model.WidgetModel.createWidget(pageId, newWidget)
                    .then(
                        function (widget) {
                            res.json(widget);
                        },
                        function (error) {
                            res.status(500).send(error);
                        }
                    )
            }
        );
    }

    function findAllWidgetsForPage(req, res) {
        // /api/page/:pageId/widget
        var pageId = req.params.pageId;

        model.WidgetModel.findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.status(500).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        // /api/widget/:widgetId
        var widgetId = req.params.widgetId;

        model.WidgetModel.findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.status(500).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        // /api/widget/:widgetId
        var widgetId = req.params.widgetId;
        var newWidget = req.body;

        if (newWidget === null) {
            res.status(500).send("Given new widget is empty");
        }

        model.WidgetModel.updateWidget(widgetId, newWidget)
            .then(
                function (widget) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(500).send(error);
                }
            );
    }

    // TODO: right now is the same with updateWidget. need to change?
    function updateFlickrWidget(req, res) {
        // /api/widget/:widgetId/flickr
        var widgetId = req.params.widgetId;
        var newWidget = req.body;

        if (newWidget === null) {
            res.status(500).send("Given new widget is empty");
        }

        model.WidgetModel.updateWidget(widgetId, newWidget)
            .then(
                function (widget) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(500).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        // /api/widget/:widgetId
        var widgetId = req.params.widgetId;

        model.WidgetModel.deleteWidget(widgetId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(500).send(err);
                }
            )
    }
};
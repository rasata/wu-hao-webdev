/**
 * Created by wuhao on 2017-03-17.
 */
module.exports = function (app) {
    var mongoose = require("mongoose");
    mongoose.Promise = require('q').Promise;

    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "reorderWidget": reorderWidget
    };
    return api;

    // Creates new widget instance for parent page whose _id is pageId
    function createWidget(pageId, widget, widgetsInPage) {
        widget._page = pageId;
        if (widgetsInPage === undefined) {
            widget.index = 0;
            return WidgetModel.create(widget);
        } else {
            var max = 0;
            for (var w in widgetsInPage) {
                if (widgetsInPage[w].index >= max) {
                    max = widgetsInPage[w].index + 1;
                }
            }
            widget.index = max;
            return WidgetModel.create(widget);
        }

        // WidgetModel.find({_page: pageId}, function (err, widgetsInPage) {
        //     console.log("Please work!");
        //     console.log(JSON.stringify(widgetsInPage));
        //     for (var w in widgetsInPage) {
        //         if (widgetsInPage[w].index >= max) {
        //             max = widgetsInPage[w].index + 1;
        //         }
        //     }
        //     widget.index = max;
        //     console.log(widget.index);
        // });
    }

    // Retrieves all widgets for parent page whose _id is pageId
    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({_page: pageId}).sort({index: 'asc'});
    }

    // Retrieves widget whose _id is widgetId
    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    // Updates widget whose _id is widgetId
    function updateWidget(widgetId, widget) {
        return WidgetModel.update({_id: widgetId}, {$set: widget});
    }

    // Removes widget whose _id is widgetId
    function deleteWidget(widgetId) {
        return WidgetModel.remove({_id: widgetId});
    }

    // Modifies the order of widget at position start into final position end in page whose _id is pageId
    function reorderWidget(pageId, initialIndex, finalIndex) {
        var start = parseInt(initialIndex);
        var end = parseInt(finalIndex);

        // update the widget itself
        if (start < end) {
            // the widget moved down
            // anyone start < x <= end needs to decrease 1

            return WidgetModel.find({_page: pageId, index: {$gte: start, $lte: end}})
                .then(function (widgetsInPage) {
                    for (var w in widgetsInPage) {
                        if (widgetsInPage[w].index == start) {
                            WidgetModel.findByIdAndUpdate(widgetsInPage[w]._id, {$set: {index: end}},
                                function (err, res) {
                                    if (err) {
                                        console.log("update index " + widgetsInPage[w].index + " error");
                                    }
                                });
                        }

                        if (widgetsInPage[w].index > start && widgetsInPage[w].index <= end) {
                            WidgetModel.findByIdAndUpdate(widgetsInPage[w]._id,
                                {$set: {index: widgetsInPage[w].index - 1}},
                                function (err, res) {
                                    if (err) {
                                        console.log("update index " + widgetsInPage[w].index + " error");
                                    }
                                });
                        }
                    }
                });
        } else if (start > end) {
            // the widget moved up
            // anyone end <= x < start needs to increase 1
            return WidgetModel.find({_page: pageId, index: {$gte: end, $lte: start}})
                .then(function (widgetsInPage) {
                    for (var w in widgetsInPage) {
                        if (widgetsInPage[w].index == start) {
                            WidgetModel.findByIdAndUpdate(widgetsInPage[w]._id,
                                {$set: {index: end}},
                                function (err, res) {
                                    if (err) {
                                        console.log("update index " + widgetsInPage[w].index + " error");
                                    }
                                });
                        }

                        if (widgetsInPage[w].index >= end && widgetsInPage[w].index < start) {
                            WidgetModel.findByIdAndUpdate(widgetsInPage[w]._id,
                                {$set: {index: widgetsInPage[w].index + 1}},
                                function (err, res) {
                                    if (err) {
                                        console.log("update index " + widgetsInPage[w].index + " error");
                                    }
                                });
                        }
                    }
                });
        }
    }
};
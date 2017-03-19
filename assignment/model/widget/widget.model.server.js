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
    function createWidget(pageId, widget) {
        widget._page = pageId;
        return WidgetModel.create(widget);
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

    // TODO: finish widget reordering
    // Modifies the order of widget at position start into final position end in page whose _id is pageId
    function reorderWidget(pageId, initialIndex, finalIndex) {
        var start = parseInt(initialIndex);
        var end = parseInt(finalIndex);

        // update the widget itself
        if (start < end) {
            // the widget moved down
            // anyone start < x <= end needs to decrease 1
            // return WidgetModel.find({_page: pageId}).where('index').gte(start).lte(end).exec(
            return WidgetModel.find({_page: pageId, index: {$gte: start, $lte: end}})
                .then(function (widgetsInPage) {
                    // console.log(JSON.stringify(widgetsInPage));
                    console.log("reorder widget, moved up, length " + widgetsInPage.length);
                    // var widgetsInPageParsed = JSON.parse(widgetsInPage);
                    // console.log(widgetsInPageParsed);
                    for (var w in widgetsInPage) {
                        if (widgetsInPage[w].index == start) {
                            WidgetModel.findByIdAndUpdate(widgetsInPage[w]._id, {$set: {index: end}})
                                .then(
                                    function (response) {
                                        console.log("update successful " + response);
                                    },
                                    function (err) {
                                        console.log("update unsuccessful " + err);
                                    }
                                );
                        }

                        if (widgetsInPage[w].index > start && widgetsInPage[w].index <= end) {
                            WidgetModel.findByIdAndUpdate(widgetsInPage[w]._id, {$set: {index: widgetsInPage[w].index - 1}})
                                .then(
                                    function (response) {
                                        console.log("update successful " + response);
                                    },
                                    function (err) {
                                        console.log("update unsuccessful " + err);
                                    }
                                );
                        }
                    }
                });
        } else if (start > end) {
            // the widget moved up
            // anyone end <= x < start needs to increase 1
            WidgetModel.find({_page: pageId, index: {$gte: end, $lte: start}})
                .then(function (widgetsInPage) {
                    // console.log(JSON.stringify(widgetsInPage));
                    console.log("reorder widget, moved down, length " + widgetsInPage.length);
                });
        }
    }
};
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
        return WidgetModel.find({_page: pageId});
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
    function reorderWidget(pageId, start, end) {

    }
};
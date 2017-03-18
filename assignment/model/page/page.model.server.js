/**
 * Created by wuhao on 2017-03-17.
 */
module.exports = function (app) {
    var mongoose = require("mongoose");
    mongoose.Promise = require('q').Promise;

    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel.update({_id: pageId}, {$set: page});
    }

    function deletePage(pageId) {
        return PageModel.remove({_id: pageId});
    }
};
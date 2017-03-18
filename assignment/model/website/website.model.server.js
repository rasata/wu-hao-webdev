/**
 * Created by wuhao on 2017-03-17.
 */
module.exports = function (app) {
    var mongoose = require("mongoose");
    mongoose.Promise = require('q').Promise;

    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        "createWebsite": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite
    };

    // Creates a new website instance for user whose _id is userId
    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return WebsiteModel.create(website);
    }

    // Retrieves all website instances for user whose  _id is userId
    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({_user: userId});
    }

    // Retrieves single website instance whose _id is websiteId
    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    // Updates website instance whose _id is websiteId
    function updateWebsite(websiteId, website) {
        return WebsiteModel.update({_id: websiteId}, {$set: website});
    }

    // Removes website instance whose _id is websiteId
    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({_id: websiteId});
    }

    return api;
};
/**
 * Created by wuhao on 2017-03-17.
 */
module.exports = function (app) {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
        name: {type: String, required: true},
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: "page"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "website"});

    return WebsiteSchema;
};
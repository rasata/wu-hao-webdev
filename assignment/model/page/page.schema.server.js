/**
 * Created by wuhao on 2017-03-17.
 */
module.exports = function (app) {
    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: "website", required: true},
        name: {type: String, required: true},
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "widget"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "page"});

    return PageSchema;
};
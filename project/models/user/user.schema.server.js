/**
 * Created by wuhao on 2017-03-25.
 */
module.exports = function (app) {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        role: {type: String, enum: ["admin", "reader", "writer"], required: true, default: "reader"},
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        address: String,
        bookshelf: [{
            _id: {type: mongoose.Schema.Types.ObjectId, ref: 'book'},
            updated: Boolean
        }]
        ,
        // writerInfo: {
        publishedList: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}]
        ,
        dateCreated: {type: Date, default: Date.now},
        goodreads: {
            id: String
        },
        facebook: {
            id: String,
            token: String
        },
        google: {
            id: String
        },
        twitter: {
            id: String
        }
    }, {collection: "user"});

    return UserSchema;
};
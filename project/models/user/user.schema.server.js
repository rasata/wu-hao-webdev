/**
 * Created by wuhao on 2017-03-25.
 */
module.exports = function (app) {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, enum: ["admin", "reader", "writer"], required: true, default: "reader"},
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        address: String,
        readerInfo: {
            shelf: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}]
            // bookFollowing: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}],
            // Optional features for later
            // 1. follow an author
            // 2. bookmark an article, book
            // 3. liked books, articles
        },
        writerInfo: {
            publishedList: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}]
        },
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user"});

    return UserSchema;
};
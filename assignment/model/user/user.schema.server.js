module.exports = function (app) {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        // websites: [{type: array, "default": []}], // TODO: will this work?
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'website'}],
        dateCreated: {type: Date, default: Date.now},
        google: {
            id: String
        },
        facebook: {
            id: String
        },
        twitter: {
            id: String
        },
        goodreads: {
            id: String
        }
    }, {collection: "user"});

    return UserSchema;
};
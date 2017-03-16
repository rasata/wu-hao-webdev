module.exports = function (app) {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: array, "default": []}], // TODO: will this work?
        dateCreated: Date
    }, {collection: "assignment.user"});

    return UserSchema;
};
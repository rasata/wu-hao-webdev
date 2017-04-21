/**
 * Created by wuhao on 2017-03-26.
 */
module.exports = function (app) {
    var mongoose = require("mongoose");

    var BookSchema = mongoose.Schema({
        title: {type: String, required: true},
        authors: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
        isbn: String,
        articles: [{type: mongoose.Schema.Types.ObjectId, ref: "article"}],
        subscribers: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
        genres: {
            type: [String]
        },
        liked: Number,
        imageUrl: String,
        description: String
    }, {collection: "book"});

    return BookSchema;
};

/*
 1. title
 2. authors: [ref to users]
 3. ISBN
 4. articles: [references to articles]
 5. subscriber: []
 6. categories:
 7. liked: number of total liked
 */
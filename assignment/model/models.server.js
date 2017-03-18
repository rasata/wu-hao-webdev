module.exports = function (app) {
    // require("./user/user.schema.server");
    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    // var pageModel = require("./page/page.model.server.js")();
    // var widgetModel = require("./widget/widget.model.server.js")();

    var connectionString = 'mongodb://127.0.0.1:27017/assignment';

    var mongoose = require("mongoose");
    // mongoose.createConnection(connectionString);
    mongoose.connect(connectionString);

    // userModel.createUser({username: "mojo", password: "mojo", firstname: "mo", lastName: "jo"});
    // userModel.findUserByUsername("mojo")
    //     .then(function (user) {
    //         console.log(user);
    //     });

    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    // ];
    // websiteModel.createWebsiteForUser({""});

    var model = {
        UserModel: userModel,
        WebModel: websiteModel
        // PageModel: pageModel,
        // WidgetModel: widgetModel
    }
    return model;
};
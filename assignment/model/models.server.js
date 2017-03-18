module.exports = function (app) {
    // require("./user/user.schema.server");
    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();

    var connectionString = 'mongodb://127.0.0.1:27017/assignment';

    var mongoose = require("mongoose");
    // mongoose.createConnection(connectionString);
    mongoose.connect(connectionString);

    // userModel.createUser({username: "mojo", password: "mojo", firstname: "mo", lastName: "jo"});
    // userModel.findUserByUsername("mojo")
    //     .then(function (user) {
    //         console.log(user);
    //     });

    // console.log(websiteModel.findAllWebsitesForUser("58cc3a8753f7bcfbe9728f8b"));
    // console.log(pageModel.findAllPagesForWebsite("58ccade328ea33b6bf2dd00d"));

    var model = {
        "UserModel": userModel,
        "WebsiteModel": websiteModel,
        "PageModel": pageModel,
        "WidgetModel": widgetModel
    };
    return model;
};
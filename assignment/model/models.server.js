module.exports = function (app) {
    // require("./user/user.schema.server");
    var userModel = require("./user/user.model.server")();
    // var websiteModel = require("./website/website.model.server")();
    // var pageModel = require("./page/page.model.server")();
    // var widgetModel = require("./widget/widget.model.server")();

    var connectionString = 'mongodb://127.0.0.1:27017/test'

    var mongoose = require("mongoose");
    // mongoose.connect(connectionString);
};
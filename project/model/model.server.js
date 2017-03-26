/**
 * Created by wuhao on 2017-03-25.
 */
module.exports = function (app) {

    var mongoose = require("mongoose");
    var mongojs = require('mongojs');

    var userModel = require("./user/user.model.server")();

    var connectionString = 'mongodb://127.0.0.1:27017/autonomousWriters';

    // if(process.env.MONGODB_URI){
    //     connectionString = process.env.MONGODB_URI;
    // } else if (process.env.MLAB_USERNAME) {
    //     connectionString = process.env.MLAB_USERNAME + ":" +
    //         process.env.MLAB_PASSWORD + "@" +
    //         process.env.MLAB_HOST + ':' +
    //         process.env.MLAB_PORT + '/' +
    //         process.env.MLAB_APP_NAME;
    // }

    mongoose.connect(connectionString);
    // mongoose.createConnection(connectionString);
    // mongojs(connectionString);

    var newUser = new Object({username: "james", passport: "alice", firstName: "Alice", lastName: "Wonderland", role: "admin"});
    userModel.createUser(newUser);

    var model = {
        // developerModel: require("./developer/developer.model.server")(),
        // applicationModel: require("./application/application.model.server")(),
        // shareModel: require("./application/share.model.server")(applicationModel),
        // pageModel: require("./page/page.model.server")(applicationModel),
        // widgetMode: require("./widget/widget.model.server")(applicationModel),
        UserModel: userModel
        // mongojs: mongojs
    };

    return model;
}
/**
 * Created by wuhao on 2017-03-24.
 */
// module on node side
module.exports = function (app) {
    // var passport = require("passport");
    // var LocalStrategy = require("passport-local").Strategy;
    // app.use(passport.initialize());

    var model = require("./model/model.server")();

    require("./services/user.service.server")(app, model);
};
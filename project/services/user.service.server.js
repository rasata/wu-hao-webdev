module.exports = function (app, model) {
    // passport
    /*
     var passport      = require('passport');
     var auth = authorized;

     app.post  ('/api/login', passport.authenticate('local'), login);
     app.post  ('/api/logout',         logout);
     app.post  ('/api/register',       register);
     app.post  ('/api/user',     auth, createUser);
     app.get   ('/api/loggedin',       loggedin);
     app.get   ('/api/user',     auth, findAllUsers);
     app.put   ('/api/user/:id', auth, updateUser);
     app.delete('/api/user/:id', auth, deleteUser);

     function authorized (req, res, next) {
     if (!req.isAuthenticated()) {
     res.send(401);
     } else {
     next();
     }
     };
     */

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    // var userModel = require('../models/user.model.server');

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // old
    app.post('/aw/api/login', passport.authenticate('local'), login);
    app.get('/aw/api/loggedin', loggedin);
    app.post('/aw/api/logout', logout);

    app.post("/aw/api/user", createUser);
    app.get("/aw/api/user?username=username", findUserByUsername);
    app.get("/aw/api/user", findUserByCredentials);
    app.get("/aw/api/user/:userId", findUserByUserId);
    app.put("/aw/api/user/:userId", updateUser);
    app.delete("/aw/api/user/:userId", deleteUser);
    app.get("/aw/api/user", findUser);


    function localStrategy(username, password, done) {
        console.log(username);
        console.log(password);
        model.UserModel.findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function login(req, res) {
        console.log('[login]');
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.UserModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    console.log(err);
                    done(err, null);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        model.UserModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUserByUserId(req, res) {
        var userId = req.params.userId;

        model.UserModel
            .findUserById(userId)
            .then(
                function (response) {
                    res.send(response);
                })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];

        model.UserModel
            .findUserByUsername(username)
            .then(
                function (response) {
                    res.send(response);
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        model.UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        model.UserModel
            .updateUser(userId, newUser)
            .then(
                function (status) {
                    res.sendStatus(200);
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        var userId = req.params.userId;

        model.UserModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.sendStatus(200);
                }
            )
            .catch(
                function (err) {
                    res.status(500).send(err);
                }
            );
    }
};
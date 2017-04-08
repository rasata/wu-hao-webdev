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

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };

    // var googleConfig = {
    //     clientID     : process.env.GOOGLE_CLIENT_ID_SPRING_2017,
    //     clientSecret : process.env.GOOGLE_CLIENT_SECRET_SPRING_2017,
    //     callbackURL  : process.env.GOOGLE_CALLBACK_URL_SPRING_2017
    // };

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    };

    var goodreadsConfig = {
        consumerKey: process.env.GOODREADS_KEY,
        consumerSecret: process.env.GOODREADS_CLIENT_SECRET,
        callbackURL: process.env.GOODREADS_CALLBACK_URL
    };

    // console.log("facebook config: \n");
    // console.log(facebookConfig);

    console.log("google config: \n");
    console.log(googleConfig);

    console.log("google config: \n");
    console.log(goodreadsConfig);

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoodreadsStrategy = require("passport-goodreads").Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new GoodreadsStrategy(goodreadsConfig, goodreadsStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // old
    app.get('/aw/api/loggedin', loggedin);
    app.post('/aw/api/logout', logout);
    app.post("/aw/api/register", register);
    app.get("/aw/api/isadmin", isadmin);

    app.post('/aw/api/login', passport.authenticate('local'), login);
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}), function (req, res) {
        console.log(req.user);
        res.send(req.user);
    });

    // app.get('/google/oauth/callback',
    //     passport.authenticate('google', {
    //         successRedirect: '/project/',
    //         failureRedirect: '/project/index.html#/login'
    //     }), function (req, res) {
    //         console.log(req.user);
    //         res.send(req.user);
    //     });

    app.get('/google/oauth/callback', function (req, res, next) {
        passport.authenticate('google', function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.json({message: info.message})
            }
            res.json(user);
        })(req, res, next);
    });

    app.get("/auth/goodreads", passport.authenticate("goodreads", {scope: ['profile', 'email']}), function (req, res) {
        console.log(req.user);
        res.send(req.user);
    });

    app.get('/auth/goodreads/callback', function (req, res, next) {
        passport.authenticate('goodreads', function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.json({message: info.message})
            }
            res.json(user);
        })(req, res, next);
    });


    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/home', // TODO: add user id to this?
            failureRedirect: '/login'
        }));

    app.post("/aw/api/user", createUser);
    app.get("/aw/api/user?username=username", findUserByUsername);
    app.get("/aw/api/user", findUserByCredentials);
    app.get("/aw/api/user/:userId", findUserByUserId);
    app.put("/aw/api/user/:userId", updateUser);
    app.delete("/aw/api/user/:userId", deleteUser);
    app.get("/aw/api/user", findUser);
    app.get("/aw/api/allusers", findAllUsers);

    function googleStrategy(token, refreshToken, profile, done) {
        model.UserModel
            .findUserByGoogleId(profile.id)
            .then(function (user) {
                if (user) {
                    done(null, user);
                } else {
                    console.log("creating a new user");
                    var user = {
                        username: profile.emails[0].value,
                        photo: profile.photos[0].value,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        google: {
                            id: profile.id
                        }
                    };
                    return model.UserModel.createUser(user);
                }
            }, function (err) {
                done(err, null);
            })
            .then(function (user) {
                done(null, user);
                // return user;
            }, function (err) {
                done(err, null);
            });
    }

    function goodreadsStrategy(token, tokenSecret, profile, done) {
        model.UserModel
            .findUserByGoodreadsId(profile.id)
            .then(function (user) {
                if (user) {
                    done(null, user);
                } else {
                    console.log(profile);
                    console.log(user);
                    var user = {
                        username: profile.displayName,
                        goodreads: {
                            id: profile.id
                        }
                    };
                    return model.UserModel.createUser(user);
                }
            }, function (err) {
                done(err, null);
            })
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    }

    function localStrategy(username, password, done) {
        model.UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
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

    function facebookStrategy(token, refreshToken, profile, done) {
        model.UserModel
            .findUserByFacebookId(profile.id) // TODO: Use the ID to look up the user in the database.
            .then(
                function (user) {
                    console.log("facebook login successful");
                    // TODO: user is there, log them in
                },
                function (err) {
                    console.log("facebook login failed");
                    // TODO: user is not there store as a new user
                }
            );
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        console.log("user: " + user.username + ", password hash: " + user.password);

        model.UserModel
            .createUser(user)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

    function login(req, res) {
        // model.UserModel.findUserByUsername(user.username)
        //     .then(
        //         function (responseUser) {
        //             if(user && bcrypt.compareSync(responseUser.password, user.password)) {
        //                 return done(null, user);
        //             } else {
        //                 return done(null, false);
        //             }
        //         }
        //     );

        // TODO: is this really checking the user from the database?
        console.log("service server login");
        var user = req.user;
        res.json(user);
    }

    function loginFacebook(req, res) {
        console.log("service server, loginFacebook got called");
        console.log(req);
    }

    function loginGoogle(req, res) {
        console.log("service server, loginGoogle got called");
        console.log(req.user);

        res.send(req.user);
    }

    function isadmin(req, res) {
        if (req.isAuthenticated() && req.user.role === "admin") {
            res.send(req.user);
        } else {
            res.send('0');
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        console.log("server service logging out, " + req);
        req.logOut(); // nullify the cookie
        res.sendStatus(200);
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

    function findAllUsers(req, res) {
        model.UserModel
            .findAllUsers()
            .then(
                function (users) {
                    res.send(users);
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
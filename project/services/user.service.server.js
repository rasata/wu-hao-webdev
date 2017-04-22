module.exports = function (app, model) {
    // passport
    var auth = authorized;
    var adminAuth = adminAuthorized;

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function adminAuthorized(req, res, next) {
        if (!req.isAuthenticated() || req.user.role != "admin") {
            res.send(401);
        } else {
            next();
        }
    };

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };

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

    app.get('/aw/api/loggedin', loggedin);
    app.post('/aw/api/logout', logout);
    app.post("/aw/api/register", register);
    app.get("/aw/api/isadmin", isadmin);
    app.get("/aw/api/iswriter", iswriter);

    app.post('/aw/api/login', passport.authenticate('local'), login);
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}), function (req, res) {
        res.send(req.user);
    });
    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '/project/',
            failureRedirect: '/project/index.html#/login'
        }));

    app.get("/auth/goodreads", passport.authenticate("goodreads", {scope: ['profile', 'email']}));
    app.get('/auth/goodreads/callback',
        passport.authenticate('goodreads',
            {
                successRedirect: '/project/#/home',
                failureRedirect: '/project/#/login'
            }));

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook',
            {
                successRedirect: '/home',
                failureRedirect: '/login'
            }));

    app.post("/aw/api/user", createUser);
    // app.get("/aw/api/user?username=username", findUserByUsername);
    app.get("/aw/api/user", findUser);
    app.get("/aw/api/user/:userId", findUserByUserId);
    app.put("/aw/api/user/:userId", auth, updateUser);
    app.delete("/aw/api/user/:userId", auth, deleteUser);
    // app.get("/aw/api/allusers", adminAuth, findAllUsers);
    app.get("/aw/api/allusers", findAllUsers);
    app.put("/aw/api/user/:userId/addToShelf/:bookId", addToBookshelf);
    app.put("/aw/api/user/:userId/removeFromShelf/:bookId", removeBookFromShelf);
    app.put("/aw/api/user/:userId/markBookRead/:bookId", markBookRead);
    app.get("/aw/api/user", findUser);

    function markBookRead(req, res) {
        var userId = req.params.userId;
        var bookId = req.params.bookId;

        model.UserModel.updateSubscription(userId, bookId, false)
            .then(
                function (dbRes) {
                    res.status(200).send(dbRes);
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
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

    function googleStrategy(token, refreshToken, profile, done) {
        model.UserModel
            .findUserByGoogleId(profile.id)
            .then(function (user) {
                if (user) {
                    done(null, user);
                } else {
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
                    var user = {
                        username: profile.displayName,
                        role: "reader",
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
        var user = req.user;
        res.json(user);
    }

    function isadmin(req, res) {
        if (req.isAuthenticated() && req.user.role === "admin") {
            res.send(req.user);
        } else {
            res.send('0');
        }
    }

    function iswriter(req, res) {
        if (req.isAuthenticated() && req.user.role === "writer") {
            res.send(req.user);
        } else {
            res.send('0');
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
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
        newUser.bookshelf = [];
        newUser.publishedList = [];

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

    // TODO: doing
    function addToBookshelf(req, res) {
        var userId = req.params.userId;
        var bookId = req.params.bookId;

        console.log("service server: ");
        console.log("user id: " + userId);
        console.log("book id: " + bookId);

        // 1st find the book, so that we can add title to user.bookshelf
        model.BookModel.findBookById(bookId)
            .then(function (daBook) {
                console.log("found book before add to shelf: ");
                console.log(daBook);

                model.UserModel.addToBookshelf(userId, bookId, daBook)
                    .then(function(updatedUser) {
                        res.send(updatedUser);
                    }, function (err) {
                        console.log(err);
                        res.send(500);
                    });
            }, function (error) {
                console.log("didn't find book before add to shelf: ");
                console.log(error);

                model.UserModel.addToBookshelf(userId, bookId, null)
                    .then(function(updatedUser) {
                        res.send(updatedUser);
                    }, function (err) {
                        console.log(err);
                        res.send(500);
                    });
            });
    }

    function removeBookFromShelf(req, res) {
        var userId = req.params.userId;
        var bookId = req.params.bookId;

        console.log("removing from shelf");
        console.log(userId);
        console.log(bookId);

        model.UserModel.removeBookFromShelf(userId, bookId)
            .then(
                function (dbRes) {
                    console.log("found the book in shelf");
                    console.log(dbRes);
                    res.status(200).send(dbRes);
                }
            )
            .catch(function (err) {
                console.log("remove the book from shelf failed");
                console.log(dbRes);
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
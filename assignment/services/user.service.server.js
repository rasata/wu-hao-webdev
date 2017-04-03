module.exports = function (app, model) {
    // var passport      = require('passport');
    // var auth = authorized;

    app.post("/api/user", createUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    // app.get("/api/user", findUser);

    // function authorized (req, res, next) {
    //     if (!req.isAuthenticated()) {
    //         res.send(401);
    //     } else {
    //         next();
    //     }
    // }

    function createUser(req, res) {
        console.log("got signal in user service server");
        var newUser = req.body;
        model.UserModel
            .createUser(newUser)
            .then(
                function (response) {
                    res.send(response);
                    console.log("response being sent: ", JSON.stringify(response));
                }
            )
            .catch(
                function (err) {
                    res.status(500).send(err);
                });
    }

    function findUserByUsername(req, res) {
        console.log("got signal in user service server, find user by username");
        var username = req.query.username;

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
        var username = req.query.username;
        var password = req.query.password;

        model.UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                }
            );
    }

    function findUserById(req, res) {
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

    // A more general find user function
    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }
};
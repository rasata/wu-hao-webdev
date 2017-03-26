module.exports = function (app, model) {
    app.post("/api/user", createUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user", findUser);

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

    function createUser(req, res) {
        var newUser = req.body;
        model.UserModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
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
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        // var user = users.find(function(u){
        //     return u.username == username;
        // });
        // if(user) {
        //     res.send(user);
        // } else {
        //     res.sendStatus(404).send('User not found for username: ' + username);
        // }
    }

    function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];

        // var user = users.find(function(u){
        //     return u.username == username && u.password == password;
        // });
        // if(user) {
        //     res.send(user);
        // } else {
        //     res.sendStatus(404).send('User not found for username: ' + username + ' and password: ' + password);
        // }
    }
};
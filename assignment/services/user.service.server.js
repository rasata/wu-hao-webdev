module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    // app.get("/api/user", findUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function createUser(req, res) {
        var newUser = req.body;

        for(var u in users) {
            if (users[u].username === newUser.username) {
                res.status(500).send("User Already Exists.");
                return;
            }
        }
            newUser._id = (new Date()).getTime();
        users.push(newUser);
        res.send(newUser);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        var user = users.find(function (user) {
            return user.username == username;
        });

        res.send(user);
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        var user = users.find(function (user) {
            return user.password == password && user.username == username;
        });

        res.send(user);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        res.send(user);
    }


    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        for (var u in users) {
            if (users[u]._id == userId) {
                users[u].username = newUser.username;
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.json(users[u]);
                break;
            }
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for(var i = 0; i < users.length; ++i) {
            if(users[i]._id == userId) {
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(500).send("Could not find the user.");
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
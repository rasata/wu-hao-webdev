/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": finderUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            users.push(user);
        }

        function findUserById(userId) {
            for (var i = 0; i < users.length; ++i) {
                if(users[i]._id == userId) {
                    return users[i];
                }
            }
            return null;
        }
        
        function finderUserByUsername(username) {
            for(var u in users) {
                if(users[u].username == username)
                    return users[u];
            }
            return null;
        }
        
        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }
        
        function updateUser(userId, user) {
            for(var u in users) {
                if(users[u]._id == userId) {
                    users[u] = user;
                    return;
                }
            }
        }
        
        function deleteUser(userId) {
            for(var i = 0; i < users.length; ++i) {
                if(users[i]._id == userId) {
                    users.splice(i, 1);
                    return;
                }
            }
        }
    }
})();
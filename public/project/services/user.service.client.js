/**
 * Created by wuhao on 2017-03-25.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser": createUser,
            "findUserByUsername": finderUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            // "login": login
        };
        return api;

        function login(username, password) {
            return $http.post("/aw/api/login", [username, password]);
        }

        function createUser(newUser) {
            return $http.post("/aw/api/user", newUser);
        }

        function finderUserByUsername(username) {
            return $http.get("/aw/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            // assignment 4: moving to server side
            // /aw/api/user?username=username&password=password
            return $http.get("/aw/api/user?username=" + username + "&password=" + password);
        }

        function findUserById(userId) {
            return $http.get("/aw/api/user/" + userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/aw/api/user/"+userId, newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/aw/api/user/"+userId);
        }
    }
})();
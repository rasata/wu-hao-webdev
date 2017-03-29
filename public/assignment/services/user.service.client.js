/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(newUser) {
            console.log("sending message from client side, create user", JSON.stringify(newUser));
            return $http.post("/api/user", newUser);
        }

        function findUserByUsername(username) {
            console.log("sending message from client side, findUserByUsername", username);
            return $http.get("/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            // assignment 4: moving to server side
            // /api/user?username=username&password=password
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }
        
        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }
    }
})();
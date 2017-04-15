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
            "login": login,
            "loginGoogle": loginGoogle,
            "register": register,
            "logout": logout,
            "checkLoggedIn": checkLoggedIn,
            "findAllUsers": findAllUsers,
            "addToBookshelf": addToBookshelf,
            "removeFromBookshelf": removeFromBookshelf,
            "markBookRead": markBookRead
        };
        return api;

        function removeFromBookshelf(bookId, userId) {
            return $http.put("/aw/api/user/" + userId + "/removeFromShelf/" + bookId);
        }

        function addToBookshelf(bookId, userId) {
            return $http.put("/aw/api/user/" + userId + "/addToShelf/" + bookId);
        }

        function markBookRead(bookId, userId) {
            return $http.put("/aw/api/user/" + userId + "/markBookRead/" + bookId);
        }

        function likeTheArticle(articleId, user) {

        }

        function register(user) {
            return $http.post("/aw/api/register", user);
        }

        function findAllUsers(callback) {
            var users = [
                {first: "Alice", last: "Wonderland", username: "alice", email: "alice@wonderland.com"}
            ];
            // callback(users);
            return $http.get("/aw/api/allusers");
        }

        function login(user) {
            return $http.post("/aw/api/login", user);
            // return $http.get("/aw/api/user?username=" + user.username + "&password=" + user.password);
        }

        function loginGoogle() {
            return $http.get("/auth/google");
        }

        function logout(user) {
            return $http.post("/aw/api/logout", user);
        }

        function checkLoggedIn() {
            return $http.get('/aw/api/loggedin');
        }

        function createUser(newUser) {
            return $http.post("/aw/api/user", newUser);
        }

        function finderUserByUsername(username) {
            return $http.get("/aw/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/aw/api/user?username=" + username + "&password=" + password);
        }

        function findUserById(userId) {
            return $http.get("/aw/api/user/" + userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/aw/api/user/" + userId, newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/aw/api/user/" + userId);
        }
    }
})();
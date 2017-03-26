/**
 * Created by wuhao on 2017-03-24.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }

        init();

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            // var promise = UserService.login(user.username, user.password);

            // execute when the server side actually returns the user object
            promise.success(function (user) {
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "User not found";
                }
            });

            promise.error(function (response, status) {
                vm.error = response;
            });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;

        function init() {
        }

        init();

        function register(user) {

            if(user.password === user.passwordCheck) {
                // the two entered password are the same

                var createUserPromise = UserService.createUser(user);

                // create user successful, redirect to the new user page
                createUserPromise.success(function (user) {
                    if(user.role === "writer") {
                        $location.url("/writer/" + user._id);
                    } else {
                        $location.url("/reader/" + user._id);
                    }
                });

                // Some other error happened while creating the user at server side
                createUserPromise.error(function (createUserRes, createUserStatus) {
                    vm.error = createUserRes;
                });
            } else {
                vm.error = "You entered invalid username or password.";
            }
        }
    }

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;

        // /user/:uid
        vm.userId = $routeParams["uid"];

        // Event handler
        vm.update = updateUser;
        vm.delete = deleteUser;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;
            });
        }

        init();

        function updateUser(newUser) {
            var promise = UserService.updateUser(vm.userId, newUser);
            promise.success(function (user) {
                if (user == null) {
                    vm.error = "unable to update user.";
                } else {
                    vm.message = "user successfully updated.";
                }
            });
        }

        function deleteUser() {
            var promise = UserService.deleteUser(vm.userId);
            promise.success(function (user) {
                $location.url("/login");
            });

            promise.error(function (res, statusCode) {
                vm.error = res;
            });
        }
    }
    
    function BoobshelfController($routeParams, $location, UserService, BookService) {

    }
})();
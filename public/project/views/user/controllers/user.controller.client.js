/**
 * Created by wuhao on 2017-03-24.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }

        init();

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);

            // execute when the server side actually returns the user object
            promise.success(function (user) {
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "User not found";
                }
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
            var promise = UserService.findUserByUsername(user.username);
            promise.success(function (retUser) {
                if (retUser) {
                    vm.error = "User already exist";
                } else {
                    var createUserPromise = UserService.createUser(user);
                    // create user successful, redirect to the new user page
                    createUserPromise.success(function (user) {
                        $location.url("/user/" + user._id);
                    });

                    // Some other error happened while creating the user at server side
                    createUserPromise.error(function (createUserRes, createUserStatus) {
                        vm.error = createUserRes;
                    });
                }
            });
        }
    }
})();
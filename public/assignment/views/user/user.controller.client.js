/**
 * Created by wuhao on 2017-02-11.
 */
(function () {
    angular
        .module("WebAppMaker")
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
            var user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/"+user._id);
            } else {
                vm.error = "User not found";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;

        function init() {
        }
        init();
    }

    function ProfileController($location, UserService) {
        var vm = this;

        function init() {
        }
        init();
    }

})();
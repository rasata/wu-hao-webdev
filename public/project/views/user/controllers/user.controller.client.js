/**
 * Created by wuhao on 2017-03-24.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($rootScope, $location, UserService, BookService) {
        var vm = this;

        // event handlers
        vm.login = login;
        vm.loginGoogle = loginGoogle;
        vm.logout = logout;
        vm.test = test;

        function init() {
        }

        init();

        function test() {
            var promise = BookService.findBooksByAuthorId("58e9322007347195512aa083");
            promise.success(function (books) {
                vm.error = JSON.stringify(books);
            });

            promise.error(function (res, status) {
                vm.error = res;
            });

            // var promise = UserService.findUserById('58e9322007347195512aa083');
            // promise.success(function (user) {
            //     vm.error = JSON.stringify(user);
            // });
            // promise.error(function (res, status) {
            //     vm.error = JSON.stringify(res);
            // });

            // var promise2 = UserService.findUserByCredentials('bob', 'bob');
            // promise2.success(function (user) {
            //     vm.error = JSON.stringify(user);
            // });
            // promise2.error(function (res, status) {
            //     vm.error = JSON.stringify(res);
            // });
        }

        function login(user) {
            // var promise = UserService.findUserByCredentials(user.username, user.password);
            var promise = UserService.login(user);

            // execute when the server side actually returns the user object
            promise.success(function (user) {
                if (user) {
                    $rootScope.currentUser = user;

                    if (user.role == "reader") {
                        $location.url("/reader/" + user._id + "/bookshelf");
                    } else if (user.role == "writer") {
                        $location.url("/writer/" + user._id + "/published");
                    } else if (user.role == "admin") {
                        $location.url("/admin");
                    }
                } else {
                    vm.error = "User not found";
                }
            });

            promise.error(function (response, status) {
                vm.error = response;
            });
        }

        function loginGoogle() {
            var promise = UserService.loginGoogle();
            promise.success(function (user) {
                if (user) {
                    $rootScope.currentUser = user;

                    if (user.role == "reader") {
                        $location.url("/reader/" + user._id + "/bookshelf");
                    } else if (user.role == "writer") {
                        $location.url("/writer/" + user._id + "/published");
                    } else if (user.role == "admin") {
                        $location.url("/admin");
                    }
                } else {
                    vm.error = "Login Failed!";
                    $location.url("/login");
                }
            });
        }

        function logout(user) {
            var promise = UserService.logout(user);

            promise.success(function (response) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        }
    }

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;

        function init() {
        }

        init();

        function register(user) {
            if (user.password === user.passwordCheck) {
                // the two entered password are the same

                // var createUserPromise = UserService.createUser(user);
                console.log("wat");
                console.log(user.username);
                var findUsernamePromise = UserService.findUserByUsername(user.username);

                findUsernamePromise.success(function (checkUserRes) {
                    if (checkUserRes) {
                        vm.error = "username already exists";
                    } else {
                        var registerPromise = UserService.register(user);

                        // create user successful, redirect to the new user page
                        registerPromise.success(function (resUser) {
                            // var user = response.data;
                            $rootScope.currentUser = resUser;
                            $location.url("/user/" + resUser._id);
                        });

                        // Some other error happened while creating the user at server side
                        registerPromise.error(function (createUserRes, createUserStatus) {
                            vm.error = createUserRes;
                        });
                    }
                });
            } else {
                vm.error = "You entered invalid username or password.";
            }
        }
    }

    function ProfileController($rootScope, $route, $routeParams, $location, UserService, BookService) {
        var vm = this;

        // /user/:uid
        vm.userId = $routeParams["uid"];

        // Event handler
        vm.update = updateUser;
        vm.delete = deleteUser;
        vm.logout = logout;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;

                if (user.role === "reader") {
                    vm.bookshelfUrl = "/reader/" + user._id + "/bookshelf";
                } else if (user.role === "writer") {
                    vm.bookshelfUrl = "/writer/" + user._id + "/published";
                }
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

        function logout() {
            UserService
                .logout($rootScope.currentUser)
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url('/');
                        $route.reload();
                    }
                )
        }

        /*
         function getBookshelf() {
         vm.bookshelf = [];
         for (var bookId in vm.bookshelf) {
         // get book info from book database
         bookPromise = BookService.findBookById(bookId);
         bookPromise.success(function (matchedBook) {
         vm.bookshelf.push(matchedBook);
         });
         }
         }
         */
    }

    // function BoobshelfController($routeParams, $location, UserService, BookService) {
    // }
})();
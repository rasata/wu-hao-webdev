/**
 * Created by wuhao on 2017-03-24.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/aw/api/loggedin').success(function (user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
            return deferred.promise;
        };

        var checkIsAdmin = function ($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/aw/api/isadmin').success(function (user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };

        var checkIsWriter = function ($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/aw/api/isadmin').success(function (user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    $http.get('/aw/api/iswriter').success(function (writerUser) {
                        $rootScope.errorMessage = null;
                        if (writerUser !== '0') {
                            $rootScope.currentUser = writerUser;
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url('/');
                        }
                    });
                }
            });


            return deferred.promise;
        };

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", { // for both reader and writer profiles
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    isAdmin: checkIsAdmin
                }
            })
            .when("/reader/:uid/bookshelf", { // show all books that is on user's shelf
                templateUrl: "views/book/templates/bookshelf.view.client.html",
                controller: "ReaderController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/reader/:uid/book/:bid", {
                templateUrl: "views/book/templates/book-list.view.client.html",
                controller: "BookListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/reader/:uid/book/:bid/article/:aid", {
                templateUrl: "views/article/templates/reader-article-list.view.client.html",
                controller: "ArticleViewController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/writer/:uid/published", { // listing all the books having this user as an author
                templateUrl: "views/book/templates/published.view.client.html",
                controller: "WriterController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin,
                    isWriter: checkIsWriter
                }
            })
            .when("/writer/:uid/book/new", { // add new book with this user as the 1st author
                templateUrl: "views/book/templates/book-new.view.client.html",
                controller: "NewBookController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin,
                    isWriter: checkIsWriter
                }
            })
            .when("/writer/:uid/book/:bid", { // change title, ISBN etc. add/remove new articles to this book
                templateUrl: "views/book/templates/book-edit.view.client.html",
                controller: "EditBookController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin,
                    isWriter: checkIsWriter
                }
            })
            .when("/writer/:uid/book/:bid/articles", {
                templateUrl: "views/article/templates/writer-article-list.view.client.html",
                controller: "ArticleListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin,
                    isWriter: checkIsWriter
                }
            })
            .when("/writer/:uid/book/:bid/article/new", {
                templateUrl: "views/article/templates/article-new.view.client.html",
                controller: "NewArticleController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin,
                    isWriter: checkIsWriter
                }
            })
            .when("/writer/:uid/book/:bid/article/:aid", {
                templateUrl: "views/article/templates/article-edit.view.client.html",
                controller: "EditArticleController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin,
                    isWriter: checkIsWriter
                }
            })
            .otherwise({
                templateUrl: "views/home/home.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            });
    }
})();
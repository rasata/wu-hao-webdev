/**
 * Created by wuhao on 2017-04-12.
 */
/**
 * Created by wuhao on 2017-04-11.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .factory("GoodreadsService", GoodreadsService);

    function GoodreadsService($http) {
        var api = {
            "getReviewsByISBN": getReviewsByISBN,
            "getReviewsByTitle": getReviewsByTitle
        };
        return api;
        
        function getReviewsByISBN(isbn) {
            return $http.get("/aw/api/gr/isbn/" + isbn);
        }

        function getReviewsByTitle(title) {
            return $http.get("/aw/api/gr/title/"+ title);
        }
    }
})();
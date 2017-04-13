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

    /*
    function FlickrService($http) {
        var key = "de78745485e1e9e91dc7923aa5f121bb";
        var urlBase =
            "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
    */

    function GoodreadsService($http) {
        var api = {
            "getReviewsByISBN": getReviewsByISBN
        };
        return api;
        
        function getReviewsByISBN(isbn) {
            return $http.get("/aw/api/gr/"+ isbn +"/reviews");
        }
    }
})();
/**
 * Created by wuhao on 2017-03-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        function searchPhotos(url) {
            return $http.get(url);
        }
    }
})();
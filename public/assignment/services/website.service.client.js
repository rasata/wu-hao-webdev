/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findAllWebsites,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite
        };
        return api;

        // adds the website parameter instance to the local websites array.
        // The new website's developerId is set to the userId parameter
        function createWebsite(userId, website) {
            return $http.post("/api/user/" + userId + "/website", website);
        }

        // retrieves the websites in local websites array whose developerId matches the parameter userId
        function findAllWebsites(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        // retrieves the website in local websites array whose _id matches the websiteId parameter
        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+websiteId);
        }

        // { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        // updates the website in local websites array whose _id matches the websiteId parameter
        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+websiteId, website);
        }

        // removes the website from local websites array whose _id matches the websiteId parameter
        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }
    }
})();
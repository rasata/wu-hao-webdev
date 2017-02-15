/**
 * Created by wuhao on 2017-02-10.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite
        };
        return api;

        // adds the website parameter instance to the local websites array.
        // The new website's developerId is set to the userId parameter
        function createWebsite(userId, website) {
            if(website == null) {
                return null;
            }

            for(var w in websites) {
                if (websites[w].name == website.name) {
                    return null;
                }
            }

            website.developerId = userId;
            website._id = (new Date()).getTime();
            websites.push(website);
            return website;
        }

        // removes the website from local websites array whose _id matches the websiteId parameter
        function deleteWebsite(websiteId) {
            for (var i = 0; i < websites.length; ++i) {
                if(websites[i]._id == websiteId) {
                    websites.splice(i ,1);
                    return true;
                }
            }
            return false;
        }

        // retrieves the websites in local websites array whose developerId matches the parameter userId
        function findWebsitesByUser(userId) {
            var result = []
            for (var w in websites) {
                if (websites[w].developerId == userId) {
                    result.push(angular.copy(websites[w]));
                }
            }
            return result;
        }

        // retrieves the website in local websites array whose _id matches the websiteId parameter
        function findWebsiteById(websiteId) {
            for (var w in websites) {
                if(websites[w]._id == websiteId) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        // { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        // updates the website in local websites array whose _id matches the websiteId parameter
        function updateWebsite(websiteId, website) {
            for (var w in websites) {
                if (websites[w]._id == websiteId) {
                    websites[w].name = website.name;
                    websites[w].developerId = website.developerId;
                    websites[w].description = website.description;

                    return websites[w];
                }
            }
            return null;
        }
    }
})();
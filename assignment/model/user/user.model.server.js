module.exports = function (app) {
    var mongoose = require("mongoose");
    mongoose.Promise = require('q').Promise;
    

    var api = {
        createWebsite : createWebsite,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite
    };
    return api;

    // Creates a new user instance
    function createUser(user) {

    }

    // Retrieves a user instance whose _id is equal to parameter userId
    function findUserById(userId) {
        
    }

    // Retrieves a user instance whose username is equal to parameter username
    function findUserByUsername(username) {
        
    }

    // Retrieves a user instance whose username and password are equal to parameters userId and password
    function findUserByCreadentials(username, password) {

    }

    // Updates user instance whose _id is equal to parameter userId
    function updateUser(userId, user) {

    }

    // Removes user instance whose _id is equal to parameter userId
    function deleteUser(userId) {

    }
};
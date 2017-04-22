module.exports = function () {

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCreadentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findAllUsers: findAllUsers,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        findUserByGoodreadsId: findUserByGoodreadsId,
        addToBookshelf: addToBookshelf,
        removeBookFromShelf: removeBookFromShelf,
        updateSubscription: updateSubscription
    };

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('AWUserModel', UserSchema);

    return api;

    function updateSubscription(userId, bookId, flag) {
        return UserModel.update(
            {_id: userId},
            {$set: {bookshelf: {_id: bookId, updated: flag}}}
        );
    }

    function findUserByGoodreadsId(goodreadsId) {
        return UserModel.findOne({
            'goodreads.id': goodreadsId
        });
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({
            'google.id': googleId
        });
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({"facebook.id": facebookId});
    }

    // Creates a new user instance
    function createUser(user) {
        return UserModel.create(user);
    }

    // Retrieves a user instance whose _id is equal to parameter userId
    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    // Retrieves a user instance whose username is equal to parameter username
    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    // Retrieves a user instance whose username and password are equal to parameters userId and password
    function findUserByCreadentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }

    function findAllUsers() {
        return UserModel.find({
            role: {$in: ['reader', 'writer']}
        });
    }

    // Updates user instance whose _id is equal to parameter userId
    function updateUser(userId, user) {
        return UserModel.update({
            _id: userId
        }, {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            role: user.role
        });
    }

    function addToBookshelf(userId, bookId, bookObj) {
        console.log("add book to shelf");
        console.log("user: " + userId.toString());
        console.log("book: " + bookId.toString());

        var title = '';
        try {
            title = bookObj.title;
            console.log("title: " + bookObj.title);
        } catch (err) {
            console.log("Did not find the book!");
            title = '';
        }

        return UserModel.findOneAndUpdate(
            {_id: userId},
            {$addToSet: {"bookshelf":
                {
                    "bookId": bookId,
                    "updated": false,
                    "title": title.toString()
                }
            }}
        )
    }

    function removeBookFromShelf(userId, bookId) {
        return UserModel.update(
            {_id: userId},
            {'$pull': {"bookshelf": {"bookId": bookId}}}
        );
    }

    // Removes user instance whose _id is equal to parameter userId
    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }
};
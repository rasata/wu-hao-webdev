/**
 * Created by wuhao on 2017-04-03.
 */
(function () {
   angular
       .module("AutonomousWriters")
       .controller("AdminController", AdminController);
   
   function AdminController(UserService) {

       var vm = this;

       function init() {
           var promise = UserService.findAllUsers();
           promise.success(function (users) {
               vm.users = users;
           });

           promise.error(function (data, status) {
               
           });
       }

       init();

       vm.users = [
           {first: "Alice", last: "Wonderland", username: "alice", email: "alice@wonderland.com"}
       ];
       promise = UserService.findAllUsers();
       // UserService.findAllUsers();
   }
})();
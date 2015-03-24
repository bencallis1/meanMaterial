/**
 * Created by bencallis on 3/22/15.
 */
'use strict';

angular.module('users').controller('usersController', ['$scope', '$stateParams', '$http', '$location', 'Authentication','Users',
    function($scope, $stateParams, $http, $location, Authentication, Users) {
        $scope.authentication = Authentication;

        //create new User
        $scope.create = function() {
            var user = new Users ({
                firstName: this.firstName,
                lastName: this.lastName,
                displayName: this.displayName,
                email: this.email,
                phone: this.phone,
                userName: this.userName,
                password: this.password,
                profileImageURL: this.profileImageURL
            });
            //redirect after we recieve a response. We then change the url location to the user
            user.$save(function (response) {
                $location.path('users/' + response._id);

                //clear form field
                $scope.lastName = '';
                $scope.firstName = '';
                $scope.email = '';
                $scope.userName = '';
                $scope.phone ='';
                $scope.displayName = '';
                $scope.password = '';
                $scope.profileImageURL = '';
            },function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            $scope.remove = function(users) {
                if (user){user.$remove();
                    for (var i in $scope.users){
                        if ($scope.users[i] === user){
                            $scope.users.splice(i,1);
                        }
                    }
                } else{
                    $scope.user.$remove(function(){
                        $location.path('users');
                    });
                }
            };

        };


    }
]);

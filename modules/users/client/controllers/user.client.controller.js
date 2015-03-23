/**
 * Created by bencallis on 3/22/15.
 */
'use strict';

angular.module('users').controller('usersController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
    function($scope, $stateParams, $http, $location, Authentication) {
        $scope.authentication = Authentication;

        //create new User
        $scope.create = function create() {
            var user = new Users ({
                firstName: this.firstName,
                lastName: this.lastName,
                displayName: this.displayName,
                email: this.email,
                userName: this.userName,
                password: this.password,
                profileImageURL: this.profileImageURL
            });
            //redirect after save to the individual URL
            user.$save(function (response) {
                $location.path('users/' + response._id);

                //clear form field
                $scope.lastName = '';
                $scope.firstName = '';
                $scope.email = '';
                $scope.userName = '';
                $scope.displayName = '';
                $scope.password = '';
                $scope.profileImageURL = '';
            },function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };


    }
]);

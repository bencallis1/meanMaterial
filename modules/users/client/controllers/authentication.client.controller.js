'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

        //create new User
        $scope.create = function() {
            var user = new User ({
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
                }
            };

        };

		$scope.signin = function() {
			$http.post('/api/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

angular.module('app')
    .controller('adminCtrl', function($scope, $http, auth, $location, $timeout) {

        $scope.loading = true;
        $scope.setup = function() {

            $http.get('/api/users')
                .then(function(response) {
                    $scope.model = response.data;
                    $scope.loading = false;

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    if (response.status == 401) {
                        $scope.authFail = true
                        $timeout(function() { $location.path("/login") }, 3000);
                    }

                });

        }

        $scope.setup();


        $scope.logout = function() {
            auth.logout()
        }

    })

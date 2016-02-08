angular.module('app')
    .controller('adminCtrl', function($scope, $http) {

        $scope.loading = true;
        $scope.setup = function() {

            $http.get('/api/users')
                .then(function(response) {
                    $scope.model = response.data;
                    $scope.loading = false;

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }

        $scope.setup();

    })

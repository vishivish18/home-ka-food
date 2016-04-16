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

        $scope.deleteUser = function(user_id) {
            if (!confirm('Are you sure?')) return;
            $http.delete('/api/users/' + user_id)
                .then(function(response) {
                    console.log(response)
                    $scope.setup();

                }, function(response) {
                    console.log(response)
                        // if error occurs
                });

        }


        $scope.logout = function() {
            auth.logout()
        }

    })

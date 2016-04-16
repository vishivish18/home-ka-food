angular.module('app')
    .controller('editUserCtrl', function($scope, $http, $location, $stateParams, $timeout) {

        $scope.loading = true;
        $scope.setup = function() {
            console.log($stateParams)
            $http.get('/api/users/' + $stateParams.id)
                .then(function(response) {
                    $scope.model = response.data;
                    console.log($scope.model)
                    $scope.loading = false;

                }, function(response) {
                    console.log(response)
                });

        }

        $scope.updateUser = function() {
            $scope.loading = true;
            $http.put('/api/users/' + $stateParams.id, {
                    first_name: $scope.model.first_name,
                    last_name: $scope.model.last_name,
                    phone: $scope.model.phone,
                    address: $scope.model.address,
                    email: $scope.model.email

                })
                .then(function(response) {
                    console.log(response)
                    $scope.loading = false;

                    $scope.userSaved = true
                    $timeout(function() { $scope.userSaved = false; }, 3000);


                }, function(response) {
                    console.log(response)
                });

        }



        $scope.setup();



    })

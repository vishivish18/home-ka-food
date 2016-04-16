angular.module('app')
    .controller('addUserCtrl', function($scope, $http) {
        $scope.setup = function() {
            $scope.model = {};
        }
        $scope.setup();
        $scope.saveUser = function() {
            console.log("inside the func")
            $http.post('/api/users', {
                    first_name: $scope.model.first_name,
                    last_name: $scope.model.last_name,
                    phone: $scope.model.phone,
                    address: $scope.model.address,
                    email: $scope.model.email

                })
                .then(function(response) {
                    console.log(response)
                    $("#thanks").show().delay(5000).fadeOut()
                    $scope.setup();
                }, function(response) {
                    console.log(response)
                });

        }

    })

angular.module('app')
.controller('registerCtrl',function($scope,auth,$location){
	$scope.register = function(name,username,password){
		auth.register(name,username,password)
		.then(function(response){			
			auth.login(username,password)
			$scope.$emit('login',response.data)
			$location.path('/admin')
		})
		.catch(function (err){
			console.log(err)
		})
	}

})

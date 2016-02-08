angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: '/landing.html',
                        controller: 'registerCtrl'

                    }
                }
            })

        .state('admin', {
            url: '/admin',
            views: {                
                'content': {
                    templateUrl: '/admin.html',
                    controller: 'adminCtrl'

                }
            }
        })



        $locationProvider.html5Mode(true)


    });

angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: '/landing.html',
                        controller: 'userRegisterCtrl'

                    }
                }
            })


        .state('login', {
            url: '/login',
            views: {
                'content': {
                    templateUrl: '/login.html',
                    controller: 'loginCtrl'

                }
            }
        })

        .state('register', {
            url: '/efb82ec7a1a0e477a33e209dacd2a1e0',
            views: {
                'content': {
                    templateUrl: '/register.html',
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

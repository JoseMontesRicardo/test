(function(){

    var app = angular.module('testapp', [
        'ngRoute',
        'ngCookies',
        'testapp.controllers',
        'testapp.services',
        'testapp.factorys',
        'testapp.directives'
    ])

    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '../templates/login.html',
                controller : 'loginCtrl'
            })
            .when('/home', {
                templateUrl: '../templates/home.html',
                controller : 'homeCtrl'
            })
            .when('/home/:id', {
                templateUrl: '../templates/picture-detail.html',
                controller: 'detailCtrl'
            })
            .when('/registry', {
                templateUrl: '../templates/registry.html',
                controller : 'registryCtrl'
            })
            .when('/new-photo', {
                templateUrl: '../templates/new-photo.html',
                newCtrl: 'newCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
            $locationProvider.html5Mode(true);
    })

    .run( function($rootScope, $location, $cookies) {
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if ( !($cookies.get('token')) ) {
                if ( next.templateUrl == "../templates/login.html" ) {

                } else if ( next.templateUrl == "../templates/registry.html" ){

                } else {
                    $location.path( "/login" )
                }
            } else { 
               if ( next.templateUrl == "../templates/home.html" ) {

                } else if ( next.templateUrl == "../templates/new-photo.html" ){

                } else if ( next.templateUrl == "../templates/picture-detail.html" ) {

                } else {
                    $location.path( "/home" )                    
                }
            }  
        })
    })
})()
(function(){
    angular.module('testapp.controllers', [])

        .controller('rootCtrl', function($scope, $location,$cookies) {
            $scope.log = $cookies.get('token')
            $scope.logOut = function(){
                $cookies.remove('token')
                $scope.log = undefined
                $location.path( "/login" )
            }
        })

        // controlador para registry
        .controller('registryCtrl', function($scope) {
            $scope.init = function(){
                // console.log('holaaa')
            }
        })


         .controller('detailCtrl', function($scope, $routeParams, pictures) {
            $scope.init = function(){
                pictures.getPic($routeParams.id)
                  .then(function(data){
                      $scope.pic = data
                      console.log(data)
                  })
                  .catch(function(err){
                      console.log(err)
                  })
            }
        })


        .controller('newCtrl', function($scope, fileUpload) {
            $scope.upload = function(){
                fileUpload.uploadFileToUrl($scope.myFile, '/pictures')
            }
        })

        // controlador para el login
        .controller('loginCtrl', function($scope, $location, $window, $cookies, users) {
            $scope.login = function(){
              if ($scope.email && $scope.pass){
                users.loginUser($scope.email, $scope.pass)
                  .then(function(data){
                      if (data){
                        $cookies.put('token', data)
                        $window.location.reload()
                      } else { 
                        $window.location.reload()
                      }
                  })
                  .catch(function(err){
                      console.log(err)
                  })      
              }
            }
        })

        // controlador para el home
        .controller('homeCtrl', function($scope, $cookies, users, pictures, socket) {
            $scope.selected = {}
                        
            socket.on('news', function (data) {
                console.log(data)
            })

            $scope.selectedUser = function(user){
                $scope.selected = user
                pictures.getPictures($scope.selected._id)
                  .then(function(data){
                      $scope.pictures = data
                  })
                  .catch(function(err){
                      console.log(err)
                  })
            }

            $scope.init = function(){                
                users.getUsers()
                  .then(function(data){
                     $scope.users=data
                  })
                  .catch(function(err){
                     console.log(err)
                  })
            }
        })
})()
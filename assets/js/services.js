(function(){
    angular.module('testapp.services', [])

        // fabrica de usuarios
        .factory('users', function($http, $q, $cookies) {
            function getUsers() {
                return $q(function(resolve, reject) {
                    $http.get('/users',{ 
                        headers: {'x-access-token': $cookies.get('token')}
                    })
                      .success(function(data){
                         resolve(data)
                      })
                      .error(function(err){
                         reject(err)
                      })
                })
            }
            
            function loginUser(email, pass) {
                return $q(function(resolve, reject) {
                    $http.post('/login', { email: email, pass: pass })
                        .success(function(data){
                            resolve(data)
                        })
                        .error(function(err){
                            reject(err)
                        })
                })
            }

            return {
                getUsers : getUsers,
                loginUser : loginUser 
            }
        })


        // fabrica de pictures
        .factory('pictures', function($http, $q, $cookies) {
            function getPictures(id) {
                return $q(function(resolve, reject) {
                    $http.get('/pictures/'+id, 
                    { 
                        headers: {'x-access-token': $cookies.get('token')}
                    })
                      .success(function(data){
                        resolve(data)
                      })
                      .error(function(err){
                        reject(err)
                      })
                })
            }
            function getPic(id) {
                return $q(function(resolve, reject) {
                    $http.get('/pic/'+id, 
                    { 
                        headers: {'x-access-token': $cookies.get('token')}
                    })
                      .success(function(data){
                        resolve(data)
                      })
                      .error(function(err){
                        reject(err)
                      })
                })
            }

            return {
                getPictures : getPictures,
                getPic : getPic
            }
        })

        .service('fileUpload', ['$http', '$cookies', '$location', function ($http, $cookies, $location) {
            this.uploadFileToUrl = function(file, uploadUrl){
                if ( file ){
                  var fd = new FormData();
                  fd.append('photo', file);
                  $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'x-access-token': $cookies.get('token')}
                  })
                  .success(function(data){
                    $location.path("/home")
                  })
                  .error(function(err){
                    console.log(err)
                  })
                } else {
                    alert('debe seleccionar una imagen!')
                }
            }
        }])
})()
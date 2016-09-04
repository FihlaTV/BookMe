angular.module('starter.services', [])

.factory('User', function($http) {
    
 return {
        all: function() {
          return $http.get("http://rentalaspacelocator.com/user/profile");
        },
        get: function(username) {
              return $http.get("http://rentalaspacelocator.com/user/profile"+username);
        }
       };
  
})

.factory('Profiles', function($http) {
    
 return {
        all: function() {
          return $http.get("http://rentalaspacelocator.com/user/items");
        },
        remove: function(id) {
             $http.get("http://rentalaspacelocator.com/user/items")
              .then(function(response) {
                  var profiles = response.data;
                  console.log(response.data);  
                  profiles.splice(profiles.indexOf(id), 1);
              });
          
        },
        get: function(profileId) {
              return $http.get("http://rentalaspacelocator.com/user/items");
          
        }
       };
  
});

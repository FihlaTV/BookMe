angular.module('starter.services', [])

.factory('User', function($http) {
    
 return {
        all: function() {
          return $http.get("http://rentalaspacelocator.com/user/profile/");
        },
        get: function(id) {
              return $http.get("http://rentalaspacelocator.com/user/profile/"+id);
        },
        getuser: function(id) {
              return $http.get("http://rentalaspacelocator.com/user/publicprofile/"+id);
        },
        getfeedback: function(id) {
              return $http.get("http://rentalaspacelocator.com/user/publicfeedback/"+id);
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
          
        },
         getmyitems: function(profileId) {
              return $http.get("http://rentalaspacelocator.com/user/myitems/" + profileId);
          
        }
     
       };
  
});

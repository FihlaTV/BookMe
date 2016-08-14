angular.module('starter.services', [])


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
    
  // Might use a resource here that returns a JSON array
  // Some fake testing data
/*
  var profiles = [{
    id: 0,
    name: 'Bea',
    date: 'July 3, 2016',
    deseg: 'PHP 10,000',
    face: 'img/for-rent.jpg',
    desc:  'This is a sample new item posted for a new rental near Quezon City.'
  }, {
    id: 1,
    name: 'Bea',
    date: 'July 4, 2016',
    deseg: 'PHP 11,500',
    face: 'img/house-for-rent2.png',
    desc: ' This is a sample new item posted for a new rental near Pasay City.'
  }, {
    id: 2,
	name: 'Bea',
    date: 'July 5, 2016',
	deseg: 'PHP 15,000',
    face: 'img/house-for-rent3.png',
    desc: 'This is a sample new item posted for a new rental near Bonifacio City.'
  }, {
    id: 3,
    name: 'Bea',
    date: 'July 6, 2016',
    deseg: 'PHP 8,000',
    face: 'img/house-for-rent4.png',
    desc: ' This is a sample new item posted for a new rental near Alabang Town Center.'
  }];
*/
  
});

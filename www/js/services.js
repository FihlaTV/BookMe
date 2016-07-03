angular.module('starter.services', [])

.factory('Profiles', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var profiles = [{
    id: 0,
    name: 'Kris Mercado',
    date: 'July 3, 2016',
    deseg: 'PHP 10,000',
    face: 'img/house-for-rent.png',
    desc:  'This is a sample new item posted for a new rental near Quezon City.'
  }, {
    id: 1,
    name: 'Kris Mercado',
    date: 'July 4, 2016',
    deseg: 'PHP 11,500',
    face: 'img/house-for-rent2.png',
    desc: ' This is a sample new item posted for a new rental near Pasay City.'
  }, {
    id: 2,
	name: 'Kris Mercado',
    date: 'July 5, 2016',
	deseg: 'PHP 15,000',
    face: 'img/house-for-rent3.png',
    desc: 'This is a sample new item posted for a new rental near Bonifacio City.'
  }, {
    id: 3,
    name: 'Kris Mercado',
    date: 'July 6, 2016',
    deseg: 'PHP 8,000',
    face: 'img/house-for-rent4.png',
    desc: ' This is a sample new item posted for a new rental near Alabang Town Center.'
  }];

  return {
    all: function() {
      return profiles;
    },
    remove: function(id) {
      profiles.splice(profiles.indexOf(id), 1);
    },
    get: function(profileId) {
      for (var i = 0; i < profiles.length; i++) {
        if (profiles[i].id === parseInt(profileId)) {
          return profiles[i];
        }
      }
      return null;
    }
  };
});

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers' , 'starter.services', 'ngCordova'])

.run(function($ionicPlatform , $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

     $rootScope.authStatus = false;
	 //stateChange event
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		  $rootScope.authStatus = toState.authStatus;
		  if($rootScope.authStatus){
			  
			
		  }
    });

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		console.log("URL : "+toState.url);
		if(toState.url=='/dashboard'){
			console.log("match : "+toState.url);
			$timeout(function(){
				angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
			},1000);
		}	
	});

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

//--------------------------------------

 .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signin.html'
      }
    },
	authStatus: false
  })
 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signup.html',
      }
   },
	authStatus: false
  })
//--------------------------------------


  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
		controller: 'DashCtrl'
      }
     },
	 authStatus: true
  })
  
   .state('app.message', {
    url: '/message',
    views: {
      'menuContent': {
        templateUrl: 'templates/messaging.html',
		controller: 'Messages'
      }
     },
	 authStatus: true
  })
  
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
		controller: 'SearchCtrl'
      }
     },
	 authStatus: true
  })
  .state('app.unread', {
    url: '/unread',
    views: {
      'menuContent': {
        templateUrl: 'templates/unread.html',
		controller: 'Messages'
      }
     },
	 authStatus: true
  })
  
   .state('app.post', {
    url: '/post',
    views: {
      'menuContent': {
        templateUrl: 'templates/lessor-post.html',
		controller: 'PostItemsCtrl'
      }
     },
	 authStatus: true
  })

     .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html'
      }
     },
	 authStatus: true
  })
  
    .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'UserProfileCtrl'
      }
     },
	 authStatus: true
  })
  
       .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html'
      }
     },
	 authStatus: true
  })
  
  .state('app.publicprofile', {
    url: '/publicprofile/:profileId',
    views: {
      'menuContent': {
        templateUrl: 'templates/publicprofile.html',
        controller: 'PublicProfileCtrl'
      }
    }
  })
  
  .state('app.lessorposts', {
    url: '/lessorposts',
    views: {
      'menuContent': {
        templateUrl: 'templates/lessorposts.html',
        controller: 'myItemCtrl'
      }
    }
  })
  
  .state('app.item', {
    url: '/item/:profileId',
    views: {
      'menuContent': {
        templateUrl: 'templates/item-detail.html',
        controller: 'ItemCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

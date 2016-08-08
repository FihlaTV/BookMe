angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup,$http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  //--------------------------------------------
   $scope.login = function(user) {
       
       $http({
          method: 'POST',
          url: 'http://rentalaspacelocator.com/user/applogin',
           transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
           },
          data: { username: user.username,password:user.password }
        }).then(function successCallback(response) {
            //$scope.user = response.data;
           user.validate = response.data;
           console.log(user.validate);
           
           if(user.validate != 'false'){
			$location.path('/app/dashboard');
            }else{
                $scope.showAlert('Invalid username or password.');	
            }
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
           console.log('error');
       });
       

		if(typeof(user)=='undefined'){
			$scope.showAlert('Please fill username and password to proceed.');	
			return false;
		}
    
		
	
	};
  //--------------------------------------------
  $scope.logout = function() {   $location.path('/app/login');   };
  //--------------------------------------------
   // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Warning Message',
		 template: msg
	   });
	 };
    
    // An alert dialog
	 $scope.showAlert2 = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Information',
		 template: msg
	   });
	 };
  //--------------------------------------------
    
     $scope.register = function(reg) {
          $http({
          method: 'POST',
          url: 'http://rentalaspacelocator.com/user/appregister',
           transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
           },
          data: { username: reg.username,password:reg.password,fname: reg.fname,lname: reg.lname }
        }).then(function successCallback(response) {
           console.log(response.data);
              $scope.showAlert2('Registration request sent! Please verify via email.');
           
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
           console.log('error');
       });
       

		if(typeof(reg)=='undefined'){
			$scope.showAlert('Please fill all required fields.');	
			return false;
		}
         
     }
    
})

.controller('ItemCtrl', function($scope, $stateParams , Profiles) {
	$scope.profile = Profiles.get($stateParams.profileId);
})

.controller('DashCtrl', function($scope, $stateParams , Profiles) {
	$scope.profiles = Profiles.all();
    /*
    $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.profiles,
                update: function (filteredItems, filterText) {
                    $scope.profiles = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };
    **/
});


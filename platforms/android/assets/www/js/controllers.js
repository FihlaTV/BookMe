angular.module('starter.controllers', [])


.controller('Messages', function($scope) {


})

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup, $http, $rootScope, Profiles) {


	
  // Form data for the login modal
  $scope.loginData = {};
  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  //--------------------------------------------
   $scope.login = function(user) {
       //$rootScope.user = 'none';
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
            $rootScope.user = user.username;
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
  $scope.refresh = function() {
            Profiles.all().success(function(data){
                $scope.profiles = data;
            });
   };
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
    
    $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms = modal;
  });
  $scope.openModal = function() {
    $scope.terms.show();
  };
  $scope.closeModal = function() {
    $scope.terms.hide();
  };
    
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
              if(response.data == "false"){
                  $scope.showAlert('Username is already existing. Please try a new one.');
               }else{
                   $scope.showAlert2('Registration request sent! Please verify via email.');
               }
              
           
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

.controller('PostItemsCtrl', function($http, $scope, $rootScope, $ionicPopup, Profiles,  $cordovaFileTransfer, $cordovaCamera, $cordovaImagePicker) {
    
    
    /**
    *    Uploading Function v1
    **/
	
    $scope.openPhotoLibrary = function(item) {
         $scope.name = $rootScope.user;
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.name = $rootScope.user;
           
            $scope.uploadUri = imageData;
            var server = "http://rentalaspacelocator.com/user/appupload",
            filePath = imageData;

            var options = {
                fileKey: "file",
                fileName: ((Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)+".jpg",
                chunkedMode: false,
                mimeType: "image/jpg",
                 params: {
                    "username": $scope.name,"space_type":item.space_type,"location":item.location,"price":item.price,"comments":item.comments
                 }
            };

            $cordovaFileTransfer.upload(server, filePath, options).then(function(result) {
                    $scope.showAlert('Information Posted!');	
                     $scope.item = null;
            }, function(err) {
                //console.log("ERROR: " + JSON.stringify(err));
                alert(JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
            });


        }, function(err) {
            // error
            console.log(err);
        });
    }
	
    
    
    // ----------------------------------------
    
    
    
     // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Information',
		 template: msg
	   });
	 };
    
	 $scope.submit = function(item) {
        $scope.name = $rootScope.user;
     console.log( item );
        $http({
          method: 'POST',
          url: 'http://rentalaspacelocator.com/user/appadditem',
           transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
           },
          data: { username: $scope.name,space_type:item.space_type,location:item.location,price:item.price,comments:item.comments }
        }).then(function successCallback(response) {
            $scope.showAlert('Information Posted!');	
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
           console.log('error');
       });
    
		
	
	};
})

.controller('SearchCtrl', function($http,$scope, $rootScope, $ionicPopup, $stateParams , Profiles) {
    
     // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Information',
		 template: msg
	   });
	 };
    
	 $scope.search = function(item) {
          var data = $.param({
                json: JSON.stringify({
                    space_type:item.space_type,
                    location:item.location,
                    from_price:item.from_price,
                    to_price:item.to_price
                })
            });
         
          $http.post("http://rentalaspacelocator.com/user/searchitem", data).success(function(data, status) {
                    console.log(data);
              
                  $scope.profiles = data;
          });
    };

})

.controller('ItemCtrl', function($scope, $stateParams ,  Profiles) {
    $scope.loadData = function () {
        Profiles.get().success(function(data){
                  
               angular.forEach(data, function(value, key) {
                 if (value['item_id'] == parseInt($stateParams.profileId)){
                     $scope.profile = value;
                 }
                   
                });
        });
    }
    
    $scope.loadData();
})

.controller('UserProfileCtrl', function($scope, User,  $rootScope){
     $scope.loadData = function () {
          $scope.name = $rootScope.user;
         
	   User.get($scope.name).success(function(data){
          
             angular.forEach(data, function(value, key) {
                     $scope.userprofile = value;
                });
        });
 }
    
    $scope.loadData();
})

.controller('DashCtrl', function($scope, $stateParams , Profiles) {
    //console.log($scope.profiles);
 $scope.loadData = function () {
	Profiles.all().success(function(data){
        $scope.profiles = data;
    });
 }
    
    $scope.loadData();
   
});


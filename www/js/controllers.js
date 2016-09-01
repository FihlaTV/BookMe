angular.module('starter.controllers', [])


.controller('Messages', function($scope, $timeout, $ionicScrollDelegate) {

  $scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
  d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

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

.controller('PostItemsCtrl', function($http, $scope, $rootScope, $ionicPopup, Profiles,  $cordovaFileTransfer, $cordovaCamera, $cordovaImagePicker) {
    
    /*
    *  Multiple image picker function
    */
    
     $scope.pickImages = function() {
        var options = {
          maximumImagesCount: 10,
          width: 800,
          height: 800,
          quality: 80
        };

        $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                $scope.images.push(results[i]);
              }
            }, function(error) {
              // error getting photos
            });

    };

      $scope.removeImage = function(image) {
        $scope.images = _.without($scope.images, image);
      };
    
    
    /**
    *   Uploading function v2
   
    
    $scope.takePicture = function() {

		var options = {
			quality: 45,
			//destinationType: Camera.DestinationType.NATIVE_URI,
			destinationType: Camera.DestinationType.FILE_URI,
		        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 400,
			targetHeight: 400,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: true
		};

		console.log( ">>>>> "+  options.destinationType );
		console.log( ">>>>> "+  options.sourceType );

		$cordovaCamera.getPicture(options).then(function(imageURI) {
			$scope.newPost.picture = imageURI;
			console.log("Pic taken: " + $scope.newPost.picture);
		}, function(err) {
			// error
			console.log("Camera ERR: " + err);
		});
	};
    
      $scope.uploadPicture = function() {
         var options = {
            fileKey: "file",
            fileName: imageURI.substr(imageURI.lastIndexOf('/')+1),
            chunkedMode: false,
            mimeType: "image/jpg",
             params: {
            "text": text,
            "channel_id": chId,
            "headers": {
                'Authorization': credentials.token_type + ' ' + credentials.access_token
                }
            }
         };

         $cordovaFileTransfer.upload("http://rentalaspacelocator.com/user/appupload", imageURI, options, true).then(function(result) {
                    console.log("New post with picture success");
                    return JSON.parse(result.response);
                  }, function(err) {
                        console.log("ERROR: " + JSON.stringify(err)); 
                        console.log(  options );
                        console.log( imageURI );
                  }, function (progress) {
                        // constant progress updates
                        console.log( progress );
                  });

      }
       */
      
      
    /**
    *    Uploading Function v1
    **/
	
    $scope.openPhotoLibrary = function() {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {

            //console.log(imageData);
            //console.log(options);   
            $scope.uploadUri = "data:image/jpeg;base64," + imageData;
            
            var server = "http://rentalaspacelocator.com/user/appupload",
                filePath = imageData;

            var date = new Date();

            var options = {
                fileKey: "file",
                fileName: imageData.substr(imageData.lastIndexOf('/') + 1),
                chunkedMode: false,
                mimeType: "image/jpg"
            };

            $cordovaFileTransfer.upload(server, filePath, options).then(function(result) {
                console.log("SUCCESS: " + JSON.stringify(result.response));
                console.log('Result_' + result.response[0] + '_ending');
                alert("success");
                alert(JSON.stringify(result.response));

            }, function(err) {
                console.log("ERROR: " + JSON.stringify(err));
                //alert(JSON.stringify(err));
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

.controller('ItemCtrl', function($scope, $stateParams , Profiles) {
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

.controller('DashCtrl', function($scope, $stateParams , Profiles) {
    //console.log($scope.profiles);
 $scope.loadData = function () {
	Profiles.all().success(function(data){
        $scope.profiles = data;
    });
 }
    
    $scope.loadData();
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


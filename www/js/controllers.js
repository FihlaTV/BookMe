angular.module('starter.controllers', [])


.controller('Messages', function($scope, $http, $rootScope, $ionicModal) {
    
      
    $scope.loadData = function(){
          $http.post("http://rentalaspacelocator.com/user/messages/"+$rootScope.userid).success(function(data, status) {
                     $scope.messages = data;
          });
    }
    
     $scope.loadData();
     
    $scope.showMessage = function(id){
         angular.forEach($scope.messages, function(value, key) {
                 if (value['id'] == id){
                     $scope.submessage = value;
                     
                      var data = $.param({
                          json: JSON.stringify({
                              id:id
                          })
                      });
         
                     $http.post("http://rentalaspacelocator.com/user/appmessagestatus", data).success(function(data, status) {
                         $scope.openmessage.show();
                     }); 
                 }
                   
         });
    }
    
    $scope.deletemessage = function(id){
       $http.post("http://rentalaspacelocator.com/user/deletemessage/" + id).success(function(data, status) {
                  $scope.showAlert('Successfully deleted item.');	
                   $scope.loadData();
                   $scope.openmessage.hide();
          });
    }
    
     $ionicModal.fromTemplateUrl('templates/openmessage.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.openmessage = modal;
      });
      $scope.openModal = function() {
        $scope.openmessage.show();
      };
      $scope.closeModal = function() {
        $scope.openmessage.hide();
     };
    
     $ionicModal.fromTemplateUrl('templates/sendmessage.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.sendmessage = modal;
      });
    
      $scope.openModal2 = function() {
        $scope.sendmessage.show();
        $scope.openmessage.hide();
      };
      $scope.closeModal2 = function() {
        $scope.sendmessage.hide();
     };

     $scope.message = function (mess,id) {
         id = $scope.submessage.id_from;

         var data = $.param({
                json: JSON.stringify({
                    id_from:$rootScope.userid,
                    id_to:id,
                    title:mess.title,
                    message:mess.message
                })
            });
         
         $http.post("http://rentalaspacelocator.com/user/appaddmessage", data).success(function(data, status) {
                   $scope.sendmessage.hide();
          });
         
     }

})

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup, $http, $rootScope, Profiles) {

    $ionicModal.fromTemplateUrl('templates/applylessor.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.applylessor = modal;
      });
    
      $scope.applylessoropenModal = function() {
        $scope.applylessor.show();
      };
      $scope.applylessorcloseModal = function() {
        $scope.applylessor.hide();
     };
	
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
          
           //console.log(user.validate);
           
           if(user.validate != 'false'){
            $rootScope.user = user.username;
             $rootScope.userid = user.validate.id;
               if (user.validate.lessor == 0){
                    $rootScope.lessor = false;
                    $scope.islessor = false;
               }
               else{
                    $rootScope.lessor = true;
                    $scope.islessor = true;
               }
               
               console.log($scope.islessor);
			$location.path('/app/dashboard');
               
               user.username = null;
               user.password = null;
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
                    $scope.item.space_type = null;
                    $scope.item.location = null;
                    $scope.item.price = null;
                    $scope.item.comments = null;
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
                  $scope.profiles = data;
              
          });
    };

})

.controller('myItemCtrl', function($scope, $stateParams, User, Profiles, $ionicModal, $rootScope, $http) {
    $scope.loadData = function () {
        Profiles.getmyitems($rootScope.userid).success(function(data){
            $scope.profiles = data;
        });
    }
    
    $scope.loadData();
    
    $scope.deletemyitem = function(id){
        $http.post("http://rentalaspacelocator.com/user/deletemyitem/" + id).success(function(data, status) {
                  $scope.showAlert('Successfully deleted item.');	
                   $scope.loadData();
          });
       
    }
})

.controller('ItemCtrl', function($scope, $stateParams, User, Profiles, $ionicModal, $rootScope, $http) {
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
    
    
    
    
     $ionicModal.fromTemplateUrl('templates/sendmessage.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.sendmessage = modal;
      });
      $scope.openModal = function() {
        $scope.sendmessage.show();
      };
      $scope.closeModal = function() {
        $scope.sendmessage.hide();
     };
    
    

     $scope.message = function (mess,id) {
         //console.log(id);
            //console.log($rootScope.userid);
         var data = $.param({
                json: JSON.stringify({
                    id_from:$rootScope.userid,
                    id_to:id,
                    title:mess.title,
                    message:mess.message
                })
            });
         
         $http.post("http://rentalaspacelocator.com/user/appaddmessage", data).success(function(data, status) {
                   $scope.sendmessage.hide();
          });
         
     }

    
})

.controller('PublicProfileCtrl', function($scope, User, $ionicModal,$stateParams, $rootScope, $http){
    $scope.loadUserData = function () {
          $scope.name = parseInt($stateParams.profileId);
        
	   User.getuser($scope.name).success(function(data){
          
             angular.forEach(data, function(value, key) {
               
                     $scope.userprofile = value;
  
                });
        });
    }
    
    $scope.loadUserData();
    
    $ionicModal.fromTemplateUrl('templates/feedback.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.feedback = modal;
      });
      $scope.openModal = function() {
        $scope.feedback.show();
      };
      $scope.closeModal = function() {
        $scope.feedback.hide();
     };
    
    $scope.loadfeedback = function(){
         User.getfeedback($scope.name).success(function(data){
          
                        
                                 $scope.userfeedback = data;
                    });
    }
    
     $scope.loadfeedback();
    
    if($scope.name == $rootScope.userid){
         $scope.isuser = true;
    }else{
         $scope.isuser = false;
    }
   
     
     $scope.addfeedback = function (feedback) {
        
         var data = $.param({
                json: JSON.stringify({
                    id_from:$rootScope.userid,
                    id_to: $scope.name,
                    message:feedback.message
                })
            });
         
         $http.post("http://rentalaspacelocator.com/user/appaddfeedback", data).success(function(data, status) {
                   $scope.feedback.hide();
                    $scope.loadfeedback();
          });
         
     }
    
})

.controller('UserProfileCtrl', function($scope, User, $ionicModal, $rootScope, $http){
     $scope.loadData = function () {
          $scope.name = $rootScope.user;
          $scope.islessor = $rootScope.lessor;
	   User.get($rootScope.userid).success(function(data){
          
             angular.forEach(data, function(value, key) {
                     $scope.userprofile = value;
                });
        });
    }
    
    $scope.loadData();
    
    
      $ionicModal.fromTemplateUrl('templates/editprofile.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.editprofile = modal;
      });
      $scope.editprofileopenModal = function() {
        $scope.editprofile.show();
      };
      $scope.editprofilecloseModal = function() {
        $scope.editprofile.hide();
     };
    
     $scope.editmyprofile = function(userprofile){
         var data = $.param({
                          json: JSON.stringify({
                              id:$rootScope.userid,
                              fname:userprofile.fname,
                              lname:userprofile.lname,
                              address:userprofile.address,
                              contact_number:userprofile.contact_number,
                              birthday:userprofile.birthday,
                              civil_status:userprofile.civil_status,
                              age:userprofile.age,
                              gender:userprofile.gender
                          })
                      });
         
                     $http.post("http://rentalaspacelocator.com/user/appeditprofile", data).success(function(data, status) {
                          $scope.editprofile.hide();
                     }); 
    }
    
    
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


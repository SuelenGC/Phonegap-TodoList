var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
  var image = $('#image');
  console.log(imageData);

  image.src = imageData;
}

function onPhotoURISuccess(imageURI) {
  alert(imageURI);

  var image = document.getElementById('image');

  image.src = imageURI;
}

function capturePhoto() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, 
    { 
      quality: 50,
      destinationType: destinationType.DATA_URL 
    });
}

function getPhoto() {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, 
    { 
      quality: 50,
      destinationType: destinationType.FILE_URI,
      sourceType: pictureSource.PHOTOLIBRARY
    });
}

function onFail(message) {
  alert('Failed because: ' + message);
}
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	function onSuccessUri(imageUri) {
		console.log(imageUri);

		$('#image').attr('src', imageUri);
	}

	$('#galeria').on('click', function() {
		navigator.camera.getPicture(onSuccessUri, onFail, 
	    { 
	      quality: 50,
	      destinationType: navigator.camera.DestinationType.FILE_URI,
	      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
	    });

	})

	// Abrir Camera
	function onFail(message) {
		alert(message);
	}

	function onSuccessData(imageData) {
		console.log(imageData);

		$('#image').attr('src', imageData);
	}

	$('#tirarFoto').on('click', function() {
		navigator.camera.getPicture(
			onSuccessData, 
			onFail,
			{
				quality: 50,
				destinationType: navigator.camera.DestinationType.DATA_URL
			});
	})
	// fim abrir camera
}
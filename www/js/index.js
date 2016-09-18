document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

	var taskList = new Array();

	$( document ).ready(function(){

	    $(".button-collapse").sideNav();
	    
	    var $newTaskInput = $('#newTaskInput');
	    var $taskList = $('#taskList');

	    var taskTouchStart;
	    var taskTouchEnd;
	    var taskTouchStartX;
	    var taskTouchEndX;

	    if (window.localStorage){
	        taskList = JSON.parse(window.localStorage.getItem('taskList'));
	    }

	    if (null !== taskList){
	        for(i=0; i<taskList.length; i++){
	            var newTask = '<li class="card darken-1" data-key="' + taskList[i].key + '"><span>' + taskList[i].task + '</span></li>';
	            $taskList.append(newTask);
	        }
	    }
	    else
	    {
	        taskList = new Array();
	    }

		var onSuccess = function(position) {
		    navigator.notification.alert('Latitude: '          + position.coords.latitude          + '\n' +
		          'Longitude: '         + position.coords.longitude         + '\n' +
		          'Altitude: '          + position.coords.altitude          + '\n' +
		          'Accuracy: '          + position.coords.accuracy          + '\n' +
		          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		          'Heading: '           + position.coords.heading           + '\n' +
		          'Speed: '             + position.coords.speed             + '\n' +
		          'Timestamp: '         + position.timestamp                + '\n');
		};

		function onError(error) {
		    alert('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
		}

		$('#addNewTask').on('click', function() {
	        var key = Date.now();
	        // $newTaskInput.val('Teste ' + Date.now());
	        var newTask = '<li class="card darken-1" data-key="' + $newTaskInput.val() + '"><span>' + $newTaskInput.val() + '</span></li>';
	        $taskList.append(newTask);

	        //persist
	        taskList.push({key:key, task:$newTaskInput.val(), done:false});
	        if(window.localStorage) {
	            window.localStorage.setItem('taskList', JSON.stringify(taskList));
	        }

	        navigator.geolocation.getCurrentPosition(onSuccess, onError);
	        $newTaskInput.val('');
	    });

	    $taskList.on('touchstart', 'li', function(e){
	        var start = e.target;
	        taskTouchStart = $(start).attr('data-key');
	        taskTouchStartX = e.originalEvent.touches[0].pageX;
	    });

	    $taskList.on('touchmove', 'li', function(e){
	        var end = e.target;
	        taskTouchEnd = $(end).attr('data-key');
	        taskTouchEndX = e.originalEvent.touches[0].pageX;
	        
	        if (taskTouchStart == taskTouchEnd) {

		        if (taskTouchStartX < taskTouchEndX) {
		            //to right done
		            $(end).toggleClass('done');
		        } 
		        else 
		        {
		            //to left delete
		            taskList = $.grep(taskList, function(e){ return e.key != taskTouchEnd;})
		            if(window.localStorage) {
		                window.localStorage.setItem('taskList', JSON.stringify(taskList));
		            }
		    
		            $(end).hide("slow", function(){ $(this).remove(); });
		        }
		    }
	    });
	});

	//teste notification
    navigator.notification.alert('teste', null, 'Game Over', 'Done')


}
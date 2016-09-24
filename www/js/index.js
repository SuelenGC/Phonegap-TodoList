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
	            var newTask = '<li class="card darken-1" data-key="' + taskList[i].key + '"><span>' + taskList[i].task + 
                    '</br>latitude: ' + taskList[i].latitude + 
                    '</br>longitude: ' + taskList[i].longitude + 
                    '</span></li>';

	            $taskList.append(newTask);
	        }
	    }
	    else
	    {
	        taskList = new Array();
	    }


		var onSuccess = function(position) {
		    var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            var key = Date.now();
            var newTask = '<li class="card darken-1" data-key="' + key + '"><span>' + $newTaskInput.val() + 
                    '</br>latitude: ' + lat + 
                    '</br>longitude: ' + lng + 
                    '</span></li>';

            $taskList.append(newTask);

            //persist localStorage
            taskList.push({key:key, 
                        task:$newTaskInput.val(), 
                        done:false,
                        latitude: lat,
                        longitude: lng
                    });

            if(window.localStorage) {
                window.localStorage.setItem('taskList', JSON.stringify(taskList));
            }

            $newTaskInput.val('');
		};

		function onError(error) {
		    alert('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
		}

		$('#addNewTask').on('click', function() {
	        navigator.geolocation.getCurrentPosition(onSuccess, onError);
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
    //navigator.notification.alert('teste', null, 'Game Over', 'Done')
}
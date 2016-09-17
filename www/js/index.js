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
            var newTask = '<li data-key="' + taskList[i].key + '"><span>' + taskList[i].task + '</span></li>';
            $taskList.append(newTask);
        }
    }
    else
    {
        taskList = new Array();
    }

    $('#addNewTask').on('click', function() {
        var key = Date.now();
        // $newTaskInput.val('Teste ' + Date.now());
        var newTask = '<li data-key="' + key + '"><span>' + $newTaskInput.val() + '</span></li>';
        $taskList.append(newTask);

        //persist
        taskList.push({key:key, task:$newTaskInput.val(), done:false});
        if(window.localStorage) {
            window.localStorage.setItem('taskList', JSON.stringify(taskList));
        }

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
        
        if (taskTouchStartX < taskTouchEndX) {
            //to right done
            if (taskTouchStart == taskTouchEnd) {
                $(end).toggleClass('done');
            }    
        } else {
            //to left delete
            if (taskTouchStart == taskTouchEnd) {
                taskList = $.grep(taskList, function(e){ return e.key != taskTouchEnd;})
                if(window.localStorage) {
                    window.localStorage.setItem('taskList', JSON.stringify(taskList));
                }
        
                $(end).remove();
            }
        }
    });
});
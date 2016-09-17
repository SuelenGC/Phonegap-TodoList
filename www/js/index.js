$( document ).ready(function(){

    var $newTaskInput = $('#newTaskInput');
    var $taskList = $('#taskList');

    var taskTouchStart;
    var taskTouchEnd;
    var taskTouchStartX;
    var taskTouchEndX;

    $('#addNewTask').on('click', function() {
        var key = Date.now();
        $newTaskInput.val('Teste ' + Date.now());
        var newTask = '<li data-key="' + key + '"><span>' + $newTaskInput.val() + '</span></li>';
        $taskList.append(newTask);
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
            //to right 
            if (taskTouchStart == taskTouchEnd) {
                $(end).toggleClass('done');
            }    
        } else {
            //to left
            if (taskTouchStart == taskTouchEnd) {
                $(end).remove();
            }
        }
    });
});
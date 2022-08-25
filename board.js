async function initBoard() {
    await initBoardDB();
    await renderTasksToBoard();
}



async function renderTasksToBoard() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';


    for (let i = 0; i < boardTasks.length; i++) {
        const task = boardTasks[i];
        if (task['status'] == 'todo') {
            returnTaskHTML(i, task, 'todo');
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);
        }

        // in-progress column
        if (task['status'] == 'in-progress') {
            returnTaskHTML(i, task, 'in-progress');
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);
        }
        // // testing column
        if (task['status'] == 'testing') {
            returnTaskHTML(i, task, 'testing');
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);
        }
        // // done column
        if (task['status'] == 'done') {
            returnTaskHTML(i, task, 'done');
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);
        }
    }
}
    function renderAssignedMembersForEachTask(i, task) {
        document.getElementById('assigned-to-' + i).innerHTML = '';
        for (let j = 0; j < task['assignedMember'].length; j++) {
            const assignedMember = task['assignedMember'][j];
            document.getElementById('assigned-to-' + i).innerHTML += `<div class="assigned-to-list-member"><b>- ${assignedMember['firstName']} ${assignedMember['lastName']}</b></div>`
        }
    }

    function renderUrgencyForEachTask(i, task) {
        if (task['urgency'] == 'Low') {
            document.getElementById('urgency-' + i).innerHTML = `<div class="green"><b>LOW</b></div>`;
            document.getElementById('task-' + i).classList.add('border-green');
        }
        if (task['urgency'] == 'Mid') {
            document.getElementById('urgency-' + i).innerHTML = `<div class="orange"><b>MID</b></div>`;
            document.getElementById('task-' + i).classList.add('border-orange');
        }
        if (task['urgency'] == 'High') {
            document.getElementById('urgency-' + i).innerHTML = `<div class="red"><b>HIGH</b></div>`;
            document.getElementById('task-' + i).classList.add('border-red');
        }
    }

    let currentDraggedElement;

    function startDragging(id) {
        currentDraggedElement = id;
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    async function moveTo(category) {
        boardTasks[currentDraggedElement]['status'] = category;
        await setBoardTask();
        await setTask();
        removeHighlight(category);
        renderTasksToBoard();
    }

    function highlight(category) {
        document.getElementById(category).classList.add('highlight');
    }

    function removeHighlight(category) {
        document.getElementById(category).classList.remove('highlight');
    }

// renderToDo();
// renderInProgress();
// renderTesting();
// renderDone();
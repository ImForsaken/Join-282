/**
 * Contains current selected element
 */
let currentDraggedElement;


/**
 * Downloads and Render all Boardtaks on Board
 */
async function initBoard() {
    await initBoardDB();
    await renderTasksToBoard();
}


/**
 * Displays the delete Container on the Board
 */
function showDeleteArea() {
    document.getElementById('deleteTaskArea').classList.remove('d-none');
}


/**
 * Hides delete Container
 */
function hideDeleteArea() {
    document.getElementById('deleteTaskArea').classList.add('d-none');
}


/**
 * Displays delete Container on Board HTML
 */
function dragOverDeleteArea() {
    document.getElementById('deleteTaskArea').classList.remove('deleteTaskArea');
    document.getElementById('deleteTaskArea').classList.add('deleteTaskAreaHover');
}


/**
 * Makes element delete able
 */
function resetDeleteArea() {
    document.getElementById('deleteTaskArea').classList.remove('deleteTaskAreaHover');
    document.getElementById('deleteTaskArea').classList.add('deleteTaskArea');
}


/**
 * Deletes selected Boardtask
 */
async function deleteBoardTask() {
    boardTasks.splice(currentDraggedElement, 1);
    await setBoardTask();
    await initBoardDB();
    await initBoard();
    playDropSound();
}


/**
 * Render all Boardtasks to columns
 */
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

        if (task['status'] == 'in-progress') {
            returnTaskHTML(i, task, 'in-progress');
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);
        }

        if (task['status'] == 'testing') {
            returnTaskHTML(i, task, 'testing');
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);
        }

        if (task['status'] == 'done') {
            returnTaskHTML(i, task, 'done');
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);
        }
    }
}


/**
 * Renders all Member which has been assigned to the Task
 * 
 * @param {number} i - index
 * @param {string} task - object Team information
 */
function renderAssignedMembersForEachTask(i, task) {
        document.getElementById('assigned-to-' + i).innerHTML = '';
        for (let j = 0; j < task['assignedMember'].length; j++) {
            const assignedMember = task['assignedMember'][j];
            document.getElementById('assigned-to-' + i).innerHTML += `<div class="assigned-to-list-member"><b>- ${assignedMember['firstName']} ${assignedMember['lastName']}</b></div>`
        }
    }


/**
 * Adding urgency colors to Taskcontainers
 * 
 * @param {number} i - index of current task
 * @param {string} task - object urgency information
 */
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


/**
 * 
 * @param {number} id - id of currently dragged element
 */
function startDragging(id) {
        currentDraggedElement = id;
        showDeleteArea();
    }


/**
 * Prevents transfered event
 * 
 * @param {event} ev - event information
 */
function allowDrop(ev) {
        ev.preventDefault();
    }


/**
 * Enable that element can be moved to another container and changes tasks status
 * 
 * @param {string} category - current status of selected element
 */
async function moveTo(category) {
        boardTasks[currentDraggedElement]['status'] = category;
        await setBoardTask();
        await setTask();
        removeHighlight(category);
        renderTasksToBoard();
    }

    
/**
 * Highlights the Column of current selected Taskcontainer
 * 
 * @param {string} category - current category of selected element
 */
function highlight(category) {
        document.getElementById(category).classList.add('highlight');
    }

    
/**
 * Removes highlight class from highlighted column
 * 
 * @param {string} category - current category of selected element
 */
function removeHighlight(category) {
        document.getElementById(category).classList.remove('highlight');
    }
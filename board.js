
async function initBoard() {
    await initBoardDB();
    renderTasksToBoard();
}

async function renderTasksToBoard() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < boardTasks.length; i++) {
        const task = boardTasks[i];
        // to-do column
        if (task['status'] == 'todo') {
            document.getElementById('todo').innerHTML += /*html*/ `
            <div draggable="true" ondragstart="startDragging(${i})" id="task-${i}" class="task-container">
                <h3><b>${task['title']}</b></h3>
                <div>${task['category']}</div>
                <div class="task-container-subheadline">
                    <span>${new Date(task['createdAt']).toLocaleDateString('eu-DE')}</span>
                    <span id="urgency-${i}"><b>Urgency: </b></span>
                </div>
                <div id="assigned-to-${i}"><b>Assigned to: </b></div>
                <div class="task-description"><b>Description:</b><br> ${task['description']}</div>
            </div>
            `;
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);

        }

        // in-progress column
        if (task['status'] == 'in-progress') {
            document.getElementById('in-progress').innerHTML += /*html*/ `
            <div draggable="true" ondragstart="startDragging(${i})" id="task-${i}" class="task-container">
                <h3><b>${task['title']}</b></h3>
                <div>${task['category']}</div>
                <div class="task-container-subheadline">
                    <span>${new Date(task['createdAt']).toLocaleDateString('eu-DE')}</span>
                    <span id="urgency-${i}"><b>Urgency: </b></span>
                </div>
                <div id="assigned-to-${i}"><b>Assigned to: </b></div>
                <div class="task-description"><b>Description:</b><br> ${task['description']}</div>
            </div>
            `;
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);

        }
        // testing column
        if (task['status'] == 'testing') {
            document.getElementById('testing').innerHTML += /*html*/ `
                    <div draggable="true" ondragstart="startDragging(${i})" id="task-${i}" class="task-container">
                        <h3><b>${task['title']}</b></h3>
                        <div>${task['category']}</div>
                        <div class="task-container-subheadline">
                            <span>${new Date(task['createdAt']).toLocaleDateString('eu-DE')}</span>
                            <span id="urgency-${i}"><b>Urgency: </b></span>
                        </div>
                        <div id="assigned-to-${i}"><b>Assigned to: </b></div>
                        <div class="task-description"><b>Description:</b><br> ${task['description']}</div>
                    </div>
                    `;
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);

        }
        // done column
        if (task['status'] == 'done') {
            document.getElementById('done').innerHTML += /*html*/ `
                    <div draggable="true" ondragstart="startDragging(${i})" id="task-${i}" class="task-container">
                        <h3><b>${task['title']}</b></h3>
                        <div>${task['category']}</div>
                        <div class="task-container-subheadline">
                            <span>${new Date(task['createdAt']).toLocaleDateString('eu-DE')}</span>
                            <span id="urgency-${i}"><b>Urgency: </b></span>
                        </div>
                        <div id="assigned-to-${i}"><b>Assigned to: </b></div>
                        <div class="task-description"><b>Description:</b><br> ${task['description']}</div>
                    </div>
                    `;
            renderAssignedMembersForEachTask(i, task);
            renderUrgencyForEachTask(i, task);

        }

    }
}

function renderAssignedMembersForEachTask(i, task) {
    document.getElementById('assigned-to-' + i).innerHTML = '';
    for (let j = 0; j < task['assignedMember'].length; j++) {
        const assignedMember = task['assignedMember'][j];
        document.getElementById('assigned-to-' + i).innerHTML += `<br>${assignedMember['firstName']} ${assignedMember['lastName']}`
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
    renderTasksToBoard();
    removeHighlight(category);
    await setBoardTask();
    await setTask();
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
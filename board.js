async function renderTasksToBoard() {
    await initBoardDB();
    for (let i = 0; i < boardTasks.length; i++) {
        const task = boardTasks[i];
        if (task['status'] = 'todo') {
            document.getElementById('to-do').innerHTML += /*html*/ `
            <div id="task-${i}" class="task-container">
                <div><b>${task['title']}</b></div>
                <div>${task['category']}</div>
                <div class="task-container-subheadline">
                    <span>${new Date(task['createdAt'])}</span>
                    <span id="urgency-${i}"><b>Urgency: </b></span>
                </div>
                <div id="assigned-to-${i}"><b>Assigned to: </b></div>
                <div class="task-description"><b>Description:</b><br> ${task['description']}</div>
            </div>
            `;
        }
        // render assigned members
        for (let j = 0; j < task['assignedMember'].length; j++) {
            const assignedMember = task['assignedMember'][j];
            document.getElementById('assigned-to-' + i).innerHTML += `<br>${assignedMember['firstName']} ${assignedMember['lastName']}`
        }
        // render urgency
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
}




// renderToDo();
// renderInProgress();
// renderTesting();
// renderDone();
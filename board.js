function renderTasksToBoard() {
    for (let i = 0; i < boardTasks.length; i++) {
        const task = boardTasks[i];
        if (task['status'] ='todo') {
            document.getElementById('to-do').innerHTML += /*html*/ `
            <div class="task-container">
                <h4>${task['title']}</h4>
                <h5>${task['category']}</h5>
                <span>Assigned to: ${task['title']}</span>
                <div class="task-container-subheadline">
                    <span>${task['createdAt']}</span>
                    <span><b>${task['urgency']}</b></span>
                </div>
                <span class="task-description">${task['description']}</span>
            </div>
            `;
        }
    }
}




// renderToDo();
// renderInProgress();
// renderTesting();
// renderDone();
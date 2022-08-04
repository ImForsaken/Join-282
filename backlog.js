async function initBacklogProcess() {
    await initBacklogDB();
    renderTasks();
}

function renderTasks() {
    for (let i = 0; i < allTasks.length; i++) {      
        renderTaskHTML(i);
    }
}

function renderTaskHTML(i) {
    let taskContent = document.getElementById('taskContent');
    let title = allTasks[i].title;
    let date = allTasks[i].date;
    let category = allTasks[i].category;
    let urgency = allTasks[i].urgency;
    let description = allTasks[i]['description'];
    taskContent.innerHTML +=
    `
    <div id="taskContainer${i}" class="taskContainerBacklog">
                    <div class="taskBox">
                        <img src="./img/avatar1.JPG" class="avatar2">
                        <div>
                            Kevin Herbst<br>
                            Kevin@join.de
                        </div>
                    </div>
                    <div>${allTasks[i].category}</div>
                    <textarea id="description${i}">${description}</textarea>
                </div>
    
    `;

    if (urgency == "Low") {
        document.getElementById('taskContainer' + i).style.borderLeft = "10px solid green";
    }
    else if (urgency == "Mid") {
        document.getElementById('taskContainer' + i).style.borderLeft = "10px solid purple";
    }
    else if (urgency == "High") {
        document.getElementById('taskContainer' + i).style.borderLeft = "10px solid orange";
    }

}
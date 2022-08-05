async function initBacklogProcess() {
    await initBacklogDB();
    renderTasks();
}
// Render HTML code as task container
function renderTasks() {
    for (let i = 0; i < allTasks.length; i++) {      
        renderTaskHTML(i);
    }
}

function renderTaskHTML(i) {
    let taskContent = document.getElementById('taskContent');
    let title = allTasks[i].title;
    let id = allTasks[i].id;
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
                            Kevin@join.de<br>
                            ${id}
                        </div>
                    </div>
                    <div class="category">${allTasks[i].category}</div>
                    <textarea rows="2" cols="3" id="description${i}">${description}</textarea>
                    <div class="backlogSettings">
                    <img id="push${i}" src="./img/push.svg">
                    <img id="delete${i}" src="./img/trash.svg">
                    </div>
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
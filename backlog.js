async function initBacklogProcess() {
    await initAllDbData();
    renderTasks();
}
// Render HTML code as task container
function renderTasks() {
    let taskContent = document.getElementById('taskContent');
    taskContent.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {      
        renderTaskHTML(i, taskContent);
    }
    console.log(allTasks);
}

function renderTaskHTML(i) {
    let title = allTasks[i].title;
    let name = allTasks[i].name;
    let id = allTasks[i].id;
    let date = allTasks[i].date;
    let category = allTasks[i].category;
    let urgency = allTasks[i].urgency;
    let description = allTasks[i].description;
    backlogHTML(taskContent, i, category, description, date);

    getTaskMembers(i);
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

function getTaskMembers(i) {

    for (let j = 0; j < allTasks[i].assignedMember.length; j++) {
        let assignedTo = document.getElementById('assignedMember' + i);
        let avatarBox = document.getElementById('avatarBox' + i);
        const firstName = allTasks[i].assignedMember[j].firstName;
        const lastName = allTasks[i].assignedMember[j].lastName;
        const email = allTasks[i].assignedMember[j].eMail;
        let src = allTasks[i].assignedMember[j].src;
        avatarBox.innerHTML += `
        <img src=${src} class="avatar2">
        `
        assignedTo.innerHTML += `
        <b>${firstName} ${lastName}</b><br>
        <a href="${email}">${email}</a><br>
        `;      
    };
}

function backlogHTML(taskContent, i, category, description, date) {
    return taskContent.innerHTML += `
    <div id="taskContainer${i}" class="taskContainerBacklog">
                    <div class="taskBox">
                    <div id="avatarBox${i}" class="avatarBox">
                        
                    </div>
                        <div id="assignedMember${i}">
                        </div>
                    </div>
                    <div class="category"><b>Due Date</b><br><b>${date}</b></div>
                    <div class="category"><b>${category}</b></div>
                    <textarea rows="2" cols="3" id="description${i}">${description}</textarea>
                    <div class="backlogSettings">
                    <img id="push${i}" onclick="pushTaskToBoard(${i})" src="./img/push.svg">
                    <img id="delete${i}" src="./img/trash.svg">
                    </div>
                </div>
    `;
}

async function pushTaskToBoard(i) {
    await initAllDbData();
    boardTasks.push(allTasks[i]);
    allTasks.splice(i, 1);

    await setBoardTask();
    await setTask();

    await initBacklogProcess();

}

async function pushTaskToBackend(task) {
    allTasks.push(task);
    await setBoardTask();
    await setTask();
}
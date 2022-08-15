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
}

function renderTaskHTML(i) {
    let date = allTasks[i].date;
    let category = allTasks[i].category;
    let urgency = allTasks[i].urgency;
    let description = allTasks[i].description;
    switchMe = "taskContainer";
    backlogHTML(taskContent, i, category, description, date);

    getTaskMembers(i);
    getBorderColor(i, urgency);
}

function getBorderColor(i, urgency) {
    if (urgency == "Low") {
        document.getElementById('taskContainer' + i).style.borderLeft = "10px solid green";
    }
    else if (urgency == "Mid") {
        document.getElementById('taskContainer' + i).style.borderLeft = "10px solid purple";
    }
    else if (urgency == "High") {
        document.getElementById('taskContainer'+ i).style.borderLeft = "10px solid orange";
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
    <div id="taskContainer${i}" class="taskContainerBacklog" onclick="openTaskInfoCard(${i})">
        <div class="innerContainer">
            <div class="taskBox">
                    <div id="avatarBox${i}" class="avatarBox">
                    </div>
                    <div id="assignedMember${i}">
                    </div>
            </div>
            <div class="category"><b>Due Date</b><br><b>${date}</b></div>
            <div class="category"><b>${category}</b></div>
            <textarea  onclick="event.stopPropagation()" class="scroll" rows="2" cols="3" id="description${i}">${description}</textarea>
            <div class="backlogSettings">
                <img id="push${i}"  onclick="pushTaskToBoard(${i}), event.stopPropagation())" src="./img/push.svg">
                <img id="edit${i}" onclick="editDescription(${i}, event.stopPropagation())" src="./img/edit.svg">
                <img id="delete${i}" onclick="deleteTaskBacklog(${i}, event.stopPropagation())" src="./img/trash.svg">
            </div>
        </div
    </div>
    `;
}

function openTaskInfoCard(i) {
    document.getElementById('backlogTaskInfoCard').classList.remove('d-none');
    let title = allTasks[i].title;
    let date = allTasks[i].date;
    let description = allTasks[i].description;
    let urgency = allTasks[i].urgency;
    let category = allTasks[i].category;
    infoCard = document.getElementById('backlogInfoCard');
    infoCard.innerHTML = "";
    infoCard.innerHTML = `
    <div class="bCard text-bg-dark">
        <img src="../img/logo.png" class="card-img" alt="Join">
        <div class="card-img-overlay">
            <h3 class="card-title">${title}</h3>
            <div class="card-text">
                <h4 id="todoUrgency"><b>Todo:</b></h4>
                <div class="descriptionBox">
                    ${description}
                </div>
            </div>
            <div class="card-infos" id="cardInfos${i}">
                <p class="card-text1" id="cardUrgency">${urgency}</p>
                <p class="card-text2">This Task is assigned to the: <b>${category}</b> Team</p>
            </div>
            <p class="card-text3">Last updated 3 mins ago</p>
        </div>
    </div>
    `;
    getTaskMembersforInfoCard(i);
    getUrgencyBackground(urgency);
}

function getUrgencyBackground(urgency) {
    if (urgency == "Low") {
        document.getElementById('cardUrgency').style.backgroundColor = "green";
        document.getElementById('todoUrgency').style.color = "green";
    }
    else if (urgency == "Mid") {
        document.getElementById('cardUrgency').style.background = "purple";
        document.getElementById('todoUrgency').style.color = "purple";
    }
    else if (urgency == "High") {
        document.getElementById('cardUrgency').style.background = "orange";
        document.getElementById('todoUrgency').style.color = "orange";
    }
}



function getTaskMembersforInfoCard(i) {

    for (let j = 0; j < allTasks[i].assignedMember.length; j++) {
        let assignedTo = document.getElementById('cardInfos' + i);

        const firstName = allTasks[i].assignedMember[j].firstName;
        const lastName = allTasks[i].assignedMember[j].lastName;
        const email = allTasks[i].assignedMember[j].eMail;
        let src = allTasks[i].assignedMember[j].src;

        assignedTo.innerHTML += `
        <div class="memberCardInfo">
            <div>
                <b>${firstName} ${lastName}</b><br>
                <a href="${email}">${email}</a><br>
            </div>
            <div class="memberCardInfoBox">
                <img src="${src}" alt"avatar" class="avatar2">
            </div>
        </div>


        `;      
    };
}


function closeTaskInfoCard() {
    document.getElementById('backlogTaskInfoCard').classList.add('d-none');
}

async function pushTaskToBoard(i) {
    await initAllDbData();
    allTasks[i].status = "board";
    boardTasks.push(allTasks[i]);
    allTasks.splice(i, 1); 
    await setBoardTask();
    await setTask();
    await initBacklogProcess();
}

async function deleteTaskBacklog(i) {
    await initAllDbData();
    allTasks.splice(i, 1);
    await setBoardTask();
    await setTask();
    await initBacklogProcess();
}


async function editDescription(i) {
    await initAllDbData();
    let description = document.getElementById('description' + i);
    allTasks[i].description = description.value;
    await setBoardTask();
    await setTask();
    await initBacklogProcess();
}
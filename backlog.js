/**
 * Download all Backend data and renders Backlog Tasks
 */
async function initBacklogProcess() {
    await initAllDbData();
    renderTasks();
}


/**
 * Render HTML code as task container
 */
function renderTasks() {
    let taskContent = document.getElementById('taskContent');
    taskContent.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        renderTaskHTML(i, taskContent);
    }
}


/**
 * Determine the current Task information and transfer it to other Functions
 * 
 * @param {number} i -index
 */
function renderTaskHTML(i) {
    let date = allTasks[i].date;
    let category = allTasks[i].category;
    let urgency = allTasks[i].urgency;
    let description = allTasks[i].description;
    switchMe = "taskContainer";
    backlogHTML(i, category, description, date);
    getTaskMembers(i);
    getBorderColor(i, urgency);
}


/**
 * Displays all Information of assigned Members for this Task
 * 
 * @param {number} i - index
 */
function getTaskMembers(i) {

    for (let j = 0; j < allTasks[i].assignedMember.length; j++) {
        let assignedTo = document.getElementById('assignedMember' + i);
        const firstName = allTasks[i].assignedMember[j].firstName;
        const lastName = allTasks[i].assignedMember[j].lastName;
        const email = allTasks[i].assignedMember[j].eMail;
        let icon = allTasks[i].assignedMember[j].icon;

        assignedTo.innerHTML += `
        <div class="d-flex memberCardTag">
            <p class="avatar4">${icon}</p>
            <div class="ml-5">
                <b>${firstName} ${lastName}</b><br>
                <a href="${email}">${email}</a><br>
            </div>    
        </div>
        `;
    };
}


/**
 * Renders the complete HTML of every Task
 * 
 * @param {number} i - index of current loop
 * @param {string} category - Assigned Team
 * @param {string} description - Description of the Task
 * @param {string} date - Due date of Task
 * @returns - Returns HTML code
 */
function backlogHTML(i, category, description, date) {
    return taskContent.innerHTML += `
    <div id="taskContainer${i}" class="taskContainerBacklog" onclick="openTaskInfoCard(${i})">
        <div class="innerContainer">
            <div class="taskBox">
                    <div id="assignedMember${i}" class="assignedMember">
                    </div>
            </div>
            <div class="category"><b>Due Date</b><br class="d-none-mobile"><b>${date}</b></div>
            <div class="category"><b>${category}</b></div>
            <div class="descriptionBacklogBox">
                <textarea  onclick="event.stopPropagation()" class="scroll" rows="2" cols="3" id="description${i}">${description}</textarea>
            </div>
            <div class="backlogSettings">
            
                <button class="pushBacklogButton" id="push${i}" onclick="openPushDialog(${i}), event.stopPropagation()" title="Move Task to Board"></button>
                
                <button class="editBacklogButton" id="edit${i}" onclick="openEditDialog(${i}), event.stopPropagation()" title="Submit Edit"></button>

                <button class="deleteBacklogTaskButton"  id="delete${i}" onclick="openDeleteDialog(${i}), event.stopPropagation()" title="Delete Task"></button>

            </div>
        </div
    </div>
    `;
}


/**
 * Displays Task card with more detailed Informations
 * 
 * @param {number} i - index
 */
function openTaskInfoCard(i) {

    document.getElementById('backlogTaskInfoCard').classList.remove('d-none');
    let title = allTasks[i].title;
    let date = allTasks[i].date;
    let description = allTasks[i].description;
    let urgency = allTasks[i].urgency;
    let category = allTasks[i].category;
    let lastEdit = new Date(allTasks[i].lastEdit).toLocaleTimeString('eu-DE');
    infoCard = document.getElementById('backlogInfoCard');
    infoCard.innerHTML = "";
    infoCard.innerHTML = renderInfoCardHTML(title, date, description, urgency, category, lastEdit);
    getUrgencyBackground(urgency);
    getTaskMembersforInfoCard(i);
    if (allTasks[i].lastEdit === "") {
        let createdAt = new Date(allTasks[i].createdAt).toString()
        document.getElementById('lastUpdate').innerHTML = `Task created: ${createdAt}`;
    }
}


/**
 * Changes the color of Taskcard Todo and the Background of Urgency container
 * 
 * @param {string} urgency - Task urgency level
 */
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


/**
 * Determine the Task left border color to display its current urgency level
 * 
 * @param {number} i - index of current loop
 * @param {string} urgency - Task urgency level
 */
function getBorderColor(i, urgency) {
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


/**
 * Renders all assigned Members for displayed Task
 * 
 * @param {number} i - Index of current loop
 */
function getTaskMembersforInfoCard(i) {

    for (let j = 0; j < allTasks[i].assignedMember.length; j++) {
        let assignedTo = document.getElementById('memberCardInfoContainer');
        const firstName = allTasks[i].assignedMember[j].firstName;
        const lastName = allTasks[i].assignedMember[j].lastName;
        const email = allTasks[i].assignedMember[j].eMail;
        const icon = allTasks[i].assignedMember[j].icon;
        assignedTo.innerHTML += renderAssignedToHTML(firstName, lastName, email, icon);
    };
}


/**
 * Renders the Infocard HTML code
 * 
 * @param {string} title - Title of task
 * @param {string} date - Due date of Task
 * @param {string} description - Task description
 * @param {string} urgency - Task urgency level
 * @param {string} category - Task assigned Team
 * @param {string} lastEdit - Last edit time of Task
 * @returns HTML code
 */
function renderInfoCardHTML(title, date, description, urgency, category, lastEdit) {
    return `
    <div class="bCard text-bg-dark">
        <img src="./img/logo.png" class="card-img" alt="Join">
        <div class="card-img-overlay">
            <h3 class="card-title">${title}</h3>
            <div class="card-text cardTextContainer">
                <h4 id="todoUrgency"><b>Todo:</b></h4>
                <div class="descriptionBox">
                    ${description}
                </div>
            </div>
            <div class="card-infos" id="cardInfos">
                <p class="card-text1" id="cardUrgency">${urgency}</p>
                <p class="card-text2">This Task is assigned to the:</p>
                <div class="cardTeamInfos">
                    <h2><b>${category} Team</b></h2>
                </div>
            </div>
            <div class="memberCardInfoContainer" id="memberCardInfoContainer">
            </div>
            <p class="card-text3" id="lastUpdate">Last edit: ${lastEdit}</p>
        </div>
    </div>
    `;
}


/**
 * Renders the HTML code and Information of an Task assigned Member
 * 
 * @param {string} firstName - First name of assigned Member
 * @param {string} lastName - Last name of assigned Member
 * @param {string} email - Email information of assigned Member
 * @param {string} icon - Generated icon for assigned Member
 * @returns HTML code
 */
function renderAssignedToHTML(firstName, lastName, email, icon) {
    return `
        <div class="memberCardInfo">
            <div>
                <b>${firstName} ${lastName}</b><br>
                <a href="${email}">${email}</a><br>
            </div>
            <div class="memberCardInfoBox">
                <p class="avatar4">${icon}</p>
            </div>
        </div>
        `;
}


/**
 * Hides the Task info card
 */
function closeTaskInfoCard() {
    document.getElementById('backlogTaskInfoCard').classList.add('d-none');
}


/**
 * 
 * @param {number} i - Index of current loop
 */
async function pushTaskToBoard(i) {
        await initAllDbData();
        allTasks[i].status = "todo";
        boardTasks.push(allTasks[i]);
        allTasks.splice(i, 1);
        await setBoardTask();
        await setTask();
        await initBacklogProcess();
        playDropSound();
};


/**
 * Function to delete selected Task from Backend
 * 
 * @param {number} i - Index of current loop
 */
async function deleteTaskBacklog(i) {
        await initAllDbData();
        allTasks.splice(i, 1);
        await setBoardTask();
        await setTask();
        await initBacklogProcess();
};


/**
 * Function to edit selected Task from Backend
 * 
 * @param {number} i - Index of current loop
 */
async function editDescription(i) {
        await initAllDbData();
        let description = document.getElementById('description' + i);
        allTasks[i].description = description.value;
        allTasks[i].lastEdit = new Date().getTime();
        await setBoardTask();
        await setTask();
        await initBacklogProcess();
}


function openPushDialog(i) {
    document.getElementById('actionDialog').classList.remove('d-none');
    document.getElementById('dialogBox').innerHTML = renderPushHTML(i);
}

function openEditDialog(i) {
    document.getElementById('actionDialog').classList.remove('d-none');
    document.getElementById('dialogBox').innerHTML = renderEditHTML(i);
}


function openDeleteDialog(i) {
    document.getElementById('actionDialog').classList.remove('d-none');
    document.getElementById('dialogBox').innerHTML = renderDeleteHTML(i);
}


function closeActionDialog() {
    document.getElementById('actionDialog').classList.add('d-none');
}


function renderPushHTML(i) {
    return `
    <div class="yesBox" id="yesBox">
        <p><b>Are you sure that you want to push this Task to the Board?</b></p>
        <button id="yesButton" onclick="pushTaskToBoard(${i})" type="button" class="btn btn-primary">Yes</button>
    </div>
    <div class="cancelBox" id="cancelBox">
        <button onclick="closeActionDialog()" id="cancelButton" type="button" class="btn btn-primary cancelButton btnCancel">Cancel</button>
    </div>
    `;
}


function renderDeleteHTML(i) {
    return `
    <div class="yesBox" id="yesBox">
        <p><b>Are you sure that you want to delete this Task?</b></p>
        <button id="yesButton" onclick="deleteTaskBacklog(${i})" type="button" class="btn btn-primary">Yes</button>
    </div>
    <div class="cancelBox" id="cancelBox">
        <button onclick="closeActionDialog()" id="cancelButton" type="button" class="btn btn-primary cancelButton btnCancel">Cancel</button>
    </div>
    `;
}


function renderEditHTML(i) {
    return `
    <div class="yesBox" id="yesBox">
        <p><b>Are you sure that you want to safe the Edit?</b></p>
        <button id="yesButton" onclick="editDescription(${i})" type="button" class="btn btn-primary">Yes</button>
    </div>
    <div class="cancelBox" id="cancelBox">
        <button onclick="closeActionDialog()" id="cancelButton" type="button" class="btn btn-primary cancelButton btnCancel">Cancel</button>
    </div>
    `;
}


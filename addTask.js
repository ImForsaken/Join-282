/**
 * Downloads all backend Data for addTask section
 */
async function init() {
    await initAllDbData();
    renderAvatar();
}


/**
 * Function that manages the process of creating a new Task
 */
async function addTask() {
    await initAllDbData();
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let urgency = document.getElementById('urgency');
    let description = document.getElementById('description');

    //defines object will all info
    if (selectedUsers.length === 0) {
        alert("Please select Member for this Task");
    } else {
        playDropSound();
        let task = {
            "title": title.value,
            "assignedMember": selectedUsers,
            "date": date.value,
            "category": category.value,
            "urgency": urgency.value,
            "description": description.value,
            "createdAt": new Date().getTime(),
            "status": "backlog",
            "lastEdit": ""
        };
        await pushTaskToBackend(task);
        selectedUsers = [];
        document.getElementById("memberBox").innerHTML = "";
        document.getElementById("taskForm").reset();
        displaySuccessMessage();
        setTimeout(init, 1500);
        setTimeout(hideSuccessMessage, 1500);
    };
}


/**
 * Unhides success container
 */
function displaySuccessMessage() {
    let success = document.getElementById("successBox");
    success.innerHTML = "Task safed!";
    success.classList.remove('d-none');
}


/**
 * Hides success container
 */
function hideSuccessMessage() {
    let success = document.getElementById("successBox");
    success.innerHTML = "";
    success.classList.add('d-none');
}


/**
 * Function safes the new Task to the Backend
 * 
 * @param {string} task - all Informations that has been selected for new Task
 */
async function pushTaskToBackend(task) {
    allTasks.push(task);
    await setBoardTask();
    await setTask();
}


/**
 * Clears Form inputs
 */
function cancelTask() {
    document.getElementById("taskForm").reset();
}


/**
 * Unhides Memberlist for Task creation
 */
function openMemberList() {
    renderAvatar();
    document.getElementById('avatarPicker').classList.remove('d-none');
    document.getElementById('transparentContainerAddTask').classList.remove('d-none');
}


/**
 * Hides Memberlist for Task creation
 */
function closeMemberList() {
    document.getElementById('avatarPicker').classList.add('d-none');
    document.getElementById('transparentContainerAddTask').classList.add('d-none');
}
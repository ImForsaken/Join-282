async function init() {
    await initAllDbData();
    renderAvatar();
}

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
        //add object to array and morph it to text to save it in backend
        await pushTaskToBackend(task);
        selectedUsers = [];
        document.getElementById("memberBox").innerHTML = "";
        document.getElementById("taskForm").reset();
        displaySuccessMessage();
        setTimeout(init, 1500);
        setTimeout(hideSuccessMessage, 1500);
        
    };
}

function displaySuccessMessage() {
    let success = document.getElementById("successBox");
    success.innerHTML = "Task safed!";
    success.classList.remove('d-none');
}

function hideSuccessMessage() {
    let success = document.getElementById("successBox");
    success.innerHTML = "";
    success.classList.add('d-none');
}

async function pushTaskToBackend(task) {
    allTasks.push(task);
    await setBoardTask();
    await setTask();
}

function cancelTask() {
    document.getElementById("taskForm").reset();
}

function openMemberList() {
    renderAvatar();
    document.getElementById('avatarPicker').classList.remove('d-none');
}

function closeMemberList() {
    document.getElementById('avatarPicker').classList.add('d-none');
}

function checkIfMemberSelected() {
    memberList = document.getElementById('avatarPicker').innerHTML;

}

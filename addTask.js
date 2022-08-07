async function init() {
    await initAllDbData();
    renderAvatar();
    return
}

async function addTask() {
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
            "status": "todo"
        };
        //add object to array and morph it to text to save it in locaStorage
        allTasks.push(task);
        setTask();
        document.getElementById("memberBox").innerHTML = "";
        document.getElementById("taskForm").reset();
        setTimeout(init, 1500); 
    };
}


function cancelTask() {
    document.getElementById("taskForm").reset();
}

function openMemberList() {
    document.getElementById('avatarPicker').classList.remove('d-none');
}

function closeMemberList() {
    document.getElementById('avatarPicker').classList.add('d-none');
}

function checkIfMemberSelected() {
    memberList = document.getElementById('avatarPicker').innerHTML;

}

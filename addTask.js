async function init() {
    setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
    await initBacklogDB();
    renderAvatar();
}

async function addTask() {
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let urgency = document.getElementById('urgency');
    let description = document.getElementById('description');

    
    //defines object will all info
    let task = {
        "title": title.value,
        "date": date.value,
        "category": category.value,
        "urgency": urgency.value,
        "description": description.value,
        "createdAt": new Date().getTime()
    };
    //add object to array and morph it to text to save it in locaStorage
    allTasks.push(task);
    allTasksAsText = JSON.stringify(allTasks);
    // localStorage.setItem('task', allTasksAsText);
    await backend.setItem('task', allTasksAsText);
    document.getElementById("taskForm").reset();
}

function cancelTask() {
    document.getElementById("taskForm").reset();
}


function openMemberList() {
    document.getElementById('avatarPicker').classList.remove('d-none');
}


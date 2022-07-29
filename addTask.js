let allTasks = []

function init() {
    loadAllTasks();
    renderAvatar();
}

function addTask() {
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let urgency = document.getElementById('urgency');
    let description = document.getElementById('description');
    
    //defines object will all info
    let task = {
        'title': title.value,
        'date': date.value,
        'category': category.value,
        'urgency': urgency.value,
        'description': description.value,
        'createdAt': new Date().getTime()
    };
    //add object to array and morph it to text to save it in locaStorage
    allTasks.push(task);
    allTasksAsText = JSON.stringify(allTasks);
    localStorage.setItem('task', allTasksAsText);

    document.getElementById("taskForm").reset();

}

function cancelTask() {
    document.getElementById("taskForm").reset();
}

//loads all safed data and parse it to data
function loadAllTasks() {
    allTasksAsText = localStorage.getItem('task');
    allTasks = JSON.parse(allTasksAsText);
    console.log(allTasks)
        // document.getElementById('list').innerHTML = allTasks[0]['createdAt'];
}
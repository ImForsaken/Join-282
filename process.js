// array container for all tasks after being downloaded from servr
let allTasks = [];

// download data from server
async function initBacklogDB() {    
    setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('task')) || [];
    console.log(allTasks)
};
// If need to delete all tasks
async function deleteTaskDb() {
    await backend.deleteItem('task');
  };
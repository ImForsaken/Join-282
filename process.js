// array container for all tasks after being downloaded from servr
let allTasks = [];
let boardTasks = [];

// download data from server

async function initAllDbData() {
    initBacklogDB();
    initBoardDB();
}
async function initBacklogDB() {    
    setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('task')) || [];
    console.log('BACKLOGTASKS', allTasks);
};

async function initBoardDB() {
    setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    boardTasks = JSON.parse(backend.getItem('allBoardTasks')) || [];
    console.log('BOARDTASKS', boardTasks);
}
// If need to delete all tasks
async function deleteAllData() {
    await backend.deleteItem('task');
    await backend.deleteItem('allBoardTasks');
}

async function deleteTaskDb() {
    await backend.deleteItem('task');
    initAllDbData();
  };

  async function deleteBoardDb() {
    await backend.deleteItem('allBoardTasks');
    initAllDbData();
  };

//   Set Items for Server DB

  async function setTask() {
    allTasksAsText = JSON.stringify(allTasks);
    await backend.setItem('task', allTasksAsText);
  }

  async function setBoardTask() {
    boardTasksAsText = JSON.stringify(boardTasks);
    await backend.setItem('allBoardTasks', boardTasksAsText);
  }
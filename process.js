// array container for all tasks after being downloaded from server
let allTasks = [];
let boardTasks = [];

// download data from server

async function initAllDbData() {
    await initBacklogDB();
    await initBoardDB();
    await getTeam();
    findOutWhoLoggedIn();
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


// TEAMDATA 

async function setTeam() {
  teamAsText = JSON.stringify(team);
  await backend.setItem('team_key', teamAsText);
}

async function getTeam() {
  setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  team = JSON.parse(backend.getItem('team_key'));
  console.log('team:', team);
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

  async function deleteTeam() {
    await backend.deleteItem('team_key');
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

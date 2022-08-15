// array container for all tasks after being downloaded from server
let allTasks = [];
let boardTasks = [];

// download data from server

async function initAllDbData() {
    await initBacklogDB();
    await initBoardDB();
    await getTeam();
    findOutWhoLoggedIn();
    customizeApp();
    renderTasksToBoard();
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
    console.log('boardTasks', boardTasks);
}


// TEAMDATA 

async function setTeam() {
  teamAsText = JSON.stringify(team);
  await backend.setItem('team', teamAsText);
}

async function getTeam() {
  setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  team = JSON.parse(backend.getItem('team'));
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
    await backend.deleteItem('team');
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

  // after finding out who logged in an customizes the page with the individual data for that teammember
  function customizeApp() {
    for (let i = 0; i < team.length; i++) {
        const element = team[i];
        if (element['eMail'] == currentMember) {
            let icon = element['icon'];
            document.getElementById('member-icon').innerHTML = icon;
        }
    }
 }

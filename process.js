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
    initAllDbData();
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

 // burgermenu


function openNavBar() {
  document.getElementById('navbar-container').classList.remove('d-none-mobile');
  document.getElementById('navbar-button').innerHTML = `
  <button onclick="closeNavBar()" class="getNavbar">...</button>
  `;
}

function closeNavBar() {
  document.getElementById('navbar-container').classList.add('d-none-mobile');
  document.getElementById('navbar-button').innerHTML = `
  <button onclick="openNavBar()" class="getNavbar">...</button>
  `;
}

// audio stuff

let AUDIO_DRAG = new Audio('audio/drag1.mp3');
let AUDIO_DROP = new Audio('audio/drop1.mp3');

function playDragSound() {
    AUDIO_DRAG.play();
}

function playDropSound() {
    AUDIO_DROP.play();
}


// help area

function openHelp() {
  document.getElementById('help-container').classList.remove('d-none');

}

function closeHelp() {
  document.getElementById('help-container').classList.add('d-none');
}

function donotclose(event) {
  event.stopPropagation();
}







 function openSideBar() {
    document.getElementById('burger-menu-open').classList.add ('d-none');
    document.getElementById('burger-menu-close').classList.remove ('d-none');
    document.getElementById('navbar-links').classList.remove('d-none-mobile');
    document.getElementById('navbar').classList.remove ('navbar-mobile');
    document.getElementById('navbar').classList.add ('navbar-mobile-open');

 }

 function closeSideBar() {
  document.getElementById('burger-menu-open').classList.remove ('d-none');
  document.getElementById('burger-menu-close').classList.add ('d-none');
  document.getElementById('navbar-links').classList.add('d-none-mobile');
  document.getElementById('navbar').classList.add ('navbar-mobile');
  document.getElementById('navbar').classList.remove ('navbar-mobile-open');
 }

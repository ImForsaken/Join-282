/**
 * Array container for all Tasks after being downloaded from server
 */
let allTasks = [];
let boardTasks = [];


/**
 * Audio files for dragging Tasks
 */
let AUDIO_DRAG = new Audio('audio/drag1.mp3');
let AUDIO_DROP = new Audio('audio/drop1.mp3');


/**
 * Function to download all data from Backend
 */
async function initAllDbData() {
    await initBacklogDB();
    await initBoardDB();
    await getTeam();
    findOutWhoLoggedIn();
    customizeApp();
}


/**
 * download only Backlog database
 */
async function initBacklogDB() {    
    setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('task')) || [];
    console.log('BACKLOGTASKS', allTasks);
}


/**
 * download only Board database
 */
async function initBoardDB() {
    setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    boardTasks = JSON.parse(backend.getItem('allBoardTasks')) || [];
    console.log('boardTasks', boardTasks);
}


/**
 * download the Team array from backend
 */
async function getTeam() {
  setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  team = JSON.parse(backend.getItem('team'));
  console.log('team:', team);
}


/**
 * delete all Backend data
 */
async function deleteAllData() {
    await backend.deleteItem('task');
    await backend.deleteItem('allBoardTasks');
    initAllDbData();
}


/**
 * delete backlog Tasks
 */
async function deleteTaskDb() {
    await backend.deleteItem('task');
    initAllDbData();
  }


/**
 * delete board Tasks from Backend
 */
async function deleteBoardDb() {
    await backend.deleteItem('allBoardTasks');
    initAllDbData();
  }


/**
 * delete Team data from Backend
 */
async function deleteTeam() {
    await backend.deleteItem('team');
    initAllDbData();
  }


/**
 * safes Backlogtasks on Backend
 */
async function setTask() {
    allTasksAsText = JSON.stringify(allTasks);
    await backend.setItem('task', allTasksAsText);
  }


/**
 * safes Boardtasks on Backend
 */
async function setBoardTask() {
    boardTasksAsText = JSON.stringify(boardTasks);
    await backend.setItem('allBoardTasks', boardTasksAsText);
  }
 

/**
 * safes the Team array to backend
 */
async function setTeam() {
  teamAsText = JSON.stringify(team);
  await backend.setItem('team', teamAsText);
}


/**
 * after finding out who logged in an customizes the page with the individual data for that teammember
 */  
function customizeApp() {
    for (let i = 0; i < team.length; i++) {
        const element = team[i];
        if (element['eMail'] == currentMember) {
            let icon = element['icon'];
            document.getElementById('member-icon').innerHTML = icon;
        }
    }
 }


/**
 * displays responsive Navbar
 */
function openNavBar() {
  document.getElementById('navbar-container').classList.remove('d-none-mobile');
  document.getElementById('navbar-button').innerHTML = `
  <button onclick="closeNavBar()" class="getNavbar">...</button>
  `;
}


/**
 * closes responsive Navbar
 */
function closeNavBar() {
  document.getElementById('navbar-container').classList.add('d-none-mobile');
  document.getElementById('navbar-button').innerHTML = `
  <button onclick="openNavBar()" class="getNavbar">...</button>
  `;
}


/**
 * Plays Audio while dragging Tasks on Board section
 */
function playDragSound() {
    AUDIO_DRAG.play();
}


function playDropSound() {
    AUDIO_DROP.play();
}


/**
 * Opens help section
 */
function openHelp() {
  document.getElementById('help-container').classList.remove('d-none');
}


/**
 * Closes help section
 */
function closeHelp() {
  document.getElementById('help-container').classList.add('d-none');
}


/**
 * Stop Event from loading
 * @param {*} event 
 */
function donotclose(event) {
  event.stopPropagation();
}


/**
 * Displays invisible Sidebar
 */
function openSideBar() {
  document.getElementById('burger-menu-open').classList.add ('d-none');
  document.getElementById('burger-menu-close').classList.remove ('d-none');
  document.getElementById('navbar-links').classList.remove('d-none-mobile');
  document.getElementById('navbar').classList.remove ('navbar-mobile');
  document.getElementById('navbar').classList.add ('navbar-mobile-open');
 }


 /**
 * Hides the Sidebar
 */
 function closeSideBar() {
  document.getElementById('burger-menu-open').classList.remove ('d-none');
  document.getElementById('burger-menu-close').classList.add ('d-none');
  document.getElementById('navbar-links').classList.add('d-none-mobile');
  document.getElementById('navbar').classList.add ('navbar-mobile');
  document.getElementById('navbar').classList.remove ('navbar-mobile-open');
 }
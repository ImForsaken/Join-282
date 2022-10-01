// this is the email of the current user, who just logged in or signed up
let currentMember; 


/**
 * Function to gather Information of user who logging in
 */
async function login(){
    findOutWhoLoggedIn();
    await getTeam();
    checkEmailMatchesPassword();
 }


/**
 * Determines if submited data is right
 */
function checkEmailMatchesPassword() {
    let loginemail = document.getElementById('login-email').value;
    let loginpassword = document.getElementById('login-password').value;
    let display = document.getElementById('login-error');
    let loginvalid = false;
    for (let i = 0; i < team.length; i++) {
        const element = team[i];
        if (loginemail == element['eMail'] && loginpassword == element['password']) {
            loginvalid = true;
            currentMember = element['eMail'];
            setCurrentMember('currentmember', currentMember);
            window.open('board.html', '_self');
        }
    }
    if (loginvalid == false) {
            display.classList.remove('d-none');
        setTimeout(() => {
            display.classList.add('d-none');
        }, 2500);
    }
 }


function guestLogin() {
    setCurrentMember('currentmember', 'guest@join.de');
    window.open('board.html', '_self');
}

/**
 * 
 * @param {string} key - Current User that Login in
 * @param {string} currentMember - Email of user who try to login
 */
function setCurrentMember(key, currentMember) {
        localStorage.setItem(key, currentMember);
      }


/**
 * 
 * @param {string} key - Current logged in user
 * @returns - returns the Member of this process
 */
function getCurrentMember(key) {
    return localStorage.getItem(key);
  }


/**
 * Function to determine the User
 */
function findOutWhoLoggedIn() {
    currentMember = getCurrentMember('currentmember');
  }
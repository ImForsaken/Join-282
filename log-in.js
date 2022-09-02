let currentMember; // this is the email of the current user, who just logged in or signed up
 
 async function login(){
    findOutWhoLoggedIn();
    await getTeam();
    checkEmailMatchesPassword();
 }

 function checkEmailMatchesPassword() {
    let loginemail = document.getElementById('login-email').value;
    let loginpassword = document.getElementById('login-password').value;
    let loginvalid = false;
    for (let i = 0; i < team.length; i++) {
        const element = team[i];
        if (loginemail == element['eMail'] && loginpassword == element['password']) {
            loginvalid = true;
            currentMember = element['eMail'];
            setCurrentMember('currentmember', currentMember);
            window.open('board.html', '_self') // weiterleitung zum board
        }
    }
    if (loginvalid == false) {
        document.getElementById('login-error').classList.remove('d-none')
    }
 }


 function setCurrentMember(key, currentMember) {
        localStorage.setItem(key, currentMember);
      }

 function getCurrentMember(key) {
    return localStorage.getItem(key);
  }

  function findOutWhoLoggedIn() {
    currentMember = getCurrentMember('currentmember');
    // customizeApp();
  }

  


//  function setarray(key, array) {
//     localStorage.setItem(key, JSON.stringify(array));
//   }
//   // diese obige funktion rufen wir also öfters auf und geben ihr immer andere werte
  
//   function getarray(key) {
//     return JSON.parse(localStorage.getItem(key));
//   }
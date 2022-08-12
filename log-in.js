let currentMember; // this is the email of the current user, who just logged in or signed up
 
 async function login(){
    await initAllDbData();
    await getTeam();
    checkEmailMatchesPassword();
 }

 function checkEmailMatchesPassword() {
    let loginemail = document.getElementById('login-email').value;
    let loginpassword = document.getElementById('login-password').value;
    for (let i = 0; i < team.length; i++) {
        const element = team[i];
        if (loginemail == element['e-mail'] && loginpassword == element['password']) {
          currentMember = element['e-mail'];
            setCurrentMember('currentmember', currentMember);
            window.open('board.html', '_self') // weiterleitung zum board
        } else {
            alert('Login Daten fehlerhaft')
        }
    }
 }

 function customizeApp() {
    for (let i = 0; i < team.length; i++) {
        const element = team[i];
        if (element['e-mail'] == currentMember) {
            let icon = element['icon'];
            document.getElementById('member-icon').innerHTML = icon;
        }
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
    customizeApp();
  }

  


//  function setarray(key, array) {
//     localStorage.setItem(key, JSON.stringify(array));
//   }
//   // diese obige funktion rufen wir also öfters auf und geben ihr immer andere werte
  
//   function getarray(key) {
//     return JSON.parse(localStorage.getItem(key));
//   }
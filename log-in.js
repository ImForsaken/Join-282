let teammember; // this is the number of the current user, who just logged in or signed up
 
 function login(){
    getTeam();
    checkEmailMatchesPassword();
 }

 function checkEmailMatchesPassword() {
    let loginemail = document.getElementById('login-email').value;
    let loginpassword = document.getElementById('login-password').value;
    for (let i = 0; i < team.length; i++) {
        const element = team[i];
        if (loginemail == element['e-mail'] && loginpassword == element['password']) {
            teammember = i;
        } else {
            alert('Login Daten fehlerhaft')
        }
    }
 }

 function customizeApp() {
    let icon = team[teammember]['icon'];
    document.getElementById('member-icon').innerHTML = `${icon}`;
 }

function signUp() {
    let email = document.getElementById('signup-email').value;
    let firstName = document.getElementById('signup-first-name').value;
    let lastName = document.getElementById('signup-last-name').value;
    let password = document.getElementById('sign-up-password').value;
    let icon = firstName.charAt(0) + lastName.charAt(0);
    let newUser = {
        'ID': team.length,
        'first-name': firstName,
        'last-name': lastName,
        'e-mail': email,
        'icon': icon,
        'password': password
        };

    team.push(newUser);
    setTeam('team_key', team);
    teammember = newUser['ID'];
    setTeamMember();
    }

function setTeam(team_key, team) {
     backend.setItem(team_key, JSON.stringify(team));
}

async function getTeam() {
    await downloadFromServer();
    team = JSON.parse(backend.getItem('team_key'));
}

// function getarray(key) {
//     return JSON.parse(localStorage.getItem(key));
//   }


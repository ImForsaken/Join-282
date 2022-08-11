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

// async function setTeam() {
//     await backend.setItem(team_key, JSON.stringify(team));
// }

async function setTeam() {
    teamAsText = JSON.stringify(team);
    await backend.setItem('team', teamAsText);
  }

async function getTeam() {
    setURL('https://gruppe-282.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    team = JSON.parse(backend.getItem('team')) || [];
    console.log('team:', team);
}

// function getarray(key) {
//     return JSON.parse(localStorage.getItem(key));
//   }


function SignUp() {
    let email = document.getElementById('signup-email').value;
    let firstName = document.getElementById('signup-first-name').value;
    let lastName = document.getElementById('signup-last-name').value;
    let password = document.getElementById('sign-up-password').value;

    let newUser = {
        'ID': team.length + 1,
        'first-name': firstName,
        'last-name': lastName,
        'e-mail': email,
        'src': '',
        'password': password
        }
        ;

    team.push(newUser);
    setTeam(team_key, team);
    }

function setTeam(team_key, team) {
    backend.setItem(team_key, JSON.stringify(team));
}

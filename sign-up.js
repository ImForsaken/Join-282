/**
 * Oragnises the SignUp process
 */
async function signUp() {
    await getTeam();
    let email = document.getElementById('signup-email').value;
    let firstName = document.getElementById('signup-first-name').value;
    let lastName = document.getElementById('signup-last-name').value;
    let password = document.getElementById('sign-up-password').value;
    let icon = firstName.charAt(0) + lastName.charAt(0);
    let newUser = {
        'ID': team.length,
        'firstName': firstName,
        'lastName': lastName,
        'eMail': email,
        'icon': icon,
        'password': password
    };
    team.push(newUser);
    await setTeam();
    currentMember = newUser['eMail'];
    setCurrentMember('currentmember', currentMember);
    window.open('board.html', '_self');
}
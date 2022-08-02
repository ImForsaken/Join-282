function SignUp() {
    let email = document.getElementById('signup-email').value;
    let firstName = document.getElementById('signup-first-name').value;
    let lastName = document.getElementById('signup-last-name').value;
    let password = document.getElementById('sign-up-password').value;
    
    team.push({
        'ID': '${team.length + 1}',
        'first-name': '${firstName}',
        'last-name': '${lastName}',
        'e-mail': '${email}',
        'src': './img/avatar${team.length + 1}.jpg',
        'password': '${password}'}
    );
}


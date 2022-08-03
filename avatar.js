let team = [
    {
        'ID': 1,
        'first-name': 'Kevin',
        'last-name': 'H..?',
        'e-mail': 'KevinH@join.com',
        'src': './img/avatar1.jpg',
        'password': ''
    },
    {
        'ID': 2,
        'first-name': 'Johannes',
        'last-name': 'Günther',
        'e-mail': 'JohannesG@join.com',
        'src': './img/avatar2.jpg',
        'password': '123456'
    }
]

let selectedUsers = [];

function renderAvatar() {
   let avatar = document.getElementById('avatarPicker')
//    avatar.innerHTML = '';
//    avatar.innerHTML += `
//    <h1>Assigned to</h1>
//    `
   for (let i = 0; i < team.length; i++) {
    const member = team[i]['src'];
    avatar.innerHTML += `
    <img id="user-${i}" onclick="selectUser(${i})" class="avatar" src="${member}">
    `
   }

}

function selectUser(i) {
    let user = document.getElementById('user-' + i);
    user.classList.toggle('avatar-selected');
    if(selectedUsers.includes(team[i]['src'])) {
        selectedUsers = selectedUsers.filter(a => a != team[i]['src'])
    } else {
    selectedUsers.push(team[i]['src']);
}
}



let team = [
    {
        'ID': '1',
        'name': 'Kevin',
        'e-mail': 'KevinH@join.com',
        'src': './img/avatar1.jpg'
    },
    {
        'ID': '2',
        'name': 'Johannes',
        'e-mail': 'JohannesG@join.com',
        'src': './img/avatar2.jpg'
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



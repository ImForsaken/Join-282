let team = [
    {
        'ID': 0,
        'first-name': 'Kevin',
        'last-name': 'Herbst',
        'e-mail': 'KevinH@join.com',
        'src': './img/avatar0.jpg',
        'password': '654321'
    },
    {
        'ID': 1,
        'first-name': 'Johannes',
        'last-name': 'Günther',
        'e-mail': 'JohannesG@join.com',
        'src': './img/avatar1.jpg',
        'password': '123456'
    }
]

let selectedUsers = [];
let selectedId = [];

function renderAvatar() {
   let assignBox = document.getElementById('assignAbleMember');
   for (let i = 0; i < team.length; i++) {
    const member = team[i]['src'];
    assignBox.innerHTML += `
    <img id="user-${i}" onclick="selectUser(${i})" class="avatar" src="${member}">
    `
   };

}

function assignedToBox() {
    memberBox = document.getElementById('memberBox');
    memberBox.innerHTML = "";
    for (let i = 0; i < selectedUsers.length; i++) {
        const element = selectedUsers[i];
        memberBox.innerHTML += `<img class="avatar2" src="${element}">`
    };
}

function selectUser(i) {
    let user = document.getElementById('user-' + i);
    user.classList.toggle('avatar-selected');
    if(selectedUsers.includes(team[i]['src']) && selectedId.includes(team[i]['ID'])) {
        selectedUsers = selectedUsers.filter(a => a != team[i]['src']);
        selectedId = selectedId.filter(e => e != team[i]['ID']);
    } else {
    selectedUsers.push(team[i]['src']);
    selectedId.push(team[i]['ID']);
    // Hier statt die ID den Namen, Email etc weitergeben und abspeichern unter selected user als weiteres Object
}
assignedToBox();
}



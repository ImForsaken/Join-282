let team = [];

// {
//     'id': 0,
//     'firstName': 'Kevin',
//     'lastName': 'Herbst',
//     'eMail': 'KevinH@join.com',
//     'src': './img/avatar0.jpg',
//     'password': '654321',
//     'icon': 'KH'
// },
// {
//     'id': 1,
//     'firstName': 'Johannes',
//     'lastName': 'Günther',
//     'eMail': 'JohannesG@join.com',
//     'src': './img/avatar1.jpg',
//     'password': '123456',
//     'icon': 'JG'
// }

let selectedUsers = [];
// BEACHTEN DAS IN DER VORSCHLAFE EINE CONSTANT 2 EINGEFÜGT WURDE - NACHHER ÄNDERN AUF TEAM.LENGTH ABER IMO TEAM NICHT ANGEPASST.
function renderAvatar() {
   let assignBox = document.getElementById('assignAbleMember');
   assignBox.innerHTML = "";
   for (let i = 0; i < 2; i++) {
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
        const element = selectedUsers[i]['src'];
        memberBox.innerHTML += `<img class="avatar3" src="${element}">`
    };
}

function selectUser(i) {
    let user = document.getElementById('user-' + i);
    user.classList.toggle('avatar-selected');
    if(selectedUsers.includes(team[i])) {
        selectedUsers = selectedUsers.filter(a => a != team[i]);
    } else {
    selectedUsers.push(team[i]);
}
assignedToBox();
}



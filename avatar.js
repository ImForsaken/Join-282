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
   for (let i = 0; i < team.length; i++) {
    const icon = team[i].icon;
    assignBox.innerHTML += `
    <p id="user-${i}" onclick="selectUser(${i})" class="avatar4">${icon}</p>
    `
   };
};

function assignedToBox() {
    memberBox = document.getElementById('memberBox');
    memberBox.innerHTML = "";
    for (let i = 0; i < selectedUsers.length; i++) {
        const icon = selectedUsers[i].icon;
        memberBox.innerHTML += `<p onclick="unSelectUser(${i})" class="avatar4">${icon}</p>`
    };
};

function selectUser(i) {
    let user = document.getElementById('user-' + i);
    user.classList.toggle('avatar-selected');
    if(selectedUsers.includes(team[i])) {
        selectedUsers = selectedUsers.filter(a => a != team[i]);
    } else {
    selectedUsers.push(team[i]);
};
assignedToBox();
};

function unSelectUser(i){
        selectedUsers.splice(i, 1);
assignedToBox();
}


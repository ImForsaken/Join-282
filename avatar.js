let team = [];
let selectedUsers = [];

/**
 * Renders all Avatars that are pick able for new Tasks
 */
function renderAvatar() {
   let assignBox = document.getElementById('assignAbleMember');
   assignBox.innerHTML = "";
   for (let i = 0; i < team.length; i++) {
    const icon = team[i].icon;
    assignBox.innerHTML += `
    <p id="user-${i}" onclick="selectUser(${i})" class="avatar4 cursor-pointer">${icon}</p>
    `
   };
};


/**
 * Renders selected Member to Memberbox
 */
function assignedToBox() {
    memberBox = document.getElementById('memberBox');
    memberBox.innerHTML = "";
    for (let i = 0; i < selectedUsers.length; i++) {
        const icon = selectedUsers[i].icon;
        memberBox.innerHTML += `<p onclick="unSelectUser(${i})" class="avatar4">${icon}</p>`
    };
};


/**
 * Function that filters if the Array contains the selected user
 * 
 * @param {number} i - index of current loop
 */
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


/**
 * Makes the Avatar clickable to remove selected user
 * 
 * @param {number} i - index
 */
function unSelectUser(i){
    selectedUsers.splice(i, 1);
    assignedToBox();
}


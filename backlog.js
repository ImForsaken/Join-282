let users = [];

async function addUser() {
    users.push('John');
   await backend.setItem('users', JSON.stringify(users));
}

async function initBacklog() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('task')) || [];
}

async function deleteUser(name) {
    await backend.deleteItem('users');
  }
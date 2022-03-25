const tasksUl = document.getElementById('tasks');
const outputTasks = () => {
  const taskList = JSON.parse(localStorage.getItem('tasks'));
  const taskDiv = document.createElement('div');
  const checkBox = document.createElement('input');
  const deletedItem = document.createElement('s');

  taskDiv.className = 'd-flex';
  tasksUl.innerHTML = '';
  checkBox.type = 'checkbox';
  checkBox.className = 'checkbox';
  taskList.forEach((task) => {
    if (task.completed) {
      checkBox.setAttribute('checked', 'checked');
    } else {
      checkBox.removeAttribute('checked', 'checked');
    }
    tasksUl.appendChild(deletedItem);
    tasksUl.appendChild(taskDiv);
    tasksUl.appendChild(checkBox);
    tasksUl.innerHTML += ` <li> ${task.description} </li>`;
  });
};

export default outputTasks;

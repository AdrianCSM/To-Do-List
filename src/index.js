import './style.css';

const tasksUl = document.getElementById('tasks');
const task = [{
  description: 'Task 1',
  completed: false,
  index: 0,
},
{
  description: 'Task 2',
  completed: false,
  index: 1,
}];

const display = (tasks) => {
  let oneTask;
  let element;
  for (let i = 0; i < tasks.length; i += 1) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    element = document.createElement('li');
    oneTask = tasks[i].description;
    element.innerHTML = `<input type="checkbox" name="" id="checkbox"> <p> ${oneTask} </p> </input>`;
    tasksUl.appendChild(element);
  }
  return element;
};

display(task);

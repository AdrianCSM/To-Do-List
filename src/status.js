const checkbox = document.getElementsByClassName('checkbox');
function updateCompletedInStorage(status, index) {
  const taskList = JSON.parse(localStorage.getItem('tasks'));
  if (!status) {
    taskList.forEach((item, i) => {
      if (i === index) {
        item.completed = false;
        localStorage.setItem('tasks', JSON.stringify(taskList));
        console.log('false', localStorage);
      }
    });
  } else {
    taskList.forEach((item, i) => {
      if (i === index) {
        item.completed = true;
        console.log('correct', localStorage, index);
        localStorage.setItem('tasks', JSON.stringify(taskList));
      }
    });
  }
}

const status = () => {
  for (let i = 0; i < checkbox.length; i += 1) {
    checkbox[i].addEventListener('change', () => {
      console.log('clicked');
      const { checked } = checkbox[i];
      if (checked) {
        updateCompletedInStorage(true, i);
      } else {
        updateCompletedInStorage(false, i);
      }
    });
  }
};

export default status;

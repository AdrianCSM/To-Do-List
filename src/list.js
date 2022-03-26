export default class List {
  constructor() {
    this.list = JSON.parse(localStorage.getItem('todo-list'));
    if (!this.list) {
      this.list = [];
    }
    this.display();
  }

  display() {
    this.saveData();
    const listSection = document.getElementById('list-items');
    listSection.innerHTML = '';
    this.list.forEach((activity) => {
      let activityItem = `<li class ='d-flex s-between list-item' id ='item-data-${activity.index}'> `;
      if (activity.completed) {
        activityItem += `<span class='material-icons done update-status' data='${activity.index}'>
                done
              </span>
              <p contenteditable='true' class='completed activity' data='${activity.index}'>
                ${activity.description}
              </p>
              `;
      } else {
        activityItem += `
              <span class='material-icons  update-status'  data='${activity.index}'>
                check_box_outline_blank
              </span>
              <p contenteditable='true' class='activity' data='${activity.index}'>
                ${activity.description}
              </p>`;
      }
      activityItem += `
            <span class='material-icons delete-activity' data='${activity.index}'>
              delete
            </span>
          </li>
        `;
      listSection.innerHTML += activityItem;
    });
    this.activityActions();
  }

  saveData() {
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].index = i;
    }
    this.list.sort((a, b) => {
      if (a.index < b.index) {
        return -1;
      }
      if (a.index > b.index) {
        return 1;
      }
      return 0;
    });
    localStorage.setItem('todo-list', JSON.stringify(this.list));
  }

  addActivity(activity) {
    if (activity.length > 0) {
      const newActivity = {
        description: activity,
        completed: false,
        index: this.list.length,
      };
      this.list.push(newActivity);
      this.display();
      this.saveData();
    }
  }

  deleteAll() {
    localStorage.clear();
    this.list = [];
    this.display();
  }

  updateStatus(index) {
    if (this.list[index].completed === true) {
      this.list[index].completed = false;
    } else if (this.list[index].completed === false) {
      this.list[index].completed = true;
    }
    this.display();
  }

  deleteCompleted(index) {
    this.list.splice(index, 1);
    this.display();
  }

  clearCompleted() {
    this.list = this.list.filter((activity) => activity.completed === false);
    this.display();
  }

  editActivity(index, description) {
    this.list[index].description = description;
    this.saveData();
  }

  activityActions() {
    const checkbox = document.querySelectorAll('.update-status');
    if (checkbox !== null) {
      checkbox.forEach((box) => {
        box.addEventListener('click', () => {
          this.updateStatus(box.getAttribute('data'));
        });
      });
    }

    const deleteActivity = document.querySelectorAll('.delete-activity');
    deleteActivity.forEach((activity) => {
      activity.addEventListener('click', () => {
        this.deleteCompleted(activity.getAttribute('data'));
      });
    });

    const editedActivity = document.querySelectorAll('.activity');
    if (editedActivity) {
      editedActivity.forEach((activity) => {
        activity.addEventListener('input', (e) => {
          const description = e.target.innerText;
          const index = e.target.getAttribute('data');
          this.editActivity(index, description);
        });
      });
    }
  }
}

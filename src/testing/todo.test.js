/**
 * @jest-environment jsdom
 */
import List from '../list.js';

document.body.innerHTML = `
   <section class='d-flex cols todo-list'>
     <header class='header d-flex s-between'>
         <h2>Today's To Do </h2>
         <span class='material-icons' id='delete-all'>autorenew</span>
     </header>
     <form action='#' class='d-flex s-between' id='add-task'>
         <input type='text' name='activity' placeholder='Add your List'>
         <button type='submit'>
             <span class='material-icons'>keyboard_return</span>
         </button>
     </form>
     <ul id='list-items'></ul>
     <div class='d-flex clear-completed'>
       Clear All Completed
     </div>
   </section>
 `;
describe('add and remove', () => {
  // mock Localstorage simulation
  window.localStorage = Storage.prototype;
  test('Add task', () => {
    const todoList = new List();
    todoList.addActivity('Test');
    expect(todoList.list).toHaveLength(1);

    // storage mocked data
    const storedData = JSON.parse(localStorage.getItem('todo-list'));
    expect(storedData).not.toBe(null);
    expect(localStorage).toHaveLength(1);
  });
  test('remove task', () => {
    const todoList = new List();
    todoList.deleteAll();
    todoList.addActivity('Test');
    todoList.addActivity('Test');
    todoList.addActivity('Test');
    todoList.deleteCompleted(1);
    expect(todoList.list).toHaveLength(2);
  });
});

describe('update Activity Status', () => {
  test('update status', () => {
    const todoList = new List();
    todoList.addActivity('Testing');
    todoList.updateStatus(1);
    expect(todoList.list[1].completed).toBe(true);
  });
});

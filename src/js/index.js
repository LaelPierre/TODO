"use strict";

/* Elements */
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.getElementById("add");
const clear = document.getElementById("clear");
const url = document.getElementById("url");
const load = document.getElementById("load");

//New key instance 'Tasks'
const storage = new arrayStorage("tasks");

//Get existing tasks in an array or an empty array
const tasks = storage.list;

//function to display the tasks list
function taskToDOM(task) {
  // verify if the string is not empty
  if (typeof task === "string" && task) {
    const li = document.createElement("li");
    const remove = document.createElement("button");

    // Add text content li to the ul
    li.textContent = task;
    remove.textContent = "REMOVE";

    //Remove a task
    remove.addEventListener("click", () => {
      const value = remove.parentNode.firstChild.textContent;
      storage.remove(value);
      list.removeChild(remove.parentNode);
    });

    // Add button to the ul
    li.appendChild(remove);

    // Add tasks to the ul
    list.insertBefore(li, list.firstChild);

    return true;
  }
  return false;
}

// Add each task to the ul
// for (i = 0; i < tasks.length; i++) {
//   taskToDOM(tasks[i]);
// }
tasks.forEach((task) => {
  taskToDOM(task);
});

//Function to add tasks with the button add and key Enter
function newTask() {
  if (storage.list.indexOf(input.value) === -1 && taskToDOM(input.value)) {
    storage.set(input.value);
    input.value = "";
  }
  input.focus(); //keep curseur in the input everytime we press add or enter
}

add.addEventListener("click", newTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    newTask();
  }
});

//Delete the list from the DOM with clear
clear.addEventListener("click", () => {
  storage.clear();
  list.innerHTML = "";
});

//Handle tasks import
load.addEventListener("click", () => {
  fetch(url.value)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.statusText} (${response.status})`);
    })
    .then((tasks) => {
      if (Array.isArray(tasks)) {
        tasks.forEach((task) => {
          if (storage.list.indexOf(task) === -1 && taskToDOM(task)) {
            storage.set(task);
          }
        });
        return;
      }
      throw new TypeError(
        `The response is not a JSON array (Type: ${typeof tasks})`
      );
    });
});

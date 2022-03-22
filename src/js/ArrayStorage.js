"use strict";

/* Local storage for tasks */
class arrayStorage {
  //Constructor to initialise object with the key name and his value
  constructor(name) {
    (this.name = name), (this.list = this.get());
  }

  //Method to get the value from the array or to create the array by default if empty
  get() {
    if (!localStorage.getItem(this.name)) {
      localStorage.setItem(this.name, "[]");
    }
    return JSON.parse(localStorage.getItem(this.name));
  }

  //Method to add value to the array when click add
  set(value) {
    this.list.push(value);
    localStorage.setItem(this.name, JSON.stringify(this.list));
  }

  //Method to remove a task
  remove(value) {
    const index = this.list.indexOf(value);
    this.list.splice(index, 1);
    localStorage.setItem(this.name, JSON.stringify(this.list));
  }

  //Method to clear all tasks
  clear() {
    localStorage.removeItem(this.name);
  }
}

import { Injectable } from '@angular/core';
import { Task } from '@models/Task.model';
import { Subject } from 'rxjs';

export type FilterOption = 'all' | 'done' | 'pending';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [];
  onUpdated: Subject<void> = new Subject<void>();

  constructor() { }

  init(): void {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      this.tasks = [];
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask(removedTask: Task): void {
    this.tasks = this.tasks.filter(task => task.id !== removedTask.id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTask(updatedTask: Task): void {
    this.tasks.find(task => task.id === updatedTask.id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  filter(option: FilterOption): Task[] {
    switch (option) {
      case 'all': return this.tasks;
      case 'done': return this.tasks.filter(task => task.done);
      case 'pending': return this.tasks.filter(task => !task.done);
      default: return this.tasks;
    }
  }
}

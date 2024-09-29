import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskComponent } from '@components/task/task.component';
import { Task } from '@models/Task.model';
import { FilterOption, TasksService } from '@services/tasks.service';
import { TasksFilterComponent } from './tasks-filter/tasks-filter.component';

@Component({
  selector: 'tasks-container',
  standalone: true,
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  imports: [NgFor, TaskComponent, TasksFilterComponent]
})
export class TaskContainerComponent implements OnInit {

  private readonly tasksService = inject(TasksService);

  tasks: Task[] = [];

  constructor() { }

  ngOnInit() {
    this.tasks = this.tasksService.tasks;

    this.tasksService.onUpdated
      .subscribe({
        next: () => {
          this.tasks = this.tasksService.tasks;
        }
      });
  }

  onFilter(option: FilterOption): void {
    this.tasks = this.tasksService.filter(option);
  }
}

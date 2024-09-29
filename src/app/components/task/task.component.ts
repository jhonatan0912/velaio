import { DatePipe, NgFor } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '@models/Task.model';
import { FormatHabilitiesPipe } from '@pipes/formatHabilities.pipe';
import { TasksService } from '@services/tasks.service';

@Component({
  selector: 'task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  imports: [NgFor, FormatHabilitiesPipe, DatePipe, FormsModule]
})
export class TaskComponent {

  tasksService = inject(TasksService);

  @Input() index!: number;
  @Input() task!: Task;

  onChange(event: any): void {
    this.task.done = event.target.checked;
    this.tasksService.updateTask(this.task);
  }

  onDelete(): void {
    this.tasksService.removeTask(this.task);
    this.tasksService.onTaskDeleted.next();
  }
}

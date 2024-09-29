import { Component, EventEmitter, Output } from '@angular/core';
import { FilterOption } from '@services/tasks.service';



@Component({
  selector: 'tasks-filter',
  standalone: true,
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.scss']
})
export class TasksFilterComponent {

  @Output() onFilter = new EventEmitter<FilterOption>();

  onSelectOption(option: FilterOption): void {
    this.onFilter.emit(option);
  }

}

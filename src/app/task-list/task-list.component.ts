import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnChanges {
  @Input() tasks: string[] = [];
  taskStatus: { [taskName: string]: boolean } = {};
  selectedFilter: string = 'all';

  ngOnChanges() {
    this.filterTasks();
  }

  filterTasks() {
    if (this.selectedFilter === 'completed') {
      this.tasks.forEach(task => {
        if (this.taskStatus[task] !== true) {
          delete this.taskStatus[task];
        }
      });
    } else if (this.selectedFilter === 'incomplete') {
      this.tasks.forEach(task => {
        if (this.taskStatus[task] !== false) {
          delete this.taskStatus[task];
        }
      });
    }
  }

  updateTaskStatus(task: string, isChecked: boolean) {
    this.taskStatus[task] = isChecked;
  }

  filteredTasks(): string[] {
    if (this.selectedFilter === 'completed') {
      return this.tasks.filter(task => this.taskStatus[task]);
    } else if (this.selectedFilter === 'incomplete') {
      return this.tasks.filter(task => !this.taskStatus[task]);
    }
    return this.tasks;
  }
}

